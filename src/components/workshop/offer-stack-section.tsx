"use client";

import Link from "next/link";
import {
  IconCheck,
  IconArrowLeft,
  IconBook,
  IconTemplate,
  IconMessage,
  IconCalculator,
  IconRobot,
  IconUsers,
  IconBrandLinkedin,
  IconFlame,
  IconWorldWww,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, CountUp } from "@/components/ui/motion";

const COURSE_SLUG = "warshit-ameen";

const OFFER_ITEMS = [
  { icon: <IconBook className="size-5" />, title: "الكورس الأساسي — 30+ ساعة", value: "3,000", primary: true },
  { icon: <IconWorldWww className="size-5" />, title: "Website Kit — موقعك الشخصي جاهز", value: "2,000", primary: false },
  { icon: <IconTemplate className="size-5" />, title: "Portfolio Kit — 5 Templates", value: "1,500", primary: false },
  { icon: <IconMessage className="size-5" />, title: "10 رسائل جاهزة تجيبلك clients", value: "1,000", primary: false },
  { icon: <IconCalculator className="size-5" />, title: "أداة تسعير شغلك", value: "500", primary: false },
  { icon: <IconRobot className="size-5" />, title: "AI Toolkit (بيتحدث مدى الحياة)", value: "1,500", primary: false },
  { icon: <IconUsers className="size-5" />, title: "مجتمع أكاديمية أمين + فرص شغل", value: "2,000", primary: false },
  { icon: <IconBrandLinkedin className="size-5" />, title: "LinkedIn Makeover + خطة 30 يوم", value: "800", primary: false },
];

export function OfferStackSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">
          {/* Right — Stack list */}
          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <p className="text-sm font-semibold text-brand-500 tracking-wide mb-4">العرض الكامل</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.15]">
                كل ده بسعر أقل
                <br />
                <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">من أول شغلانة هتجيبها.</span>
              </h2>
            </FadeIn>

            <StaggerContainer className="mt-10 space-y-0 divide-y divide-border" staggerDelay={0.06}>
              {OFFER_ITEMS.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-center justify-between py-4 group">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        item.primary
                          ? "bg-brand-500 text-white"
                          : "bg-muted text-brand-500 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30"
                      }`}>
                        {item.icon}
                      </div>
                      <span className={`text-[15px] ${item.primary ? "font-bold text-foreground" : "text-foreground"}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground line-through shrink-0 mr-2">
                      {item.value} ج
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Left — Price card (sticky) */}
          <div className="lg:col-span-2">
            <ScaleIn delay={0.2}>
              <div className="lg:sticky lg:top-24 rounded-3xl bg-brand-950 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-brand-500/15 rounded-full blur-[80px]" />

                <div className="relative space-y-5">
                  <p className="text-white/40 text-sm">القيمة الحقيقية</p>
                  <p className="text-3xl font-bold line-through text-white/30">
                    <CountUp target={12300} suffix=" جنيه" duration={1.5} />
                  </p>

                  <div className="h-px bg-white/10" />

                  <div>
                    <Badge className="bg-brand-500 text-white border-0 px-3 py-1.5 text-xs mb-3">
                      <IconFlame className="size-3.5 ml-1" />
                      عرض لأول 50 مشترك
                    </Badge>
                    <p className="text-5xl font-bold">1,500</p>
                    <p className="text-white/40 text-sm mt-1">جنيه مصري</p>
                  </div>

                  <Button
                    asChild
                    size="xl"
                    className="w-full bg-white text-brand-700 hover:bg-white/90 font-bold"
                  >
                    <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                      ابدأ دلوقتي
                      <IconArrowLeft className="size-5" />
                    </Link>
                  </Button>

                  <p className="text-white/30 text-xs">
                    ضمان كامل — لو مش مناسبك، فلوسك ترجع
                  </p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
}
