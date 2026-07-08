import { notFound } from "next/navigation";
import Link from "next/link";
import { offlineService } from "@/lib/services";
import { IconChevronRight } from "@tabler/icons-react";
import { GroupDetail } from "@/components/admin/offline/group-detail";

export const revalidate = 0;

export const metadata = {
  title: "تفاصيل الجروب — لوحة التحكم",
};

export default async function AdminOfflineGroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const data = await offlineService.getGroupDetail(groupId);
  if (!data) notFound();

  // تحويل التواريخ لنصوص عشان الـ client component
  const group = {
    id: data.group.id,
    name: data.group.name,
    dayOfWeek: data.group.dayOfWeek,
    price: data.group.price,
    expenses: data.group.expenses,
    notes: data.group.notes,
    isActive: data.group.isActive,
    sessionCode: data.group.sessionCode,
    sessionCodeDate: data.group.sessionCodeDate?.toISOString().slice(0, 10) ?? null,
    students: data.group.students.map((s) => ({
      id: s.id,
      fullName: s.fullName,
      email: s.email,
      whatsapp: s.whatsapp,
      guardianPhone: s.guardianPhone,
      age: s.age,
      address: s.address,
      agreedPrice: s.agreedPrice,
      isFree: s.isFree,
      nextDueDate: s.nextDueDate?.toISOString() ?? null,
      nextDueAmount: s.nextDueAmount,
      status: s.status,
      notes: s.notes,
      userId: s.userId,
      payments: s.payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        method: p.method,
        paidAt: p.paidAt.toISOString(),
        note: p.note,
      })),
      attendance: s.attendance.map((a) => ({
        date: a.date.toISOString().slice(0, 10),
        status: a.status,
        self: a.self,
        checkInAt: a.checkInAt?.toISOString() ?? null,
        checkOutAt: a.checkOutAt?.toISOString() ?? null,
      })),
    })),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/offline"
          className="text-muted-foreground hover:text-foreground"
        >
          <IconChevronRight className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">{group.name}</h1>
      </div>

      <GroupDetail group={group} sessionDates={data.sessionDates} />
    </div>
  );
}
