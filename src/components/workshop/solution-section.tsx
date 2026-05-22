"use client";

import {
  IconCheck,
  IconBrush,
  IconRobot,
  IconSpeakerphone,
  IconBrandLinkedin,
  IconUserStar,
  IconWorldWww,
} from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const PILLARS = [
  {
    icon: <IconBrush className="size-6" />,
    title: "تصميم من الصفر",
    desc: "فوتوشوب + إليستريتور + كانفا",
    span: "sm:col-span-2",
  },
  {
    icon: <IconRobot className="size-6" />,
    title: "AI يخليك أسرع 10x",
    desc: "أدوات بتتحدث مدى الحياة",
    span: "",
  },
  {
    icon: <IconWorldWww className="size-6" />,
    title: "موقع يعرض خدماتك",
    desc: "Portfolio + صفحة خدمات احترافية",
    span: "",
  },
  {
    icon: <IconSpeakerphone className="size-6" />,
    title: "تسويق وبيع",
    desc: "تكلم client وتقفل الـ deal",
    span: "sm:col-span-2",
  },
  {
    icon: <IconUserStar className="size-6" />,
    title: "تبقى خيار الشركات الأول",
    desc: "تقدم نفسك كمحترف مش مبتدئ",
    span: "",
  },
  {
    icon: <IconBrandLinkedin className="size-6" />,
    title: "LinkedIn يجيبلك شغل",
    desc: "بروفايل + خطة محتوى 30 يوم",
    span: "",
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-950 text-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Right — Text (RTL) */}
          <div>
            <FadeIn direction="right">
              <p className="text-sm font-semibold text-brand-400 tracking-wide mb-4">الحل</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15]">
                مش كورس.
                <br />
                <span className="text-white/50">نظام كامل يحوّلك لحد بيكسب.</span>
              </h2>
              <p className="mt-5 text-white/40 text-lg leading-relaxed max-w-md">
                هتتعلم مهارة الشركات بتدفع فيها آلاف. هتبني portfolio وموقع.
                وهتعرف تجيب clients وتشتغل فعلاً — مش بعد سنة، في أول 90 يوم.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="mt-8 flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-400">30+</p>
                  <p className="text-xs text-white/30 mt-1">ساعة عملي</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-400">7</p>
                  <p className="text-xs text-white/30 mt-1">محاور كاملة</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-400">300+</p>
                  <p className="text-xs text-white/30 mt-1">بدأوا يكسبوا</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Left — Bento grid */}
          <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.07}>
            {PILLARS.map((p) => (
              <StaggerItem key={p.title}>
                <div
                  className={`group rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-brand-500/30 p-5 transition-all duration-300 h-full ${p.span}`}
                >
                  <div className="text-brand-400 mb-3 group-hover:text-brand-300 transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-white text-[15px] leading-snug">{p.title}</h3>
                  <p className="text-white/35 text-sm mt-1.5">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
