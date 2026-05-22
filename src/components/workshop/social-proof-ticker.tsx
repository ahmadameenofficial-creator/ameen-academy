"use client";

import { IconTrendingUp } from "@tabler/icons-react";

const PROOFS = [
  "سارة كسبت 4,000 جنيه في أول شهرين",
  "محمد جاب أول client بعد 3 أسابيع",
  "نورهان بتكسب 7,000 جنيه إضافي شهرياً",
  "أحمد بنى موقعه وبدأ ياخد شغل",
  "+300 شخص بدأوا يكسبوا دخل حقيقي",
  "أول شغلانة غطّت سعر الكورس",
];

export function SocialProofTicker() {
  return (
    <div className="relative overflow-hidden border-y border-brand-100/50 dark:border-brand-900/30 bg-brand-50/50 dark:bg-brand-950/20 py-3">
      <div className="flex animate-scroll-rtl gap-8 whitespace-nowrap">
        {[...PROOFS, ...PROOFS].map((proof, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-300 shrink-0">
            <IconTrendingUp className="size-4 text-brand-500 shrink-0" />
            <span>{proof}</span>
            <span className="text-brand-300 dark:text-brand-700 mx-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
