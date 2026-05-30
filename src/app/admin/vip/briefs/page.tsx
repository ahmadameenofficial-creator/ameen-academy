import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconArrowRight, IconBolt, IconClock, IconTrash } from "@tabler/icons-react";
import { SimpleCreateButton } from "../_components/simple-create-button";
import { SimpleDeleteButton } from "../_components/simple-delete-button";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export default async function BriefsPage() {
  const briefs = await prisma.vipBrief.findMany({
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" /> VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">الـ Briefs</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Briefs</h1>
          <p className="text-sm text-muted-foreground mt-1">Brief واحد كل شهر — يتعرض على الـ Dashboard للأعضاء.</p>
        </div>
        <SimpleCreateButton
          endpoint="/api/admin/vip/briefs"
          buttonLabel="Brief جديد"
          modalTitle="Brief جديد"
          fields={[
            { name: "title", label: "العنوان", type: "text", required: true },
            { name: "description", label: "الوصف المختصر", type: "textarea", required: true, rows: 2 },
            { name: "clientStyle", label: "الـ Brief الكامل (بأسلوب client)", type: "textarea", required: true, rows: 6 },
            { name: "deliverables", label: "الـ Deliverables (إيه المطلوب تسليمه)", type: "textarea", required: true, rows: 3 },
            { name: "dueDate", label: "Deadline", type: "datetime-local", required: true },
          ]}
        />
      </div>

      {briefs.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <IconBolt className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">لسه مفيش Briefs. اعمل أول واحد عشان الأعضاء يبدأوا يشتغلوا.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {briefs.map((brief) => {
            const isActive = brief.dueDate > new Date();
            return (
              <div key={brief.id} className="bg-background border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {isActive ? "نشط" : "منتهي"}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{brief.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{brief.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <IconClock className="h-3 w-3" />
                      Deadline: {formatDate(brief.dueDate)} · نُشر: {formatDate(brief.publishedAt)}
                    </p>
                  </div>
                  <SimpleDeleteButton endpoint={`/api/admin/vip/briefs/${brief.id}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
