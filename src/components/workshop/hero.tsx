"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconUsers,
  IconClock,
  IconShieldCheck,
  IconCheck,
  IconFlame,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FadeIn,
  ScaleIn,
  FloatingElement,
  SlideReveal,
} from "@/components/ui/motion";

const COURSE_SLUG = "warshit-ameen";

export function WorkshopHero() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Unique bg — mesh gradient + noise */}
      <div className="absolute inset-0 bg-[#080014]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(160,2,255,0.15), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(109,1,176,0.1), transparent)",
        }}
      />
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-brand-500/40 to-transparent" />

      <div className="container relative py-16 md:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Right side — Text (RTL first) */}
          <div className="space-y-6 md:space-y-8 text-right">
            <FadeIn direction="right" delay={0.1}>
              <Badge className="bg-white/5 text-brand-300 border border-white/10 backdrop-blur-sm px-4 py-2 text-sm">
                <IconFlame className="size-4 ml-1.5 text-orange-400" />
                عرض لأول 50 مشترك — بعد كده السعر يرجع 3,000 جنيه
              </Badge>
            </FadeIn>

            <div>
              <SlideReveal delay={0.15}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white leading-[1.15] tracking-tight">
                  اكسب أول{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-l from-brand-300 to-brand-500 bg-clip-text text-transparent">
                      5,000 جنيه
                    </span>
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-l from-brand-300 to-brand-500 rounded-full opacity-60" />
                  </span>
                </h1>
              </SlideReveal>
              <SlideReveal delay={0.3}>
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white leading-[1.15] tracking-tight mt-3">
                  من مهارة حقيقية — في{" "}
                  <span className="text-brand-400">90 يوم</span>
                </p>
              </SlideReveal>
            </div>

            <FadeIn direction="up" delay={0.45}>
              <p className="text-lg md:text-xl text-white/50 max-w-lg leading-relaxed">
                هتتعلم تصميم + AI + تسويق + تبني موقعك. وهتشتغل فعلاً
                وتجيب فلوس حقيقية — مش وعود، ده نظام مجرّب على 300+ شخص.
              </p>
            </FadeIn>

            <ScaleIn delay={0.55}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  asChild
                  variant="gradient"
                  size="xl"
                  className="text-base px-10 shadow-lg shadow-brand-500/25"
                >
                  <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                    ابدأ دلوقتي بـ 1,500 جنيه
                    <IconArrowLeft className="size-5" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-white/40 pt-2">
                  بدل{" "}
                  <span className="line-through text-white/50 font-bold">3,000 جنيه</span>
                  <span className="text-brand-400 font-semibold">وفّر 50%</span>
                </div>
              </div>
            </ScaleIn>
          </div>

          {/* Left side — Visual proof cards (desktop) */}
          <div className="hidden lg:flex flex-col gap-5 items-center justify-center">
            <FloatingElement amplitude={6} duration={6}>
              <FadeIn direction="left" delay={0.3}>
                <div className="relative w-[340px]">
                  {/* Main guarantee card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl shadow-brand-500/5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
                        <IconShieldCheck className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">ضمان 90 يوم</p>
                        <p className="text-white/40 text-xs">لو مكسبتش — فلوسك ترجع</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {["30+ ساعة محتوى عملي", "موقع شخصي يبيعلك", "AI Tools حصرية", "مجتمع + فرص شغل"].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20">
                            <IconCheck className="size-3 text-brand-400" />
                          </div>
                          <span className="text-sm text-white/60">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating stat */}
                  <div className="absolute -bottom-5 -right-5 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-5 py-3 shadow-xl">
                    <p className="text-2xl font-bold text-brand-400">+300</p>
                    <p className="text-[11px] text-white/40">بدأوا يكسبوا</p>
                  </div>
                </div>
              </FadeIn>
            </FloatingElement>
          </div>
        </div>

        {/* Bottom stats bar — glassmorphism */}
        <FadeIn direction="up" delay={0.7}>
          <div className="mt-12 lg:mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm">
              <div className="flex items-center gap-2.5 text-white/50">
                <IconShieldCheck className="size-5 text-brand-400" />
                <span>ضمان استرداد كامل</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2.5 text-white/50">
                <IconUsers className="size-5 text-brand-400" />
                <span>+300 بدأوا يكسبوا</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2.5 text-white/50">
                <IconClock className="size-5 text-brand-400" />
                <span>30+ ساعة عملي من الصفر</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
