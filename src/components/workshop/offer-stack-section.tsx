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
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, CountUp, HoverLift } from "@/components/ui/motion";

const COURSE_SLUG = "warshit-ameen";

const OFFER_ITEMS = [
  {
    icon: <IconBook className="size-5 text-white" />,
    iconBg: "bg-brand-500 text-white",
    title: "الكورس الأساسي — 30+ ساعة",
    description: "تصميم جرافيك + AI Tools + تسويق شخصي + Soft Skills + Personal Brand + LinkedIn",
    value: "3,000",
    highlight: true,
  },
  {
    icon: <IconTemplate className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "Portfolio Kit — 5 Templates جاهزة",
    description: "عدّل عليها وخلاص — portfolio احترافي تقدر تعرضه لأي client فوراً",
    value: "1,500",
    highlight: false,
  },
  {
    icon: <IconMessage className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "Client Outreach Templates — 10 رسائل",
    description: "رسائل جاهزة تبعتها على LinkedIn و WhatsApp وتجيب بيها أول client",
    value: "1,000",
    highlight: false,
  },
  {
    icon: <IconCalculator className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "Pricing Calculator — أداة التسعير",
    description: "احسب سعر أي شغلانة (لوجو / سوشيال / هوية بصرية) بدون ما تبيع نفسك رخيص",
    value: "500",
    highlight: false,
  },
  {
    icon: <IconRobot className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "AI Design Toolkit (متحدث دورياً)",
    description: "أحدث أدوات الـ AI للتصميم — بيتحدث كل فترة بأدوات جديدة مدى الحياة",
    value: "1,500",
    highlight: false,
  },
  {
    icon: <IconUsers className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "مجتمع أكاديمية أمين",
    description: "جروب خاص فيه تقييم شغلك + فرص شغل + networking مع مصممين تانيين",
    value: "2,000",
    highlight: false,
  },
  {
    icon: <IconBrandLinkedin className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-900/30",
    title: "LinkedIn Profile Makeover",
    description: "Template بروفايل + خطة محتوى 30 يوم تخليك visible لأي HR أو client",
    value: "800",
    highlight: false,
  },
];

export function OfferStackSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-brand-500 font-semibold text-sm mb-3">العرض الكامل</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            كل ده بسعر واحد
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            مش بس كورس — ده نظام كامل فيه كل حاجة محتاجها عشان تبدأ تكسب.
          </p>
        </FadeIn>

        <StaggerContainer className="max-w-3xl mx-auto space-y-4" staggerDelay={0.08}>
          {OFFER_ITEMS.map((item) => (
            <StaggerItem key={item.title} direction="right">
              <HoverLift lift={-3} scale={1.01}>
                <div
                  className={`flex items-start gap-4 rounded-2xl border p-5 transition-colors ${
                    item.highlight
                      ? "border-brand-300 bg-brand-50/50 dark:border-brand-700/50 dark:bg-brand-950/20"
                      : "border-border bg-card hover:border-brand-200 dark:hover:border-brand-800/40"
                  }`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                      <div>
                        <h3 className="font-bold text-foreground text-base">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                      </div>
                      <span className="shrink-0 text-sm text-muted-foreground mt-1 sm:mt-0">
                        قيمتها{" "}
                        <span className="font-bold text-foreground line-through">{item.value} ج</span>
                      </span>
                    </div>
                  </div>
                  <IconCheck className="size-5 text-brand-500 shrink-0 mt-1" />
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Total + Price */}
        <ScaleIn delay={0.2} className="max-w-3xl mx-auto mt-10">
          <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-[#1a0033] p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-500/20 rounded-full blur-[100px]" />

            <div className="relative space-y-6">
              <div>
                <p className="text-white/60 text-sm">إجمالي القيمة الحقيقية</p>
                <p className="text-4xl md:text-5xl font-bold mt-1 line-through text-white/40">
                  <CountUp target={10300} suffix=" جنيه" duration={1.5} />
                </p>
              </div>

              <div className="h-px bg-white/10 max-w-xs mx-auto" />

              <div>
                <p className="text-white/60 text-sm">السعر العادي</p>
                <p className="text-2xl font-bold mt-1 line-through text-white/50">3,000 جنيه</p>
              </div>

              <div>
                <Badge className="bg-brand-500 text-white border-0 px-4 py-2 text-sm mb-3">
                  <IconFlame className="size-4 ml-1" />
                  عرض لأول 50 مشترك
                </Badge>
                <p className="text-5xl md:text-6xl font-bold text-white">1,500 جنيه</p>
                <p className="text-white/50 text-sm mt-2">يعني بتدفع 14% بس من القيمة الحقيقية</p>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  size="xl"
                  className="w-full sm:w-auto bg-white text-brand-700 hover:bg-white/90 text-base px-10 font-bold"
                >
                  <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                    ابدأ دلوقتي بـ 1,500 جنيه
                    <IconArrowLeft className="size-5" />
                  </Link>
                </Button>
                <p className="text-white/40 text-xs mt-3">
                  ضمان استرداد كامل — لو مش مناسبك، فلوسك ترجع
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
