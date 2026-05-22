"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { IconArrowLeft, IconShieldCheck, IconClock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "warshit-ameen";

export function FinalCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] text-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
            عندك اختيارين.
          </h2>

          <p className="text-white/35 text-lg max-w-md mx-auto leading-relaxed">
            بعد 90 يوم — إما هتكون بدأت تكسب فعلاً، أو هتكون لسه بتقول
            &ldquo;بكرة هبدأ&rdquo;.
          </p>

          <div className="pt-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/15 line-through text-lg">3,000</span>
              <span className="text-6xl md:text-7xl font-bold">1,500</span>
              <span className="text-white/25 text-sm self-end mb-2">جنيه</span>
            </div>

            <Button
              asChild
              size="xl"
              className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold px-12"
            >
              <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                ابدأ دلوقتي
                <IconArrowLeft className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-white/25 pt-4">
            <span className="flex items-center gap-2">
              <IconShieldCheck className="size-4" />
              ضمان كامل
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4" />
              وصول مدى الحياة
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
