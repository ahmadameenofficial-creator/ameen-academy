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
  { icon: IconBrush, title: "تصميم من الصفر", desc: "فوتوشوب + إليستريتور + كانفا — من أول ما تفتح البرنامج" },
  { icon: IconRobot, title: "AI يخليك أسرع 10x", desc: "أدوات ذكاء اصطناعي بتتحدث مدى الحياة" },
  { icon: IconWorldWww, title: "موقع يعرض خدماتك", desc: "Portfolio + صفحة خدمات احترافية تبيع نفسها" },
  { icon: IconSpeakerphone, title: "تسويق وبيع", desc: "تتكلم مع client وتقفل deal باحترافية" },
  { icon: IconUserStar, title: "خيار الشركات الأول", desc: "تقدم نفسك كمحترف مش freelancer عادي" },
  { icon: IconBrandLinkedin, title: "LinkedIn يجيبلك شغل", desc: "بروفايل قوي + خطة محتوى 30 يوم" },
];

export function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-24 md:py-32 bg-neutral-50" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">الحل</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1]">
            مش كورس.
            <br />
            <span className="text-neutral-400">نظام كامل يحوّلك لحد بيكسب.</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="flex gap-12 md:gap-20 mb-16 md:mb-20">
          {[
            { n: "30+", l: "ساعة عملي" },
            { n: "7", l: "محاور كاملة" },
            { n: "300+", l: "بدأوا يكسبوا" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-brand-500">{s.n}</p>
              <p className="text-sm text-neutral-400 mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* Service cards grid — clean, like the reference */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-neutral-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mb-5 group-hover:bg-brand-100 transition-colors duration-300">
                <p.icon className="size-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{p.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
