import { prisma } from "@/lib/prisma";

export function upsertProgress(
  userId: string,
  lessonId: string,
  data: {
    isCompleted?: boolean;
    watchedSeconds?: number;
    lastPosition?: number;
  },
) {
  return prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: {
      userId,
      lessonId,
      isCompleted: data.isCompleted || false,
      watchedSeconds: data.watchedSeconds || 0,
      lastPosition: data.lastPosition || 0,
      watchCount: 1,
      completedAt: data.isCompleted ? new Date() : null,
    },
    update: {
      ...(data.isCompleted !== undefined && {
        isCompleted: data.isCompleted,
        completedAt: data.isCompleted ? new Date() : null,
      }),
      ...(data.watchedSeconds !== undefined && { watchedSeconds: data.watchedSeconds }),
      ...(data.lastPosition !== undefined && { lastPosition: data.lastPosition }),
      watchCount: { increment: 1 },
    },
  });
}

export function countLessonsInCourse(courseId: string) {
  return prisma.lesson.count({ where: { courseId } });
}

export function countCompletedLessons(userId: string, courseId: string) {
  return prisma.lessonProgress.count({
    where: {
      userId,
      isCompleted: true,
      lesson: { courseId },
    },
  });
}

export function getCompletedLessonsByCourse(userId: string, courseIds: string[]) {
  if (courseIds.length === 0) return Promise.resolve([]);
  return prisma.lessonProgress.findMany({
    where: {
      userId,
      isCompleted: true,
      lesson: { courseId: { in: courseIds } },
    },
    select: { lesson: { select: { courseId: true } } },
  });
}

export function findProgressForCourse(userId: string, courseId: string) {
  return prisma.lessonProgress.findMany({
    where: { userId, lesson: { courseId } },
    select: { lessonId: true, isCompleted: true },
  });
}

export function findLessonById(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, courseId: true },
  });
}
