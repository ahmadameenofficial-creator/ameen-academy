"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-neutral-50" ref={ref}>
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">أسئلة شائعة</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-[1.1] mb-14">
              عندك سؤال؟
              <br />
              <span className="text-neutral-400">غالباً الإجابة هنا.</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 + i * 0.03, duration: 0.35 }}
                  className="border-b border-neutral-200"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full py-6 text-right gap-6 group"
                  >
                    <span className="text-[15px] font-medium text-neutral-800 group-hover:text-brand-500 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        isOpen
                          ? "bg-brand-500"
                          : "bg-neutral-100 group-hover:bg-brand-50"
                      }`}
                    >
                      {isOpen ? (
                        <IconMinus className="size-3.5 text-white" />
                      ) : (
                        <IconPlus className="size-3.5 text-neutral-400 group-hover:text-brand-500 transition-colors" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6">
                          <p className="text-sm text-neutral-500 leading-relaxed max-w-lg">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
