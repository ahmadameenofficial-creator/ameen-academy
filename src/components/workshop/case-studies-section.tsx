"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconQuote } from "@tabler/icons-react";

const CASES = [
  {
    name: "سارة محمد",
    tag: "خريجة — كانت مش لاقية شغل",
    result: "4,000+",
    unit: "جنيه/شهر",
    time: "5 أسابيع لأول client",
    quote: "المشكلة مكنتش إني مش شاطرة — كانت إن محدش كان شايفني.",
  },
  {
    name: "محمد خالد",
    tag: "طالب — عايز دخل جنب الكلية",
    result: "6,000",
    unit: "جنيه/شهر",
    time: "3 أسابيع لأول client",
    quote: "أول مرة أحس إن عندي مهارة حقيقية بتجيب فلوس.",
  },
  {
    name: "نورهان عادل",
    tag: "موظفة — مرتبها مكنش كفاية",
    result: "7,000+",
    unit: "إضافي/شهر",
    time: "6 أسابيع لأول client",
    quote: "الكورس اختصرلي الطريق وفتحلي باب فلوس جديد.",
  },
];

export function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">نتايج حقيقية</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1]">
            مكانوش مصممين.
            <br />
            <span className="text-neutral-400">بدأوا من صفر ودلوقتي بيكسبوا.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="bg-neutral-50 rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-neutral-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-neutral-400 font-medium px-3 py-1 rounded-full bg-white border border-neutral-100">
                    {c.tag}
                  </span>
                  <IconQuote className="size-5 text-neutral-200 group-hover:text-brand-200 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{c.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-brand-500">{c.result}</p>
                  <span className="text-sm text-neutral-400">{c.unit}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">{c.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
