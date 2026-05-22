"use client";

import {
  IconX,
  IconMoodSad,
  IconCurrencyDollarOff,
  IconBrandYoutube,
  IconUserQuestion,
  IconTrendingDown,
} from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export function PainSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-red-500 font-semibold text-sm mb-3">المشكلة</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            لو أي حاجة من دول حصلت معاك…
            <br />
            <span className="text-brand-500">يبقى إنت في المكان الصح</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            مش لازم تكون مصمم. مش لازم تكون خبير. لازم بس تكون زهقت من الوضع اللي إنت فيه.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" staggerDelay={0.1}>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconCurrencyDollarOff className="size-5 text-red-600 dark:text-red-400" />}
                title="مرتبك بيخلص قبل الشهر ما يخلص"
                description="سواء طالب أو موظف — الفلوس مش كفاية. ومفيش مصدر دخل تاني واقعي."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconBrandYoutube className="size-5 text-red-600 dark:text-red-400" />}
                title="بتتفرج وبتتعلم ومش بتكسب"
                description="YouTube و كورسات كتير ومفيش نتيجة. بتتعلم أدوات بس محدش علّمك تجيب بيها فلوس."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconUserQuestion className="size-5 text-red-600 dark:text-red-400" />}
                title="مش عارف تبدأ منين"
                description="كل يوم بتقول بكرة هبدأ. بس بكرة مش بتيجي عشان مفيش خطة واضحة."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconMoodSad className="size-5 text-red-600 dark:text-red-400" />}
                title="جربت حاجات كتير ومفيش نتيجة"
                description="Dropshipping، أفلييت، ريزن — كل حاجة بتبدأ بحماس وبتنتهي بخسارة. محتاج مهارة حقيقية."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconTrendingDown className="size-5 text-red-600 dark:text-red-400" />}
                title="عندك مهارة بس محدش عارف بيها"
                description="ممكن تعرف تصمم شوية بس مفيش portfolio ولا موقع ولا حد بيشوف شغلك. يعني كأنك مش موجود."
              />
            </HoverLift>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

function PainCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-red-200/50 bg-red-50/30 p-6 transition-colors hover:border-red-300/60 dark:border-red-900/30 dark:bg-red-950/10 dark:hover:border-red-800/40 h-full">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-foreground text-base">{title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <IconX className="size-4 text-red-400/60" />
      </div>
    </div>
  );
}
