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
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4">المشكلة</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-16">
              لو أي حاجة من دول
              <br />
              حصلت معاك —
              <br />
              <span className="text-neutral-400">يبقى إنت في المكان الصح.</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {PAINS.map((pain, i) => (
              <motion.div
                key={pain}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                className="group flex items-center gap-6 py-5 border-b border-neutral-100 last:border-0"
              >
                <span className="text-[13px] font-mono text-neutral-300 shrink-0 w-6 tabular-nums">
                  0{i + 1}
                </span>
                <span className="text-lg md:text-xl text-neutral-800 font-medium group-hover:text-brand-500 transition-colors duration-200">
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
