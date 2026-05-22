"use client";

import { useState } from "react";
import {
  IconChevronDown,
  IconPlayerPlay,
  IconClock,
  IconBook,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

const MODULES = [
  {
    title: "أساسيات التصميم وفكر المصمم",
    lessons: 8,
    duration: "4 ساعات",
    topics: [
      "مبادئ التصميم الأساسية (التباين، التوازن، الهيراركي)",
      "نظرية الألوان وتطبيقها العملي",
      "الطباعة والتايبوجرافي العربي",
      "عقلية المصمم اللي بيتطور في شهور بدل سنين",
    ],
  },
  {
    title: "فوتوشوب — من الصفر للاحتراف",
    lessons: 12,
    duration: "7 ساعات",
    topics: [
      "واجهة البرنامج والأدوات الأساسية",
      "التعامل مع الطبقات والماسكات",
      "تعديل الصور وتصميم السوشيال ميديا",
      "مشاريع عملية حقيقية تضيفها للـ portfolio",
    ],
  },
  {
    title: "إليستريتور — التصميم الاحترافي",
    lessons: 10,
    duration: "6 ساعات",
    topics: [
      "أساسيات الفيكتور والأشكال",
      "تصميم اللوجوهات والهوية البصرية",
      "أسرار تصميم الـ Brand Identity",
      "مشاريع لوجوهات وهويات كاملة",
    ],
  },
  {
    title: "كانفا — السرعة والإنتاجية",
    lessons: 6,
    duration: "3 ساعات",
    topics: [
      "إزاي تستخدم كانفا كمحترف مش مبتدئ",
      "Templates وتعديلها بسرعة",
      "تصميم محتوى سوشيال ميديا يومي",
      "كانفا للعروض التقديمية والـ Branding",
    ],
  },
  {
    title: "أدوات AI للتصميم (متحدث باستمرار)",
    lessons: 8,
    duration: "4 ساعات",
    topics: [
      "أحدث أدوات الـ AI في التصميم",
      "توليد الصور والأفكار بالـ AI",
      "إزاي الـ AI يخليك أسرع 3 مرات",
      "الجزء ده بيتحدث كل فترة بأحدث الأدوات",
    ],
  },
  {
    title: "التسويق الشخصي والبيع",
    lessons: 7,
    duration: "3.5 ساعات",
    topics: [
      "مفهوم التسويق الصحيح — مش مجرد إعلان ممول",
      "إزاي تبيع شغلك بدون ما تحس إنك بتتسول",
      "إزاي تكلم client وتقنعه",
      "تسعير شغلك صح وتفاوض باحتراف",
    ],
  },
  {
    title: "Personal Brand وLinkedIn",
    lessons: 6,
    duration: "3 ساعات",
    topics: [
      "بناء شخصية حقيقية الناس بتثق فيها",
      "القصة بتاعتك — إزاي تحكيها صح",
      "بروفايل LinkedIn قوي يجيبلك شغل",
      "خطة محتوى 30 يوم على LinkedIn",
    ],
  },
];

const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons, 0);

export function CurriculumSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-brand-500 font-semibold text-sm mb-3">
            المحتوى التعليمي
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            30+ ساعة محتوى مسجّل
            <br />
            <span className="text-brand-500">+ تحديثات مستمرة مدى الحياة</span>
          </h2>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
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
              مسجّل — اتعلم بإيقاعك
            </span>
          </div>
        </FadeIn>

        <StaggerContainer className="max-w-3xl mx-auto space-y-3" staggerDelay={0.06}>
          {MODULES.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={module.title}>
              <div
                className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`module-content-${index}`}
                  className="flex items-center justify-between w-full p-5 text-right hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-sm font-bold text-brand-600">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm md:text-base">
                        {module.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {module.lessons} درس · {module.duration}
                      </p>
                    </div>
                  </div>
                  <IconChevronDown
                    className={`size-5 text-muted-foreground transition-transform shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div id={`module-content-${index}`} role="region" className="px-5 pb-5 pt-0">
                    <div className="border-t border-border pt-4 space-y-2.5">
                      {module.topics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <IconPlayerPlay className="size-4 text-brand-500 mt-0.5 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <ScaleIn delay={0.15} className="text-center mt-8">
          <Badge className="bg-brand-50 text-brand-700 px-4 py-2 text-sm dark:bg-brand-900/30 dark:text-brand-300">
            الكورس مسجّل بالكامل — ابدأ في أي وقت واتعلم بإيقاعك
          </Badge>
        </ScaleIn>
      </div>
    </section>
  );
}
