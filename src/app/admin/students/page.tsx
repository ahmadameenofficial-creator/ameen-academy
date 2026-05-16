import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export const revalidate = 30;
import {
  IconUser,
  IconMail,
  IconPhone,
  IconBook,
  IconBan,
  IconCalendar,
  IconClock,
  IconCreditCard,
  IconMessage,
  IconCertificate,
  IconSearch,
} from "@tabler/icons-react";
import { StudentActions } from "./student-actions";

async function getStudents() {
  return prisma.user.findMany({
    where: { role: "STUDENT" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      bio: true,
      isBanned: true,
      bannedReason: true,
      createdAt: true,
      lastLoginAt: true,
      _count: {
        select: {
          enrollments: true,
          payments: true,
          posts: { where: { isDeleted: false } },
          certificates: true,
          blogComments: true,
        },
      },
      payments: {
        where: { status: "PAID" },
        select: { amount: true },
      },
      enrollments: {
        select: {
          course: { select: { title: true } },
          completedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function formatMoney(amountInPiasters: number) {
  return `${(amountInPiasters / 100).toLocaleString("ar-EG")} ج.م`;
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

export default async function AdminStudentsPage() {
  const students = await getStudents();

  const bannedCount = students.filter((s) => s.isBanned).length;
  const totalRevenue = students.reduce(
    (sum, s) => sum + s.payments.reduce((ps, p) => ps + p.amount, 0),
    0
  );
  const totalEnrolled = students.reduce((sum, s) => sum + s._count.enrollments, 0);

  return (
    <div className="space-y-6">
      {/* Header + Stats */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">الطلاب</h1>
          <div className="flex items-center gap-2">
            <Badge variant="soft">{students.length} طالب</Badge>
            <Badge variant="soft">{totalEnrolled} اشتراك</Badge>
            {bannedCount > 0 && (
              <Badge variant="danger">{bannedCount} محظور</Badge>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{students.length}</p>
            <p className="text-xs text-muted-foreground mt-1">إجمالي الطلاب</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">{totalEnrolled}</p>
            <p className="text-xs text-muted-foreground mt-1">إجمالي الاشتراكات</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{formatMoney(totalRevenue)}</p>
            <p className="text-xs text-muted-foreground mt-1">إجمالي الإيرادات</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {students.reduce((sum, s) => sum + s._count.certificates, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">شهادات صادرة</p>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <IconSearch className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
          مفيش طلاب مسجلين لسه
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((student) => {
            const totalPaid = student.payments.reduce((s, p) => s + p.amount, 0);
            const completedCourses = student.enrollments.filter((e) => e.completedAt).length;

            return (
              <div
                key={student.id}
                className={`rounded-xl border bg-background overflow-hidden ${
                  student.isBanned ? "border-red-200 bg-red-50/30" : "border-border"
                }`}
              >
                {/* Top row: name + actions */}
                <div className="flex items-start justify-between gap-4 p-5 pb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                      <IconUser className="h-5 w-5 text-brand-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground text-base">
                          {student.name || "بدون اسم"}
                        </h3>
                        {student.isBanned && (
                          <Badge variant="danger">
                            <IconBan className="h-3 w-3" />
                            محظور
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <IconMail className="h-3.5 w-3.5" />
                          <span dir="ltr" className="truncate max-w-[200px]">{student.email}</span>
                        </span>
                        {student.phone && (
                          <span className="flex items-center gap-1">
                            <IconPhone className="h-3.5 w-3.5" />
                            <span dir="ltr">{student.phone}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <StudentActions
                    studentId={student.id}
                    studentName={student.name || "طالب"}
                    isBanned={student.isBanned}
                  />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-border mx-5 rounded-lg overflow-hidden mb-4">
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-brand-600">
                      <IconBook className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{student._count.enrollments}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">كورسات</p>
                  </div>
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      <IconCreditCard className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{totalPaid > 0 ? formatMoney(totalPaid) : "0"}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">مدفوع</p>
                  </div>
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground">
                      <IconCertificate className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{student._count.certificates}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">شهادات</p>
                  </div>
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground">
                      <IconMessage className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{student._count.posts + student._count.blogComments}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">تفاعلات</p>
                  </div>
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground">
                      <IconCalendar className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{formatDate(student.createdAt)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">انضم</p>
                  </div>
                  <div className="bg-background p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground">
                      <IconClock className="h-3.5 w-3.5" />
                      <span className="font-bold text-sm">{timeAgo(student.lastLoginAt)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">آخر دخول</p>
                  </div>
                </div>

                {/* Enrolled courses */}
                {student.enrollments.length > 0 && (
                  <div className="px-5 pb-4">
                    <p className="text-xs text-muted-foreground mb-2">الكورسات المشترك فيها:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.enrollments.map((e, i) => (
                        <Badge
                          key={i}
                          variant={e.completedAt ? "default" : "outline"}
                          className="text-xs"
                        >
                          {e.completedAt && <IconCertificate className="h-3 w-3 ml-1" />}
                          {e.course.title.length > 30
                            ? e.course.title.slice(0, 30) + "..."
                            : e.course.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ban reason */}
                {student.isBanned && student.bannedReason && (
                  <div className="px-5 pb-4">
                    <p className="text-xs text-red-600">
                      سبب الحظر: {student.bannedReason}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
