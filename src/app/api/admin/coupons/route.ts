import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { z } from "zod";

const couponSchema = z.object({
  code: z.string().min(2).max(30),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(1),
  maxUses: z.number().min(1).nullable().optional(),
  minPrice: z.number().nullable().optional(),
  courseId: z.string().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: { select: { title: true } } },
  });

  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const result = couponSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const data = result.data;

    const existing = await prisma.coupon.findUnique({
      where: { code: data.code.toUpperCase().trim() },
    });
    if (existing) {
      return NextResponse.json({ error: "الكود ده موجود بالفعل" }, { status: 409 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase().trim(),
        discountType: data.discountType,
        discountValue: data.discountValue,
        maxUses: data.maxUses || null,
        minPrice: data.minPrice || null,
        courseId: data.courseId || null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  }

  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ message: "تم الحذف" });
}
