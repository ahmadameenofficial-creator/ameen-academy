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
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-brand-500 font-semibold text-sm mb-3">
            اللي هتتعلمه
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            30+ ساعة عملي —{" "}
            <span className="text-brand-500">من الصفر لحد ما تكسب</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            مش محاضرات مملة. كل درس فيه تطبيق عملي تقدر تحطه في portfolio وتكسب بيه.
          </p>
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
              <div className="rounded-2xl border border-border bg-card overflow-hidden transition-all">
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
