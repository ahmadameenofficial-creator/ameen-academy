// Rate Limiter بسيط بالـ Memory — كافي لـ Vercel Serverless
// كل function instance ليها cache منفصل، فالحد الفعلي أكبر شوية

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// تنظيف تلقائي كل 5 دقائق عشان الـ memory
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** عدد الطلبات المسموح */
  limit: number;
  /** الفترة بالثواني */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // ثواني
}

export function rateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // أول طلب أو الفترة انتهت
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: config.limit - 1, resetIn: config.windowSeconds };
  }

  if (entry.count >= config.limit) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);
    return { success: false, remaining: 0, resetIn };
  }

  entry.count++;
  const resetIn = Math.ceil((entry.resetTime - now) / 1000);
  return { success: true, remaining: config.limit - entry.count, resetIn };
}

// حدود جاهزة للاستخدام
export const RATE_LIMITS = {
  // تسجيل الدخول: 5 محاولات كل 15 دقيقة
  login: { limit: 5, windowSeconds: 15 * 60 },
  // تسجيل حساب: 3 كل ساعة
  register: { limit: 3, windowSeconds: 60 * 60 },
  // نسيت الباسورد: 3 كل 15 دقيقة
  forgotPassword: { limit: 3, windowSeconds: 15 * 60 },
  // نشر بوست: 10 كل 10 دقائق
  post: { limit: 10, windowSeconds: 10 * 60 },
  // تعليق: 20 كل 10 دقائق
  comment: { limit: 20, windowSeconds: 10 * 60 },
  // رفع ملف: 10 كل 10 دقائق
  upload: { limit: 10, windowSeconds: 10 * 60 },
  // طلب VIP: 3 طلبات كل ساعة (مكلف — بيبعت إيميلين لكل طلب)
  vipApplication: { limit: 3, windowSeconds: 60 * 60 },
  // الاشتراك المجاني: 5 محاولات كل 10 دقائق
  freeEnrollment: { limit: 5, windowSeconds: 10 * 60 },
  // توليد بريف بالـ AI: 15 كل ساعة لكل IP (يحمي كوتة Gemini — بعدها يرجع للقالب)
  briefAI: { limit: 15, windowSeconds: 60 * 60 },
} as const;
