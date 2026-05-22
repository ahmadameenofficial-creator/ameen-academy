"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconQuote } from "@tabler/icons-react";
import { useTilt } from "@/hooks/use-tilt";
import type { MouseEvent } from "react";

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

function CaseCard({ c, i, inView }: { c: typeof CASES[0]; i: number; inView: boolean }) {
  const tilt = useTilt(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove as unknown as (e: MouseEvent<HTMLDivElement>) => void}
        onMouseLeave={tilt.onMouseLeave}
        className="relative group h-full rounded-2xl border border-border/50 bg-card p-8 md:p-10 transition-all duration-300 hover:border-brand-500/20 hover:shadow-2xl hover:shadow-brand-500/5"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s" }}
      >
        {/* Corner glow on hover */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/0 group-hover:bg-brand-500/10 rounded-full blur-[60px] transition-all duration-700" />

        <div className="relative flex flex-col justify-between h-full" style={{ transform: "translateZ(15px)" }}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground/60 font-medium px-3 py-1 rounded-full bg-muted/50">{c.tag}</p>
              <IconQuote className="size-5 text-brand-500/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-5">{c.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              &ldquo;{c.quote}&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40">
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold bg-gradient-to-l from-brand-400 to-brand-600 bg-clip-text text-transparent">
                {c.result}
              </p>
              <span className="text-sm text-muted-foreground">{c.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-1">{c.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/[0.03] rounded-full blur-[120px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium text-brand-500 mb-6">نتايج حقيقية</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
            مكانوش مصممين.
            <br />
            <span className="text-muted-foreground/40">بدأوا من صفر ودلوقتي بيكسبوا.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <CaseCard key={c.name} c={c} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
