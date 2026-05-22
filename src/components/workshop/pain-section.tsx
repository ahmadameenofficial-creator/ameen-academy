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
            لو ده حالك…
            <br />
            <span className="text-brand-500">يبقى الكورس ده اتعمل عشانك</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            أغلب المصممين المبتدئين بيعدّوا على نفس المشاكل دي. مش عيب —
            العيب إنك تفضل في نفس المكان.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" staggerDelay={0.1}>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconBrandYoutube className="size-5 text-red-600 dark:text-red-400" />}
                title="بتتفرج على YouTube من سنين"
                description="فيديوهات كتير ومفيش خطة واضحة. بتتعلم أدوات بس مش بتتعلم تكسب."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconCurrencyDollarOff className="size-5 text-red-600 dark:text-red-400" />}
                title="معرفش تسعّر شغلك"
                description="بتعمل تصميمات حلوة بس بتاخد عليها 50 جنيه. أو بتشتغل ببلاش عشان تبني portfolio."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconUserQuestion className="size-5 text-red-600 dark:text-red-400" />}
                title="مفيش حد بيرشدك"
                description="بتدور لوحدك، بتغلط لوحدك، وبتحبط لوحدك. مفيش mentor يقولك إنت فين غلطان."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconMoodSad className="size-5 text-red-600 dark:text-red-400" />}
                title="حاسس إن المجال مليان"
                description="بتشوف مصممين كتير وبتقول مفيش مكان ليك. الحقيقة: أغلبهم مش عارفين يسوّقوا."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PainCard
                icon={<IconTrendingDown className="size-5 text-red-600 dark:text-red-400" />}
                title="بتقدم على شغل ومحدش بيرد"
                description="بتبعت الـ CV وبتقدم على فرص ومفيش رد. المشكلة مش في مهارتك — في طريقة عرضك."
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
