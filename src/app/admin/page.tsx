import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { IconBook, IconUsers, IconCreditCard, IconStar } from "@tabler/icons-react";
import { formatPrice } from "@/lib/format";

async function getStats() {
  const [courses, students, payments, ratings] = await Promise.all([
    prisma.course.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
    prisma.rating.aggregate({ _avg: { rating: true } }),
  ]);

  return {
    courses,
    students,
    revenue: payments._sum.amount || 0,
    avgRating: ratings._avg.rating || 0,
  };
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    { label: "الكورسات", value: stats.courses, icon: IconBook },
    { label: "الطلاب", value: stats.students, icon: IconUsers },
    { label: "الإيرادات", value: formatPrice(stats.revenue), icon: IconCreditCard },
    { label: "متوسط التقييم", value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—", icon: IconStar },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <card.icon className="h-5 w-5 text-brand-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
