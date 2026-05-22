"use client";

import {
  IconQuote,
  IconClock,
} from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const CASES = [
  {
    name: "سارة محمد",
    age: 23,
    tag: "خريجة — كانت مش لاقية شغل",
    income: "4,000+",
    time: "5 أسابيع",
    quote: "المشكلة مكنتش إني مش شاطرة — كانت إن محدش كان شايفني.",
    before: "خريجة ومش لاقية فرصة. بتبعت CVs ومفيش رد.",
    after: "بنت portfolio + موقع. دلوقتي 3 clients ثابتين.",
  },
  {
    name: "محمد خالد",
    age: 20,
    tag: "طالب — عايز دخل جنب الكلية",
    income: "6,000",
    time: "3 أسابيع",
    quote: "أول مرة أحس إن عندي مهارة حقيقية بتجيب فلوس.",
    before: "طالب هندسة. محتاج فلوس ومش عارف يبدأ منين.",
    after: "أول client بـ 1,500 جنيه. دلوقتي 6,000/شهر وهو في الكلية.",
  },
  {
    name: "نورهان عادل",
    age: 27,
    tag: "موظفة — مرتبها مكنش كفاية",
    income: "7,000+",
    time: "6 أسابيع",
    quote: "الكورس اختصرلي الطريق وفتحلي باب فلوس جديد.",
    before: "موظفة بـ 4,500 جنيه. عايزة مصدر تاني ومش عارفة.",
    after: "أول مشروع هوية بصرية بـ 5,000. دلوقتي +7,000 إضافي/شهر.",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <p className="text-sm font-semibold text-brand-500 tracking-wide mb-4">ناس حقيقية، نتايج حقيقية</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.15]">
            مكانوش مصممين.
            <br />
            <span className="text-muted-foreground">بدأوا من صفر ودلوقتي بيكسبوا.</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="max-w-5xl mx-auto space-y-6" staggerDelay={0.12}>
          {CASES.map((c, i) => (
            <StaggerItem key={c.name}>
              <div className="group rounded-2xl border border-border hover:border-brand-200 dark:hover:border-brand-800/40 bg-card transition-all duration-300 overflow-hidden">
                <div className="grid md:grid-cols-3">
                  {/* Info column */}
                  <div className="bg-brand-950 text-white p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-brand-400 mb-1">{c.tag}</p>
                      <h3 className="text-xl font-bold">{c.name}</h3>
                      <p className="text-white/40 text-sm">{c.age} سنة</p>
                    </div>
                    <div className="flex gap-6 mt-6">
                      <div>
                        <p className="text-2xl font-bold text-brand-400">{c.income}</p>
                        <p className="text-[10px] text-white/30">جنيه/شهر</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white/70 flex items-center gap-1.5">
                          <IconClock className="size-4" />
                          {c.time}
                        </p>
                        <p className="text-[10px] text-white/30">لأول client</p>
                      </div>
                    </div>
                  </div>

                  {/* Story column */}
                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-xs font-semibold text-red-500 mb-2">قبل</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.before}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-600 mb-2">بعد</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.after}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-4 border-t border-border">
                      <IconQuote className="size-5 text-brand-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-medium italic leading-relaxed">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
