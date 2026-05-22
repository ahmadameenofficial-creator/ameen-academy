"use client";

import Image from "next/image";
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
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-14 items-start">
            {/* الصورة */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative w-64 sm:w-72 lg:w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/00.png"
                  alt="أحمد أمين — مؤسس أكاديمية أمين"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>

            {/* المحتوى */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-sm font-medium text-brand-500 mb-4">مين اللي هيعلّمك؟</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1]">
                  أحمد أمين
                </h2>
                <p className="text-muted-foreground/60 mt-2">
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

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
                {CREDENTIALS.map((cred) => (
                  <div key={cred.label} className="bg-background p-5 text-center">
                    <cred.icon className="size-5 text-brand-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-foreground">{cred.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cred.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
