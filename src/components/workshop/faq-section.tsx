"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconPlus, IconMinus } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "أنا مش مصمم ومعنديش أي خبرة — ينفع أبدأ؟",
    a: "الكورس اتعمل عشان الناس اللي بتبدأ من صفر. مش محتاج خلفية في التصميم. هنمشي معاك من أول ما تفتح البرنامج لحد ما تكسب.",
  },
  {
    q: "ليه التصميم بالذات؟",
    a: "التصميم من أكتر المهارات طلباً — كل بيزنس محتاج تصميمات. ومع AI بقى أسرع وأسهل. الكورس بيعلمك تبني بيزنس كامل مش بس أدوات.",
  },
  {
    q: "هتعلموني أعمل موقع فعلاً؟",
    a: "أيوه. module كامل عن بناء موقعك الشخصي. مش محتاج تكون مبرمج — هنستخدم أدوات سهلة والنتيجة هتكون موقع احترافي.",
  },
  {
    q: "أنا شغال في وظيفة — هلحق؟",
    a: "الكورس مسجّل. ساعة واحدة في اليوم بعد الشغل كفاية. في 90 يوم هتكون بدأت تكسب دخل إضافي.",
  },
  {
    q: "إيه الفرق بين ده وأي كورس تصميم تاني؟",
    a: "أغلب الكورسات بتعلمك أدوات وبتسيبك. ده بيعلمك: تصميم + AI + موقع + تسويق + تسعير + LinkedIn + إزاي تجيب clients.",
  },
  {
    q: "لو مكنتش مناسبني هرجع فلوسي؟",
    a: "طبعاً. ضمان كامل — طبّق 90 يوم ولو مكسبتش، فلوسك ترجع. المخاطرة = صفر.",
  },
  {
    q: "إيه طرق الدفع؟",
    a: "فودافون كاش أو إنستاباي. بعد التحويل ابعتلنا رقم العملية وهنفعّلك الكورس في نفس اليوم.",
  },
  {
    q: "ليه 1,500 جنيه؟",
    a: "عشان 1,500 أقل من أول شغلانة هتجيبها. ده استثمار بيرجع أضعاف. ولو مرجعش — فلوسك ترجع.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
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

      const items = section.querySelectorAll(".faq-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.04,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a]">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="faq-header">
            <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-5">
              أسئلة شائعة
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] mb-14">
              عندك سؤال؟
              <br />
              <span className="text-white/20">غالباً الإجابة هنا.</span>
            </h2>
          </div>

          <div className="space-y-0">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="faq-item border-b border-white/5">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full py-6 text-right gap-6 group"
                  >
                    <span className="text-[15px] font-medium text-white/60 group-hover:text-brand-400 transition-colors duration-300">
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-brand-500 shadow-[0_0_15px_rgba(160,2,255,0.4)]"
                          : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      {isOpen ? (
                        <IconMinus className="size-3.5 text-white" />
                      ) : (
                        <IconPlus className="size-3.5 text-white/30 group-hover:text-brand-400 transition-colors duration-300" />
                      )}
                    </div>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6">
                        <p className="text-sm text-white/35 leading-relaxed max-w-lg">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
