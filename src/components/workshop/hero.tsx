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
      // الحاوية الأفقية — 3 panels
      const totalWidth = wrap.scrollWidth;
      const viewportWidth = window.innerWidth;
      const translateX = totalWidth - viewportWidth;

      // الـ horizontal scroll الأساسي
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${translateX * 2.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // حركة الـ wrap أفقياً (RTL = موجب لأن الاتجاه معكوس)
      tl.to(wrap, {
        x: translateX,
        ease: "none",
      });

      // الـ divider البنفسجي بيكبر مع السكرول
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${translateX * 0.8}`,
            scrub: 1,
          },
        }
      );

      // Panel 1 — fade out عند السكرول
      gsap.to(panel1, {
        opacity: 0.15,
        scale: 0.92,
        scrollTrigger: {
          trigger: section,
          start: () => `+=${translateX * 0.5}`,
          end: () => `+=${translateX * 1.5}`,
          scrub: 1,
        },
      });

      // Panel 3 — fade in
      gsap.fromTo(
        panel3,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: () => `+=${translateX * 1.2}`,
            end: () => `+=${translateX * 2}`,
            scrub: 1,
          },
        }
      );

      // CTA — يظهر في الأخير
      gsap.fromTo(
        cta,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: () => `+=${translateX * 1.8}`,
            end: () => `+=${translateX * 2.3}`,
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] min-h-[100svh]"
    >
      {/* الـ glow الخلفي — بنفسجي خافت */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(160,2,255,0.06), transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(109,1,176,0.04), transparent 60%)
          `,
        }}
      />

      {/* الحاوية الأفقية — 3 بانلز */}
      <div
        ref={wrapRef}
        className="flex flex-row items-center min-h-[100svh]"
        style={{ width: "280vw" }}
      >
        {/* ── Panel 1: الحالة الحالية ── */}
        <div
          ref={panel1Ref}
          className="flex items-center justify-center w-[100vw] min-h-[100svh] shrink-0 px-6"
        >
          <div className="text-center space-y-6 max-w-3xl">
            <p className="text-brand-400 text-sm font-medium uppercase tracking-[0.2em]">
              الحالة الحالية
            </p>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-[1] tracking-tight">
              بتتفرج
              <br />
              <span className="text-white/50">ومش بتكسب</span>
            </h1>

            {/* الخط الفاصل البنفسجي */}
            <div
              ref={dividerRef}
              className="mx-auto h-[3px] w-full max-w-md origin-right"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #A002FF, transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Panel 2: الفراغ / الانتقال ── */}
        <div className="flex items-center justify-center w-[80vw] min-h-[100svh] shrink-0">
          <div className="text-center">
            <p
              className="text-[clamp(1rem,3vw,1.5rem)] font-semibold text-white/30 uppercase tracking-[0.3em]"
            >
              في 90 يوم
            </p>
          </div>
        </div>

        {/* ── Panel 3: النتيجة ── */}
        <div
          ref={panel3Ref}
          className="flex items-center justify-center w-[100vw] min-h-[100svh] shrink-0 px-6 opacity-0"
        >
          <div className="text-center space-y-8 max-w-3xl">
            <p className="text-brand-400 text-sm font-medium uppercase tracking-[0.2em]">
              بعد ورشة أمين
            </p>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-[1] tracking-tight">
              أول
              <br />
              <span className="text-brand-400">5,000 جنيه</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              تصميم + AI + موقع + تسويق
              <br />
              من الصفر لأول دخل حقيقي
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="opacity-0 space-y-5 pt-4">
              <Button
                asChild
                size="xl"
                className="workshop-btn-glow text-base px-12 py-4 rounded-full border border-brand-300/30 bg-transparent text-white font-semibold"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي بـ 1,500 جنيه
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
              <p className="text-white/50 text-sm">
                بدل <span className="line-through">3,000</span> — عرض لأول 50
                مشترك
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[13px] text-white/50">
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
