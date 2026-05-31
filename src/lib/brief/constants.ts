// =====================================================
// منصة البريف — ثوابت ومعايير
// =====================================================

import type { BriefType, BriefLevel } from "@prisma/client";

// ===== أنواع البريف =====
export const BRIEF_TYPES: { value: BriefType; label: string; icon: string; desc: string }[] = [
  {
    value: "LOGO",
    label: "تصميم شعار",
    icon: "IconBrandAppgallery",
    desc: "صمّم لوجو لبراند حقيقي بقيود عميل حقيقية",
  },
  {
    value: "SOCIAL_POST",
    label: "بوست سوشيال ميديا",
    icon: "IconPhoto",
    desc: "اعمل بوست يبيع، مش مجرد صورة حلوة",
  },
  {
    value: "BRAND_IDENTITY",
    label: "هوية بصرية كاملة",
    icon: "IconPalette",
    desc: "ابنِ هوية متكاملة من الصفر للنهاية",
  },
];

// ===== مستويات البريف =====
export const BRIEF_LEVELS: { value: BriefLevel; label: string; desc: string }[] = [
  { value: "BEGINNER", label: "مبتدئ", desc: "بريف واضح ومباشر، قيود بسيطة" },
  { value: "INTERMEDIATE", label: "متوسط", desc: "قيود أكتر وعميل بمزاج" },
  { value: "PRO", label: "محترف", desc: "عميل صعب، قيود متضاربة، deadline ضيق" },
];

export const BRIEF_TYPE_LABELS: Record<BriefType, string> = {
  LOGO: "تصميم شعار",
  SOCIAL_POST: "بوست سوشيال ميديا",
  BRAND_IDENTITY: "هوية بصرية كاملة",
};

export const BRIEF_LEVEL_LABELS: Record<BriefLevel, string> = {
  BEGINNER: "مبتدئ",
  INTERMEDIATE: "متوسط",
  PRO: "محترف",
};

// ===== قواعد الـ XP =====
export const XP_RULES = {
  PER_SUBMISSION: 50, // حل بريف
  FIRST_OF_DAY_BONUS: 25, // أول حل في اليوم
  PER_VOTE_RECEIVED: 2, // عن كل تصويت يجيله
};

/**
 * حساب المستوى من الـ XP — منحنى تصاعدي بسيط.
 * level n يحتاج 100 * n^1.5 نقطة تراكمية تقريباً.
 */
export function levelFromXp(xp: number): number {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 1.5));
}

// ===== تعريف الشارات (تُزرع في الـ DB) =====
export const BADGE_DEFINITIONS: {
  key: string;
  name: string;
  description: string;
  icon: string;
  threshold: { metric: "briefsSolved" | "currentStreak" | "votesReceived"; value: number };
}[] = [
  {
    key: "first_brief",
    name: "أول خطوة",
    description: "حليت أول بريف ليك",
    icon: "IconRocket",
    threshold: { metric: "briefsSolved", value: 1 },
  },
  {
    key: "solver_10",
    name: "حلّال محترف",
    description: "حليت 10 بريفات",
    icon: "IconFlame",
    threshold: { metric: "briefsSolved", value: 10 },
  },
  {
    key: "solver_50",
    name: "ماكينة تصميم",
    description: "حليت 50 بريف",
    icon: "IconBolt",
    threshold: { metric: "briefsSolved", value: 50 },
  },
  {
    key: "streak_7",
    name: "أسبوع كامل",
    description: "حافظت على سلسلة 7 أيام",
    icon: "IconCalendarStar",
    threshold: { metric: "currentStreak", value: 7 },
  },
  {
    key: "streak_30",
    name: "انضباط الحديد",
    description: "سلسلة 30 يوم متواصلة",
    icon: "IconTrophy",
    threshold: { metric: "currentStreak", value: 30 },
  },
];
