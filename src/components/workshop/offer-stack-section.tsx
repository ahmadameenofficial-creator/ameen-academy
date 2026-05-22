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
    <section className="py-24 md:py-32 bg-muted/40 relative overflow-hidden" ref={ref}>
      {/* Depth orbs */}
      <div className="absolute top-0 right-[10%] w-72 h-72 bg-brand-500/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[5%] w-64 h-64 bg-brand-600/[0.03] rounded-full blur-[100px]" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-medium text-brand-500 mb-6">العرض الكامل</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
              كل ده بسعر أقل
              <br />
              <span className="text-muted-foreground/40">من أول شغلانة هتجيبها.</span>
            </h2>
          </motion.div>

          {/* Stack */}
          <div className="mb-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                className="flex items-center justify-between py-5 px-6 md:px-8 border-b border-border/30 last:border-0 group hover:bg-brand-500/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 group-hover:bg-brand-500/20 group-hover:shadow-md group-hover:shadow-brand-500/10 transition-all duration-300">
                    <IconCheck className="size-3.5 text-brand-500" />
                  </div>
                  <span className="text-[15px] text-foreground">{item.title}</span>
                </div>
                <span className="text-sm text-muted-foreground/50 line-through shrink-0">
                  {item.value} ج
                </span>
              </motion.div>
            ))}
          </div>

          {/* Price card — 3D with depth */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            style={{ perspective: "1200px" }}
          >
            <div className="rounded-3xl bg-[#080014] text-white p-10 md:p-14 text-center relative overflow-hidden border border-brand-500/10">
              {/* Multi-layer glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-brand-600/8 rounded-full blur-[100px]" />

              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(160,2,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(160,2,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative space-y-6">
                <div>
                  <p className="text-white/25 text-sm">القيمة الحقيقية</p>
                  <p className="text-4xl font-bold text-white/15 line-through mt-1">12,300 جنيه</p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <IconFlame className="size-4 text-orange-400" />
                  <p className="text-sm text-orange-300">عرض لأول 50 مشترك</p>
                </div>

                <div className="relative">
                  {/* Glow behind price */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-brand-500/15 rounded-full blur-[60px]" />
                  <p className="relative text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    1,500
                  </p>
                  <p className="text-white/25 text-sm mt-1">جنيه مصري</p>
                </div>

                <div className="relative group inline-block">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all duration-500" />
                  <Button
                    asChild
                    size="xl"
                    className="relative bg-white text-brand-700 hover:bg-white/90 font-bold px-12 shadow-2xl"
                  >
                    <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                      ابدأ دلوقتي
                      <IconArrowLeft className="size-5" />
                    </Link>
                  </Button>
                </div>

                <p className="text-white/15 text-xs">ضمان كامل — فلوسك ترجع لو مكسبتش</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
