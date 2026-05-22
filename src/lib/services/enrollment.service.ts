import { enrollmentsDb, progressDb, coursesDb } from "@/lib/db";
import { NotFoundError } from "@/lib/errors";

// جلب الكورس المجاني (lead magnet) لو موجود
export function getFreeCourse() {
  return coursesDb.findPublishedFreeCourse();
}

/**
 * اشتراك فوري في الكورس المجاني — من غير دفع ولا مراجعة أدمن.
 * بيتأكد إن الكورس فعلاً سعره 0 ومنشور. Idempotent.
 */
export async function claimFreeCourse(userId: string) {
  const course = await coursesDb.findPublishedFreeCourse();
  if (!course) throw new NotFoundError("مفيش كورس مجاني متاح دلوقتي");

  const existing = await enrollmentsDb.findEnrollment(userId, course.id);
  if (!existing) {
    await enrollmentsDb.createEnrollment(userId, course.id);
  }
  return { slug: course.slug };
}

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
