import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, "الباسورد لازم 8 حروف على الأقل")
    .regex(/[A-Z]/, "لازم حرف كبير واحد على الأقل")
    .regex(/[0-9]/, "لازم رقم واحد على الأقل"),
});

export async function POST(req: Request) {
  // حماية من brute force على الـ token
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`reset:${ip}`, { limit: 5, windowSeconds: 15 * 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "محاولات كتير، جرّب بعد 15 دقيقة" }, { status: 429 });
  }
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // البحث عن التوكن والتأكد إنه لسه صالح
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "اللينك مش صحيح أو انتهت صلاحيته" },
        { status: 400 }
      );
    }

    if (resetToken.expires < new Date()) {
      // حذف التوكن المنتهي
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json(
        { error: "اللينك انتهت صلاحيته، اطلب واحد جديد" },
        { status: 400 }
      );
    }

    // تحديث الباسورد
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      }),
      // حذف كل التوكنات بتاعت الإيميل ده
      prisma.passwordResetToken.deleteMany({
        where: { email: resetToken.email },
      }),
    ]);

    return NextResponse.json({ message: "الباسورد اتغيّر بنجاح" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
