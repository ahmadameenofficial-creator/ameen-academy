// =====================================================
// منصة البريف — منطق الـ Gamification (XP / Streak / Badges)
// =====================================================

import type { Prisma, PrismaClient } from "@prisma/client";
import { XP_RULES, levelFromXp, BADGE_DEFINITIONS } from "./constants";

type Tx = Prisma.TransactionClient | PrismaClient;

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isYesterday(prev: Date, now: Date): boolean {
  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  return isSameDay(prev, y);
}

/**
 * يُنفّذ بعد رفع حل ناجح. يحدّث XP والسلسلة ويمنح الشارات المستحقة.
 * يُستدعى جوّه transaction (tx) عشان الذرّية.
 */
export async function awardForSubmission(tx: Tx, userId: string): Promise<void> {
  const now = new Date();
  const stats = await tx.designerStats.findUnique({ where: { userId } });

  // حساب السلسلة
  let currentStreak = 1;
  let firstOfDay = true;
  if (stats?.lastSolvedAt) {
    if (isSameDay(stats.lastSolvedAt, now)) {
      currentStreak = stats.currentStreak; // حل تاني في نفس اليوم
      firstOfDay = false;
    } else if (isYesterday(stats.lastSolvedAt, now)) {
      currentStreak = stats.currentStreak + 1; // يوم متواصل
    } // غير كده → السلسلة بتترجع لـ 1
  }

  let xpGain = XP_RULES.PER_SUBMISSION;
  if (firstOfDay) xpGain += XP_RULES.FIRST_OF_DAY_BONUS;

  const newXp = (stats?.xp ?? 0) + xpGain;
  const briefsSolved = (stats?.briefsSolved ?? 0) + 1;
  const longestStreak = Math.max(stats?.longestStreak ?? 0, currentStreak);

  await tx.designerStats.upsert({
    where: { userId },
    create: {
      userId,
      xp: newXp,
      level: levelFromXp(newXp),
      currentStreak,
      longestStreak,
      lastSolvedAt: now,
      briefsSolved,
    },
    update: {
      xp: newXp,
      level: levelFromXp(newXp),
      currentStreak,
      longestStreak,
      lastSolvedAt: now,
      briefsSolved,
    },
  });

  await checkAndAwardBadges(tx, userId, { briefsSolved, currentStreak });
}

async function checkAndAwardBadges(
  tx: Tx,
  userId: string,
  metrics: { briefsSolved: number; currentStreak: number }
): Promise<void> {
  const eligibleKeys = BADGE_DEFINITIONS.filter((b) => {
    if (b.threshold.metric === "briefsSolved") return metrics.briefsSolved >= b.threshold.value;
    if (b.threshold.metric === "currentStreak") return metrics.currentStreak >= b.threshold.value;
    return false;
  }).map((b) => b.key);

  if (eligibleKeys.length === 0) return;

  const badges = await tx.briefBadge.findMany({ where: { key: { in: eligibleKeys } } });
  for (const badge of badges) {
    await tx.designerBadge.upsert({
      where: { userId_badgeId: { userId, badgeId: badge.id } },
      create: { userId, badgeId: badge.id },
      update: {},
    });
  }
}
