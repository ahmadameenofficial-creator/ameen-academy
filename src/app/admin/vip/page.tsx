import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  IconUserPlus,
  IconUsers,
  IconCalendarEvent,
  IconBriefcase,
  IconBolt,
  IconFolder,
  IconArrowLeft,
  IconCircleDot,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function VipAdminPage() {
  const [
    pendingApps,
    approvedApps,
    activeMembers,
    upcomingLives,
    activeJobs,
    recentBriefs,
  ] = await Promise.all([
    prisma.vipApplication.count({ where: { status: "PENDING" } }),
    prisma.vipApplication.count({ where: { status: "APPROVED" } }),
    prisma.vipMembership.count({ where: { status: "ACTIVE" } }),
    prisma.vipLive.count({ where: { scheduledAt: { gte: new Date() } } }),
    prisma.vipJob.count({ where: { expiresAt: { gte: new Date() }, filledAt: null } }),
    prisma.vipBrief.count({ where: { dueDate: { gte: new Date() } } }),
  ]);

  const totalRevenue = await prisma.vipMembership.aggregate({
    where: { status: "ACTIVE" },
    _sum: { totalPaid: true },
  });

  const sections = [
    {
      href: "/admin/vip/applications",
      title: "طلبات الانضمام",
      desc: "راجع، اقبل، أو ارفض الطلبات",
      icon: IconUserPlus,
      badge: pendingApps > 0 ? pendingApps : undefined,
      badgeText: pendingApps > 0 ? `${pendingApps} منتظرين الرد` : undefined,
      highlight: pendingApps > 0,
    },
    {
      href: "/admin/vip/members",
      title: "الأعضاء النشطين",
      desc: "كل اللي مشتركين دلوقتي + الـ Hot Seat queue",
      icon: IconUsers,
      badge: activeMembers,
      badgeText: `${activeMembers} / 30`,
    },
    {
      href: "/admin/vip/lives",
      title: "اللايفات",
      desc: "جدول الـ lives القادمة + التسجيلات",
      icon: IconCalendarEvent,
      badge: upcomingLives,
      badgeText: `${upcomingLives} جاي`,
    },
    {
      href: "/admin/vip/briefs",
      title: "الـ Briefs",
      desc: "Briefs المنشورة + إنشاء واحد جديد",
      icon: IconBolt,
      badge: recentBriefs,
      badgeText: `${recentBriefs} نشط`,
    },
    {
      href: "/admin/vip/jobs",
      title: "Job Board",
      desc: "الشغلانات المعروضة دلوقتي",
      icon: IconBriefcase,
      badge: activeJobs,
      badgeText: `${activeJobs} متاح`,
    },
    {
      href: "/admin/vip/resources",
      title: "المكتبة",
      desc: "Mockups, fonts, contracts, scripts",
      icon: IconFolder,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">VIP Community</h1>
          <p className="text-sm text-muted-foreground mt-1">إدارة الـ Inner Circle</p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="الطلبات الجديدة" value={pendingApps} highlight={pendingApps > 0} />
        <StatCard label="مقبولين بانتظار الدفع" value={approvedApps} />
        <StatCard label="أعضاء نشطين" value={`${activeMembers}/30`} />
        <StatCard
          label="إجمالي المدفوع"
          value={`${((totalRevenue._sum.totalPaid || 0) / 100).toLocaleString("ar-EG")} ج`}
        />
      </div>

      {/* Sections Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`group bg-background border rounded-2xl p-5 hover:shadow-md transition-all ${
              s.highlight ? "border-brand-300 ring-2 ring-brand-100" : "border-border hover:border-brand-200"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                <s.icon className="h-5 w-5 text-brand-600" />
              </div>
              {s.badgeText && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  s.highlight
                    ? "bg-brand-500 text-white animate-pulse"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {s.badgeText}
                </span>
              )}
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
            <span className="text-xs text-brand-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              فتح
              <IconArrowLeft className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      {pendingApps > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
          <IconCircleDot className="h-5 w-5 text-amber-600 shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="font-bold text-amber-900">في {pendingApps} طلب منتظرين الرد</p>
            <p className="text-xs text-amber-700">حاول ترد على الطلبات خلال 48 ساعة من الإيداع.</p>
          </div>
          <Link
            href="/admin/vip/applications"
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            راجعها
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`bg-background border rounded-2xl p-4 ${highlight ? "border-brand-300" : "border-border"}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-black ${highlight ? "text-brand-600" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
