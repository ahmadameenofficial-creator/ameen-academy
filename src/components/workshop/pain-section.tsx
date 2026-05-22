"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PAINS = [
  "مرتبك بيخلص قبل الشهر ما يخلص",
  "بتتفرج على كورسات كتير ومش بتكسب",
  "مش عارف تبدأ منين — كل يوم بتأجّل",
  "جربت حاجات كتير ومفيش نتيجة",
  "عندك مهارة بس محدش شايفك",
];

export function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-red-500 mb-6">المشكلة</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-16">
            لو أي حاجة من دول
            <br />
            حصلت معاك —
            <br />
            <span className="text-muted-foreground/50">يبقى إنت في المكان الصح.</span>
          </h2>

          <div className="space-y-0">
            {PAINS.map((pain, i) => (
              <motion.div
                key={pain}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex items-center gap-6 py-5 border-b border-border last:border-0"
              >
                <span className="text-[13px] font-mono text-muted-foreground/40 shrink-0 w-6">
                  0{i + 1}
                </span>
                <span className="text-lg md:text-xl text-foreground font-medium group-hover:text-brand-500 transition-colors">
                  {pain}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
