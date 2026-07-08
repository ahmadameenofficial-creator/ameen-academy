import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { z } from "zod";

// المبالغ هنا بالقرش — التحويل من الجنيه بيحصل في الـ client
const groupSchema = z.object({
  name: z.string().min(2).max(100),
  dayOfWeek: z.number().min(0).max(6).nullable().optional(),
  price: z.number().min(0).optional(),
  expenses: z.number().min(0).optional(),
  notes: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const result = groupSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const group = await prisma.offlineGroup.create({ data: result.data });
    revalidatePath("/admin/offline");
    return NextResponse.json(group, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

    const result = groupSchema.partial().safeParse(rest);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const group = await prisma.offlineGroup.update({ where: { id }, data: result.data });
    revalidatePath("/admin/offline");
    revalidatePath(`/admin/offline/${id}`);
    return NextResponse.json(group);
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

    // الحذف بيمسح الطلاب والدفعات والحضور (Cascade) — الـ client بيأكد قبلها
    await prisma.offlineGroup.delete({ where: { id } });
    revalidatePath("/admin/offline");
    return NextResponse.json({ message: "تم الحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في الحذف" }, { status: 500 });
  }
}
