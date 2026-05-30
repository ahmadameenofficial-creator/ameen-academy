"use client";

import { motion } from "framer-motion";
import { IconArrowLeft, IconCircleDot, IconCalendarEvent } from "@tabler/icons-react";
import { ROUND_INFO, EARLY_BIRD_DISCOUNT } from "../_constants";

interface HeroProps {
  remainingSeats: number;
}

export function Hero({ remainingSeats }: HeroProps) {
  const filledSeats = ROUND_INFO.totalSeats - remainingSeats;

  return (
    <section className="relative overflow-hidden pt-20 md:pt-32 pb-24 md:pb-40">
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(160,2,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(184,84,255,0.15),transparent_60%)]" />

        {/* Glowing orbs - متحرّكين */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-72 h-72 bg-brand-500 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-brand-700 rounded-full blur-3xl opacity-25"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
        {/* Round Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
          </span>
          <span className="text-xs md:text-sm text-white/80">
            Round الأول · بيبدأ <span className="font-bold text-brand-300">{ROUND_INFO.startMonth}</span>
          </span>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-6 text-white"
        >
          خطوة بخطوة
          <br />
          جنب
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-br from-brand-200 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              المحترفين.
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              style={{ originX: 1 }}
              className="absolute -bottom-2 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-full"
            />
          </span>
        </motion.h1>

        {/* SUB */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-3"
        >
          <span className="text-white font-medium">30 مصمم محترف</span> في غرفة واحدة. لايف كل أسبوعين،
          شغل بييجيلك، ومراجعة شخصية لكل سطر بتعمله. بتمشي معاهم خطوة بخطوة —
          <span className="text-white font-medium"> وتختصر سنين</span> كنت هتضيّعها لوحدك.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm md:text-base text-brand-300 font-medium mb-10"
        >
          ولو حجزت قبل 3 يونيو — بـ <span className="font-black text-brand-200">نص السعر</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 hover:from-brand-300 hover:to-brand-600 text-white font-black px-9 py-4 rounded-full shadow-2xl shadow-brand-500/40 transition-all hover:scale-105 hover:shadow-brand-400/50"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">احجز مكانك بـ {EARLY_BIRD_DISCOUNT}% خصم</span>
            <IconArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform relative" />
          </a>
          <a
            href="#whats-inside"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium px-6 py-4 transition-colors"
          >
            استنى، فهّمني الأول
            <IconArrowLeft className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Live Seat Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="inline-flex flex-col items-center gap-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6"
        >
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/60">
            <IconCalendarEvent className="h-4 w-4" />
            <span>الـ Round الأول · {ROUND_INFO.startMonth}</span>
          </div>

          {/* Visual seat tracker */}
          <div className="flex gap-1.5 md:gap-2">
            {Array.from({ length: ROUND_INFO.totalSeats }).map((_, i) => {
              const isFilled = i < filledSeats;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.9 + i * 0.02,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-sm ${
                    isFilled
                      ? "bg-brand-500 shadow-[0_0_8px_rgba(160,2,255,0.6)]"
                      : "bg-white/10"
                  }`}
                />
              );
            })}
          </div>

          <div className="text-xs md:text-sm text-white/80">
            <span className="font-black text-brand-300 text-base md:text-lg">{filledSeats}</span>
            <span className="text-white/50"> محجوز · </span>
            <span className="font-black text-white text-base md:text-lg">{remainingSeats}</span>
            <span className="text-white/50"> فاضل</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
