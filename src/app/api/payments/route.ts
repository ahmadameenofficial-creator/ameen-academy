import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const paymentSchema = z.object({
  courseId: z.string().min(1),
  method: z.string().min(1, "طريقة الدفع مطلوبة"),
  transactionRef: z.string().min(3, "رقم العملية مطلوب"),
  senderPhone: z.string().min(10, "رقم الموبايل مطلوب"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = paymentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { courseId, method, transactionRef, senderPhone } = result.data;

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ error: "الكورس مش موجود" }, { status: 404 });
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });
    if (existingEnrollment) {
      return NextResponse.json({ error: "انت مشترك في الكورس ده بالفعل" }, { status: 409 });
    }

    const existingPayment = await prisma.payment.findFirst({
      where: { userId: session.user.id, courseId, status: "PENDING" },
    });
    if (existingPayment) {
      return NextResponse.json({ error: "عندك طلب دفع قيد المراجعة بالفعل" }, { status: 409 });
    }

    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        courseId,
        amount: course.price,
        method,
        status: "PENDING",
        metadata: { transactionRef, senderPhone },
      },
    });

    return NextResponse.json({ message: "تم استلام طلبك، هنراجعه وندخلك الكورس", id: payment.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة، جرّب تاني" }, { status: 500 });
  }
}
