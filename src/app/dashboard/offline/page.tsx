import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { IconSchool, IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { MyGroup } from "@/components/offline/my-group";

export const revalidate = 0;

export const metadata = {
  title: "مجموعتي — أكاديمية أمين",
};

export default async function DashboardOfflinePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const student = await prisma.offlineStudent.findUnique({
    where: { userId: session.user.id },
    include: {
      group: { select: { name: true, dayOfWeek: true } },
      payments: { orderBy: { paidAt: "desc" } },
      attendance: { orderBy: { date: "desc" } },
    },
  });

  if (!student) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-16">
        <IconSchool className="h-14 w-14 text-brand-300 mx-auto" />
        <h1 className="text-xl font-bold text-foreground">مش مشترك في مجموعة حضورية</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          لو انت مشترك فعلًا، اطلب من أحمد لينك ربط الحساب على واتساب.
          <br />
          ولو حابب تنضم لمجموعة، سجل من هنا:
        </p>
        <Link href="/offline/join">
          <Button variant="gradient">سجّل في مجموعة</Button>
        </Link>
      </div>
    );
  }

  // تحويل التواريخ لنصوص عشان الـ client component
  const data = {
    fullName: student.fullName,
    status: student.status,
    isFree: student.isFree,
    agreedPrice: student.agreedPrice,
    nextDueDate: student.nextDueDate?.toISOString() ?? null,
    nextDueAmount: student.nextDueAmount,
    group: student.group,
    payments: student.payments.map((p) => ({
      id: p.id,
      amount: p.amount,
      method: p.method,
      paidAt: p.paidAt.toISOString(),
    })),
    attendance: student.attendance.map((a) => ({
      date: a.date.toISOString().slice(0, 10),
      status: a.status,
      checkInAt: a.checkInAt?.toISOString() ?? null,
      checkOutAt: a.checkOutAt?.toISOString() ?? null,
    })),
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconSchool className="h-6 w-6 text-brand-500" />
          <h1 className="text-2xl font-bold text-foreground">مجموعتي</h1>
        </div>
        <a
          href="https://wa.me/201090912747"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <IconBrandWhatsapp className="h-4 w-4 text-green-600" />
          كلم أحمد
        </a>
      </div>

      <MyGroup student={data} />
    </div>
  );
}
