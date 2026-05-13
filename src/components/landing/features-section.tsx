import {
  IconTrophy,
  IconShieldCheck,
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
    title: "محتوى احترافي",
    description: "كورسات مصممة بعناية بأحدث المعايير لتعطيك أفضل تجربة تعليمية",
    Icon: IconTrophy,
  },
  {
    title: "حماية كاملة",
    description: "فيديوهات محمية بتقنيات تشفير متقدمة وعلامة مائية ديناميكية",
    Icon: IconShieldCheck,
  },
  {
    title: "تعلم بإيقاعك",
    description: "ادرس وقت ما تحب، من أي جهاز، مع تتبع تلقائي لتقدمك",
    Icon: IconClock,
  },
  {
    title: "مجتمع تفاعلي",
    description: "تواصل مع طلاب من جميع أنحاء العالم العربي وشارك خبراتك",
    Icon: IconUsers,
  },
  {
    title: "شهادة معتمدة",
    description: "احصل على شهادة إكمال احترافية بعد إنهاء كل كورس",
    Icon: IconCertificate,
  },
  {
    title: "دعم مستمر",
    description: "فريق الدعم متواجد لمساعدتك والإجابة على استفساراتك دائماً",
    Icon: IconHeadset,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            مميزات المنصة
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            كل اللي محتاجه{" "}
            <span className="text-gradient-brand">في مكان واحد</span>
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            صممنا المنصة عشان نخلي رحلتك التعليمية أسهل وأكثر فعالية
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
                {/* Decorative gradient on hover */}
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-brand-100/0 transition-all duration-500 group-hover:bg-brand-100/40 dark:group-hover:bg-brand-900/30" />

                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-500 dark:bg-brand-900/30">
                    <Icon
                      className="size-6 text-brand-500 transition-colors group-hover:text-white"
                      stroke={1.75}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
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
