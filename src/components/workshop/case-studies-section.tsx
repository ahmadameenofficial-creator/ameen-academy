"use client";

import {
  IconQuote,
  IconBriefcase,
  IconClock,
  IconSchool,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

const CASE_STUDIES = [
  {
    name: "سارة محمد",
    age: 23,
    badge: "خريجة فنون تطبيقية",
    badgeIcon: <IconSchool className="size-3 ml-1" />,
    before:
      "كانت خريجة فنون تطبيقية ومش لاقية شغل. حاسة إن 4 سنين كلية راحوا على الفاضي ومش فاهمة السوق عايز إيه.",
    after:
      "بعد شهرين من الكورس، بنت portfolio قوي وبدأت تاخد شغل سوشيال ميديا من 3 clients ثابتين. دلوقتي بتكسب 4,000+ جنيه شهرياً.",
    income: "4,000+ جنيه/شهر",
    timeToFirstClient: "5 أسابيع",
    quote:
      "الكورس فهّمني إن المشكلة مكنتش في مهارتي — كانت في إني مش عارفة أعرض نفسي صح.",
  },
  {
    name: "محمد خالد",
    age: 20,
    badge: "طالب جامعي",
    badgeIcon: <IconSchool className="size-3 ml-1" />,
    before:
      "طالب في سنة تالتة هندسة، كان بيتعلم تصميم من YouTube من سنتين بس مش عارف يجيب أول شغلانة. بيشتغل ببلاش عشان يبني اسمه.",
    after:
      "استخدم LinkedIn Playbook من الكورس وبعد 3 أسابيع جاب أول client بـ 1,500 جنيه. دلوقتي بيعمل 6,000 شهرياً وهو لسه في الكلية.",
    income: "6,000 جنيه/شهر",
    timeToFirstClient: "3 أسابيع",
    quote:
      "أول مرة حد يعلمني إزاي أكسب من التصميم مش بس إزاي أصمم.",
  },
  {
    name: "نورهان عادل",
    age: 27,
    badge: "موظفة + فريلانسر",
    badgeIcon: <IconBriefcase className="size-3 ml-1" />,
    before:
      "كانت شغالة في وظيفة إدارية بمرتب 4,500 جنيه وعايزة دخل إضافي. كانت بتعرف شوية فوتوشوب بس مش على مستوى احترافي.",
    after:
      "اتعلمت تصميم براندينج في الكورس وبدأت تاخد مشاريع هوية بصرية. أول مشروع كامل كان بـ 5,000 جنيه. دلوقتي الدخل الإضافي بتاعها 7,000+ شهرياً.",
    income: "7,000+ جنيه إضافي",
    timeToFirstClient: "6 أسابيع",
    quote:
      "كنت فاكرة التصميم حاجة صعبة ومحتاجة سنين. الكورس ده اختصرلي الطريق.",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-brand-500 font-semibold text-sm mb-3">
            قصص حقيقية
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            ناس زيّك بدأت من الصفر
            <br />
            <span className="text-brand-500">ودلوقتي بتكسب من التصميم</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto" staggerDelay={0.12}>
          {CASE_STUDIES.map((study) => (
            <StaggerItem key={study.name}>
            <HoverLift lift={-5} scale={1.02}>
            <Card
              className="overflow-hidden border-border hover:border-brand-200 transition-all hover:shadow-lg hover:shadow-brand-100/10 dark:hover:border-brand-800/40 h-full"
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-l from-brand-700 to-brand-500 p-5 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{study.name}</h3>
                      <p className="text-white/70 text-sm">{study.age} سنة</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      {study.badgeIcon}
                      {study.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{study.income}</p>
                      <p className="text-[10px] text-white/60 mt-0.5">
                        الدخل الحالي
                      </p>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-center">
                      <p className="text-lg font-bold flex items-center gap-1">
                        <IconClock className="size-4" />
                        {study.timeToFirstClient}
                      </p>
                      <p className="text-[10px] text-white/60 mt-0.5">
                        لأول client
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1.5">
                      قبل الكورس
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.before}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1.5">
                      بعد الكورس
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.after}
                    </p>
                  </div>
                  <div className="rounded-xl bg-brand-50/50 dark:bg-brand-900/10 p-4 border border-brand-100/50 dark:border-brand-800/20">
                    <IconQuote className="size-4 text-brand-400 mb-2" />
                    <p className="text-sm text-foreground font-medium italic leading-relaxed">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
