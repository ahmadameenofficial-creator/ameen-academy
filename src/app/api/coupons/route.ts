import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const courseId = req.nextUrl.searchParams.get("courseId");

  if (!code || !courseId) {
    return NextResponse.json({ error: "code و courseId مطلوبين" }, { status: 400 });
  }

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: "كود الخصم مش صحيح" }, { status: 404 });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ error: "كود الخصم منتهي" }, { status: 410 });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: "كود الخصم خلص" }, { status: 410 });
    }

    if (coupon.courseId && coupon.courseId !== courseId) {
      return NextResponse.json({ error: "الكود ده مش للكورس ده" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { price: true },
    });

    if (!course) {
      return NextResponse.json({ error: "الكورس مش موجود" }, { status: 404 });
    }

    if (coupon.minPrice && course.price < coupon.minPrice) {
      return NextResponse.json({ error: "الكورس ده أقل من الحد الأدنى للكود" }, { status: 400 });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((course.price * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }
    discount = Math.min(discount, course.price);

    const finalPrice = course.price - discount;

    return NextResponse.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      finalPrice,
      message:
        coupon.discountType === "percentage"
          ? `خصم ${coupon.discountValue}%`
          : `خصم ${(coupon.discountValue / 100).toLocaleString("ar-EG")} جنيه`,
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
