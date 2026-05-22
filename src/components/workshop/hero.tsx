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
    <section className="relative overflow-hidden bg-[#050010] min-h-[100svh] flex items-center">
      {/* === Layered background for depth === */}
      {/* Main gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(160,2,255,0.15), transparent 60%)",
            "radial-gradient(ellipse 40% 50% at 80% 70%, rgba(109,1,176,0.1), transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 15% 80%, rgba(83,0,133,0.08), transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* === 3D Floating orbs === */}
      {/* Large orb - top right */}
      <div className="absolute top-[15%] right-[10%] w-72 h-72 md:w-96 md:h-96 animate-float">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-500/20 to-brand-700/5 blur-[80px]" />
        <div className="absolute inset-[20%] rounded-full bg-brand-400/10 blur-[40px] animate-pulse-glow" />
      </div>

      {/* Medium orb - bottom left */}
      <div className="absolute bottom-[20%] left-[5%] w-52 h-52 md:w-72 md:h-72 animate-float-delayed">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-600/15 to-purple-900/5 blur-[60px]" />
      </div>

      {/* Small accent orb */}
      <div className="absolute top-[40%] left-[30%] w-32 h-32 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-full h-full rounded-full bg-brand-400/8 blur-[50px]" />
      </div>

      {/* === Rotating ring === */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-spin-slow opacity-[0.04]">
        <div className="w-full h-full rounded-full border border-brand-400" />
        <div className="absolute inset-[10%] rounded-full border border-brand-500/50" />
        <div className="absolute inset-[25%] rounded-full border border-brand-600/30" />
      </div>

      {/* Top light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[30vh] bg-gradient-to-b from-brand-400/40 to-transparent" />

      {/* Grid pattern for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(160,2,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(160,2,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow — glassmorphism pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-sm text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
            </span>
            +300 شخص بدأوا يكسبوا فعلاً
          </div>

          {/* Headline — massive with gradient glow behind */}
          <div className="relative">
            {/* Glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-brand-500/10 rounded-full blur-[100px]" />

            <h1 className="relative text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight">
              اكسب أول
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #C690FF 0%, #A002FF 40%, #6D01B0 100%)",
                }}
              >
                5,000 جنيه
              </span>
              <br />
              <span className="text-white/30 text-[0.55em] font-semibold">
                من مهارة حقيقية — في 90 يوم
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white/35 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            هتتعلم تصميم + AI + تسويق + تبني موقعك.
            <br className="hidden sm:block" />
            وهتشتغل فعلاً وتجيب فلوس حقيقية. نظام مجرّب على 300+ شخص.
          </p>

          {/* CTA with glow */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="relative group">
              {/* Glow behind button */}
              <div className="absolute inset-0 bg-brand-500/30 rounded-2xl blur-xl group-hover:bg-brand-500/50 transition-all duration-500" />
              <Button
                asChild
                variant="gradient"
                size="xl"
                className="relative text-base px-12 shadow-2xl shadow-brand-500/25"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي بـ 1,500 جنيه
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
            </div>
            <p className="text-white/20 text-sm">
              بدل <span className="line-through">3,000</span> — عرض لأول 50 مشترك
            </p>
          </div>

          {/* Trust — glassmorphism cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            {[
              { icon: IconShieldCheck, text: "ضمان استرداد كامل" },
              { icon: IconUsers, text: "+300 بدأوا يكسبوا" },
              { icon: IconClock, text: "30+ ساعة عملي" },
            ].map((t) => (
              <span
                key={t.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-[13px] text-white/30"
              >
                <t.icon className="size-3.5 text-brand-500/50" />
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
