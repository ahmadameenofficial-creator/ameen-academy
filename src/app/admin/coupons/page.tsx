import { prisma } from "@/lib/prisma";
import { CouponManager } from "./coupon-manager";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: { select: { title: true } } },
  });

  const courses = await prisma.course.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">أكواد الخصم</h1>
        <p className="text-muted-foreground mt-1">إدارة كوبونات وأكواد الخصم</p>
      </div>

      <CouponManager
        initialCoupons={coupons.map((c) => ({
          ...c,
          expiresAt: c.expiresAt?.toISOString() || null,
          createdAt: c.createdAt.toISOString(),
          courseName: c.course?.title || null,
        }))}
        courses={courses}
      />
    </div>
  );
}
