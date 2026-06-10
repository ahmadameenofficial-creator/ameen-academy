import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { attachReferral } from "@/lib/services/referral.service";

// نضيف Google بس لو الـ credentials متظبطة في الـ env — عشان الزرار ما يظهرش مكسور
const googleEnabled = !!(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

const oauthProviders = googleEnabled
  ? [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // جوجل بيوثّق الإيميل، فربط الحساب بإيميل موجود آمن — بيخلّي مستخدم
        // عنده حساب بالباسورد يقدر يدخل بجوجل بنفس الإيميل من غير تكرار.
        allowDangerousEmailAccountLinking: true,
      }),
    ]
  : [];

// ============ حماية من Brute Force — حظر بعد 5 محاولات فاشلة ============
const LOCKOUT_THRESHOLD = 5; // عدد المحاولات الفاشلة
const LOCKOUT_WINDOW_MINUTES = 15; // الفترة اللي بنعدّ فيها المحاولات

async function isAccountLocked(email: string): Promise<boolean> {
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MINUTES * 60 * 1000);
  const failedAttempts = await prisma.loginAttempt.count({
    where: { email, success: false, createdAt: { gte: since } },
  });
  return failedAttempts >= LOCKOUT_THRESHOLD;
}

async function recordLoginAttempt(email: string, success: boolean, userId?: string) {
  // بنسجل في الخلفية — لو فشل مش هيأثر على الـ login
  prisma.loginAttempt.create({
    data: { email, success, userId },
  }).catch(() => {});
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...oauthProviders,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        // تشييك الحظر التلقائي — 5 محاولات فاشلة = حظر 15 دقيقة
        const locked = await isAccountLocked(email);
        if (locked) {
          recordLoginAttempt(email, false);
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          recordLoginAttempt(email, false);
          return null;
        }

        if (user.isBanned) {
          recordLoginAttempt(email, false, user.id);
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          recordLoginAttempt(email, false, user.id);
          return null;
        }

        // دخول ناجح — سجّل وحدّث آخر دخول
        recordLoginAttempt(email, true, user.id);

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // منع المحظورين من الدخول عبر OAuth (الـ Credentials بيتشيك جوّه authorize)
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase() },
          select: { isBanned: true },
        });
        if (dbUser?.isBanned) return false;
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: string }).role;
        token.picture = user.image;
        token.checkedAt = Math.floor(Date.now() / 1000);
      }
      // تحديث البيانات لما اليوزر يعدل البروفايل
      if (trigger === "update") {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { name: true, image: true, role: true },
        });
        if (dbUser) {
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.role = dbUser.role;
        }
        token.checkedAt = Math.floor(Date.now() / 1000);
      }

      // إعادة تحقق دورية (كل ساعة) من الحظر والدور — عشان المحظور
      // أو الأدمن المتشال ميفضلوش شغالين بصلاحيات قديمة لحد ما الـ JWT يخلص
      const now = Math.floor(Date.now() / 1000);
      const checkedAt = typeof token.checkedAt === "number" ? token.checkedAt : 0;
      if (token.id && now - checkedAt > 60 * 60) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { isBanned: true, role: true },
        });
        // مستخدم محذوف أو محظور = إبطال الجلسة فوراً
        if (!dbUser || dbUser.isBanned) return null;
        token.role = dbUser.role;
        token.checkedAt = now;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = (token.picture as string) || null;
      }
      return session;
    },
  },
  events: {
    // بيشتغل مرة واحدة بس وقت إنشاء أي مستخدم جديد (بما فيهم مستخدمي جوجل).
    // بنربط كود الإحالة المحفوظ في كوكي عشان ما نفقدش الـ affiliate.
    async createUser({ user }) {
      try {
        const { cookies } = await import("next/headers");
        const store = await cookies();
        const ref = store.get("ameen_ref")?.value;
        if (ref && user.id) {
          await attachReferral(user.id, ref);
        }
      } catch {
        // لو فشل لأي سبب — مبيكسرش التسجيل
      }
    },
    // تحديث آخر دخول لمستخدمي OAuth (الـ Credentials بيحدّثه جوّه authorize)
    async signIn({ user }) {
      if (user?.id) {
        prisma.user
          .update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
          .catch(() => {});
      }
    },
  },
});
