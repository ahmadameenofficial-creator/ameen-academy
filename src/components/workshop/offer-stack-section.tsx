"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCheck, IconArrowLeft, IconFlame } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const COURSE_SLUG = "warshit-ameen";

const ITEMS = [
  { title: "الكورس الأساسي — 30+ ساعة", value: "3,000" },
  { title: "Website Kit — موقعك الشخصي جاهز", value: "2,000" },
  { title: "Portfolio Kit — 5 Templates", value: "1,500" },
  { title: "10 رسائل جاهزة تجيبلك clients", value: "1,000" },
  { title: "أداة تسعير شغلك", value: "500" },
  { title: "AI Toolkit بيتحدث مدى الحياة", value: "1,500" },
  { title: "مجتمع أكاديمية أمين + فرص شغل", value: "2,000" },
  { title: "LinkedIn Makeover + خطة 30 يوم", value: "800" },
];

export function OfferStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".offer-header",
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

      // كل صف في الـ stack
      const rows = section.querySelectorAll(".offer-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.06,
          }
        );
      });

      // الـ price card
      gsap.fromTo(
        ".price-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".price-card",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="offer-header text-center mb-14">
            <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-5">
              العرض الكامل
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              كل ده بسعر أقل
              <br />
              <span className="text-white/40">من أول شغلانة هتجيبها.</span>
            </h2>
          </div>

          {/* Stack */}
          <div className="mb-12 rounded-2xl border border-white/5 overflow-hidden bg-white/[0.02]">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="offer-row flex items-center justify-between py-5 px-6 md:px-8 border-b border-white/5 last:border-0 group hover:bg-brand-500/5 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors duration-300">
                    <IconCheck className="size-3.5 text-brand-400" />
                  </div>
                  <span className="text-[15px] text-white/70">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-white/35 line-through shrink-0">
                  {item.value} ج
                </span>
              </div>
            ))}
          </div>

          {/* Price card — الـ glow الرئيسي */}
          <div
            className="price-card rounded-3xl p-10 md:p-14 text-center border border-brand-500/20 relative overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(160,2,255,0.08), #0a0a0a 70%)",
              boxShadow:
                "0 0 80px -20px rgba(160,2,255,0.15), inset 0 1px 0 0 rgba(160,2,255,0.1)",
            }}
          >
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-white/50 text-sm">القيمة الحقيقية</p>
                <p className="text-4xl font-bold text-white/30 line-through mt-1">
                  12,300 جنيه
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15">
                <IconFlame className="size-4 text-orange-400" />
                <p className="text-sm text-white/40">عرض لأول 50 مشترك</p>
              </div>

              <div>
                <p className="text-7xl md:text-8xl font-bold tracking-tight text-white">
                  1,500
                </p>
                <p className="text-white/45 text-sm mt-1">جنيه مصري</p>
              </div>

              <Button
                asChild
                size="xl"
                className="workshop-btn-glow text-base px-12 py-4 rounded-full border border-brand-300/30 bg-transparent text-white font-bold"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>

              <p className="text-white/40 text-xs">
                ضمان كامل — فلوسك ترجع لو مكسبتش
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
