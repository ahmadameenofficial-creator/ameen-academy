"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconShieldCheck,
  IconClock,
  IconFlame,
  IconCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, Parallax, FloatingElement } from "@/components/ui/motion";

const COURSE_SLUG = "warshit-ameen";

const QUICK_WINS = [
  "30+ ساعة محتوى عملي (تصميم + AI + تسويق + بيع)",
  "موقع شخصي يعرض خدماتك ويبيعلك 24/7",
  "Portfolio Kit — 5 templates جاهزة",
  "10 رسائل جاهزة تجيبلك أول client",
  "أداة تسعير شغلك باحتراف",
  "AI Toolkit بيتحدث مدى الحياة",
  "مجتمع أكاديمية أمين + فرص شغل",
  "ضمان كامل — لو مكسبتش فلوسك ترجع",
];

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <ScaleIn scale={0.9}>
          <div className="rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-[#0d0020] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden">
            <Parallax speed={-0.4} className="absolute top-0 right-0">
              <div className="w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[150px]" />
            </Parallax>
            <Parallax speed={0.3} className="absolute bottom-0 left-0">
              <div className="w-[300px] h-[300px] bg-brand-400/5 rounded-full blur-[120px]" />
            </Parallax>

            <div className="relative">
              <div className="text-center space-y-6 mb-10">
                <FadeIn direction="down" delay={0.1}>
                  <FloatingElement amplitude={4} duration={5}>
                    <Badge className="bg-brand-500/20 text-brand-200 border border-brand-400/30 px-4 py-2 text-sm">
                      <IconFlame className="size-4 ml-1" />
                      عرض لأول 50 مشترك — بعد كده السعر يرجع 3,000 جنيه
                    </Badge>
                  </FloatingElement>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    عندك اختيارين:
                    <br />
                    <span className="text-brand-300">
                      تفضل زي ما إنت — أو تبني دخل حقيقي
                    </span>
                  </h2>
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                  <p className="text-white/60 text-lg max-w-xl mx-auto">
                    بعد 90 يوم من دلوقتي — إما هتكون بدأت تكسب فعلاً،
                    أو هتكون لسه بتتفرج على YouTube وبتقول &ldquo;بكرة هبدأ&rdquo;.
                  </p>
                </FadeIn>
              </div>

              <StaggerContainer className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10" staggerDelay={0.06}>
                {QUICK_WINS.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 mt-0.5">
                        <IconCheck className="size-3 text-white" />
                      </div>
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <ScaleIn delay={0.2}>
              <div className="text-center space-y-5">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg text-white/40 line-through">
                    3,000 جنيه
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    1,500 جنيه
                  </span>
                </div>

                <Button
                  asChild
                  size="xl"
                  className="w-full sm:w-auto bg-white text-brand-700 hover:bg-white/90 text-base px-12 font-bold"
                >
                  <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                    ابدأ دلوقتي
                    <IconArrowLeft className="size-5" />
                  </Link>
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 pt-2">
                  <span className="flex items-center gap-2">
                    <IconShieldCheck className="size-4 text-brand-400" />
                    ضمان استرداد كامل
                  </span>
                  <span className="flex items-center gap-2">
                    <IconClock className="size-4 text-brand-400" />
                    وصول مدى الحياة
                  </span>
                </div>

                <p className="text-white/30 text-xs max-w-md mx-auto pt-2">
                  بمجرد ما تدفع هتقدر تبدأ فوراً. الكورس مسجّل — اتعلم في أي
                  وقت يناسبك.
                </p>
              </div>
              </ScaleIn>
            </div>
          </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
