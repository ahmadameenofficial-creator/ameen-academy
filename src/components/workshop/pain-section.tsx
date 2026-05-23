"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAINS = [
  "مرتبك بيخلص قبل الشهر ما يخلص",
  "بتتفرج على كورسات كتير ومش بتكسب",
  "مش عارف تبدأ منين — كل يوم بتأجّل",
  "جربت حاجات كتير ومفيش نتيجة",
  "عندك مهارة بس محدش شايفك",
];

export function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const items = itemsRef.current;
    if (!section || !heading || !items) return;

    const ctx = gsap.context(() => {
      // العنوان يظهر
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // كل عنصر يظهر واحد ورا التاني
      const painItems = items.querySelectorAll(".pain-item");
      painItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a]">
      <div className="container">
        <div className="max-w-2xl">
          <div ref={headingRef}>
            <p className="text-sm font-semibold text-red-400/80 uppercase tracking-[0.15em] mb-5">
              المشكلة
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-16">
              لو أي حاجة من دول
              <br />
              حصلت معاك —
              <br />
              <span className="text-white/40">يبقى إنت في المكان الصح.</span>
            </h2>
          </div>

          <div ref={itemsRef} className="space-y-0">
            {PAINS.map((pain, i) => (
              <div
                key={pain}
                className="pain-item group flex items-center gap-6 py-5 border-b border-white/5 last:border-0"
              >
                <span className="text-[13px] font-mono text-white/35 shrink-0 w-6 tabular-nums">
                  0{i + 1}
                </span>
                <span className="text-lg md:text-xl text-white/60 font-medium group-hover:text-brand-400 transition-colors duration-300">
                  {pain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
