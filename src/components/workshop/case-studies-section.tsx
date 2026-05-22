"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";

const CASES = [
  {
    name: "سارة محمد",
    tag: "خريجة — كانت مش لاقية شغل",
    result: "4,000+ جنيه/شهر",
    time: "5 أسابيع لأول client",
    quote: "المشكلة مكنتش إني مش شاطرة — كانت إن محدش كان شايفني.",
  },
  {
    name: "محمد خالد",
    tag: "طالب — عايز دخل جنب الكلية",
    result: "6,000 جنيه/شهر",
    time: "3 أسابيع لأول client",
    quote: "أول مرة أحس إن عندي مهارة حقيقية بتجيب فلوس.",
  },
  {
    name: "نورهان عادل",
    tag: "موظفة — مرتبها مكنش كفاية",
    result: "7,000+ إضافي/شهر",
    time: "6 أسابيع لأول client",
    quote: "الكورس اختصرلي الطريق وفتحلي باب فلوس جديد.",
  },
];

export function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-brand-500 mb-6">نتايج حقيقية</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
            مكانوش مصممين.
            <br />
            <span className="text-muted-foreground/50">بدأوا من صفر ودلوقتي بيكسبوا.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {CASES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-card p-8 md:p-10 flex flex-col justify-between group hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-2">{c.tag}</p>
                <h3 className="text-xl font-bold text-foreground mb-6">{c.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-2xl font-bold text-brand-500">{c.result}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
