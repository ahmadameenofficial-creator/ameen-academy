// ============ Round الأول — يوليو 2026 ============
export const ROUND_INFO = {
  number: 1,
  startMonth: "يوليو 2026",
  totalSeats: 30,
  // أعضاء حجزوا قبل ما السيستم يشتغل — بنبدأ بـ 3
  initialReservations: 3,
};

// ============ Early Bird ============
// آخر يوم للحجز المبكر — 3 يونيو 2026 — Cairo time
export const EARLY_BIRD_DEADLINE = new Date("2026-06-03T23:59:59+02:00");
export const EARLY_BIRD_DISCOUNT = 40; // % تقريباً (199/349 = 43%, 1799/2999 = 40%)

// ============ التسعير ============
export const PLANS = {
  MONTHLY: {
    label: "شهري",
    regular: 349,
    earlyBird: 199,
    period: "شهر",
    months: 1,
  },
  QUARTERLY: {
    label: "ربع سنوي",
    regular: 899,
    earlyBird: 499,
    period: "3 شهور",
    months: 3,
  },
  ANNUAL: {
    label: "سنوي",
    regular: 2999,
    earlyBird: 1799,
    period: "سنة كاملة",
    months: 12,
  },
} as const;

// التوفير على البلان السنوي (مقارنة بالـ Annual العادي)
export const ANNUAL_SAVINGS = PLANS.ANNUAL.regular - PLANS.ANNUAL.earlyBird; // 1200
