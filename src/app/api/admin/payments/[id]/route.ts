import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { notifyPaymentApproved } from "@/lib/notifications";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;
  const { action } = await req.json();

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "action لازم يكون approve أو reject" }, { status: 400 });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "الدفعة مش موجودة" }, { status: 404 });
    }

    if (payment.status !== "PENDING") {
      return NextResponse.json({ error: "الدفعة دي اتعالجت قبل كده" }, { status: 409 });
    }

    if (action === "approve") {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id },
          data: { status: "PAID", paidAt: new Date() },
        }),
        prisma.enrollment.create({
          data: {
            userId: payment.userId,
            courseId: payment.courseId,
          },
        }),
      ]);

      await notifyPaymentApproved(payment.userId, payment.course.title);

      return NextResponse.json({ message: "تم تأكيد الدفع وتسجيل الطالب" });
    } else {
      await prisma.payment.update({
        where: { id },
        data: { status: "FAILED" },
      });

      return NextResponse.json({ message: "تم رفض الدفعة" });
    }
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
