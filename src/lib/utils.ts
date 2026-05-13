import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * تنسيق السعر من قرش إلى جنيه
 * @param amountInPiasters السعر بالقرش (49900 = 499 جنيه)
 */
export function formatPrice(amountInPiasters: number, currency = "EGP"): string {
  const amount = amountInPiasters / 100;
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * تنسيق المدة من ثواني لصيغة مقروءة
 */
export function formatDuration(seconds: number, format: "short" | "long" = "short"): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (format === "short") {
    if (hours > 0) return `${hours}س ${minutes}د`;
    if (minutes > 0) return `${minutes}د`;
    return `${secs}ث`;
  }

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ساعة`);
  if (minutes > 0) parts.push(`${minutes} دقيقة`);
  return parts.join(" و ") || `${secs} ثانية`;
}

/**
 * تنسيق التاريخ بالعربية
 */
export function formatDate(date: Date | string, relative = true): string {
  const d = new Date(date);
  if (relative) {
    const now = Date.now();
    const diff = now - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
  }
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * إنشاء slug من نص عربي/إنجليزي
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

/**
 * تنسيق الأرقام بالعربية
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ar-EG").format(num);
}

/**
 * تقصير النص
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * إنشاء initials من الاسم
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
