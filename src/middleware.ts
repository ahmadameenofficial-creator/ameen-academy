import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// middleware خفيف — بيستخدم auth.config فقط (من غير Prisma/bcrypt)
// عشان حجم الـ Edge Function يفضل تحت 1 MB
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
