import { offlineService } from "@/lib/services";
import { IconSchool } from "@tabler/icons-react";
import { OfflineOverview } from "@/components/admin/offline/overview";

export const revalidate = 0;

export const metadata = {
  title: "الأوفلاين — لوحة التحكم",
};

export default async function AdminOfflinePage() {
  const data = await offlineService.getOverview();

  // تحويل التواريخ لنصوص عشان الـ client component
  const dueStudents = data.dueStudents.map((s) => ({
    ...s,
    nextDueDate: s.nextDueDate!.toISOString(),
  }));
  const pendingStudents = data.pendingStudents.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <IconSchool className="h-6 w-6 text-brand-500" />
        <h1 className="text-2xl font-bold text-foreground">الأوفلاين</h1>
      </div>

      <OfflineOverview
        groups={data.groups}
        totals={data.totals}
        dueStudents={dueStudents}
        riskStudents={data.riskStudents}
        pendingStudents={pendingStudents}
      />
    </div>
  );
}
