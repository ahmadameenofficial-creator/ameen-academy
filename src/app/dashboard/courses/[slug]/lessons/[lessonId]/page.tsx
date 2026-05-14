import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { VideoPlayer } from "./video-player";
import { LessonNav } from "./lesson-nav";

interface Props {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug, lessonId } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, order: true, duration: true },
          },
        },
      },
    },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  });
  if (!enrollment) redirect(`/courses/${slug}`);

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });
  if (!lesson || lesson.courseId !== course.id) notFound();

  const progress = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
  });

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const completedLessons = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, isCompleted: true },
    select: { lessonId: true },
  });
  const completedSet = new Set(completedLessons.map((l) => l.lessonId));

  return (
    <div className="space-y-0">
      {/* Video Player */}
      <VideoPlayer
        lessonId={lesson.id}
        videoId={lesson.videoId}
        lastPosition={progress?.lastPosition || 0}
        isCompleted={progress?.isCompleted || false}
        userName={session.user.name || ""}
      />

      {/* Lesson Info + Navigation */}
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-muted-foreground mt-2 leading-relaxed">{lesson.description}</p>
          )}
        </div>

        <LessonNav
          slug={slug}
          lessonId={lessonId}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          isCompleted={progress?.isCompleted || false}
        />

        {/* Sidebar: Course Content */}
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 font-medium text-sm text-foreground border-b border-border">
            محتوى الكورس
          </div>
          {course.modules.map((module) => (
            <div key={module.id}>
              <div className="px-4 py-2 bg-muted/30 text-xs font-medium text-muted-foreground border-b border-border">
                {module.title}
              </div>
              {module.lessons.map((l) => {
                const isCurrent = l.id === lessonId;
                const done = completedSet.has(l.id);
                return (
                  <a
                    key={l.id}
                    href={`/dashboard/courses/${slug}/lessons/${l.id}`}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm border-b border-border last:border-0 transition-colors ${
                      isCurrent
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <span className={done && !isCurrent ? "text-muted-foreground" : ""}>
                      {done && !isCurrent ? "✓ " : ""}
                      {l.title}
                    </span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
