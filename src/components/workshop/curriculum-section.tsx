"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconChevronDown,
  IconPlayerPlay,
  IconClock,
  IconBook,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
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

      const items = section.querySelectorAll(".curriculum-item");
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
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#060610]">
      <div className="container">
        <div ref={headerRef} className="max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-5">
            اللي هتتعلمه
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] mb-4">
            30+ ساعة عملي —
            <br />
            <span className="text-white/20">من الصفر لحد ما تكسب.</span>
          </h2>
          <p className="text-white/35 leading-relaxed">
            مش محاضرات مملة. كل درس فيه تطبيق عملي تقدر تحطه في portfolio
            وتكسب بيه.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {[
              { icon: IconBook, text: `${totalLessons} درس` },
              { icon: IconClock, text: "30+ ساعة" },
              { icon: IconPlayerPlay, text: "مسجّل" },
            ].map((item) => (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-white/40 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <item.icon className="size-4 text-brand-400" />
                {item.text}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {MODULES.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={module.title}
                className="curriculum-item border-b border-white/5 group"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`module-content-${index}`}
                  className="flex items-center justify-between w-full py-6 text-right gap-6"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-mono text-xs tabular-nums w-6 shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-brand-400" : "text-white/15"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={`text-[15px] font-medium transition-colors duration-300 ${
                          isOpen
                            ? "text-brand-400"
                            : "text-white/70 group-hover:text-brand-400"
                        }`}
                      >
                        {module.title}
                      </h3>
                      <p className="text-xs text-white/25 mt-1">
                        {module.lessons} درس · {module.duration}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-brand-500 shadow-[0_0_15px_rgba(160,2,255,0.4)]"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <IconChevronDown
                      className={`size-3.5 transition-all duration-300 ${
                        isOpen ? "rotate-180 text-white" : "text-white/30"
                      }`}
                    />
                  </div>
                </button>

                {/* المحتوى — CSS transition بدل AnimatePresence عشان الأداء */}
                <div
                  id={`module-content-${index}`}
                  role="region"
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-11">
                      <div className="space-y-3">
                        {module.topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-start gap-3 text-sm text-white/40"
                          >
                            <IconPlayerPlay className="size-3.5 text-brand-400/60 mt-0.5 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-white/20 mt-10">
          الكورس مسجّل بالكامل — ابدأ في أي وقت واتعلم بإيقاعك
        </p>
      </div>
    </section>
  );
}
