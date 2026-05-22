"use client";

import {
  IconCheck,
  IconBrush,
  IconRobot,
  IconSpeakerphone,
  IconBrandLinkedin,
  IconUserStar,
  IconWorldWww,
} from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift, DrawLine } from "@/components/ui/motion";

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <FadeIn direction="up">
            <p className="text-brand-500 font-semibold text-sm mb-3">الحل</p>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
              مش كورس — ده{" "}
              <span className="text-brand-500">
                نظام كامل يحوّلك لحد بيكسب
              </span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <div className="flex justify-center mt-4">
              <DrawLine width={100} height={3} />
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              هتتعلم مهارة الشركات بتدفع فيها آلاف. هتبني portfolio وموقع يبيعلك.
              وهتعرف تجيب clients وتكسب — مش بعد سنة، في أول 90 يوم.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" staggerDelay={0.1}>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconBrush className="size-6 text-brand-500" />}
                title="تصميم من الصفر للاحتراف"
                description="فوتوشوب + إليستريتور + كانفا. مش مجرد أدوات — هتفهم فكر التصميم اللي يخلي شغلك يساوي فلوس."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconRobot className="size-6 text-brand-500" />}
                title="AI يخليك أسرع 10 مرات"
                description="أدوات ذكاء اصطناعي هتخلّيك تعمل في ساعة اللي غيرك بيعمله في يوم. والجزء ده بيتحدث باستمرار."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconWorldWww className="size-6 text-brand-500" />}
                title="موقع يبيعلك 24/7"
                description="هتبني موقع شخصي احترافي يعرض خدماتك ويجيبلك clients وإنت نايم. ده الـ salesman بتاعك اللي مبيتعبش."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconSpeakerphone className="size-6 text-brand-500" />}
                title="تسويق وبيع بدون ما تتسول"
                description="هتتعلم تبيع شغلك باحتراف. تكلم client، تقنعه، وتقفل الـ deal بسعر يحترمك."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconUserStar className="size-6 text-brand-500" />}
                title="تبقى الخيار الأول للشركات"
                description="هتتعلم تقدم نفسك كمحترف الشركات بتدور عليه. مش مجرد مصمم — أنت حل لمشاكلهم."
              />
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift>
              <PillarCard
                icon={<IconBrandLinkedin className="size-6 text-brand-500" />}
                title="LinkedIn يجيبلك شغل"
                description="بروفايل قوي + خطة محتوى 30 يوم. الشركات والـ HR هما اللي هييجوا يكلموك."
              />
            </HoverLift>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

function PillarCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-200 dark:hover:border-brand-800/40 h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 font-medium">
        <IconCheck className="size-4" />
        <span>موجود في الكورس</span>
      </div>
    </div>
  );
}
