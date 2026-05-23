"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconShieldCheck } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

export function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // الأيقونة — scale up مع glow
      gsap.fromTo(
        ".guarantee-icon",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // النص
      gsap.fromTo(
        ".guarantee-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          delay: 0.2,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#060610]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="guarantee-icon flex justify-center mb-8">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500"
              style={{
                boxShadow:
                  "0 0 40px -5px rgba(160,2,255,0.4), 0 0 80px -10px rgba(160,2,255,0.15)",
              }}
            >
              <IconShieldCheck className="size-8 text-white" />
            </div>
          </div>

          <div className="guarantee-text space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              ضمان أحمد أمين الشخصي
            </h2>
            <p
              className="text-brand-400 font-semibold text-lg"
            >
              ضمان &ldquo;أول 5,000 جنيه&rdquo;
            </p>

            <p className="text-lg text-white/60 leading-relaxed">
              طبّق اللي في الكورس لمدة 90 يوم. لو مكسبتش أول 5,000 جنيه —
              هرجعلك كل فلوسك. بدون أسئلة.
            </p>

            <p className="text-white/30 leading-relaxed max-w-lg mx-auto">
              المخاطرة = صفر. إنت بتستثمر 1,500 جنيه في نفسك — ولو
              الاستثمار ده مجابش نتيجة، فلوسك كاملة ترجع. أنا اللي شايل الـ
              risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
