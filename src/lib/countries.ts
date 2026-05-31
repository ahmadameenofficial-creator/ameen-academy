// قائمة الدول لاختيار كود الواتساب — بدون أعلام (emojis ممنوعة)
// مرتّبة: مصر الأول، بعدها باقي الدول العربية الأكثر استخداماً، بعدها العالم.

export interface Country {
  code: string; // ISO-2
  name: string; // بالعربي
  dial: string; // كود الاتصال بدون +
}

export const COUNTRIES: Country[] = [
  { code: "EG", name: "مصر", dial: "20" },
  { code: "SA", name: "السعودية", dial: "966" },
  { code: "AE", name: "الإمارات", dial: "971" },
  { code: "KW", name: "الكويت", dial: "965" },
  { code: "QA", name: "قطر", dial: "974" },
  { code: "BH", name: "البحرين", dial: "973" },
  { code: "OM", name: "عُمان", dial: "968" },
  { code: "JO", name: "الأردن", dial: "962" },
  { code: "LB", name: "لبنان", dial: "961" },
  { code: "PS", name: "فلسطين", dial: "970" },
  { code: "SY", name: "سوريا", dial: "963" },
  { code: "IQ", name: "العراق", dial: "964" },
  { code: "YE", name: "اليمن", dial: "967" },
  { code: "LY", name: "ليبيا", dial: "218" },
  { code: "SD", name: "السودان", dial: "249" },
  { code: "DZ", name: "الجزائر", dial: "213" },
  { code: "MA", name: "المغرب", dial: "212" },
  { code: "TN", name: "تونس", dial: "216" },
  { code: "MR", name: "موريتانيا", dial: "222" },
  { code: "TR", name: "تركيا", dial: "90" },
  { code: "US", name: "أمريكا / كندا", dial: "1" },
  { code: "GB", name: "بريطانيا", dial: "44" },
  { code: "DE", name: "ألمانيا", dial: "49" },
  { code: "FR", name: "فرنسا", dial: "33" },
  { code: "IT", name: "إيطاليا", dial: "39" },
  { code: "ES", name: "إسبانيا", dial: "34" },
  { code: "NL", name: "هولندا", dial: "31" },
  { code: "SE", name: "السويد", dial: "46" },
  { code: "NO", name: "النرويج", dial: "47" },
  { code: "DK", name: "الدنمارك", dial: "45" },
  { code: "BE", name: "بلجيكا", dial: "32" },
  { code: "CH", name: "سويسرا", dial: "41" },
  { code: "AT", name: "النمسا", dial: "43" },
  { code: "AU", name: "أستراليا", dial: "61" },
  { code: "MY", name: "ماليزيا", dial: "60" },
  { code: "ID", name: "إندونيسيا", dial: "62" },
  { code: "PK", name: "باكستان", dial: "92" },
  { code: "IN", name: "الهند", dial: "91" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // مصر

/** يلاقي الدولة من رقم دولي كامل زي +201012345678 */
export function countryFromE164(value: string | null | undefined): Country | null {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, "");
  // الأطول الأول عشان نطابق أصح كود
  const sorted = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
  return sorted.find((c) => digits.startsWith(c.dial)) ?? null;
}
