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
    <section className="py-24 md:py-32 bg-neutral-50" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">العرض الكامل</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1]">
              كل ده بسعر أقل
              <br />
              <span className="text-neutral-400">من أول شغلانة هتجيبها.</span>
            </h2>
          </motion.div>

          {/* Stack */}
          <div className="mb-12 bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
                className="flex items-center justify-between py-5 px-6 md:px-8 border-b border-neutral-50 last:border-0 group hover:bg-brand-50/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <IconCheck className="size-3.5 text-brand-500" />
                  </div>
                  <span className="text-[15px] text-neutral-800">{item.title}</span>
                </div>
                <span className="text-sm text-neutral-300 line-through shrink-0">
                  {item.value} ج
                </span>
              </motion.div>
            ))}
          </div>

          {/* Price card — dark contrast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-3xl bg-[#0a0a0a] text-white p-10 md:p-14 text-center"
          >
            <div className="space-y-6">
              <div>
                <p className="text-white/30 text-sm">القيمة الحقيقية</p>
                <p className="text-4xl font-bold text-white/15 line-through mt-1">12,300 جنيه</p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <IconFlame className="size-4 text-orange-400" />
                <p className="text-sm text-white/50">عرض لأول 50 مشترك</p>
              </div>

              <div>
                <p className="text-7xl md:text-8xl font-bold tracking-tight">1,500</p>
                <p className="text-white/25 text-sm mt-1">جنيه مصري</p>
              </div>

              <Button
                asChild
                size="xl"
                className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold px-12"
              >
                <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                  ابدأ دلوقتي
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>

              <p className="text-white/20 text-xs">ضمان كامل — فلوسك ترجع لو مكسبتش</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
