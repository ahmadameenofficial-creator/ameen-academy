"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  IconChevronDown,
  IconPlayerPlay,
  IconClock,
  IconBook,
} from "@tabler/icons-react";

const MODULES = [
  {
    title: "أساسيات التصميم — العقلية قبل الأداة",
    lessons: 8,
    duration: "4 ساعات",
    topics: [
      "مبادئ التصميم اللي بتفرق بين هاوي ومحترف",
      "نظرية الألوان — إزاي تختار ألوان بتبيع",
      "التايبوجرافي العربي — الخط اللي بيتكلم",
      "عقلية المحترف: إزاي تفكر كمصمم بيكسب مش بيرسم",
    ],
  },
  {
    title: "فوتوشوب — من أول ما تفتحه لأول شغلانة",
    lessons: 12,
    duration: "7 ساعات",
    topics: [
      "الواجهة والأدوات — من الصفر بدون افتراضات",
      "الطبقات والماسكات — سر الشغل الاحترافي",
      "تصميم سوشيال ميديا يجيب engagement",
      "مشاريع حقيقية تحطها في portfolio فوراً",
    ],
  },
  {
    title: "إليستريتور — اللوجوهات والبراندينج",
    lessons: 10,
    duration: "6 ساعات",
    topics: [
      "الفيكتور والأشكال — أساس كل لوجو احترافي",
      "تصميم لوجوهات الشركات بتدفع فيها آلاف",
      "الهوية البصرية الكاملة — Brand Identity",
      "مشاريع هويات كاملة تضيفها لشغلك",
    ],
  },
  {
    title: "كانفا — السرعة والإنتاجية",
    lessons: 6,
    duration: "3 ساعات",
    topics: [
      "كانفا كأداة إنتاج سريعة مش لعبة",
      "Templates احترافية تعدّل عليها في دقايق",
      "محتوى سوشيال ميديا يومي بجودة عالية",
      "عروض تقديمية وبراندينج من كانفا",
    ],
  },
  {
    title: "أدوات AI — السلاح السري في 2026",
    lessons: 8,
    duration: "4 ساعات",
    topics: [
      "أدوات AI اللي بتخليك أسرع 10 مرات من أي مصمم تاني",
      "توليد أفكار وصور بالـ AI في ثواني",
      "إزاي تستخدم AI ومحدش يعرف — الشغل يطلع طبيعي 100%",
      "الجزء ده بيتحدث كل فترة بأحدث الأدوات مدى الحياة",
    ],
  },
  {
    title: "ابني موقعك — واجهة تبيعلك 24/7",
    lessons: 7,
    duration: "3.5 ساعات",
    topics: [
      "إزاي تبني موقع شخصي احترافي يعرض خدماتك",
      "صفحة Portfolio تخلي الـ client يقول عايزك فوراً",
      "صفحة خدمات + أسعار تبيع نفسها",
      "الموقع كـ salesman — يشتغل وإنت نايم",
    ],
  },
  {
    title: "التسويق + البيع + LinkedIn",
    lessons: 8,
    duration: "4 ساعات",
    topics: [
      "إزاي تبيع شغلك بدون ما تحس إنك بتشحت",
      "تسعير شغلك صح — تاخد حقك من أول شغلانة",
      "بروفايل LinkedIn يخلي الشركات هي اللي تيجي تكلمك",
      "خطة محتوى 30 يوم تخليك visible لأي HR أو client",
    ],
  },
];

const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons, 0);

export function CurriculumSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Subtle background depth */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-500/[0.02] rounded-full blur-[100px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-medium text-brand-500 mb-6">اللي هتتعلمه</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1] mb-4">
            30+ ساعة عملي —{" "}
            <br />
            <span className="text-muted-foreground/40">من الصفر لحد ما تكسب.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            مش محاضرات مملة. كل درس فيه تطبيق عملي تقدر تحطه في portfolio وتكسب بيه.
          </p>
          <div className="flex items-center gap-6 mt-6">
            {[
              { icon: IconBook, text: `${totalLessons} درس` },
              { icon: IconClock, text: "30+ ساعة" },
              { icon: IconPlayerPlay, text: "مسجّل" },
            ].map((item) => (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-muted/60 border border-border/50"
              >
                <item.icon className="size-4 text-brand-500" />
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {MODULES.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
                className="border-b border-border/60 group"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`module-content-${index}`}
                  className="flex items-center justify-between w-full py-6 text-right gap-6"
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-mono text-xs tabular-nums w-6 shrink-0 transition-colors ${isOpen ? "text-brand-500" : "text-muted-foreground/30"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={`text-[15px] font-medium transition-colors ${isOpen ? "text-brand-500" : "text-foreground group-hover:text-brand-500"}`}>
                        {module.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {module.lessons} درس · {module.duration}
                      </p>
                    </div>
                  </div>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${isOpen ? "bg-brand-500" : "bg-muted group-hover:bg-brand-500/10"}`}>
                    <IconChevronDown
                      className={`size-3.5 transition-all duration-300 ${
                        isOpen ? "rotate-180 text-white" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`module-content-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-11">
                        <div className="space-y-3">
                          {module.topics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <IconPlayerPlay className="size-3.5 text-brand-500 mt-0.5 shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground/50 mt-10">
          الكورس مسجّل بالكامل — ابدأ في أي وقت واتعلم بإيقاعك
        </p>
      </div>
    </section>
  );
}
