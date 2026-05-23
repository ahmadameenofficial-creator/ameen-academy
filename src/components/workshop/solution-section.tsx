"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconBrush,
  IconRobot,
  IconWorldWww,
  IconSpeakerphone,
  IconUserStar,
  IconBrandLinkedin,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { icon: IconBrush, title: "تصميم من الصفر", desc: "فوتوشوب + إليستريتور + كانفا — من أول ما تفتح البرنامج" },
  { icon: IconRobot, title: "AI يخليك أسرع 10x", desc: "أدوات ذكاء اصطناعي بتتحدث مدى الحياة" },
  { icon: IconWorldWww, title: "موقع يعرض خدماتك", desc: "Portfolio + صفحة خدمات احترافية تبيع نفسها" },
  { icon: IconSpeakerphone, title: "تسويق وبيع", desc: "تتكلم مع client وتقفل deal باحترافية" },
  { icon: IconUserStar, title: "خيار الشركات الأول", desc: "تقدم نفسك كمحترف مش freelancer عادي" },
  { icon: IconBrandLinkedin, title: "LinkedIn يجيبلك شغل", desc: "بروفايل قوي + خطة محتوى 30 يوم" },
];

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // الهيدر
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // الأرقام
      const stats = header.querySelectorAll(".stat-item");
      stats.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 60%",
              toggleActions: "play none none none",
            },
            delay: 0.3 + i * 0.1,
          }
        );
      });

      // الكروت — كل كارت بيظهر بالتتابع مع glow
      const cardEls = cards.querySelectorAll(".solution-card");
      cardEls.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.06,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a]">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 md:mb-20">
          <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-5">
            الحل
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
            مش كورس.
            <br />
            <span className="text-white/40">نظام كامل يحوّلك لحد بيكسب.</span>
          </h2>

          {/* Stats */}
          <div className="flex gap-12 md:gap-20 mt-12">
            {[
              { n: "30+", l: "ساعة عملي" },
              { n: "7", l: "محاور كاملة" },
              { n: "300+", l: "بدأوا يكسبوا" },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <p className="text-4xl md:text-5xl font-bold text-brand-400">
                  {s.n}
                </p>
                <p className="text-sm text-white/30 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service cards — neon border + glow */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="solution-card group relative rounded-2xl p-8 bg-[#0a0a0a] border border-brand-500/20 hover:border-brand-400/50 transition-all duration-500"
              style={{
                boxShadow: "0 0 0 0 rgba(160,2,255,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 40px -8px rgba(160,2,255,0.25), inset 0 1px 0 0 rgba(160,2,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 0 0 rgba(160,2,255,0)";
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 mb-5 group-hover:bg-brand-500/20 transition-colors duration-300">
                <p.icon className="size-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
