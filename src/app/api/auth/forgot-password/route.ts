import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { z } from "zod";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { sendPasswordResetEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`forgot:${ip}`, RATE_LIMITS.forgotPassword);
  if (!rl.success) {
    return NextResponse.json(
      { error: `جرّب بعد ${Math.ceil(rl.resetIn / 60)} دقيقة` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "إيميل مش صحيح" }, { status: 400 });
    }

    const email = result.data.email.toLowerCase().trim();

    // دايماً نرجع نفس الرد سواء الإيميل موجود أو لا (أمان)
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && !user.isBanned) {
      // حذف أي توكنات قديمة
      await prisma.passwordResetToken.deleteMany({ where: { email } });

      // إنشاء توكن جديد (صالح ساعة واحدة)
      const token = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({
        data: {
          email,
          token,
          expires: new Date(Date.now() + 60 * 60 * 1000), // ساعة
        },
      });

      await sendPasswordResetEmail(email, user.name || "مستخدم", token);
    }

    // نفس الرد دايماً (مش بنقول لو الإيميل موجود أو لا)
    return NextResponse.json({
      message: "لو الإيميل ده مسجل، هتوصلك رسالة",
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
