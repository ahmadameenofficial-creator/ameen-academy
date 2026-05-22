"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconUsers,
  IconClock,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "warshit-ameen";

export function WorkshopHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] min-h-[100svh] flex items-center">
      {/* Single subtle gradient — no orbs/noise/rings */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(160,2,255,0.08), transparent 70%)",
        }}
      />

      <div className="container relative z-10 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow — simple */}
          <p className="text-brand-400/80 text-sm font-medium">
            +300 شخص بدأوا يكسبوا فعلاً
          </p>

          {/* Headline */}
          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight">
            اكسب أول
            <br />
            <span className="text-brand-400">5,000 جنيه</span>
            <br />
            <span className="text-white/30 text-[0.55em] font-semibold">
              من مهارة حقيقية — في 90 يوم
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            هتتعلم تصميم + AI + تسويق + تبني موقعك.
            <br className="hidden sm:block" />
            وهتشتغل فعلاً وتجيب فلوس حقيقية.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <Button
              asChild
              variant="gradient"
              size="xl"
              className="text-base px-12"
            >
              <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                ابدأ دلوقتي بـ 1,500 جنيه
                <IconArrowLeft className="size-5" />
              </Link>
            </Button>
            <p className="text-white/25 text-sm">
              بدل <span className="line-through">3,000</span> — عرض لأول 50 مشترك
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-[13px] text-white/30">
            <span className="flex items-center gap-2">
              <IconShieldCheck className="size-4" />
              ضمان استرداد كامل
            </span>
            <span className="flex items-center gap-2">
              <IconUsers className="size-4" />
              +300 بدأوا يكسبوا
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4" />
              30+ ساعة عملي
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade to light */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-background" />
    </section>
  );
}
