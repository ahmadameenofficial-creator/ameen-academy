import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { sendWelcomeEmail } from "@/lib/email";
import { referralService } from "@/lib/services";

export async function POST(req: Request) {
  // Rate limit بالـ IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`register:${ip}`, RATE_LIMITS.register);
  if (!rl.success) {
    return NextResponse.json(
      { error: `كتير أوي، جرّب بعد ${Math.ceil(rl.resetIn / 60)} دقيقة` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = phone.replace(/\s|-/g, "").trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "الإيميل ده مسجّل قبل كده" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        password: hashedPassword,
      },
    });

    // ربط المُحيل لو جه عن طريق لينك إحالة (مبيكسرش التسجيل لو الكود غلط)
    if (typeof body.ref === "string") {
      await referralService.attachReferral(user.id, body.ref).catch(() => {});
    }

    sendWelcomeEmail(normalizedEmail, name.trim()).catch(() => {});

    return NextResponse.json(
      { message: "الحساب اتعمل بنجاح" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "حصل مشكلة، جرّب تاني" },
      { status: 500 }
    );
  }
}
