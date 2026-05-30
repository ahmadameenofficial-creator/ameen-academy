import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconArrowRight, IconCalendarEvent, IconPlus, IconBolt, IconCircleDot } from "@tabler/icons-react";
import { CreateLiveButton } from "./create-button";
import { DeleteLiveButton } from "./delete-button";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

const STATUS_COLOR: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  LIVE: "bg-red-100 text-red-700 animate-pulse",
  RECORDED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

const STATUS_LABEL: Record<string, string> = {
  SCHEDULED: "مجدول",
  LIVE: "اونلاين",
  RECORDED: "مسجّل",
  CANCELLED: "ملغي",
};

export default async function LivesPage() {
  const lives = await prisma.vipLive.findMany({
    orderBy: { scheduledAt: "desc" },
    take: 30,
  });

  const members = await prisma.vipMembership.findMany({
    where: { status: "ACTIVE" },
    orderBy: { hotSeatOrder: "asc" },
    take: 10,
  });
  const userIds = members.map((m) => m.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u.name]));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" /> VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">اللايفات</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">جدول اللايفات</h1>
          <p className="text-sm text-muted-foreground mt-1">2 لايف شهرياً — كل واحد فيهم Hot Seat لعضو واحد.</p>
        </div>
        <CreateLiveButton members={members.map((m) => ({ userId: m.userId, name: userMap.get(m.userId) || "—" }))} />
      </div>

      {lives.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <IconCalendarEvent className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">لسه مفيش لايفات. اعمل أول واحد.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lives.map((live) => (
            <div key={live.id} className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLOR[live.status]}`}>
                      {STATUS_LABEL[live.status]}
                    </span>
                    {live.hotSeatUserId && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700 flex items-center gap-1">
                        <IconBolt className="h-3 w-3" />
                        Hot Seat: {userMap.get(live.hotSeatUserId) || "غير معروف"}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base mb-1">{live.title}</h3>
                  {live.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{live.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <IconCircleDot className="h-3 w-3" />
                    {formatDate(live.scheduledAt)} · {live.durationMins} دقيقة
                  </p>
                  {live.meetingUrl && (
                    <a href={live.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline mt-1 inline-block">
                      Meeting URL
                    </a>
                  )}
                </div>
                <DeleteLiveButton liveId={live.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
