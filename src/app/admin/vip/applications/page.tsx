import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  IconArrowRight,
  IconClock,
  IconCheck,
  IconX,
  IconUser,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
import { ApplicationActions } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_TABS = [
  { value: "PENDING" as const, label: "منتظرين", color: "bg-amber-100 text-amber-700" },
  { value: "APPROVED" as const, label: "مقبولين", color: "bg-blue-100 text-blue-700" },
  { value: "ENROLLED" as const, label: "دفعوا", color: "bg-emerald-100 text-emerald-700" },
  { value: "REJECTED" as const, label: "مرفوضين", color: "bg-red-100 text-red-700" },
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const activeStatus = (params.status as "PENDING" | "APPROVED" | "ENROLLED" | "REJECTED") || "PENDING";

  const applications = await prisma.vipApplication.findMany({
    where: { status: activeStatus },
    orderBy: { createdAt: "desc" },
  });

  const counts = await Promise.all(
    STATUS_TABS.map((tab) =>
      prisma.vipApplication.count({ where: { status: tab.value } }).then((c) => ({ ...tab, count: c })),
    ),
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" />
          VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">طلبات الانضمام</span>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-black">طلبات الانضمام</h1>
        <p className="text-sm text-muted-foreground mt-1">راجع كل طلب بدقة — اللي بتقبله بياخد لينك الدفع.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {counts.map((tab) => {
          const isActive = activeStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/admin/vip/applications?status=${tab.value}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-background/20" : tab.color
              }`}>
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">مفيش طلبات في الحالة دي.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-background border border-border rounded-2xl p-5 md:p-6">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4 pb-4 border-b border-border">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <IconUser className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{app.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                      <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-foreground">
                        <IconMail className="h-3 w-3" />
                        {app.email}
                      </a>
                      <a
                        href={`https://wa.me/${app.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-emerald-600"
                      >
                        <IconBrandWhatsapp className="h-3 w-3" />
                        {app.phone}
                      </a>
                      <span className="flex items-center gap-1">
                        <IconClock className="h-3 w-3" />
                        {formatDate(app.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Answers */}
              <div className="space-y-3 mb-5">
                <Field label="مستوى الخبرة" value={app.experience} />
                <Field label="بيشتغل دلوقتي" value={app.currentWork} />
                <Field label="هدفه من الـ VIP" value={app.goal} />
              </div>

              {/* Review Notes (لو في) */}
              {app.reviewNotes && (
                <div className="bg-muted/50 border border-border rounded-xl p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">ملاحظات المراجعة:</p>
                  <p className="text-sm">{app.reviewNotes}</p>
                </div>
              )}

              {/* Status Badge */}
              {app.status !== "PENDING" && (
                <div className="mb-4">
                  {app.status === "APPROVED" && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <IconCheck className="h-3.5 w-3.5" /> مقبول — منتظر الدفع
                    </span>
                  )}
                  {app.status === "ENROLLED" && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <IconCheck className="h-3.5 w-3.5" /> دفع وانضم
                    </span>
                  )}
                  {app.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      <IconX className="h-3.5 w-3.5" /> مرفوض
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <ApplicationActions
                applicationId={app.id}
                status={app.status}
                applicantName={app.name}
                applicantEmail={app.email}
                applicantPhone={app.phone}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}
