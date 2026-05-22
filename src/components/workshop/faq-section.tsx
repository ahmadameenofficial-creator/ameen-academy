"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const FAQS = [
  {
    question: "أنا مش مصمم ومعنديش أي خبرة — ينفع أبدأ؟",
    answer:
      "أيوه، الكورس مصمم للناس اللي بتبدأ من الصفر تماماً. مش محتاج خلفية في التصميم ولا حتى تكون فتحت فوتوشوب قبل كده. هنمشي معاك خطوة بخطوة.",
  },
  {
    question: "ليه التصميم بالذات؟ مش فيه مهارات تانية؟",
    answer:
      "التصميم من أكتر المهارات طلباً في 2026 — كل بيزنس محتاج تصميمات. ومع أدوات AI بقى أسهل وأسرع. الفرق إن الكورس ده مش بيعلمك أدوات بس — بيعلمك إزاي تكسب منها فعلاً.",
  },
  {
    question: "أنا شغال في وظيفة — هلحق أذاكر؟",
    answer:
      "الكورس مسجّل بالكامل — مفيش مواعيد ثابتة. اتفرج في أي وقت يناسبك. حتى لو ساعة واحدة في اليوم بعد الشغل، في 3 شهور هتكون بدأت تكسب دخل إضافي.",
  },
  {
    question: "هل الكورس مسجّل ولا لايف؟",
    answer:
      "مسجّل بالكامل — 30+ ساعة محتوى تقدر تتفرج عليه في أي وقت وتعيده عدد لا نهائي. وبنضيف تحديثات مستمرة (خصوصاً جزء الـ AI) وهتوصلك مدى الحياة.",
  },
  {
    question: "إيه الفرق بين الكورس ده وأي كورس تصميم تاني؟",
    answer:
      "أغلب الكورسات بتعلمك أدوات بس. الكورس ده بيعلمك: تصميم + AI + تسويق + تسعير + بناء اسم + LinkedIn + إزاي تجيب clients. يعني نظام كامل من الصفر لحد ما تكسب.",
  },
  {
    question: "محتاج لابتوب غالي؟",
    answer:
      "لا. أي لابتوب أو PC عادي يشغّل فوتوشوب يكفي. مش محتاج Mac أو جهاز غالي. حتى كانفا بتشتغل من الموبايل.",
  },
  {
    question: "لو مكنتش مناسبني هقدر أرجع فلوسي؟",
    answer:
      "طبعاً. عندك ضمان كامل — لو طبّقت اللي في الكورس لمدة 90 يوم ومجبتش نتيجة، فلوسك ترجع بالكامل. المخاطرة = صفر.",
  },
  {
    question: "إيه طرق الدفع المتاحة؟",
    answer:
      "تقدر تدفع عن طريق فودافون كاش أو إنستاباي. بعد التحويل ابعتلنا رقم العملية وهنفعّلك الكورس في نفس اليوم.",
  },
  {
    question: "هل فيه دعم بعد الكورس؟",
    answer:
      "أيوه. عندك مجتمع أكاديمية أمين — جروب خاص فيه تقييم شغلك، فرص شغل، ومتابعة مستمرة. مش هنسيبك لوحدك بعد ما تخلّص.",
  },
  {
    question: "ليه السعر 1,500 جنيه مش أقل؟",
    answer:
      "عشان 1,500 جنيه أقل من نص أول شغلانة هتجيبها. الكورس ده مش مصروف — ده استثمار هيرجعلك أضعاف في أول شهرين. ولو مرجعش — فلوسك ترجع.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-brand-500 font-semibold text-sm mb-3">
            أسئلة شائعة
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            عندك سؤال؟ غالباً الإجابة هنا
          </h2>
        </FadeIn>

        <StaggerContainer className="max-w-3xl mx-auto space-y-3" staggerDelay={0.05}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={faq.question}>
              <div
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex items-center justify-between w-full p-5 text-right hover:bg-muted/50 transition-colors gap-4"
                >
                  <h3 className="font-semibold text-foreground text-sm md:text-base">
                    {faq.question}
                  </h3>
                  <IconChevronDown
                    className={`size-5 text-muted-foreground transition-transform shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-q-${index}`} className="px-5 pb-5 pt-0">
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
