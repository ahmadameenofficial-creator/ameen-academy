"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconArrowLeft,
  IconUsers,
  IconClock,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const COURSE_SLUG = "warshit-ameen";

export function WorkshopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const panel1 = panel1Ref.current;
    const panel3 = panel3Ref.current;
    const divider = dividerRef.current;
    const cta = ctaRef.current;

    if (!section || !wrap || !panel1 || !panel3 || !divider || !cta) return;

    const ctx = gsap.context(() => {
      const totalWidth = wrap.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = totalWidth - viewportWidth;

      const scrollLength = distance * 2.5;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollLength}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl
        // الـ divider بيظهر أول حاجة
        .fromTo(divider, { scaleX: 0 }, { scaleX: 1, ease: "power2.out", duration: 0.3 }, 0)
        // Panel 1 بيختفي
        .to(panel1, { opacity: 0.1, scale: 0.9, duration: 0.3 }, 0.15)
        // الـ horizontal scroll الكامل
        .fromTo(wrap, { x: -distance }, { x: 0, ease: "none", duration: 1 }, 0)
        // Panel 3 بيظهر
        .fromTo(panel3, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }, 0.55)
        // CTA بيظهر
        .fromTo(cta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.25 }, 0.7);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] min-h-[100svh]"
      dir="ltr"
    >
      {/* الـ glow الخلفي */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(160,2,255,0.08), transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(109,1,176,0.05), transparent 60%)
          `,
        }}
      />

      {/* الحاوية الأفقية — 3 بانلز */}
      <div
        ref={wrapRef}
        className="flex flex-row items-center min-h-[100svh]"
        style={{ width: "280vw" }}
        dir="rtl"
      >
        {/* ── Panel 1: هنخليك مصمم جرافيك ── */}
        <div
          ref={panel1Ref}
          className="flex items-center justify-center w-[100vw] min-h-[100svh] shrink-0 px-6"
        >
          <div className="text-center space-y-6 max-w-3xl">
            <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold text-white leading-[0.95] tracking-tight">
              هنخليك
              <br />
              <span className="text-brand-400">مصمم جرافيك</span>
            </h1>

            <div
              ref={dividerRef}
              className="mx-auto h-[3px] w-full max-w-md origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #A002FF, transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Panel 2: بقواعد لعب 2026 ── */}
        <div className="flex items-center justify-center w-[80vw] min-h-[100svh] shrink-0">
          <div className="text-center">
            <p className="text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-[0.95] tracking-tight">
              بقواعد لعب
              <br />
              <span className="text-brand-400">2026</span>
            </p>
          </div>
        </div>

        {/* ── Panel 3: بسيستم عملي واقعي ── */}
        <div
          ref={panel3Ref}
          className="flex items-center justify-center w-[100vw] min-h-[100svh] shrink-0 px-6"
          style={{ opacity: 0 }}
        >
          <div className="text-center space-y-8 max-w-3xl">
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white leading-[1.1] tracking-tight">
              بسيستم عملي واقعي
              <br />
              <span className="text-brand-400">يناسبك 100%</span>
            </h1>

            {/* CTA */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="space-y-5 pt-4">
              <Button
                asChild
                size="xl"
                className="workshop-btn-glow text-lg px-14 py-5 rounded-full border border-brand-300/40 bg-brand-500/10 text-white font-bold"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي بـ 1,500 جنيه
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
              <p className="text-white/50 text-base">
                بدل <span className="line-through">3,000</span> — عرض لأول 50
                مشترك
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <IconShieldCheck className="size-4" />
                  ضمان استرداد كامل
                </span>
                <span className="flex items-center gap-2">
                  <IconUsers className="size-4" />
                  +300 بدأوا يكسبوا
                </span>
                <span className="flex items-center gap-2">
                  <IconClock className="size-4" />
                  30+ ساعة عملي
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
