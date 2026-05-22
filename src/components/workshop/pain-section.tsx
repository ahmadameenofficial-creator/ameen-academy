"use client";

import {
  IconX,
} from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const PAINS = [
  {
    title: "مرتبك بيخلص قبل الشهر ما يخلص",
    detail: "سواء طالب أو موظف — الفلوس مش كفاية. ومفيش مصدر دخل تاني واقعي.",
  },
  {
    title: "بتتفرج وبتتعلم ومش بتكسب",
    detail: "YouTube وكورسات كتير ومفيش نتيجة. محدش علّمك تجيب بيها فلوس.",
  },
  {
    title: "مش عارف تبدأ منين",
    detail: "كل يوم بتقول بكرة. بس بكرة مش بتيجي عشان مفيش خطة واضحة.",
  },
  {
    title: "جربت حاجات كتير ومفيش نتيجة",
    detail: "Dropshipping، أفلييت، ريزن — كل حاجة بتبدأ بحماس وبتنتهي بخسارة.",
  },
  {
    title: "عندك مهارة بس محدش عارف بيها",
    detail: "مفيش portfolio ولا موقع ولا حد بيشوف شغلك. كأنك مش موجود.",
  },
];

export function PainSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up">
            <p className="text-sm font-semibold text-red-500 tracking-wide mb-4">المشكلة</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.15]">
              لو أي حاجة من دول{" "}
              <span className="text-red-500">حصلت معاك</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
              مش لازم تكون مصمم. لازم بس تكون زهقت من الوضع اللي إنت فيه.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 md:mt-16 space-y-0 divide-y divide-border" staggerDelay={0.08}>
            {PAINS.map((pain, i) => (
              <StaggerItem key={pain.title}>
                <div className="group flex items-start gap-5 py-6 md:py-7">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20 mt-0.5 group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors">
                    <IconX className="size-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-snug">
                      {pain.title}
                    </h3>
                    <p className="mt-1.5 text-muted-foreground text-[15px] leading-relaxed">
                      {pain.detail}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
