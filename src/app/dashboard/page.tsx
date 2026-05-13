import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "لوحتي",
};
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDuration } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBook, IconClock, IconCheck, IconPlayerPlay } from "@tabler/icons-react";

async function getEnrolledCourses(userId: string) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          lessons: { select: { id: true } },
          _count: { select: { lessons: true } },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });
}

async function getProgress(userId: string) {
  return prisma.lessonProgress.findMany({
    where: { userId, isCompleted: true },
    select: { lessonId: true },
  });
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const [enrollments, completedLessons] = await Promise.all([
    getEnrolledCourses(session.user.id),
    getProgress(session.user.id),
  ]);

  const completedSet = new Set(completedLessons.map((l) => l.lessonId));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          أهلاً {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">كمّل من حيث ما وقفت</p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <IconBook className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground">
              لسه ما اشتركتش في أي كورس
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              اكتشف الكورسات المتاحة وابدأ رحلة التعلّم
            </p>
            <Button variant="gradient" asChild>
              <Link href="/courses">تصفّح الكورسات</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            const totalLessons = course._count.lessons;
            const completedCount = course.lessons.filter((l) =>
              completedSet.has(l.id)
            ).length;
            const progress =
              totalLessons > 0
                ? Math.round((completedCount / totalLessons) * 100)
                : 0;
            const isCompleted = progress === 100;

            return (
              <Card
                key={enrollment.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconBook className="h-3.5 w-3.5" />
                          {totalLessons} درس
                        </span>
                        {course.duration > 0 && (
                          <span className="flex items-center gap-1">
                            <IconClock className="h-3.5 w-3.5" />
                            {formatDuration(course.duration)}
                          </span>
                        )}
                      </div>
                    </div>
                    {isCompleted ? (
                      <Badge variant="success">
                        <IconCheck className="h-3 w-3" />
                        مكتمل
                      </Badge>
                    ) : (
                      <Badge variant="default">{progress}%</Badge>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {completedCount} من {totalLessons} درس
                    </span>
                    <Button variant="soft" size="sm" asChild>
                      <Link href={`/dashboard/courses/${course.slug}`}>
                        <IconPlayerPlay className="h-3.5 w-3.5" />
                        {progress > 0 ? "كمّل" : "ابدأ"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
