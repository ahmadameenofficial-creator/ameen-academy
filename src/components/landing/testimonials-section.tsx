import {
  IconShieldCheck,
  IconHandStop,
  IconTargetArrow,
  IconInfinity,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/card";

// بدل آراء مخترعة (اللي بتضرب الثقة) — أسباب حقيقية تخلّيك تثق
const reasons: Array<{
  title: string;
  description: string;
  Icon: TablerIcon;
}> = [
  {
    title: "جرّب الأول ببلاش",
    description:
      "مش هنطلب منك تدفع وانت مش عارف بتشتري إيه. خد الكورس المجاني، شوف الأسلوب، وبعدها إنت تقرر.",
    Icon: IconHandStop,
  },
  {
    title: "محتوى عملي مش كلام",
    description:
      "كل درس مهارة تطبّقها على شغل حقيقي — مش محاضرات نظرية تتفرج عليها وتنساها تاني يوم.",
    Icon: IconTargetArrow,
  },
  {
    title: "ضمان 14 يوم",
    description:
      "لو المحتوى مش عاجبك في أول 14 يوم، فلوسك ترجعلك كاملة. الريسك علينا مش عليك.",
    Icon: IconShieldCheck,
  },
  {
    title: "وصول مدى الحياة",
    description:
      "بتدفع مرة واحدة وتفضل معاك للأبد — كل تحديث أو إضافة جديدة على الكورس تاخدها ببلاش.",
    Icon: IconInfinity,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            ليه تثق فينا
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            مش هنطلب منك تثق في كلام —{" "}
            <span className="text-gradient-brand">جرّب وانت تحكم</span>
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            إحنا لسه في بداية الطريق، ومش هنبيعلك أرقام مفبركة. بس إحنا واثقين في
            اللي بنقدّمه — وعشان كده حطّينا الريسك كله علينا.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
          {reasons.map((r) => {
            const Icon = r.Icon;
            return (
              <Card
                key={r.title}
                className="group flex items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-500 dark:bg-brand-900/30">
                  <Icon
                    className="size-6 text-brand-500 transition-colors group-hover:text-white"
                    stroke={1.75}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-[1.4]">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {r.description}
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
