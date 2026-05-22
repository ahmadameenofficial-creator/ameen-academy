"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  IconCheck,
  IconArrowLeft,
  IconFlame,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "warshit-ameen";

const ITEMS = [
  { title: "الكورس الأساسي — 30+ ساعة", value: "3,000" },
  { title: "Website Kit — موقعك الشخصي جاهز", value: "2,000" },
  { title: "Portfolio Kit — 5 Templates", value: "1,500" },
  { title: "10 رسائل جاهزة تجيبلك clients", value: "1,000" },
  { title: "أداة تسعير شغلك", value: "500" },
  { title: "AI Toolkit بيتحدث مدى الحياة", value: "1,500" },
  { title: "مجتمع أكاديمية أمين + فرص شغل", value: "2,000" },
  { title: "LinkedIn Makeover + خطة 30 يوم", value: "800" },
];

export function OfferStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-24 md:py-32 bg-muted/40" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-brand-500 mb-6">العرض الكامل</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
              كل ده بسعر أقل
              <br />
              <span className="text-muted-foreground/50">من أول شغلانة هتجيبها.</span>
            </h2>
          </div>

          {/* Stack */}
          <div className="mb-12">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center justify-between py-4 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                    <IconCheck className="size-3.5 text-brand-500" />
                  </div>
                  <span className="text-[15px] text-foreground">{item.title}</span>
                </div>
                <span className="text-sm text-muted-foreground line-through shrink-0">
                  {item.value} ج
                </span>
              </motion.div>
            ))}
          </div>

          {/* Price card */}
          <div className="rounded-3xl bg-brand-950 text-white p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-500/10 rounded-full blur-[100px]" />

            <div className="relative space-y-6">
              <div>
                <p className="text-white/30 text-sm">القيمة الحقيقية</p>
                <p className="text-4xl font-bold text-white/20 line-through mt-1">12,300 جنيه</p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <IconFlame className="size-5 text-orange-400" />
                <p className="text-sm text-white/50">عرض لأول 50 مشترك</p>
              </div>

              <div>
                <p className="text-6xl md:text-7xl font-bold tracking-tight">1,500</p>
                <p className="text-white/30 text-sm mt-1">جنيه مصري</p>
              </div>

              <Button
                asChild
                size="xl"
                className="bg-white text-brand-700 hover:bg-white/90 font-bold px-12"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>

              <p className="text-white/20 text-xs">ضمان كامل — فلوسك ترجع لو مكسبتش</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
