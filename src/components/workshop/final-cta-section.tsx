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
    <section className="py-24 md:py-32 bg-[#050010] text-white relative overflow-hidden" ref={ref}>
      {/* Multi-layer background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(160,2,255,0.1), transparent 60%)",
            "radial-gradient(ellipse 40% 30% at 30% 70%, rgba(109,1,176,0.06), transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(160,2,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(160,2,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[20%] right-[15%] w-48 h-48 animate-float">
        <div className="w-full h-full rounded-full bg-brand-500/8 blur-[80px]" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] w-36 h-36 animate-float-delayed">
        <div className="w-full h-full rounded-full bg-brand-600/8 blur-[60px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
            عندك اختيارين.
          </h2>

          <p className="text-white/30 text-lg max-w-md mx-auto leading-relaxed">
            بعد 90 يوم — إما هتكون بدأت تكسب فعلاً، أو هتكون لسه بتقول
            &ldquo;بكرة هبدأ&rdquo;.
          </p>

          <div className="pt-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/15 line-through text-lg">3,000</span>
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500/15 rounded-full blur-[40px]" />
                <span className="relative text-6xl md:text-7xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  1,500
                </span>
              </div>
              <span className="text-white/25 text-sm self-end mb-2">جنيه</span>
            </div>

            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all duration-500" />
              <Button
                asChild
                size="xl"
                className="relative bg-white text-brand-700 hover:bg-white/90 font-bold px-12 shadow-2xl"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-white/20 pt-4">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <IconShieldCheck className="size-3.5" />
              ضمان كامل
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <IconClock className="size-3.5" />
              وصول مدى الحياة
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
