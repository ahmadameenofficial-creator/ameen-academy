"use client";

import Image from "next/image";
import {
  IconBriefcase,
  IconUsers,
  IconCalendar,
  IconPalette,
  IconCheck,
} from "@tabler/icons-react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, FloatingElement, CountUp } from "@/components/ui/motion";

const CREDENTIALS = [
  {
    icon: <IconCalendar className="size-4 text-brand-500" />,
    label: "+10 سنين خبرة في السوق",
  },
  {
    icon: <IconUsers className="size-4 text-brand-500" />,
    label: "+300 طالب خرّجهم وبدأوا يكسبوا",
  },
  {
    icon: <IconBriefcase className="size-4 text-brand-500" />,
    label: "3 سنين مدير تسويق في شركة VAR M",
  },
  {
    icon: <IconPalette className="size-4 text-brand-500" />,
    label: "متخصص في Branding والهوية البصرية",
  },
];

const SPECIALIZATIONS = [
  "تصميم الهوية البصرية والبراندينج",
  "تصميم السوشيال ميديا",
  "اللوجوهات والتايبوجرافي",
  "بناء مواقع الخدمات الشخصية",
  "التسويق الشخصي وبناء الدخل",
];

export function InstructorSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            {/* الصورة */}
            <div className="lg:col-span-2 flex justify-center">
              <ScaleIn delay={0.1}>
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/10 border-2 border-brand-100/50 dark:border-brand-800/30">
                    <Image
                      src="/images/00.png"
                      alt="أحمد أمين — مؤسس أكاديمية أمين"
                      width={400}
                      height={500}
                      className="w-64 sm:w-72 lg:w-full h-auto object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -left-4">
                    <FloatingElement amplitude={4} duration={5}>
                      <div className="bg-card rounded-2xl shadow-lg border border-border px-4 py-3">
                        <p className="text-2xl font-bold text-brand-500">
                          <CountUp target={300} prefix="+" duration={1.5} />
                        </p>
                        <p className="text-xs text-muted-foreground">طالب خريج</p>
                      </div>
                    </FloatingElement>
                  </div>
                </div>
              </ScaleIn>
            </div>

            {/* المحتوى */}
            <div className="lg:col-span-3 space-y-6">
              <FadeIn direction="right" delay={0.15}>
                <div>
                  <p className="text-brand-500 font-semibold text-sm mb-2">
                    مين اللي هيعلّمك؟
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    أحمد أمين
                  </h2>
                  <p className="text-muted-foreground text-lg mt-1">
                    مصمم جرافيك ومؤسس أكاديمية أمين
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.25}>
                <p className="text-muted-foreground leading-relaxed">
                  أنا مش حد اتولد بالمهارة دي. بدأت من صفر — زيك بالظبط.
                  وعديت بكل حاجة: شغل ببلاش، مش عارف أسعّر، محدش بيرد عليّا.
                  لحد ما فهمت إن المهارة لوحدها مش كفاية — لازم تعرف تبيع نفسك.
                  علّمت 300+ شخص النظام ده وبدأوا يكسبوا. الكورس ده 10 سنين خبرة
                  مكثّفة في 30 ساعة عملي.
                </p>
              </FadeIn>

              {/* Credentials */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.08}>
                {CREDENTIALS.map((cred) => (
                  <StaggerItem key={cred.label}>
                    <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30">
                        {cred.icon}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {cred.label}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Specializations */}
              <FadeIn direction="up" delay={0.35}>
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  التخصصات:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    >
                      <IconCheck className="size-3" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
