import { prisma } from "@/lib/prisma";
import { progressDb, enrollmentsDb, certificatesDb } from "@/lib/db";
import { createNotification } from "@/lib/notifications";
import { NotFoundError, ForbiddenError } from "@/lib/errors";

export async function trackProgress(
  userId: string,
  lessonId: string,
  data: { isCompleted?: boolean; watchedSeconds?: number; lastPosition?: number },
) {
  const lesson = await progressDb.findLessonById(lessonId);
  if (!lesson) throw new NotFoundError("الدرس مش موجود");

  const enrollment = await enrollmentsDb.findEnrollment(userId, lesson.courseId);
  if (!enrollment) throw new ForbiddenError("مش مشترك في الكورس ده");

  const progress = await progressDb.upsertProgress(userId, lessonId, data);

  if (data.isCompleted) {
    await checkCourseCompletion(userId, lesson.courseId);
  }

  return progress;
}

async function checkCourseCompletion(userId: string, courseId: string) {
  const [allLessons, completedLessons, existingCert, course] = await Promise.all([
    progressDb.countLessonsInCourse(courseId),
    progressDb.countCompletedLessons(userId, courseId),
    certificatesDb.findCertificate(userId, courseId),
    prisma.course.findUnique({ where: { id: courseId }, select: { title: true } }),
  ]);

  if (completedLessons >= allLessons && allLessons > 0 && !existingCert) {
    const { randomBytes } = await import("crypto");
    const certificateCode = `AMN-${randomBytes(4).toString("hex").toUpperCase()}`;

    await prisma.$transaction([
      prisma.certificate.create({
        data: { userId, courseId, certificateCode },
      }),
      prisma.enrollment.update({
        where: { userId_courseId: { userId, courseId } },
        data: { completedAt: new Date() },
      }),
    ]);

    createNotification({
      userId,
      type: "CERTIFICATE",
      title: "مبروك! حصلت على شهادة",
      message: `خلصت كورس "${course?.title}" — شهادتك جاهزة للتحميل`,
      link: `/api/certificates/${certificateCode}`,
    }).catch(() => {});
  }
}
