"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconBrush,
  IconRobot,
  IconWorldWww,
  IconSpeakerphone,
  IconUserStar,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useTilt } from "@/hooks/use-tilt";
import type { MouseEvent } from "react";

const PILLARS = [
  { icon: IconBrush, title: "تصميم من الصفر", desc: "فوتوشوب + إليستريتور + كانفا" },
  { icon: IconRobot, title: "AI يخليك أسرع 10x", desc: "أدوات بتتحدث مدى الحياة" },
  { icon: IconWorldWww, title: "موقع يعرض خدماتك", desc: "Portfolio + خدمات احترافية" },
  { icon: IconSpeakerphone, title: "تسويق وبيع", desc: "تكلم client وتقفل deal" },
  { icon: IconUserStar, title: "خيار الشركات الأول", desc: "تقدم نفسك كمحترف" },
  { icon: IconBrandLinkedin, title: "LinkedIn يجيبلك شغل", desc: "بروفايل + خطة 30 يوم" },
];

function TiltCard({ pillar, index, inView }: { pillar: typeof PILLARS[0]; index: number; inView: boolean }) {
  const tilt = useTilt(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove as unknown as (e: MouseEvent<HTMLDivElement>) => void}
        onMouseLeave={tilt.onMouseLeave}
        className="relative group h-full bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-8 transition-all duration-300 hover:border-brand-500/20 hover:bg-white/[0.05] cursor-default"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, background 0.3s, border-color 0.3s" }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-brand-500/0 group-hover:bg-brand-500/[0.04] blur-xl transition-all duration-500" />

        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/10 mb-5 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-shadow duration-500">
            <pillar.icon className="size-6 text-brand-400 group-hover:text-brand-300 transition-colors" />
          </div>
          <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
          <p className="text-sm text-white/30">{pillar.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-24 md:py-32 bg-[#080014] text-white relative overflow-hidden" ref={ref}>
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(160,2,255,0.08), transparent 60%)",
            "radial-gradient(ellipse 40% 50% at 20% 80%, rgba(109,1,176,0.06), transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orb */}
      <div className="absolute top-[10%] left-[5%] w-48 h-48 animate-float">
        <div className="w-full h-full rounded-full bg-brand-500/8 blur-[80px]" />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-brand-400 mb-6">الحل</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
            مش كورس.
            <br />
            <span className="text-white/25">نظام كامل يحوّلك لحد بيكسب.</span>
          </h2>
        </motion.div>

        {/* Stats with glow */}
        <div className="flex gap-12 md:gap-16 mb-16 md:mb-20">
          {[
            { n: "30+", l: "ساعة عملي" },
            { n: "7", l: "محاور كاملة" },
            { n: "300+", l: "بدأوا يكسبوا" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-brand-300 to-brand-500 bg-clip-text text-transparent">
                {s.n}
              </p>
              <p className="text-xs text-white/20 mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* 3D Tilt cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <TiltCard key={p.title} pillar={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
