"use client";

import { useState } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

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

  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-medium text-brand-500 mb-6">أسئلة شائعة</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1] mb-14">
            عندك سؤال؟
            <br />
            <span className="text-muted-foreground/50">غالباً الإجابة هنا.</span>
          </h2>

          <div className="space-y-0">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full py-6 text-right gap-6 group"
                  >
                    <span className="text-[15px] font-medium text-foreground group-hover:text-brand-500 transition-colors">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <IconMinus className="size-4 text-brand-500 shrink-0" />
                    ) : (
                      <IconPlus className="size-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-0">
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
