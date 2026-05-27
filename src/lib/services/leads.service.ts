import { prisma } from "@/lib/prisma";

export type LeadType = "all" | "free-only" | "paid" | "no-course" | "leads-form";

export interface CrmContact {
  id: string;
  type: "user" | "lead"; // user = مسجّل عالمنصة، lead = سجّل من فورم الاهتمام بس
  name: string;
  email: string | null;
  phone: string | null;
  source: string;
  createdAt: Date;
  lastLoginAt: Date | null;
  // بيانات الكورسات (للـ users بس)
  enrolledCourses: { title: string; price: number; completedAt: Date | null }[];
  totalPaid: number; // بالقرش
  hasPaidCourse: boolean;
  hasFreeCourseOnly: boolean;
  progressPercent: number; // نسبة إتمام أعلى كورس
}

/**
 * يجيب كل الناس اللي ممكن تتواصل معاهم:
 * 1. مستخدمين مسجّلين (طلاب) — بكل بياناتهم وكورساتهم
 * 2. leads من فورم الاهتمام — اللي مسجّلوش بعد
 */
export async function getCrmContacts(): Promise<CrmContact[]> {
  const [users, leads, payments, progressData] = await Promise.all([
    prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        lastLoginAt: true,
        enrollments: {
          select: {
            course: { select: { title: true, price: true } },
            completedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.payment.groupBy({
      by: ["userId"],
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
    // نسبة التقدم لكل مستخدم (أعلى كورس)
    prisma.lessonProgress.groupBy({
      by: ["userId"],
      where: { isCompleted: true },
      _count: { id: true },
    }),
  ]);

  const paidMap = new Map(payments.map((p) => [p.userId, p._sum.amount ?? 0]));
  const progressMap = new Map(progressData.map((p) => [p.userId, p._count.id]));

  // المستخدمين المسجلين
  const userContacts: CrmContact[] = users.map((u) => {
    const totalPaid = paidMap.get(u.id) ?? 0;
    const hasPaid = u.enrollments.some((e) => e.course.price > 0);
    const hasFreeOnly = u.enrollments.length > 0 && !hasPaid;
    const completedLessons = progressMap.get(u.id) ?? 0;

    return {
      id: u.id,
      type: "user" as const,
      name: u.name || "بدون اسم",
      email: u.email,
      phone: u.phone,
      source: hasPaid ? "مشتري" : u.enrollments.length > 0 ? "كورس مجاني" : "مسجّل بس",
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
      enrolledCourses: u.enrollments.map((e) => ({
        title: e.course.title,
        price: e.course.price,
        completedAt: e.completedAt,
      })),
      totalPaid,
      hasPaidCourse: hasPaid,
      hasFreeCourseOnly: hasFreeOnly,
      progressPercent: completedLessons > 0 ? Math.min(completedLessons * 10, 100) : 0,
    };
  });

  // Leads من فورم الاهتمام (اللي مسجلوش)
  const registeredEmails = new Set(users.map((u) => u.email?.toLowerCase()));
  const registeredPhones = new Set(users.filter((u) => u.phone).map((u) => u.phone));

  const leadContacts: CrmContact[] = leads
    .filter((l) => {
      // استبعد الـ leads اللي سجّلوا فعلاً
      if (l.email && registeredEmails.has(l.email.toLowerCase())) return false;
      if (l.phone && registeredPhones.has(l.phone)) return false;
      return true;
    })
    .map((l) => ({
      id: l.id,
      type: "lead" as const,
      name: l.name,
      email: l.email,
      phone: l.phone,
      source: l.source || "فورم الاهتمام",
      createdAt: l.createdAt,
      lastLoginAt: null,
      enrolledCourses: [],
      totalPaid: 0,
      hasPaidCourse: false,
      hasFreeCourseOnly: false,
      progressPercent: 0,
    }));

  return [...userContacts, ...leadContacts];
}

/** إحصائيات سريعة */
export async function getCrmStats() {
  const [totalUsers, totalLeads, usersWithPhone, freeEnrollments, paidEnrollments] =
    await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.lead.count(),
      prisma.user.count({ where: { role: "STUDENT", phone: { not: null } } }),
      prisma.enrollment.count({
        where: { course: { price: 0 } },
      }),
      prisma.enrollment.count({
        where: { course: { price: { gt: 0 } } },
      }),
    ]);

  return {
    totalContacts: totalUsers + totalLeads,
    totalUsers,
    totalLeads,
    usersWithPhone,
    freeEnrollments,
    paidEnrollments,
    conversionRate: freeEnrollments > 0 ? Math.round((paidEnrollments / freeEnrollments) * 100) : 0,
  };
}
