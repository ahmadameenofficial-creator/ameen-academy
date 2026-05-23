import {
  IconRoute,
  IconCoin,
  IconClock,
  IconUsers,
  IconCertificate,
  IconHeadset,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/card";

const features: Array<{
  title: string;
  description: string;
  Icon: TablerIcon;
}> = [
  {
    title: "خريطة طريق واضحة",
    description: "مش هتتوه. بنوريك تبدأ منين، تتعلّم إيه، وتشتغل إزاي — خطوة بخطوة من أول يوم.",
    Icon: IconRoute,
  },
  {
    title: "محتوى بتكسب منه",
    description: "مفيش كلام نظري. كل درس مهارة تطبّقها وتقدر تبيعها وتجيب بيها فلوس فعلاً.",
    Icon: IconCoin,
  },
  {
    title: "اتعلّم بإيقاعك",
    description: "ذاكر وقت ما تحب، من أي جهاز، ومعاك تتبّع تلقائي لتقدّمك في كل كورس.",
    Icon: IconClock,
  },
  {
    title: "مجتمع بيشتغل معاك",
    description: "اتواصل مع ناس بتتعلّم وبتشتغل زيّك، اسأل، شارك شغلك، واكسب علاقات.",
    Icon: IconUsers,
  },
  {
    title: "شهادة تفرق معاك",
    description: "بعد ما تخلّص، تاخد شهادة إكمال تحطها في الـ CV وتشاركها على لينكدإن.",
    Icon: IconCertificate,
  },
  {
    title: "مش هنسيبك لوحدك",
    description: "فريق الدعم معاك في كل خطوة، يرد على أسئلتك ويساعدك لما تقف.",
    Icon: IconHeadset,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            هدفنا الوحيد
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl">
            هدفنا إنك{" "}
            <span className="text-gradient-brand">تكسب فلوس بجد</span>
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            مش بنبيعلك كلام. بنديك خريطة طريق تبدأ بيها من الكراش كورس المجاني،
            وتمشي معانا خطوة بخطوة لحد ما تشتغل وتكسب.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.Icon;
            return (
              <Card
                key={feature.title}
                className="group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-brand-100/0 transition-all duration-500 group-hover:bg-brand-100/40 dark:group-hover:bg-brand-900/30" />

                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-500 dark:bg-brand-900/30">
                    <Icon
                      className="size-6 text-brand-500 transition-colors group-hover:text-white"
                      stroke={1.75}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-[1.4]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
