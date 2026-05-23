"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconQuote } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    name: "سارة محمد",
    tag: "خريجة — كانت مش لاقية شغل",
    result: "4,000+",
    unit: "جنيه/شهر",
    time: "5 أسابيع لأول client",
    quote: "المشكلة مكنتش إني مش شاطرة — كانت إن محدش كان شايفني.",
  },
  {
    name: "محمد خالد",
    tag: "طالب — عايز دخل جنب الكلية",
    result: "6,000",
    unit: "جنيه/شهر",
    time: "3 أسابيع لأول client",
    quote: "أول مرة أحس إن عندي مهارة حقيقية بتجيب فلوس.",
  },
  {
    name: "نورهان عادل",
    tag: "موظفة — مرتبها مكنش كفاية",
    result: "7,000+",
    unit: "إضافي/شهر",
    time: "6 أسابيع لأول client",
    quote: "الكورس اختصرلي الطريق وفتحلي باب فلوس جديد.",
  },
];

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // العنوان
      gsap.fromTo(
        ".case-header",
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

      // الكروت — stagger
      const cards = section.querySelectorAll(".case-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a]">
      <div className="container">
        <div className="case-header max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-5">
            نتايج حقيقية
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
            مكانوش مصممين.
            <br />
            <span className="text-white/40">
              بدأوا من صفر ودلوقتي بيكسبوا.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <div
              key={c.name}
              className="case-card group relative rounded-2xl p-8 md:p-10 flex flex-col justify-between bg-[#0a0a0a] border border-white/5 hover:border-brand-500/30 transition-all duration-500"
              style={{
                boxShadow: "0 0 0 0 rgba(160,2,255,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 50px -12px rgba(160,2,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 0 0 rgba(160,2,255,0)";
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-white/30 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    {c.tag}
                  </span>
                  <IconQuote className="size-5 text-white/25 group-hover:text-brand-400/50 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{c.name}</h3>
                <p className="text-sm text-white/35 leading-relaxed italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-brand-400">
                    {c.result}
                  </p>
                  <span className="text-sm text-white/50">{c.unit}</span>
                </div>
                <p className="text-xs text-white/40 mt-1">{c.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
