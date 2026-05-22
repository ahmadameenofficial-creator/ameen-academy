import { prisma } from "@/lib/prisma";
import { REFERRAL_CONFIG } from "@/lib/constants";
import * as referralsDb from "@/lib/db/referrals.db";

/**
 * ربط مستخدم جديد بالمُحيل بتاعه (وقت التسجيل).
 * بيتعامل بهدوء مع أي كود غلط — مبيكسرش التسجيل أبداً.
 */
export async function attachReferral(newUserId: string, refCode?: string | null) {
  if (!refCode) return;
  const code = refCode.trim().toUpperCase();
  if (!code) return;

  const referrer = await referralsDb.findUserIdByReferralCode(code);
  // مينفعش حد يحيل نفسه، ولازم الكود يكون صحيح
  if (!referrer || referrer.id === newUserId) return;

  await referralsDb.setReferrerForUser(newUserId, referrer.id);
}

/**
 * تسجيل عمولة للمُحيل بعد تأكيد دفعة.
 * Idempotent: paymentId فريد فمفيش ازدواج لو اتنادت أكتر من مرة.
 */
export async function awardCommissionForPayment(payment: {
  id: string;
  userId: string;
  amount: number;
}) {
  const buyer = await referralsDb.getReferredById(payment.userId);
  const referrerId = buyer?.referredById;
  if (!referrerId || referrerId === payment.userId) return;

  const existing = await referralsDb.commissionExistsForPayment(payment.id);
  if (existing) return;

  const rate = REFERRAL_CONFIG.commissionRate;
  const amount = Math.round((payment.amount * rate) / 100);
  if (amount <= 0) return;

  await prisma.$transaction((tx) =>
    referralsDb.createCommissionInTransaction(tx, {
      referrerId,
      referredUserId: payment.userId,
      paymentId: payment.id,
      amount,
      rate,
    }),
  );
}

/** بيانات لوحة الإحالة للمستخدم: الكود، اللينك، الإحصائيات، آخر العمولات */
export async function getMyReferralData(userId: string, baseUrl: string) {
  const [code, stats, recent] = await Promise.all([
    referralsDb.getOrCreateReferralCode(userId),
    referralsDb.getReferralStats(userId),
    referralsDb.getRecentCommissions(userId),
  ]);

  const link = `${baseUrl}/?${REFERRAL_CONFIG.param}=${code}`;
  return { code, link, rate: REFERRAL_CONFIG.commissionRate, stats, recent };
}

/** إدارة: كل العمولات */
export function getAdminCommissions() {
  return referralsDb.findAllCommissions();
}

/** إدارة: تعليم عمولة كمدفوعة */
export function payCommission(id: string) {
  return referralsDb.markCommissionPaid(id);
}
