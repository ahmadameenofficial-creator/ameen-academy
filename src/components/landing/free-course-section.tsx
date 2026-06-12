import Link from "next/link";
import { IconGift, IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BorderBeam } from "@/components/ui/border-beam";

const points = [
  "تفهم يعني إيه تصميم بجد",
  "تعرف ازاي تبقى مصمم في 2026",
  "يحطك على الطريق الصح من أول يوم",
];

export function FreeCourseSection() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container">
        <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-background p-6 sm:p-8 lg:p-12">
          <div
            className="absolute -left-20 -top-20 size-72 rounded-full bg-brand-500/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            {/* النص */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-4 py-1.5 text-sm font-medium text-brand-700">
                <IconGift className="size-4" />
                زكاة علم — مجاني للأبد
              </div>

              <h2 className="mt-5 text-balance text-2xl font-bold leading-[1.4] text-foreground sm:text-3xl lg:text-4xl">
                ابدأ دلوقتي بالكورس المجاني
                <span className="mt-2 block text-gradient-brand pb-1 leading-[1.4]">
                  من غير ما تدفع ولا جنيه
                </span>
              </h2>

              <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
                كراش كورس هيخليك تفهم يعني إيه تصميم وازاي تبقى مصمم في 2026.
                هدفه يساعدك بجد — مش هزار ومش تسويق. خده دلوقتي وانت تقرر بعدها.
              </p>

              <ul className="mt-5 flex flex-col items-center gap-2 lg:items-start">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-foreground/90">
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <IconCheck className="size-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  variant="gradient"
                  size="xl"
                  className="btn-shine w-full sm:w-auto"
                >
                  <Link href="/free">
                    ابدأ دلوقتي ببلاش
                    <IconArrowLeft className="size-5" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  مفيش أي مقابل — مجاني للأبد
                </span>
              </div>
            </div>

            {/* السعر المرئي — شعاع بيلف حواليه يشد العين */}
            <div className="flex justify-center">
              <div className="relative rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-xl shadow-brand-500/10">
                <BorderBeam />
                <div className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                  زكاة علم
                </div>
                <p className="mt-3 text-sm text-muted-foreground">قيمة الكورس الحقيقية</p>
                <p className="text-2xl font-bold text-muted-foreground line-through">500 جنيه</p>
                <p className="mt-3 text-sm text-muted-foreground">سعره ليك دلوقتي</p>
                <p className="text-5xl font-extrabold text-gradient-brand">0</p>
                <p className="text-sm font-medium text-foreground">جنيه</p>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
