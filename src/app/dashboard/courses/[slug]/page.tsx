import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { coursesDb } from "@/lib/db";
import { enrollmentsDb, progressDb } from "@/lib/db";

export const dynamic = "force-dynamic";
import { formatDuration } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconPlayerPlay,
  IconCheck,
  IconLock,
  IconChevronDown,
  IconArrowRight,
} from "@tabler/icons-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CourseContentPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug } = await params;

  const course = await coursesDb.findCourseWithModules(slug);
  if (!course) notFound();

  const [enrollment, progress] = await Promise.all([
    enrollmentsDb.findEnrollment(session.user.id, course.id),
    progressDb.findProgressForCourse(session.user.id, course.id),
  ]);
  if (!enrollment) redirect(`/courses/${slug}`);

  const completedSet = new Set(progress.filter((p) => p.isCompleted).map((p) => p.lessonId));

  const totalLessons = course._count.lessons;
  const completedCount = course.modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => completedSet.has(l.id)).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <IconArrowRight className="h-4 w-4" />
        رجوع للداشبورد
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground shrink-0">
            {completedCount}/{totalLessons} درس ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {course.modules.map((module) => {
          const moduleCompleted = module.lessons.filter((l) => completedSet.has(l.id)).length;
          const allDone = moduleCompleted === module.lessons.length && module.lessons.length > 0;

          return (
            <Card key={module.id} className="overflow-hidden">
              <details open>
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <IconChevronDown className="h-4 w-4 text-brand-500" />
                    <span className="font-medium text-foreground">{module.title}</span>
                    {allDone && (
                      <Badge variant="success">
                        <IconCheck className="h-3 w-3" /> مكتمل
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {moduleCompleted}/{module.lessons.length}
                  </span>
                </summary>

                <div className="border-t border-border divide-y divide-border">
                  {module.lessons.map((lesson) => {
                    const done = completedSet.has(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/dashboard/courses/${slug}/lessons/${lesson.id}`}
                        className="flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {done ? (
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                              <IconCheck className="h-3 w-3 text-green-600" />
                            </div>
                          ) : (
                            <IconPlayerPlay className="h-5 w-5 text-brand-500" />
                          )}
                          <span className={done ? "text-muted-foreground" : "text-foreground"}>
                            {lesson.title}
                          </span>
                        </div>
                        {lesson.duration > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(lesson.duration)}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
