import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSignedEmbedUrl } from "@/lib/bunny";

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
  const userId = session.user.id;

  // بنحمّل بيانات الدرس + التقدّم بالتوازي
  const [course, lesson, progress] = await Promise.all([
    prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        modules: {
          orderBy: { order: "asc" },
          select: {
            lessons: {
              orderBy: { order: "asc" },
              select: { id: true, title: true },
            },
          },
        },
      },
    }),
    prisma.lesson.findUnique({
      where: { id: lessonId },
    }),
    prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    }),
  ]);

  if (!course) notFound();
  if (!lesson || lesson.courseId !== course.id) notFound();

  // حساب الدرس اللي قبل واللي بعد
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex flex-col">
      {/* الفيديو */}
      <VideoPlayer
        lessonId={lesson.id}
        videoId={lesson.videoId}
        signedEmbedUrl={
          lesson.videoId
            ? getSignedEmbedUrl(lesson.videoId, {
                expiresInSeconds: 7200,
                watermarkText: session.user.name || session.user.email || "",
              })
            : null
        }
        lastPosition={progress?.lastPosition || 0}
        isCompleted={progress?.isCompleted || false}
        userName={session.user.name || ""}
      />

      {/* معلومات الدرس + التنقل */}
      <div className="p-4 md:p-6 pb-20 lg:pb-6 space-y-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{lesson.description}</p>
          )}
        </div>

        <LessonNav
          slug={slug}
          lessonId={lessonId}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          isCompleted={progress?.isCompleted || false}
        />
      </div>
    </div>
  );
}
