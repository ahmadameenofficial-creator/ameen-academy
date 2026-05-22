import Link from "next/link";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 text-center text-white shadow-2xl shadow-brand-500/20 lg:p-16">
          {/* Decorative shapes */}
          <div
            className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <IconSparkles className="size-4" />
              ابدأ ببلاش — زكاة علم
            </div>

            <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              مستني إيه؟ ابدأ بالكورس المجاني دلوقتي
            </h2>

            <p className="mt-5 text-balance text-base leading-relaxed opacity-90 sm:text-lg">
              كورس قيمته 1500 جنيه، بتاخده ببلاش بدون ولا جنيه. هيحطك على الطريق
              الصح وتفهم يعني إيه تصميم في 2026. خده دلوقتي قبل ما يتغيّر سعره.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="w-full bg-white text-brand-700 hover:bg-white/90 sm:w-auto"
              >
                <Link href="/free">
                  ابدأ دلوقتي ببلاش
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                <Link href={ROUTES.courses}>شوف باقي الكورسات</Link>
              </Button>
            </div>

            <p className="mt-6 text-xs opacity-75">
              مفيش رسوم خفية · الكورس المجاني هيفضل مجاني للأبد
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
