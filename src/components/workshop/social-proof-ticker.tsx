"use client";

import { IconTrendingUp, IconStar } from "@tabler/icons-react";

const PROOFS_ROW_1 = [
  "سارة كسبت 4,000 جنيه في أول شهرين",
  "محمد جاب أول client بعد 3 أسابيع",
  "نورهان بتكسب 7,000 جنيه إضافي شهرياً",
  "أحمد بنى موقعه وبدأ ياخد شغل",
  "+300 شخص بدأوا يكسبوا دخل حقيقي",
  "أول شغلانة غطّت سعر الكورس",
];

const PROOFS_ROW_2 = [
  "تصميم + AI + موقع + تسويق",
  "30+ ساعة عملي من الصفر",
  "ضمان كامل — فلوسك ترجع",
  "LinkedIn Makeover مع الكورس",
  "مجتمع أكاديمية أمين",
  "AI Toolkit بيتحدث مدى الحياة",
];

/**
 * X-Marquee — صفين مايلين بيجروا في اتجاهات عكسية
 * مستوحى من SOM ±6° tilted marquee
 * الأول بنفسجي، التاني بنفسجي غامق
 */
export function SocialProofTicker() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
      {/* الصف الأول — مايل +4° — من اليمين لليسار */}
      <div
        className="relative mb-6"
        style={{ transform: "rotate(4deg)" }}
      >
        <div className="workshop-stripe workshop-stripe-brand">
          <div className="flex animate-marquee-rtl gap-12 whitespace-nowrap">
            {[...PROOFS_ROW_1, ...PROOFS_ROW_1].map((proof, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-white/80 shrink-0"
              >
                <IconTrendingUp className="size-4 text-brand-400 shrink-0" />
                <span>{proof}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الصف التاني — مايل -4° — من اليسار لليمين */}
      <div
        className="relative"
        style={{ transform: "rotate(-4deg)" }}
      >
        <div className="workshop-stripe workshop-stripe-deep">
          <div className="flex animate-marquee-ltr gap-12 whitespace-nowrap">
            {[...PROOFS_ROW_2, ...PROOFS_ROW_2].map((proof, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-white/80 shrink-0"
              >
                <IconStar className="size-4 text-brand-300 shrink-0" />
                <span>{proof}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
