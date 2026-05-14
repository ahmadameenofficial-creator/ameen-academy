import { IconQuote, IconStarFilled } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "نورهان عادل",
    role: "مصممة فريلانسر",
    initials: "ن",
    content:
      "كنت بتعلم من يوتيوب وحاسة إني ضايعة. الكورس ده رتّبلي دماغي وعرفني أبدأ منين. دلوقتي بشتغل فريلانس وبجيب أضعاف اللي كنت بجيبه.",
    rating: 5,
  },
  {
    name: "عمر حسن",
    role: "طالب جامعي",
    initials: "ع",
    content:
      "أحمد أمين بيشرح بأسلوب عملي مش مجرد كلام نظري. أنا اتعلمت أعمل لوجو وهوية بصرية كاملة وعملت أول شغل ليّ وأنا لسه في الكورس.",
    rating: 5,
  },
  {
    name: "منى إبراهيم",
    role: "صاحبة بيزنس",
    initials: "م",
    content:
      "كنت بدفع فلوس كتير لمصممين. دلوقتي بصمم بوستات السوشيال ميديا بتاعتي بنفسي والنتيجة أحسن. الكورس وفّرلي فلوس كتير.",
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
