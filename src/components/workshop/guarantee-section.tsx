"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconShieldCheck } from "@tabler/icons-react";

export function GuaranteeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-500/[0.04] rounded-full blur-[120px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Shield with glow */}
          <div className="relative flex justify-center mb-8">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-24 h-24 bg-brand-500/15 rounded-full blur-[30px] animate-pulse-glow" />
            </div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-500/25">
              <IconShieldCheck className="size-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            ضمان أحمد أمين الشخصي
          </h2>
          <p className="text-brand-500 font-semibold text-lg mb-8">
            ضمان &ldquo;أول 5,000 جنيه&rdquo;
          </p>

          <p className="text-lg text-foreground leading-relaxed mb-6">
            طبّق اللي في الكورس لمدة 90 يوم. لو مكسبتش أول 5,000 جنيه —
            هرجعلك كل فلوسك. بدون أسئلة.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            المخاطرة = صفر. إنت بتستثمر 1,500 جنيه في نفسك — ولو
            الاستثمار ده مجابش نتيجة، فلوسك كاملة ترجع. أنا اللي شايل الـ risk.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
