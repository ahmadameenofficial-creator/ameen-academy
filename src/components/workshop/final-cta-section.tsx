"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowLeft, IconShieldCheck, IconClock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const COURSE_SLUG = "warshit-ameen";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".final-cta-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      // السعر — scale up
      gsap.fromTo(
        ".final-price",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            toggleActions: "play none none none",
          },
          delay: 0.3,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(160,2,255,0.06), #0a0a0a 70%)",
      }}
    >
      <div className="container">
        <div className="final-cta-content max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-white">
            عندك اختيارين.
          </h2>

          <p className="text-white/25 text-lg max-w-md mx-auto leading-relaxed">
            بعد 90 يوم — إما هتكون بدأت تكسب فعلاً، أو هتكون لسه بتقول
            &ldquo;بكرة هبدأ&rdquo;.
          </p>

          <div className="final-price pt-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/10 line-through text-lg">3,000</span>
              <span className="text-6xl md:text-7xl font-bold text-white">
                1,500
              </span>
              <span className="text-white/20 text-sm self-end mb-2">جنيه</span>
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
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-white/20 pt-4">
            <span className="flex items-center gap-2">
              <IconShieldCheck className="size-4" />
              ضمان كامل
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4" />
              وصول مدى الحياة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
