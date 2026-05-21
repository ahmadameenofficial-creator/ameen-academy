import { prisma } from "@/lib/prisma";

export function findEnrollment(userId: string, courseId: string) {
  return prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
}

export function findUserEnrollments(userId: string) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
          duration: true,
          thumbnail: true,
          _count: { select: { lessons: true } },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });
}

export function createEnrollment(userId: string, courseId: string) {
  return prisma.enrollment.create({ data: { userId, courseId } });
}

export function completeEnrollment(userId: string, courseId: string) {
  return prisma.enrollment.update({
    where: { userId_courseId: { userId, courseId } },
    data: { completedAt: new Date() },
  });
}

export function countEnrollments() {
  return prisma.enrollment.count();
}
