import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { z } from "zod";

// تسجيل دفعة + تحديث ميعاد الدفعة الجاية في عملية واحدة
const paymentSchema = z.object({
  studentId: z.string().min(1),
  amount: z.number().min(1), // بالقرش
  method: z.enum(["CASH", "INSTAPAY", "VODAFONE_CASH", "OTHER"]),
  paidAt: z.string().optional(), // ISO date — الافتراضي دلوقتي
  note: z.string().max(300).nullable().optional(),
  // الدفعة الجاية (null صريح = مفيش مستحق تاني)
  nextDueDate: z.string().nullable().optional(),
  nextDueAmount: z.number().min(0).nullable().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const result = paymentSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    const data = result.data;

    const [payment] = await prisma.$transaction([
      prisma.offlinePayment.create({
        data: {
          studentId: data.studentId,
          amount: data.amount,
          method: data.method,
          paidAt: data.paidAt ? new Date(data.paidAt) : new Date(),
          note: data.note || null,
        },
      }),
      prisma.offlineStudent.update({
        where: { id: data.studentId },
        data: {
          nextDueDate: data.nextDueDate ? new Date(data.nextDueDate) : null,
          nextDueAmount: data.nextDueAmount ?? null,
        },
      }),
    ]);

    revalidatePath("/admin/offline");
    return NextResponse.json(payment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

    await prisma.offlinePayment.delete({ where: { id } });
    revalidatePath("/admin/offline");
    return NextResponse.json({ message: "تم الحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في الحذف" }, { status: 500 });
  }
}
