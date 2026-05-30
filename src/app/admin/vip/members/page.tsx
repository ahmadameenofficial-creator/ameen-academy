import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  IconArrowRight,
  IconCrown,
  IconBolt,
  IconClock,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

const PLAN_LABELS = {
  MONTHLY: { label: "شهري", color: "bg-blue-100 text-blue-700" },
  QUARTERLY: { label: "ربع سنوي", color: "bg-purple-100 text-purple-700" },
  ANNUAL: { label: "سنوي", color: "bg-amber-100 text-amber-700" },
};

export default async function MembersPage() {
  const members = await prisma.vipMembership.findMany({
    where: { status: "ACTIVE" },
    orderBy: { hotSeatOrder: "asc" },
  });

  // نجيب اليوزرز يدوي عشان prisma include بـ relation محتاج relation field
  const userIds = members.map((m) => m.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true, image: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  const totalRevenue = members.reduce((sum, m) => sum + m.totalPaid, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" />
          VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">الأعضاء</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">الأعضاء النشطين</h1>
          <p className="text-sm text-muted-foreground mt-1">{members.length} عضو من 30 — قائمة الـ Hot Seat بترتيب الأقدمية.</p>
        </div>
        <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 text-sm">
          <p className="text-xs text-muted-foreground">الإيراد التراكمي</p>
          <p className="font-black text-brand-700">{(totalRevenue / 100).toLocaleString("ar-EG")} ج</p>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">لسه مفيش أعضاء.</p>
          <Link href="/admin/vip/applications" className="inline-block mt-3 text-brand-600 text-sm hover:underline">
            راجع طلبات الانضمام
          </Link>
        </div>
      ) : (
        <div className="bg-background border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground">
                <tr>
                  <th className="text-right p-4">العضو</th>
                  <th className="text-right p-4">الخطة</th>
                  <th className="text-right p-4">Hot Seat #</th>
                  <th className="text-right p-4">عدد Hot Seats</th>
                  <th className="text-right p-4">يجدد في</th>
                  <th className="text-right p-4">المدفوع</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const user = userMap.get(m.userId);
                  const plan = PLAN_LABELS[m.plan];
                  return (
                    <tr key={m.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                            <IconCrown className="h-4 w-4 text-brand-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user?.name || "—"}</p>
                            <p className="text-xs text-muted-foreground">{user?.email || "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${plan.color}`}>
                          {plan.label}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-muted-foreground">#{m.hotSeatOrder}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs">
                          <IconBolt className="h-3 w-3 text-amber-500" />
                          {m.hadHotSeats}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <IconClock className="h-3 w-3" />
                          {formatDate(m.currentPeriodEnd)}
                        </span>
                      </td>
                      <td className="p-4 font-bold">
                        {(m.totalPaid / 100).toLocaleString("ar-EG")} ج
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
