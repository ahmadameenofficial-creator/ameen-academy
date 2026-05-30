import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  IconCalendarEvent,
  IconBriefcase,
  IconFolder,
  IconBolt,
  IconMessages,
  IconStar,
  IconArrowLeft,
  IconBrandWhatsapp,
  IconBrandDiscord,
  IconClock,
  IconCheck,
  IconCrown,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

function daysUntil(date: Date): { days: number; hours: number; isPast: boolean } {
  const diff = date.getTime() - Date.now();
  const isPast = diff < 0;
  const absDiff = Math.abs(diff);
  return {
    days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    isPast,
  };
}

function formatArabicDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function VipDashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [membership, upcomingLives, currentBrief, recentJobs, resources, pastLives] = await Promise.all([
    prisma.vipMembership.findUnique({ where: { userId } }),
    prisma.vipLive.findMany({
      where: {
        scheduledAt: { gte: new Date() },
        status: { in: ["SCHEDULED", "LIVE"] },
      },
      orderBy: { scheduledAt: "asc" },
      take: 3,
    }),
    prisma.vipBrief.findFirst({
      where: { dueDate: { gte: new Date() } },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.vipJob.findMany({
      where: { expiresAt: { gte: new Date() }, filledAt: null },
      orderBy: { postedAt: "desc" },
      take: 4,
    }),
    prisma.vipResource.findMany({
      orderBy: { publishedAt: "desc" },
      take: 6,
    }),
    prisma.vipLive.findMany({
      where: {
        status: "RECORDED",
        recordingUrl: { not: null },
      },
      orderBy: { scheduledAt: "desc" },
      take: 3,
    }),
  ]);

  const nextLive = upcomingLives[0];
  const countdown = nextLive ? daysUntil(nextLive.scheduledAt) : null;

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white min-h-screen -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 pt-4 md:pt-6 pb-12" dir="rtl">
      {/* ============ HERO ============ */}
      <div className="relative max-w-7xl mx-auto pt-8 md:pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(160,2,255,0.15),transparent_50%)] -z-10" />

        <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500/20 to-brand-700/20 border border-brand-500/30 rounded-full px-3 py-1 mb-3">
              <IconCrown className="h-3.5 w-3.5 text-brand-300" />
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">VIP Member</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-1">
              أهلاً، <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">{session!.user.name?.split(" ")[0]}</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base">
              {membership?.plan === "ANNUAL" ? "عضوية سنوية" : membership?.plan === "QUARTERLY" ? "عضوية ربع سنوية" : "عضوية شهرية"}
              {" • "}
              مشترك من {new Intl.DateTimeFormat("ar-EG", { month: "long", year: "numeric" }).format(membership!.startedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* ============ NEXT LIVE COUNTDOWN ============ */}
        {nextLive && countdown && !countdown.isPast && (
          <div className="relative bg-gradient-to-br from-brand-900/40 via-brand-950/40 to-zinc-900 border border-brand-500/30 rounded-3xl p-6 md:p-10 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-brand-300 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                  اللايف الجاي
                </p>
                <h2 className="text-2xl md:text-4xl font-black mb-3 leading-tight">{nextLive.title}</h2>
                <p className="text-white/60 mb-5">{formatArabicDate(nextLive.scheduledAt)}</p>
                {nextLive.hotSeatUserId === userId && (
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-3 py-1.5 mb-4">
                    <IconBolt className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">دورك في الـ Hot Seat!</span>
                  </div>
                )}
                {nextLive.meetingUrl && (
                  <a
                    href={nextLive.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-br from-brand-500 to-brand-700 hover:from-brand-400 hover:to-brand-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
                  >
                    لينك الـ Live
                    <IconArrowLeft className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <CountdownCard label="يوم" value={countdown.days} />
                <CountdownCard label="ساعة" value={countdown.hours} />
              </div>
            </div>
          </div>
        )}

        {/* ============ ROW 1: BRIEF + JOBS ============ */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Brief الشهر */}
          <Card icon={IconBriefcase} title="Brief الشهر" className="lg:col-span-2">
            {currentBrief ? (
              <div>
                <h3 className="text-xl font-bold mb-2">{currentBrief.title}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-3">{currentBrief.description}</p>
                <div className="flex items-center gap-4 text-xs mb-5">
                  <span className="flex items-center gap-1.5 text-white/50">
                    <IconClock className="h-3.5 w-3.5" />
                    Deadline: {formatArabicDate(currentBrief.dueDate)}
                  </span>
                </div>
                <Link
                  href={`/dashboard/vip/brief/${currentBrief.id}`}
                  className="inline-flex items-center gap-1.5 text-brand-300 hover:text-brand-200 text-sm font-medium"
                >
                  افتح الـ Brief
                  <IconArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <EmptyState text="مفيش Brief نشط دلوقتي" />
            )}
          </Card>

          {/* Hot Seat Status */}
          <Card icon={IconBolt} title="Hot Seat بتاعك">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/60">عدد المرات</span>
                <span className="font-bold text-white">{membership?.hadHotSeats || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">دورك في القائمة</span>
                <span className="font-bold text-brand-300">#{membership?.hotSeatOrder || "-"}</span>
              </div>
              <p className="text-xs text-white/40 pt-3 border-t border-white/10">
                دورك بييجي تقريباً كل 3 شهور (مرة كل 6-8 لايفات).
              </p>
            </div>
          </Card>
        </div>

        {/* ============ ROW 2: JOB BOARD ============ */}
        <Card icon={IconBriefcase} title="Job Board" linkText="كل الشغلانات" linkHref="/dashboard/vip/jobs">
          {recentJobs.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/vip/jobs/${job.id}`}
                  className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-white group-hover:text-brand-200 transition-colors line-clamp-1">{job.title}</h4>
                    <span className="shrink-0 text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2 py-0.5 rounded-full">{job.type}</span>
                  </div>
                  <p className="text-white/50 text-xs line-clamp-2 mb-3">{job.description}</p>
                  <p className="text-emerald-400 text-sm font-bold">{job.budget}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState text="مفيش شغلانات جديدة دلوقتي. شيك بكرة." />
          )}
        </Card>

        {/* ============ ROW 3: PAST LIVES + RESOURCES ============ */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Past Lives */}
          <Card icon={IconCalendarEvent} title="آخر اللايفات" linkText="كل التسجيلات" linkHref="/dashboard/vip/lives">
            {pastLives.length > 0 ? (
              <div className="space-y-3">
                {pastLives.map((live) => (
                  <Link
                    key={live.id}
                    href={`/dashboard/vip/lives/${live.id}`}
                    className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl p-3 transition-all"
                  >
                    <div className="shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/30 flex items-center justify-center">
                      <IconCalendarEvent className="h-5 w-5 text-brand-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm group-hover:text-brand-200 transition-colors truncate">{live.title}</p>
                      <p className="text-xs text-white/40">{formatArabicDate(live.scheduledAt)}</p>
                    </div>
                    <IconArrowLeft className="h-4 w-4 text-white/30 group-hover:text-brand-300 transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState text="مفيش تسجيلات بعد. أول لايف هييجي قريب." />
            )}
          </Card>

          {/* Resources */}
          <Card icon={IconFolder} title="المكتبة" linkText="كل الموارد" linkHref="/dashboard/vip/resources">
            {resources.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {resources.slice(0, 4).map((res) => (
                  <a
                    key={res.id}
                    href={res.fileUrl}
                    download
                    className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl p-3 transition-all"
                  >
                    <div className="h-20 bg-zinc-800 rounded-lg mb-2 flex items-center justify-center">
                      <IconFolder className="h-6 w-6 text-white/30" />
                    </div>
                    <p className="text-xs font-medium truncate group-hover:text-brand-200 transition-colors">{res.title}</p>
                    <p className="text-[10px] text-white/40">{res.category}</p>
                  </a>
                ))}
              </div>
            ) : (
              <EmptyState text="المكتبة بتتبني، الأولى قريب." />
            )}
          </Card>
        </div>

        {/* ============ COMMUNITY LINKS ============ */}
        <Card icon={IconMessages} title="المجتمع">
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="https://chat.whatsapp.com/INVITE_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-emerald-950/20 hover:bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-4 transition-all"
            >
              <div className="shrink-0 h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <IconBrandWhatsapp className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">جروب الواتساب</p>
                <p className="text-xs text-white/40">للنقاشات السريعة</p>
              </div>
              <IconArrowLeft className="h-4 w-4 text-emerald-400/60 group-hover:text-emerald-400 transition-colors" />
            </a>

            <a
              href="https://discord.gg/INVITE_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-indigo-950/20 hover:bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 transition-all"
            >
              <div className="shrink-0 h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <IconBrandDiscord className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">سيرفر الـ Discord</p>
                <p className="text-xs text-white/40">للنقاشات الطويلة + Voice</p>
              </div>
              <IconArrowLeft className="h-4 w-4 text-indigo-400/60 group-hover:text-indigo-400 transition-colors" />
            </a>
          </div>
        </Card>

        {/* ============ SUBSCRIPTION INFO ============ */}
        <Card icon={IconStar} title="اشتراكي">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-1">الخطة</p>
              <p className="font-bold">{membership?.plan === "ANNUAL" ? "سنوي" : membership?.plan === "QUARTERLY" ? "ربع سنوي" : "شهري"}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">يجدد في</p>
              <p className="font-bold">{formatArabicDate(membership!.currentPeriodEnd)}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">الحالة</p>
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <IconCheck className="h-4 w-4" />
                نشط
              </p>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <Link href="/dashboard/vip/billing" className="text-xs text-white/50 hover:text-white">
              إدارة الاشتراك أو إلغاؤه
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============ Helper Components ============

function Card({
  icon: Icon,
  title,
  children,
  linkText,
  linkHref,
  className = "",
}: {
  icon: typeof IconBolt;
  title: string;
  children: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  className?: string;
}) {
  return (
    <div className={`bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Icon className="h-4 w-4 text-brand-300" />
          </div>
          <h3 className="font-bold text-sm md:text-base text-white/90">{title}</h3>
        </div>
        {linkText && linkHref && (
          <Link href={linkHref} className="text-xs text-white/40 hover:text-brand-300 transition-colors flex items-center gap-1">
            {linkText}
            <IconArrowLeft className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function CountdownCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
      <p className="text-4xl md:text-6xl font-black bg-gradient-to-br from-brand-300 to-brand-500 bg-clip-text text-transparent">
        {value.toString().padStart(2, "0")}
      </p>
      <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-8 text-sm text-white/40">{text}</div>
  );
}
