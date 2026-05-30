import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconArrowRight, IconFolder, IconDownload } from "@tabler/icons-react";
import { SimpleCreateButton } from "../_components/simple-create-button";
import { SimpleDeleteButton } from "../_components/simple-delete-button";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await prisma.vipResource.findMany({
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin/vip" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
          <IconArrowRight className="h-4 w-4" /> VIP
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">المكتبة</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">المكتبة</h1>
          <p className="text-sm text-muted-foreground mt-1">موارد متاحة للأعضاء — Mockups, fonts, contracts.</p>
        </div>
        <SimpleCreateButton
          endpoint="/api/admin/vip/resources"
          buttonLabel="مورد جديد"
          modalTitle="مورد جديد"
          fields={[
            { name: "title", label: "اسم المورد", type: "text", required: true },
            { name: "description", label: "وصف مختصر (اختياري)", type: "textarea", rows: 2 },
            { name: "category", label: "التصنيف", type: "text", required: true, placeholder: "mockups / fonts / contracts / scripts" },
            { name: "fileUrl", label: "رابط الملف", type: "url", required: true, placeholder: "https://..." },
            { name: "thumbnailUrl", label: "صورة العرض (اختياري)", type: "url" },
          ]}
        />
      </div>

      {resources.length === 0 ? (
        <div className="bg-background border border-border rounded-2xl p-12 text-center">
          <IconFolder className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">المكتبة فاضية. ابدأ بـ 5 mockups + 10 fonts + contract template.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {resources.map((res) => (
            <div key={res.id} className="bg-background border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{res.category}</span>
                <SimpleDeleteButton endpoint={`/api/admin/vip/resources/${res.id}`} />
              </div>
              <h3 className="font-bold text-sm mb-1 line-clamp-1">{res.title}</h3>
              {res.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{res.description}</p>
              )}
              <div className="flex items-center justify-between text-xs">
                <a href={res.fileUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline flex items-center gap-1">
                  <IconDownload className="h-3 w-3" />
                  رابط الملف
                </a>
                <span className="text-muted-foreground">{res.downloadCount} تحميل</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
