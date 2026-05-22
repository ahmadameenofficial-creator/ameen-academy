"use client";

import Link from "next/link";
import { IconArrowLeft, IconShieldCheck, IconClock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "warshit-ameen";

export function FinalCtaSection() {
  return (
    <section className="py-24 md:py-32 bg-brand-950 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-[150px]" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
            عندك اختيارين.
          </h2>

          <p className="text-white/35 text-lg max-w-md mx-auto leading-relaxed">
            بعد 90 يوم — إما هتكون بدأت تكسب فعلاً، أو هتكون لسه بتقول
            &ldquo;بكرة هبدأ&rdquo;.
          </p>

          <div className="pt-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/20 line-through text-lg">3,000</span>
              <span className="text-5xl md:text-6xl font-bold">1,500</span>
              <span className="text-white/30 text-sm self-end mb-2">جنيه</span>
            </div>

            <Button
              asChild
              size="xl"
              className="bg-white text-brand-700 hover:bg-white/90 font-bold px-12"
            >
              <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                ابدأ دلوقتي
                <IconArrowLeft className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-xs text-white/20 pt-4">
            <span className="flex items-center gap-2">
              <IconShieldCheck className="size-4" />
              ضمان كامل
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4" />
              وصول مدى الحياة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
