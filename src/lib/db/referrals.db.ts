import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// توليد كود إحالة فريد (8 حروف/أرقام)
function randomCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // بدون أحرف ملتبسة (0/O, 1/I/L)
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function generateUniqueReferralCode(): Promise<string> {
  // نحاول عدة مرات لتفادي التصادم النادر
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode();
    const existing = await prisma.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });
    if (!existing) return code;
  }
  // احتياطي: نضيف جزء من الوقت لضمان التفرّد
  return randomCode(6) + Date.now().toString(36).slice(-3).toUpperCase();
}

// جلب كود المستخدم — وإنشاؤه كسولاً لو لسه مفيش
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referralCode: true },
  });
  if (user?.referralCode) return user.referralCode;

  const code = await generateUniqueReferralCode();
  await prisma.user.update({ where: { id: userId }, data: { referralCode: code } });
  return code;
}

export function findUserIdByReferralCode(code: string) {
  return prisma.user.findUnique({
    where: { referralCode: code },
    select: { id: true },
  });
}

export function setReferrerForUser(userId: string, referrerId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { referredById: referrerId },
  });
}

export function getReferredById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { referredById: true },
  });
}

export function commissionExistsForPayment(paymentId: string) {
  return prisma.commission.findUnique({
    where: { paymentId },
    select: { id: true },
  });
}

export function createCommissionInTransaction(
  tx: Prisma.TransactionClient,
  data: Prisma.CommissionUncheckedCreateInput,
) {
  return tx.commission.create({ data });
}

// إحصائيات المستخدم: عدد الإحالات + مجموع العمولات حسب الحالة
export async function getReferralStats(userId: string) {
  const [referralsCount, grouped] = await Promise.all([
    prisma.user.count({ where: { referredById: userId } }),
    prisma.commission.groupBy({
      by: ["status"],
      where: { referrerId: userId },
      _sum: { amount: true },
      _count: true,
    }),
  ]);

  const totals = { PENDING: 0, PAID: 0, CANCELLED: 0 } as Record<string, number>;
  const counts = { PENDING: 0, PAID: 0, CANCELLED: 0 } as Record<string, number>;
  for (const g of grouped) {
    totals[g.status] = g._sum.amount ?? 0;
    counts[g.status] = g._count;
  }

  return { referralsCount, totals, counts };
}

export function getRecentCommissions(userId: string, take = 20) {
  return prisma.commission.findMany({
    where: { referrerId: userId },
    orderBy: { createdAt: "desc" },
    take,
    select: { id: true, amount: true, status: true, createdAt: true },
  });
}

// إدارة: كل العمولات مع بيانات المُحيل
export function findAllCommissions() {
  return prisma.commission.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      referrer: { select: { id: true, name: true, email: true } },
    },
  });
}

export function markCommissionPaid(id: string) {
  return prisma.commission.update({
    where: { id },
    data: { status: "PAID", paidAt: new Date() },
  });
}
