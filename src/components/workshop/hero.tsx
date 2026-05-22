"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconUsers,
  IconClock,
  IconShieldCheck,
  IconStar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FadeIn,
  ScaleIn,
  Parallax,
  FloatingElement,
  SlideReveal,
} from "@/components/ui/motion";

const COURSE_SLUG = "warshit-ameen";

export function WorkshopHero() {
  return (
    <section id="hero" className="relative overflow-hidden py-12 md:py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-[#0d0020]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <Parallax speed={-0.4} className="absolute top-1/4 right-0 w-[500px] h-[500px]">
        <div className="w-full h-full bg-brand-500/15 rounded-full blur-[150px]" />
      </Parallax>
      <Parallax speed={0.3} className="absolute bottom-0 left-1/4 w-[300px] h-[300px]">
        <div className="w-full h-full bg-brand-400/10 rounded-full blur-[120px]" />
      </Parallax>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center space-y-5 md:space-y-8">
          <FadeIn direction="down" delay={0.1}>
            <FloatingElement amplitude={5} duration={5}>
              <Badge className="bg-brand-500/20 text-brand-200 border border-brand-400/30 px-4 py-2 text-sm">
                <IconStar className="size-4 ml-1" />
                +300 شخص عادي بدأوا يكسبوا فلوس حقيقية من المهارة دي
              </Badge>
            </FloatingElement>
          </FadeIn>

          <div>
            <SlideReveal delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight">
                اتعلم مهارة بتجيب{" "}
                <span className="bg-gradient-to-l from-brand-300 to-brand-400 bg-clip-text text-transparent">
                  فلوس حقيقية
                </span>
              </h1>
            </SlideReveal>
            <SlideReveal delay={0.35}>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight mt-2 sm:mt-3">
                وابني{" "}
                <span className="bg-gradient-to-l from-brand-300 to-brand-400 bg-clip-text text-transparent">
                  بيزنس
                </span>{" "}
                يشتغل وإنت نايم
              </p>
            </SlideReveal>
          </div>

          <FadeIn direction="up" delay={0.5}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              تصميم + AI + موقع يبيعلك خدماتك 24/7. من الصفر — حتى لو عمرك ما
              فتحت برنامج تصميم. في 90 يوم هتكون عندك مهارة، portfolio، موقع،
              وأول client بيدفع.
            </p>
          </FadeIn>

          <ScaleIn delay={0.65}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="gradient"
                size="xl"
                className="w-full sm:w-auto text-base px-10"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي بـ 1,500 جنيه
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
              <p className="text-sm text-white/40">
                بدل{" "}
                <span className="line-through text-white/50">3,000 جنيه</span> —
                عرض لأول 50 مشترك
              </p>
            </div>
          </ScaleIn>

          <FadeIn direction="up" delay={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <IconShieldCheck className="size-5 text-brand-400" />
                <span>ضمان استرداد كامل</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers className="size-5 text-brand-400" />
                <span>+300 بدأوا يكسبوا</span>
              </div>
              <div className="flex items-center gap-2">
                <IconClock className="size-5 text-brand-400" />
                <span>30+ ساعة عملي من الصفر</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
