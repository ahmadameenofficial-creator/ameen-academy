import { IconQuote, IconStarFilled } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "محمد أحمد",
    role: "Frontend Developer",
    initials: "م",
    content:
      "أفضل منصة عربية اشتركت فيها. المحتوى منظم، واضح، والمدرس بيشرح بطريقة سهلة. الكورس غيّر مستوايا تماماً.",
    rating: 5,
  },
  {
    name: "سارة محمود",
    role: "Full Stack Developer",
    initials: "س",
    content:
      "الكورس فيه تفاصيل دقيقة مش هتلاقيها في أي مكان تاني. والمجتمع نشط وبيساعد في كل سؤال. أنصح بيه جداً.",
    rating: 5,
  },
  {
    name: "خالد عبدالله",
    role: "Tech Lead",
    initials: "خ",
    content:
      "حماية الفيديوهات ممتازة والمنصة سريعة جداً. تجربة الاستخدام بسيطة وكل حاجة في مكانها الصح.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            آراء الطلاب
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            طلابنا{" "}
            <span className="text-gradient-brand">يحبوننا</span>
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            انضم لآلاف الطلاب اللي غيّروا مسارهم المهني معنا
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="relative p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <IconQuote
                className="absolute right-5 top-5 size-7 text-brand-200"
                stroke={1.5}
              />

              {/* Rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <IconStarFilled key={idx} className="size-4 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                {t.content}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-base font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
