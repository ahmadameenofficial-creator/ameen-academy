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
    <section className="relative overflow-hidden bg-[#080014] min-h-[100svh] flex items-center">
      {/* Background mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 65% 30%, rgba(160,2,255,0.12), transparent 70%), radial-gradient(ellipse 50% 40% at 25% 75%, rgba(109,1,176,0.08), transparent 70%)",
        }}
      />
      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-brand-500/30 to-transparent" />

      <div className="container relative py-20 md:py-0">
        {/* Single column — centered for impact */}
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <p className="text-brand-400 text-sm font-medium tracking-wide">
            +300 شخص بدأوا يكسبوا فعلاً
          </p>

          {/* Headline — massive, clean */}
          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.08] tracking-tight">
            اكسب أول
            <br />
            <span className="bg-gradient-to-l from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">
              5,000 جنيه
            </span>
            <br />
            <span className="text-white/40 text-[0.6em]">من مهارة حقيقية — في 90 يوم</span>
          </h1>

          {/* Subtitle — smaller, breathing */}
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            هتتعلم تصميم + AI + تسويق + تبني موقعك.
            <br className="hidden sm:block" />
            وهتشتغل فعلاً وتجيب فلوس حقيقية. نظام مجرّب على 300+ شخص.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <Button
              asChild
              variant="gradient"
              size="xl"
              className="text-base px-12 shadow-xl shadow-brand-500/20"
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

          {/* Trust — minimal */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-6 text-[13px] text-white/30">
            <span className="flex items-center gap-2">
              <IconShieldCheck className="size-4 text-brand-500/60" />
              ضمان استرداد كامل
            </span>
            <span className="flex items-center gap-2">
              <IconUsers className="size-4 text-brand-500/60" />
              +300 بدأوا يكسبوا
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4 text-brand-500/60" />
              30+ ساعة عملي
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
