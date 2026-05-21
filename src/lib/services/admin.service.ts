import { prisma } from "@/lib/prisma";
import { usersDb, paymentsDb, enrollmentsDb, certificatesDb, ratingsDb } from "@/lib/db";

export async function getDashboardStats() {
  const [courses, students, payments, ratings] = await Promise.all([
    prisma.course.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
    ratingsDb.getAverageRating(),
  ]);

  return {
    courses,
    students,
    totalRevenue: payments._sum.amount ?? 0,
    avgRating: ratings._avg.rating ?? 0,
  };
}

export async function getStudentsData() {
  const [students, totalRevenue, totalEnrollments, totalCertificates, bannedCount, revenueByUser] = await Promise.all([
    usersDb.findStudents(),
    paymentsDb.aggregatePaidRevenue(),
    enrollmentsDb.countEnrollments(),
    certificatesDb.countCertificates(),
    usersDb.countBannedStudents(),
    paymentsDb.groupRevenueByUser(),
  ]);

  const revenueMap = new Map(revenueByUser.map((r) => [r.userId, r._sum.amount ?? 0]));

  return {
    students: students.map((s) => ({ ...s, totalPaid: revenueMap.get(s.id) ?? 0 })),
    stats: {
      totalStudents: students.length,
      totalRevenue: totalRevenue._sum.amount ?? 0,
      totalEnrollments,
      totalCertificates,
      bannedCount,
    },
  };
}
