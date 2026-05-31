import { prisma } from "@/lib/prisma";

export type LeadType = "all" | "free-only" | "paid" | "no-course" | "leads-form";

// قوة الـ Lead حسب تقدّمه في الكورس المجاني
export type LeadTier = "hot" | "warm" | "cold" | "none";

export const LEAD_TIER_LABEL: Record<LeadTier, string> = {
  hot: "ساخن (خلّص الكورس)",
  warm: "دافي (نص الكورس)",
  cold: "بدأ بس",
  none: "—",
};

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
  inFreeCourse: boolean; // مشترك في الكورس المجاني؟
  freeProgress: number; // نسبة إتمام الكورس المجاني (0-100)
  leadTier: LeadTier; // قوة الـ lead حسب تقدّمه
  progressPercent: number; // نسبة إتمام الكورس المجاني (alias قديم)
}

/** يحدد قوة الـ lead من نسبة تقدّمه في الكورس المجاني */
function tierFromProgress(inFreeCourse: boolean, progress: number): LeadTier {
  if (!inFreeCourse) return "none";
  if (progress >= 100) return "hot";
  if (progress >= 50) return "warm";
  return "cold";
}

/**
 * يجيب كل الناس اللي ممكن تتواصل معاهم:
 * 1. مستخدمين مسجّلين (طلاب) — بكل بياناتهم وكورساتهم
 * 2. leads من فورم الاهتمام — اللي مسجّلوش بعد
 */
export async function getCrmContacts(): Promise<CrmContact[]> {
  // الكورس المجاني (lead magnet) — عشان نحسب تقدّم كل واحد فيه بدقة
  const freeCourse = await prisma.course.findFirst({
    where: { price: 0, isPublished: true },
    select: { id: true, _count: { select: { lessons: true } } },
  });
  const freeCourseId = freeCourse?.id ?? null;
  const freeTotalLessons = freeCourse?._count.lessons ?? 0;

  const [users, leads, payments, freeProgressData] = await Promise.all([
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
            courseId: true,
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
    // عدد الدروس المكتملة في الكورس المجاني لكل مستخدم
    freeCourseId
      ? prisma.lessonProgress.groupBy({
          by: ["userId"],
          where: { isCompleted: true, lesson: { courseId: freeCourseId } },
          _count: { id: true },
        })
      : Promise.resolve([] as { userId: string; _count: { id: number } }[]),
  ]);

  const paidMap = new Map(payments.map((p) => [p.userId, p._sum.amount ?? 0]));
  const freeProgressMap = new Map(freeProgressData.map((p) => [p.userId, p._count.id]));

  // المستخدمين المسجلين
  const userContacts: CrmContact[] = users.map((u) => {
    const totalPaid = paidMap.get(u.id) ?? 0;
    const hasPaid = u.enrollments.some((e) => e.course.price > 0);
    const hasFreeOnly = u.enrollments.length > 0 && !hasPaid;

    // تقدّم الكورس المجاني بدقة (دروس مكتملة ÷ إجمالي دروس الكورس المجاني)
    const inFreeCourse = freeCourseId
      ? u.enrollments.some((e) => e.courseId === freeCourseId)
      : false;
    const completedFree = freeProgressMap.get(u.id) ?? 0;
    const freeProgress =
      inFreeCourse && freeTotalLessons > 0
        ? Math.min(Math.round((completedFree / freeTotalLessons) * 100), 100)
        : 0;
    const leadTier = tierFromProgress(inFreeCourse, freeProgress);

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
      inFreeCourse,
      freeProgress,
      leadTier,
      progressPercent: freeProgress,
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
      inFreeCourse: false,
      freeProgress: 0,
      leadTier: "none" as const,
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
