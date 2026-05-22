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

const PILLARS = [
  { icon: IconBrush, title: "تصميم من الصفر", desc: "فوتوشوب + إليستريتور + كانفا" },
  { icon: IconRobot, title: "AI يخليك أسرع 10x", desc: "أدوات بتتحدث مدى الحياة" },
  { icon: IconWorldWww, title: "موقع يعرض خدماتك", desc: "Portfolio + خدمات احترافية" },
  { icon: IconSpeakerphone, title: "تسويق وبيع", desc: "تكلم client وتقفل deal" },
  { icon: IconUserStar, title: "خيار الشركات الأول", desc: "تقدم نفسك كمحترف" },
  { icon: IconBrandLinkedin, title: "LinkedIn يجيبلك شغل", desc: "بروفايل + خطة 30 يوم" },
];

export function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-brand-950 text-white relative overflow-hidden" ref={ref}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-sm font-medium text-brand-400 mb-6">الحل</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
            مش كورس.
            <br />
            <span className="text-white/30">نظام كامل يحوّلك لحد بيكسب.</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="flex gap-12 md:gap-16 mb-16 md:mb-20">
          {[
            { n: "30+", l: "ساعة عملي" },
            { n: "7", l: "محاور كاملة" },
            { n: "300+", l: "بدأوا يكسبوا" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-4xl md:text-5xl font-bold text-brand-400">{s.n}</p>
              <p className="text-xs text-white/25 mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-brand-950 p-8 hover:bg-white/[0.03] transition-colors group"
            >
              <p.icon className="size-6 text-brand-400 mb-4 group-hover:text-brand-300 transition-colors" />
              <h3 className="text-lg font-bold mb-1.5">{p.title}</h3>
              <p className="text-sm text-white/30">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
