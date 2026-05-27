import { leadsService } from "@/lib/services";
import { IconAddressBook } from "@tabler/icons-react";
import { LeadsCrm } from "@/components/admin/leads-crm";

export const revalidate = 30;

export const metadata = {
  title: "إدارة العملاء — لوحة التحكم",
};

export default async function AdminLeadsPage() {
  const [contacts, stats] = await Promise.all([
    leadsService.getCrmContacts(),
    leadsService.getCrmStats(),
  ]);

  // Serialize dates for the client component
  const serialized = contacts.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    lastLoginAt: c.lastLoginAt?.toISOString() ?? null,
    enrolledCourses: c.enrolledCourses.map((e) => ({
      ...e,
      completedAt: e.completedAt?.toISOString() ?? null,
    })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <IconAddressBook className="h-6 w-6 text-brand-500" />
        <h1 className="text-2xl font-bold text-foreground">إدارة العملاء</h1>
      </div>

      <LeadsCrm contacts={serialized} stats={stats} />
    </div>
  );
}
