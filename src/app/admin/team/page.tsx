import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { TeamActions } from "./team-actions";
import { AddTeamMember } from "./add-member";
import { auth } from "@/auth";
import {
  IconShieldCheck,
  IconUser,
  IconMail,
  IconClock,
  IconCalendar,
  IconChalkboard,
} from "@tabler/icons-react";

export const revalidate = 30;

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function timeAgo(date: Date | null) {
  if (!date) return "لم يسجل دخول";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `من ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `من ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `من ${days} يوم`;
  return formatDate(date);
}

export default async function AdminTeamPage() {
  const session = await auth();
  const currentEmail = session?.user?.email?.toLowerCase();

  const team = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "INSTRUCTOR"] } },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      isBanned: true,
      createdAt: true,
      lastLoginAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });

  const admins = team.filter((m) => m.role === "ADMIN");
  const instructors = team.filter((m) => m.role === "INSTRUCTOR");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الفريق</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إدارة الأدمنز والمدرسين
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="soft">
            <IconShieldCheck className="h-3 w-3" />
            {admins.length} أدمن
          </Badge>
          <Badge variant="soft">
            <IconChalkboard className="h-3 w-3" />
            {instructors.length} مدرس
          </Badge>
        </div>
      </div>

      {/* إضافة عضو جديد */}
      <AddTeamMember />

      {/* الأدمنز */}
      {admins.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
            <IconShieldCheck className="h-4 w-4 text-brand-500" />
            الأدمنز
          </h2>
          <div className="space-y-3">
            {admins.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                currentEmail={currentEmail}
              />
            ))}
          </div>
        </div>
      )}

      {/* المدرسين */}
      {instructors.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
            <IconChalkboard className="h-4 w-4 text-brand-500" />
            المدرسين
          </h2>
          <div className="space-y-3">
            {instructors.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                currentEmail={currentEmail}
              />
            ))}
          </div>
        </div>
      )}

      {team.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <IconUser className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
          مفيش أعضاء في الفريق لسه
        </div>
      )}
    </div>
  );
}

function MemberCard({
  member,
  currentEmail,
}: {
  member: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    image: string | null;
    role: string;
    isBanned: boolean;
    createdAt: Date;
    lastLoginAt: Date | null;
  };
  currentEmail: string | undefined;
}) {
  const isCurrentUser = member.email.toLowerCase() === currentEmail;

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${
              member.role === "ADMIN"
                ? "bg-brand-100"
                : "bg-blue-100"
            }`}
          >
            {member.role === "ADMIN" ? (
              <IconShieldCheck className="h-5 w-5 text-brand-500" />
            ) : (
              <IconChalkboard className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground text-base">
                {member.name || "بدون اسم"}
              </h3>
              <Badge variant={member.role === "ADMIN" ? "default" : "outline"}>
                {member.role === "ADMIN" ? "أدمن" : "مدرس"}
              </Badge>
              {isCurrentUser && (
                <Badge variant="soft">أنت</Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <IconMail className="h-3.5 w-3.5" />
                <span dir="ltr" className="truncate max-w-[200px]">
                  {member.email}
                </span>
              </span>
            </div>
          </div>
        </div>

        {!isCurrentUser && (
          <TeamActions
            memberId={member.id}
            memberName={member.name || "عضو"}
            currentRole={member.role}
          />
        )}
      </div>

      {/* تفاصيل */}
      <div className="grid grid-cols-2 gap-px bg-border mx-5 rounded-lg overflow-hidden mb-4">
        <div className="bg-background p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <IconCalendar className="h-3.5 w-3.5" />
            <span className="font-medium text-sm text-foreground">
              {formatDate(member.createdAt)}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">تاريخ الانضمام</p>
        </div>
        <div className="bg-background p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <IconClock className="h-3.5 w-3.5" />
            <span className="font-medium text-sm text-foreground">
              {timeAgo(member.lastLoginAt)}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">آخر دخول</p>
        </div>
      </div>
    </div>
  );
}
