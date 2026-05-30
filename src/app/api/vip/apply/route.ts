import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  sendApplicationReceivedEmail,
  notifyAdminNewApplication,
} from "@/lib/email-vip";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limit أول حاجة — قبل أي شغل آخر (يقلل تكلفة DB + Email)
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`vip-apply:${ip}`, RATE_LIMITS.vipApplication);
  if (!rl.success) {
    return NextResponse.json(
      { error: `كتر منك يا معلم — استنى ${Math.ceil(rl.resetIn / 60)} دقيقة` },
      { status: 429, headers: { "Retry-After": String(rl.resetIn) } },
    );
  }

  const session = await auth();

  try {
    const body = await req.json();
    const { name, email, phone, experience, currentWork, goal } = body;

    // التحقق من البيانات
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "كل البيانات مطلوبة" }, { status: 400 });
    }

    if (!experience?.trim() || !currentWork?.trim() || !goal?.trim()) {
      return NextResponse.json({ error: "كل الأسئلة مطلوب الرد عليها" }, { status: 400 });
    }

    // نشيّك لو في طلب سابق
    const existing = await prisma.vipApplication.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        status: { in: ["PENDING", "APPROVED"] },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "في طلب سابق ليك لسه تحت المراجعة" },
        { status: 400 }
      );
    }

    // إنشاء الطلب
    const application = await prisma.vipApplication.create({
      data: {
        userId: session?.user?.id || null,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        experience: experience.trim(),
        currentWork: currentWork.trim(),
        goal: goal.trim(),
      },
    });

    console.log(`[VIP] طلب جديد: ${application.id} من ${application.email}`);

    // إيميل تأكيد للمتقدم + إخطار للأدمن (parallel)
    await Promise.all([
      sendApplicationReceivedEmail(application.email, application.name),
      notifyAdminNewApplication({
        name: application.name,
        email: application.email,
        phone: application.phone,
      }),
    ]);

    return NextResponse.json({ success: true, id: application.id });
  } catch (err) {
    console.error("[VIP Apply] Error:", err);
    return NextResponse.json(
      { error: "حصلت مشكلة، جرّب تاني" },
      { status: 500 }
    );
  }
}
