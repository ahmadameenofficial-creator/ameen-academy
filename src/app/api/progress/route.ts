import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createNotification } from "@/lib/notifications";

const progressSchema = z.object({
  lessonId: z.string().min(1),
  isCompleted: z.boolean().optional(),
  watchedSeconds: z.number().min(0).optional(),
  lastPosition: z.number().min(0).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = progressSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { lessonId, isCompleted, watchedSeconds, lastPosition } = result.data;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { courseId: true },
    });
    if (!lesson) {
      return NextResponse.json({ error: "الدرس مش موجود" }, { status: 404 });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: lesson.courseId } },
    });
    if (!enrollment) {
      return NextResponse.json({ error: "مش مشترك في الكورس ده" }, { status: 403 });
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: session.user.id, lessonId } },
      create: {
        userId: session.user.id,
        lessonId,
        isCompleted: isCompleted || false,
        watchedSeconds: watchedSeconds || 0,
        lastPosition: lastPosition || 0,
        watchCount: 1,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        ...(isCompleted !== undefined && {
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        }),
        ...(watchedSeconds !== undefined && { watchedSeconds }),
        ...(lastPosition !== undefined && { lastPosition }),
        watchCount: { increment: 1 },
      },
    });

    if (isCompleted) {
      const allLessons = await prisma.lesson.count({
        where: { courseId: lesson.courseId },
      });
      const completedLessons = await prisma.lessonProgress.count({
        where: {
          userId: session.user.id,
          isCompleted: true,
          lesson: { courseId: lesson.courseId },
        },
      });

      if (completedLessons >= allLessons && allLessons > 0) {
        const existingCert = await prisma.certificate.findUnique({
          where: { userId_courseId: { userId: session.user.id, courseId: lesson.courseId } },
        });

        if (!existingCert) {
          const { randomBytes } = await import("crypto");
          const certificateCode = `AMN-${randomBytes(4).toString("hex").toUpperCase()}`;
          const course = await prisma.course.findUnique({
            where: { id: lesson.courseId },
            select: { title: true },
          });

          await prisma.$transaction([
            prisma.certificate.create({
              data: {
                userId: session.user.id,
                courseId: lesson.courseId,
                certificateCode,
              },
            }),
            prisma.enrollment.update({
              where: { userId_courseId: { userId: session.user.id, courseId: lesson.courseId } },
              data: { completedAt: new Date() },
            }),
          ]);

          createNotification({
            userId: session.user.id,
            type: "CERTIFICATE",
            title: "مبروك! حصلت على شهادة",
            message: `خلصت كورس "${course?.title}" — شهادتك جاهزة للتحميل`,
            link: `/api/certificates/${certificateCode}`,
          }).catch(() => {});
        }
      }
    }

    return NextResponse.json(progress);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
