import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSignedEmbedUrl, getVideo } from "@/lib/bunny";

export const dynamic = "force-dynamic";

import { VideoPlayer } from "./video-player";
import { LessonNav } from "./lesson-nav";

interface Props {
  params: Promise<{ slug: string; lessonId: string }>;
}

// نتحقق من حالة الفيديو على Bunny قبل ما نعرضه
// عشان لو الرفع فشل بصمت، الطالب يشوف رسالة واضحة بدل 404
async function getVideoStatus(videoId: string): Promise<{
  exists: boolean;
  status: number;
  isReady: boolean;
  message?: string;
}> {
  try {
    const video = await getVideo(videoId);
    const status = video.status ?? -1;
    return {
      exists: true,
      status,
      isReady: status >= 3 && status <= 4, // Transcoding أو Finished
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // 404 = الفيديو مش موجود على Bunny — الرفع فشل بصمت
    if (msg.includes("404")) {
      return {
        exists: false,
        status: -1,
        isReady: false,
        message: "الفيديو مش موجود على Bunny — الرفع فشل",
      };
    }
    console.error("[Lesson] خطأ في جلب الفيديو من Bunny:", msg);
    return {
      exists: false,
      status: -1,
      isReady: false,
      message: "حصلت مشكلة في الاتصال بـ Bunny",
    };
  }
}

export default async function LessonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug, lessonId } = await params;
  const userId = session.user.id;

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
    prisma.lesson.findUnique({ where: { id: lessonId } }),
    prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    }),
  ]);

  if (!course) notFound();
  if (!lesson || lesson.courseId !== course.id) notFound();

  // نتحقق من حالة الفيديو على Bunny (لو في videoId)
  const videoStatus = lesson.videoId ? await getVideoStatus(lesson.videoId) : null;

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex flex-col">
      <VideoPlayer
        lessonId={lesson.id}
        videoId={lesson.videoId}
        signedEmbedUrl={
          lesson.videoId && videoStatus?.isReady
            ? getSignedEmbedUrl(lesson.videoId, {
                expiresInSeconds: 7200,
                watermarkText: session.user.name || session.user.email || "",
              })
            : null
        }
        videoStatus={videoStatus}
        lastPosition={progress?.lastPosition || 0}
        isCompleted={progress?.isCompleted || false}
        userName={session.user.name || ""}
        isAdmin={session.user.role === "ADMIN"}
      />

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
