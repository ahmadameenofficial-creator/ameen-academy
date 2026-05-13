import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconUser,
  IconMail,
  IconBook,
  IconBan,
  IconCalendar,
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
      isBanned: true,
      bannedReason: true,
      createdAt: true,
      lastLoginAt: true,
      _count: {
        select: {
          enrollments: true,
          payments: { where: { status: "PAID" } },
          posts: { where: { isDeleted: false } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminStudentsPage() {
  const students = await getStudents();

  const bannedCount = students.filter((s) => s.isBanned).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">الطلاب</h1>
        <div className="flex items-center gap-2">
          <Badge variant="soft">{students.length} طالب</Badge>
          {bannedCount > 0 && (
            <Badge variant="danger">{bannedCount} محظور</Badge>
          )}
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          مفيش طلاب مسجلين لسه
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <Card
              key={student.id}
              className={`p-4 ${student.isBanned ? "border-red-200 bg-red-50/30" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  {/* الاسم والحالة */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <IconUser className="h-4 w-4 text-brand-500" />
                    <span className="font-semibold text-foreground">
                      {student.name}
                    </span>
                    {student.isBanned && (
                      <Badge variant="danger">
                        <IconBan className="h-3 w-3" />
                        محظور
                      </Badge>
                    )}
                  </div>

                  {/* الإيميل والموبايل */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <IconMail className="h-3.5 w-3.5" />
                      <span dir="ltr">{student.email}</span>
                    </span>
                    {student.phone && (
                      <span dir="ltr">{student.phone}</span>
                    )}
                  </div>

                  {/* الإحصائيات */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <IconBook className="h-3.5 w-3.5" />
                      {student._count.enrollments} كورس
                    </span>
                    <span>
                      {student._count.payments} عملية دفع
                    </span>
                    <span>
                      {student._count.posts} منشور
                    </span>
                    <span className="flex items-center gap-1">
                      <IconCalendar className="h-3.5 w-3.5" />
                      انضم {new Date(student.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                    {student.lastLoginAt && (
                      <span>
                        آخر دخول: {new Date(student.lastLoginAt).toLocaleDateString("ar-EG")}
                      </span>
                    )}
                  </div>

                  {/* سبب الحظر */}
                  {student.isBanned && student.bannedReason && (
                    <p className="text-xs text-red-600">
                      سبب الحظر: {student.bannedReason}
                    </p>
                  )}
                </div>

                <StudentActions
                  studentId={student.id}
                  isBanned={student.isBanned}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
