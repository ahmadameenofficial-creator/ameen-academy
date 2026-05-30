import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";
import {
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
  sendMembershipActivatedEmail,
} from "@/lib/email-vip";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, context: Ctx) {
  await requireAdmin();
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { action } = body;

    const application = await prisma.vipApplication.findUnique({ where: { id } });
    if (!application) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    }

    // ============ APPROVE ============
    if (action === "approve") {
      if (application.status !== "PENDING") {
        return NextResponse.json({ error: "الطلب مش في حالة pending" }, { status: 400 });
      }

      await prisma.vipApplication.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedAt: new Date(),
        },
      });

      // إيميل بـ تفاصيل الدفع
      await sendApplicationApprovedEmail(application.email, application.name);

      return NextResponse.json({ success: true, message: "تم القبول وبعت الإيميل" });
    }

    // ============ REJECT ============
    if (action === "reject") {
      const { reason } = body;
      if (!reason?.trim()) {
        return NextResponse.json({ error: "السبب مطلوب" }, { status: 400 });
      }

      await prisma.vipApplication.update({
        where: { id },
        data: {
          status: "REJECTED",
          reviewNotes: reason.trim(),
          reviewedAt: new Date(),
        },
      });

      await sendApplicationRejectedEmail(application.email, application.name, reason);

      return NextResponse.json({ success: true, message: "تم الرفض وبعت الإيميل" });
    }

    // ============ ENROLL (manual) ============
    if (action === "enroll") {
      if (application.status !== "APPROVED") {
        return NextResponse.json({ error: "لازم تقبل الطلب الأول" }, { status: 400 });
      }

      const { plan, amountPaid, notes } = body;

      if (!["MONTHLY", "QUARTERLY", "ANNUAL"].includes(plan)) {
        return NextResponse.json({ error: "خطة غير صالحة" }, { status: 400 });
      }

      if (!amountPaid || amountPaid <= 0) {
        return NextResponse.json({ error: "المبلغ مطلوب" }, { status: 400 });
      }

      // نلاقي اليوزر — لو مسجّل بالفعل، نستخدمه. لو لا، نقول للأدمن
      let userId = application.userId;
      if (!userId) {
        const existingUser = await prisma.user.findUnique({
          where: { email: application.email },
        });
        if (existingUser) {
          userId = existingUser.id;
        } else {
          return NextResponse.json(
            {
              error: `لازم اليوزر يكون مسجّل في الموقع الأول. قول له يسجّل بالإيميل ${application.email}.`,
            },
            { status: 400 },
          );
        }
      }

      // نشيّك لو عنده عضوية بالفعل
      const existingMembership = await prisma.vipMembership.findUnique({
        where: { userId },
      });
      if (existingMembership) {
        return NextResponse.json(
          { error: "اليوزر ده عنده عضوية بالفعل" },
          { status: 400 },
        );
      }

      // نحسب تاريخ التجديد
      const months = plan === "ANNUAL" ? 12 : plan === "QUARTERLY" ? 3 : 1;
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + months);

      // نحسب الـ hot seat order (آخر واحد + 1)
      const lastMember = await prisma.vipMembership.findFirst({
        orderBy: { hotSeatOrder: "desc" },
      });
      const nextOrder = (lastMember?.hotSeatOrder || 0) + 1;

      // ننشئ العضوية
      await prisma.vipMembership.create({
        data: {
          userId,
          plan,
          status: "ACTIVE",
          currentPeriodEnd,
          totalPaid: amountPaid,
          hotSeatOrder: nextOrder,
        },
      });

      // نحدّث حالة الـ application
      await prisma.vipApplication.update({
        where: { id },
        data: {
          status: "ENROLLED",
          reviewNotes: notes
            ? `${application.reviewNotes ? application.reviewNotes + "\n" : ""}دفع: ${amountPaid / 100} ج (${plan}). ${notes}`
            : `دفع ${amountPaid / 100} ج (${plan})`,
        },
      });

      // إيميل تأكيد التفعيل
      await sendMembershipActivatedEmail(
        application.email,
        application.name,
        plan,
        currentPeriodEnd,
      );

      return NextResponse.json({ success: true, message: "تم تفعيل العضوية!" });
    }

    return NextResponse.json({ error: "action غير معروف" }, { status: 400 });
  } catch (err) {
    console.error("[Admin VIP Application] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "حصلت مشكلة" },
      { status: 500 },
    );
  }
}
