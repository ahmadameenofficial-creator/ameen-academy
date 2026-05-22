"use client";

import { useState } from "react";
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

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-brand-500 mb-6">اللي هتتعلمه</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1] mb-4">
            30+ ساعة عملي —{" "}
            <br />
            <span className="text-muted-foreground/50">من الصفر لحد ما تكسب.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            مش محاضرات مملة. كل درس فيه تطبيق عملي تقدر تحطه في portfolio وتكسب بيه.
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <IconBook className="size-4 text-brand-500" />
              {totalLessons} درس
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="size-4 text-brand-500" />
              30+ ساعة
            </span>
            <span className="flex items-center gap-2">
              <IconPlayerPlay className="size-4 text-brand-500" />
              مسجّل
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {MODULES.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={module.title} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`module-content-${index}`}
                  className="flex items-center justify-between w-full py-6 text-right gap-6 group"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-xs text-muted-foreground/40 tabular-nums w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-foreground group-hover:text-brand-500 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {module.lessons} درس · {module.duration}
                      </p>
                    </div>
                  </div>
                  <IconChevronDown
                    className={`size-4 text-muted-foreground transition-transform shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div id={`module-content-${index}`} role="region" className="pb-6 pr-11">
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
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground/60 mt-10">
          الكورس مسجّل بالكامل — ابدأ في أي وقت واتعلم بإيقاعك
        </p>
      </div>
    </section>
  );
}
