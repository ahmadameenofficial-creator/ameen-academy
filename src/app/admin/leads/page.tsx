import { leadsDb } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconAddressBook, IconDownload, IconBrandWhatsapp, IconMail } from "@tabler/icons-react";

export const metadata = {
  title: "المهتمين بالكورس المجاني — لوحة التحكم",
};

export default async function AdminLeadsPage() {
  const leads = await leadsDb.findAllLeads();

  const withPhone = leads.filter((l) => l.phone).length;
  const withEmail = leads.filter((l) => l.email).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <IconAddressBook className="h-6 w-6 text-brand-500" />
          <h1 className="text-2xl font-bold text-foreground">المهتمين بالكورس المجاني</h1>
        </div>
        <a
          href="/api/admin/leads/export"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          <IconDownload className="h-4 w-4" />
          نزّل Excel / Google Sheets
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-lg">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">إجمالي</p>
          <p className="text-2xl font-bold text-foreground">{leads.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">واتساب</p>
          <p className="text-2xl font-bold text-green-600">{withPhone}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">إيميل</p>
          <p className="text-2xl font-bold text-brand-600">{withEmail}</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {leads.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            لسه مفيش حد سجّل اهتمام
          </p>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{l.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {l.phone && (
                      <a
                        href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-600 hover:underline"
                        dir="ltr"
                      >
                        <IconBrandWhatsapp className="size-3.5" />
                        {l.phone}
                      </a>
                    )}
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="flex items-center gap-1 hover:underline"
                        dir="ltr"
                      >
                        <IconMail className="size-3.5" />
                        {l.email}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="soft">{l.source}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(l.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
