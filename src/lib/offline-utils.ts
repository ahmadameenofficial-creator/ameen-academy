// أدوات موديول الأوفلاين — آمنة للاستخدام في client components
// المبالغ في الداتابيز بالقرش، والعرض/الإدخال بالجنيه

export const DAY_NAMES = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

/** قرش → نص بالجنيه للعرض */
export function formatEGP(cents: number): string {
  const pounds = cents / 100;
  return `${pounds.toLocaleString("en-US", { maximumFractionDigits: 1 })} ج`;
}

/** جنيه (من input) → قرش للتخزين */
export function toCents(pounds: number): number {
  return Math.round(pounds * 100);
}

/** رقم مصري (01xxxxxxxxx) → لينك واتساب، مع رسالة جاهزة اختيارية */
export function waLink(phone: string, text?: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "2" + digits;
  else if (!digits.startsWith("2")) digits = "20" + digits;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** تاريخ النهارده بتوقيت مصر "YYYY-MM-DD" — عشان كود الحصة والحضور ميتلخبطوش حوالين نص الليل */
export function cairoToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Cairo" });
}

/** وقت → نص عربي زي "٦:٠٥ م" بتوقيت مصر */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** تاريخ → نص عربي زي "السبت 20 ديسمبر" */
export function formatArabicDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** رسالة تذكير القسط الجاهزة للواتساب */
export function dueReminderMessage(
  firstName: string,
  amountCents: number,
  dueDate: Date | string
): string {
  return `مساء الخير يا ${firstName} 🌟\nتذكير بسيط إن الدفعة الجاية (${formatEGP(
    amountCents
  )}) ميعادها ${formatArabicDate(dueDate)}.\nلو فيه أي ظرف كلمني وهنتصرف 🙌`;
}

export const PAY_METHOD_LABELS: Record<string, string> = {
  CASH: "كاش",
  INSTAPAY: "إنستا باي",
  VODAFONE_CASH: "فودافون كاش",
  OTHER: "غير ذلك",
};

export const STUDENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "طلب جديد",
  ACTIVE: "مستمر",
  DROPPED: "انسحب",
  COMPLETED: "خلّص",
};

export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  PRESENT: "حضر",
  ABSENT: "غاب",
  EXCUSED: "بعذر",
};
