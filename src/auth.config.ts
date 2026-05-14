import type { NextAuthConfig } from "next-auth";

/**
 * إعدادات Auth الخفيفة — للاستخدام في الـ middleware فقط
 * من غير Prisma أو bcrypt عشان الـ bundle يفضل صغير (< 1 MB)
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [], // الـ providers الفعلية في auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const protectedPaths = ["/dashboard", "/admin"];
      const authPaths = ["/login", "/register"];

      const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
      const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

      // صفحات محمية — لازم يكون مسجّل دخول
      if (isProtected && !isLoggedIn) {
        return false; // NextAuth هيعمل redirect لـ /login تلقائي
      }

      // صفحات auth — لو مسجّل دخول يروح للداشبورد
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
};
