"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  IconCalendar,
  IconUsers,
  IconBriefcase,
  IconPalette,
} from "@tabler/icons-react";

const CREDENTIALS = [
  { icon: IconCalendar, value: "+10", label: "سنين خبرة" },
  { icon: IconUsers, value: "+300", label: "طالب خريج" },
  { icon: IconBriefcase, value: "3", label: "سنين مدير تسويق" },
  { icon: IconPalette, value: "∞", label: "مشروع براندينج" },
];

export function InstructorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-muted/40 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-brand-500/[0.03] rounded-full blur-[120px]" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-5 gap-14 items-start"
          >
            {/* الصورة */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative w-64 sm:w-72 lg:w-full aspect-[3/4] rounded-2xl overflow-hidden group">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-brand-500/10 rounded-3xl blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/30">
                  <Image
                    src="/images/00.png"
                    alt="أحمد أمين — مؤسس أكاديمية أمين"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>
            </div>

            {/* المحتوى */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-sm font-medium text-brand-500 mb-4">مين اللي هيعلّمك؟</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1]">
                  أحمد أمين
                </h2>
                <p className="text-muted-foreground/50 mt-2">
                  مصمم جرافيك ومؤسس أكاديمية أمين
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                أنا مش حد اتولد بالمهارة دي. بدأت من صفر — زيك بالظبط.
                وعديت بكل حاجة: شغل ببلاش، مش عارف أسعّر، محدش بيرد عليّا.
                لحد ما فهمت إن المهارة لوحدها مش كفاية — لازم تعرف تبيع نفسك.
                علّمت 300+ شخص النظام ده وبدأوا يكسبوا. الكورس ده 10 سنين خبرة
                مكثّفة في 30 ساعة عملي.
              </p>

              {/* Stats — 3D depth cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CREDENTIALS.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="group/card rounded-xl border border-border/50 bg-card p-5 text-center hover:border-brand-500/20 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 mx-auto mb-3 group-hover/card:shadow-md group-hover/card:shadow-brand-500/10 transition-shadow duration-300">
                      <cred.icon className="size-4 text-brand-500" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{cred.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cred.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
