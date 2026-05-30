import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconArrowRight, IconBriefcase, IconClock } from "@tabler/icons-react";
import { SimpleCreateButton } from "../_components/simple-create-button";
import { SimpleDeleteButton } from "../_components/simple-delete-button";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short" }).format(date);
}

export default async function JobsPage() {
  const jobs = await prisma.vipJob.findMany({
    orderBy: { postedAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" /> VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">Job Board</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Job Board</h1>
          <p className="text-sm text-muted-foreground mt-1">شغلانات حقيقية بترميها للأعضاء.</p>
        </div>
        <SimpleCreateButton
          endpoint="/api/admin/vip/jobs"
          buttonLabel="شغلانة جديدة"
          modalTitle="شغلانة جديدة"
          fields={[
            { name: "title", label: "اسم الشغلانة", type: "text", required: true, placeholder: "مثلاً: Brand Identity لمطعم بيرجر" },
            { name: "description", label: "التفاصيل", type: "textarea", required: true, rows: 4, hint: "ايه الشغل المطلوب، من العميل، التايملاين" },
            { name: "budget", label: "الميزانية", type: "text", required: true, placeholder: "مثلاً: 3,000 - 5,000 ج" },
            { name: "type", label: "نوع الشغلانة", type: "text", required: true, placeholder: "freelance / project / contract" },
            { name: "clientInfo", label: "معلومات العميل (اختياري)", type: "text" },
            { name: "contactInfo", label: "إزاي يتواصلوا", type: "text", required: true, placeholder: "كلّمني واتس / إيميل / WhatsApp link" },
            { name: "expiresAt", label: "آخر معاد للتقديم", type: "datetime-local", required: true },
          ]}
        />
      </div>

      {jobs.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <IconBriefcase className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">مفيش شغلانات. لما تجيلك شغلانة مش هتاخدها، ارميها هنا.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const isActive = job.expiresAt > new Date() && !job.filledAt;
            return (
              <div key={job.id} className="bg-background border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {isActive ? "متاح" : (job.filledAt ? "اتاخدت" : "منتهي")}
                      </span>
                      <span className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-full">
                        {job.type}
                      </span>
                      <span className="text-sm font-bold text-emerald-600">{job.budget}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{job.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <IconClock className="h-3 w-3" />
                      ينتهي: {formatDate(job.expiresAt)}
                    </p>
                  </div>
                  <SimpleDeleteButton endpoint={`/api/admin/vip/jobs/${job.id}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
