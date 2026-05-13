import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

    return NextResponse.json(progress);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
