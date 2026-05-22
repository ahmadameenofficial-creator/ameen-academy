"use client";

import { IconShieldCheck, IconCheck } from "@tabler/icons-react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, Parallax } from "@/components/ui/motion";

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <ScaleIn scale={0.92}>
          <div className="rounded-3xl border-2 border-brand-200 dark:border-brand-800/40 bg-brand-50/30 dark:bg-brand-950/10 p-8 md:p-12 text-center relative overflow-hidden">
            <Parallax speed={-0.3} className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="w-[300px] h-[150px] bg-brand-500/5 rounded-full blur-[80px]" />
            </Parallax>

            <div className="relative space-y-6">
              <FadeIn direction="down" delay={0.1}>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/30">
                    <IconShieldCheck className="size-8 text-white" />
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    ضمان أحمد أمين الشخصي
                  </h2>
                  <p className="text-brand-600 dark:text-brand-400 font-semibold text-lg mt-2">
                    ضمان &ldquo;أول 5,000 جنيه&rdquo;
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <div className="max-w-xl mx-auto space-y-4">
                  <p className="text-foreground text-lg leading-relaxed font-medium">
                    طبّق اللي في الكورس لمدة 90 يوم. لو مكسبتش أول 5,000 جنيه —
                    هرجعلك كل فلوسك. بدون أسئلة. بدون مشاكل.
                  </p>

                  <div className="h-px bg-border max-w-xs mx-auto" />

                  <p className="text-muted-foreground leading-relaxed">
                    المخاطرة = صفر. إنت بتستثمر 1,500 جنيه في نفسك — ولو
                    الاستثمار ده مجابش نتيجة، فلوسك كاملة ترجع. أنا اللي شايل الـ risk كله.
                  </p>
                </div>
              </FadeIn>

              <StaggerContainer className="max-w-md mx-auto pt-4 space-y-3 text-right" staggerDelay={0.1}>
                <p className="text-sm font-semibold text-foreground text-center mb-4">
                  ليه واثق أقدم الضمان ده؟
                </p>
                {[
                  "عشان 300+ شخص قبلك بدأوا من صفر ودلوقتي بيكسبوا",
                  "عشان النظام مجرّب — اللي بيطبّق بيجيب نتيجة",
                  "عشان 1,500 جنيه أقل من أول شغلانة هتجيبها بعد الكورس",
                ].map((reason) => (
                  <StaggerItem key={reason}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500">
                        <IconCheck className="size-3.5 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {reason}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
