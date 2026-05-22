"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const FAQS = [
  {
    question: "أنا مش مصمم ومعنديش أي خبرة — ينفع أبدأ؟",
    answer:
      "الكورس اتعمل عشان الناس اللي بتبدأ من صفر. مش محتاج خلفية في التصميم ولا خبرة سابقة. هنمشي معاك من أول ما تفتح البرنامج لحد ما تكسب أول فلوسك.",
  },
  {
    question: "ليه التصميم بالذات؟ مش فيه مهارات تانية؟",
    answer:
      "التصميم من أكتر المهارات طلباً — كل بيزنس محتاج تصميمات. ومع AI بقى أسرع وأسهل. الفرق إن الكورس ده مش بيعلمك أدوات بس — بيعلمك تبني بيزنس كامل: مهارة + portfolio + موقع + clients.",
  },
  {
    question: "هتعلموني أعمل موقع فعلاً؟",
    answer:
      "أيوه. فيه module كامل عن بناء موقعك الشخصي اللي يعرض خدماتك ويبيعلك. مش محتاج تكون مبرمج — هنستخدم أدوات سهلة والنتيجة هتكون موقع احترافي يشتغل 24/7.",
  },
  {
    question: "أنا شغال في وظيفة — هلحق أذاكر؟",
    answer:
      "الكورس مسجّل بالكامل — مفيش مواعيد ثابتة. ساعة واحدة في اليوم بعد الشغل كفاية. في 90 يوم هتكون بدأت تكسب دخل إضافي جنب وظيفتك.",
  },
  {
    question: "أنا طالب — هقدر أكسب وأنا لسه في الكلية؟",
    answer:
      "أيوه. محمد خالد كان طالب في هندسة وبدأ يكسب 6,000 جنيه/شهر وهو لسه في الكلية. التصميم شغل من البيت — مش محتاج تسيب حاجة.",
  },
  {
    question: "إيه الفرق بين الكورس ده وأي كورس تصميم تاني؟",
    answer:
      "أغلب الكورسات بتعلمك أدوات وبتسيبك. الكورس ده بيعلمك: تصميم + AI + موقع يبيعلك + تسويق + تسعير + LinkedIn + إزاي تجيب clients. يعني نظام كامل — من الصفر لحد ما الفلوس تدخل.",
  },
  {
    question: "محتاج لابتوب غالي؟",
    answer:
      "لا. أي لابتوب عادي يشغّل فوتوشوب يكفي. مش محتاج Mac أو جهاز غالي. وكانفا بتشتغل من الموبايل كمان.",
  },
  {
    question: "لو مكنتش مناسبني هقدر أرجع فلوسي؟",
    answer:
      "طبعاً. عندك ضمان كامل — لو طبّقت اللي في الكورس 90 يوم ومكسبتش، فلوسك ترجع. المخاطرة = صفر.",
  },
  {
    question: "إيه طرق الدفع المتاحة؟",
    answer:
      "تقدر تدفع عن طريق فودافون كاش أو إنستاباي. بعد التحويل ابعتلنا رقم العملية وهنفعّلك الكورس في نفس اليوم.",
  },
  {
    question: "ليه السعر 1,500 جنيه؟",
    answer:
      "عشان 1,500 جنيه أقل من أول شغلانة هتجيبها بعد الكورس. ده مش مصروف — ده استثمار بيرجع أضعاف. ولو مرجعش — فلوسك ترجع.",
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
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
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
