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
    <div className="relative overflow-hidden border-y border-brand-500/10 bg-[#080014] py-3.5">
      {/* Side fades */}
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080014] to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080014] to-transparent z-10" />

      <div className="flex animate-scroll-rtl gap-8 whitespace-nowrap">
        {[...PROOFS, ...PROOFS].map((proof, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-brand-300/70 shrink-0">
            <IconTrendingUp className="size-4 text-brand-500/60 shrink-0" />
            <span>{proof}</span>
            <span className="text-brand-500/20 mx-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
