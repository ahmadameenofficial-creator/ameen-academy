"use client";

import { IconShieldCheck } from "@tabler/icons-react";

export function GuaranteeSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-xl shadow-brand-500/20">
              <IconShieldCheck className="size-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            ضمان أحمد أمين الشخصي
          </h2>
          <p className="text-brand-500 font-semibold text-lg mb-8">
            ضمان &ldquo;أول 5,000 جنيه&rdquo;
          </p>

          <p className="text-lg text-foreground leading-relaxed mb-6">
            طبّق اللي في الكورس لمدة 90 يوم. لو مكسبتش أول 5,000 جنيه —
            هرجعلك كل فلوسك. بدون أسئلة.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            المخاطرة = صفر. إنت بتستثمر 1,500 جنيه في نفسك — ولو
            الاستثمار ده مجابش نتيجة، فلوسك كاملة ترجع. أنا اللي شايل الـ risk.
          </p>
        </div>
      </div>
    </section>
  );
}
