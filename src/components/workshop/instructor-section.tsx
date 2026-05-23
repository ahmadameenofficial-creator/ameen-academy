"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconCalendar,
  IconUsers,
  IconBriefcase,
  IconPalette,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  { icon: IconCalendar, value: "+10", label: "سنين خبرة" },
  { icon: IconUsers, value: "+300", label: "طالب خريج" },
  { icon: IconBriefcase, value: "3", label: "سنين مدير تسويق" },
  { icon: IconPalette, value: "∞", label: "مشروع براندينج" },
];

export function InstructorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // الصورة
      gsap.fromTo(
        ".instructor-image",
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      // النص
      gsap.fromTo(
        ".instructor-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          delay: 0.2,
        }
      );

      // الـ stats
      const stats = section.querySelectorAll(".instructor-stat");
      stats.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 50%",
              toggleActions: "play none none none",
            },
            delay: 0.4 + i * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#060610]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-14 items-start">
            {/* الصورة */}
            <div className="instructor-image lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative w-64 sm:w-72 lg:w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/00.png"
                  alt="أحمد أمين — مؤسس أكاديمية أمين"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 288px, 320px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* المحتوى */}
            <div className="instructor-content lg:col-span-3 space-y-8">
              <div>
                <p className="text-sm font-semibold text-brand-400/80 uppercase tracking-[0.15em] mb-4">
                  مين اللي هيعلّمك؟
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
                  أحمد أمين
                </h2>
                <p className="text-white/30 mt-2">
                  مصمم جرافيك ومؤسس أكاديمية أمين
                </p>
              </div>

              <p className="text-white/45 leading-relaxed">
                أنا مش حد اتولد بالمهارة دي. بدأت من صفر — زيك بالظبط.
                وعديت بكل حاجة: شغل ببلاش، مش عارف أسعّر، محدش بيرد عليّا.
                لحد ما فهمت إن المهارة لوحدها مش كفاية — لازم تعرف تبيع نفسك.
                علّمت 300+ شخص النظام ده وبدأوا يكسبوا. الكورس ده 10 سنين خبرة
                مكثّفة في 30 ساعة عملي.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CREDENTIALS.map((cred) => (
                  <div
                    key={cred.label}
                    className="instructor-stat rounded-xl bg-white/[0.03] border border-white/5 p-5 text-center hover:border-brand-500/20 transition-colors duration-300"
                  >
                    <cred.icon className="size-5 text-brand-400 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-white">
                      {cred.value}
                    </p>
                    <p className="text-xs text-white/25 mt-1">{cred.label}</p>
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
