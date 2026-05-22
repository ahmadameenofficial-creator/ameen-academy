"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconAlertTriangle } from "@tabler/icons-react";

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
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle red glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[120px]" />

      <div className="container relative">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                <IconAlertTriangle className="size-4 text-red-500" />
              </div>
              <p className="text-sm font-medium text-red-500">المشكلة</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-16">
              لو أي حاجة من دول
              <br />
              حصلت معاك —
              <br />
              <span className="text-muted-foreground/40">يبقى إنت في المكان الصح.</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {PAINS.map((pain, i) => (
              <motion.div
                key={pain}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group relative"
              >
                <div className="flex items-center gap-6 py-6 border-b border-border/60 last:border-0 relative">
                  {/* Hover glow line */}
                  <div className="absolute inset-y-0 right-0 w-[2px] bg-brand-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" />

                  <span className="text-[13px] font-mono text-muted-foreground/30 shrink-0 w-6 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="text-lg md:text-xl text-foreground font-medium group-hover:text-brand-500 group-hover:translate-x-[-4px] transition-all duration-300">
                    {pain}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
