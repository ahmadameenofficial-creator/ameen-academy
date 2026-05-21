import { enrollmentsDb, progressDb } from "@/lib/db";

export async function getDashboardData(userId: string) {
  const enrollments = await enrollmentsDb.findUserEnrollments(userId);
  const courseIds = enrollments.map((e) => e.course.id);
  const completedProgress = await progressDb.getCompletedLessonsByCourse(userId, courseIds);

  const completedCounts = new Map<string, number>();
  for (const p of completedProgress) {
    const cid = p.lesson.courseId;
    completedCounts.set(cid, (completedCounts.get(cid) ?? 0) + 1);
  }

  return enrollments.map((enrollment) => {
    const totalLessons = enrollment.course._count.lessons;
    const completedCount = completedCounts.get(enrollment.course.id) ?? 0;
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return {
      ...enrollment,
      completedCount,
      totalLessons,
      progress,
      isCompleted: progress === 100,
    };
  });
}
