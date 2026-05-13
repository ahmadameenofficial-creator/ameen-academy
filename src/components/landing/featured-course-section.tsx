import Link from "next/link";
import {
  IconClock,
  IconBook,
  IconStar,
  IconUsers,
  IconArrowLeft,
  IconCheck,
  IconBrandReact,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const courseHighlights = [
  "12 ساعة محتوى احترافي",
  "48 درس عملي بمشاريع حقيقية",
  "شهادة إكمال معتمدة",
  "وصول مدى الحياة",
  "تحديثات مستمرة",
  "دعم فني خلال الكورس",
];

export function FeaturedCourseSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            الكورس المتاح حالياً
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            ابدأ رحلتك مع{" "}
            <span className="text-gradient-brand">أول كورس</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-brand-500/5 lg:grid-cols-2">
            {/* Visual side */}
            <div className="relative aspect-video lg:aspect-auto">
              <div className="gradient-brand absolute inset-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />

              {/* Floating elements */}
              <div className="absolute right-6 top-6 flex gap-2">
                <Badge variant="solid" className="bg-white/20 text-white backdrop-blur-md">
                  جديد
                </Badge>
                <Badge variant="solid" className="bg-white/20 text-white backdrop-blur-md">
                  مستوى متوسط
                </Badge>
              </div>

              <div className="absolute left-6 top-6 flex size-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <IconBrandReact className="size-7 text-white" stroke={1.5} />
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group flex size-20 items-center justify-center rounded-full bg-white shadow-2xl transition-transform hover:scale-110">
                  <IconPlayerPlayFilled className="size-7 translate-x-0.5 text-brand-500 transition-transform group-hover:scale-110" />
                </button>
              </div>

              <div className="absolute bottom-6 right-6 text-white">
                <div className="text-xs font-light opacity-85">برمجة الويب</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs opacity-85">
                  <IconStar className="size-3.5 fill-white" />
                  <span className="font-medium">4.9</span>
                  <span className="opacity-70">(247 تقييم)</span>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <h3 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                احتراف React من الصفر للاحتراف
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                رحلة كاملة لتعلم React بطريقة عملية مع بناء مشاريع حقيقية من
                الأساسيات حتى الـ Advanced Patterns
              </p>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <IconClock className="size-4 text-brand-500" /> 12 ساعة
                </span>
                <span className="flex items-center gap-1.5">
                  <IconBook className="size-4 text-brand-500" /> 48 درس
                </span>
                <span className="flex items-center gap-1.5">
                  <IconUsers className="size-4 text-brand-500" /> 247 طالب
                </span>
              </div>

              {/* Highlights */}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {courseHighlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/30">
                      <IconCheck className="size-3.5 text-brand-600" stroke={3} />
                    </div>
                    <span className="text-foreground/80">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="mt-7 flex items-end justify-between border-t border-border pt-6">
                <div>
                  <div className="text-xs text-muted-foreground line-through">
                    799 جنيه
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    499 <span className="text-base font-medium text-muted-foreground">جنيه</span>
                  </div>
                </div>
                <Button asChild variant="gradient" size="lg">
                  <Link href="/courses/react-mastery">
                    سجّل الآن
                    <IconArrowLeft className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
