import { cache } from "react";
import { coursesDb, ratingsDb, enrollmentsDb } from "@/lib/db";

export async function getCatalog() {
  const [courses, ratingAverages] = await Promise.all([
    coursesDb.findPublishedCourses(),
    ratingsDb.getAverageRatingsByCourse(),
  ]);

  const avgMap = new Map(ratingAverages.map((r) => [r.courseId, r._avg.rating ?? 0]));
  return courses.map((c) => ({ ...c, avgRating: avgMap.get(c.id) ?? 0 }));
}

export const getCourseDetail = cache(async (slug: string) => {
  return coursesDb.findCourseBySlug(slug, true);
});

export async function getCourseWithEnrollment(slug: string, userId: string | undefined) {
  const course = await getCourseDetail(slug);
  if (!course) return { course: null, enrollment: null };

  const enrollment = userId
    ? await enrollmentsDb.findEnrollment(userId, course.id)
    : null;

  return { course, enrollment };
}
