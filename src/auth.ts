import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: string }).role;
        token.picture = user.image;
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
});
