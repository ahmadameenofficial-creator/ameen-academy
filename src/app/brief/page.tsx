import type { Metadata } from "next";
import Link from "next/link";
import {
  IconWand,
  IconBrandAppgallery,
  IconPhoto,
  IconPalette,
  IconArrowLeft,
  IconTargetArrow,
  IconUsersGroup,
  IconTrophy,
} from "@tabler/icons-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "منصة البريف | اتدرّب على بريفات تصميم حقيقية",
  description:
    "أكبر منصة عربية لتدريب المصممين على بريفات احترافية واقعية — لوجو، سوشيال ميديا، وهوية بصرية. ولّد بريف، حُلّه، وابنِ بورتفوليو حقيقي.",
  alternates: { canonical: "/brief" },
};

const types = [
  { icon: IconBrandAppgallery, title: "تصميم شعار", desc: "لوجوهات لبراندات حقيقية بقيود عميل" },
  { icon: IconPhoto, title: "بوست سوشيال ميديا", desc: "محتوى يبيع مش بس صورة حلوة" },
  { icon: IconPalette, title: "هوية بصرية كاملة", desc: "من اللوجو للألوان للخطوط" },
];

const steps = [
  { icon: IconWand, title: "ولّد البريف", desc: "اختار النوع والمستوى وهنطلّعلك بريف واقعي" },
  { icon: IconTargetArrow, title: "حُلّ التحدي", desc: "صمّم الحل بتاعك زي ما العميل طالب بالظبط" },
  { icon: IconUsersGroup, title: "ارفع شغلك", desc: "اعرض حلك واتقيّم وابنِ بورتفوليو حقيقي" },
  { icon: IconTrophy, title: "اتقدّم", desc: "اكسب نقاط، حافظ على سلسلتك، واطلع المتصدرين" },
];

export default function BriefHubPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-background px-4 py-16 dark:from-brand-900/20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              مفيش عميل؟ اتدرّب على بريف حقيقي.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              أكبر منصة عربية بتدّيك بريفات تصميم واقعية زي اللي بتيجي من عملاء فعليين — وتساعدك
              تبني بورتفوليو يفرّق.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <Link href="/brief/generate">
                  <IconWand size={22} />
                  ولّد أول بريف ليك
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/brief/explore">
                  <IconBrandAppgallery size={22} />
                  تصفّح البريفات
                </Link>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              <Link href="/brief/leaderboard" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand-600">
                <IconTrophy size={16} />
                المتصدرين
              </Link>
              <Link href="/brief/challenges" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand-600">
                <IconTargetArrow size={16} />
                التحديات
              </Link>
              <Link href="/brief/my" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand-600">
                <IconTargetArrow size={16} />
                بريفاتي
              </Link>
            </div>
          </div>
        </section>

        {/* أنواع البريف */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            اتدرّب على أي نوع
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {types.map((t) => (
              <Card key={t.title} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
                    <t.icon size={28} stroke={1.5} />
                  </div>
                  <h3 className="font-bold text-foreground">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* إزاي تشتغل */}
        <section className="bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">إزاي بتشتغل</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.title} className="text-center">
                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
                    <s.icon size={26} stroke={1.5} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-l from-brand-700 to-brand-500 p-10 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">جاهز تبدأ؟</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              ولّد بريف دلوقتي وابدأ تتدرّب. مجاناً تماماً.
            </p>
            <Button asChild size="xl" className="mt-6 bg-white text-brand-700 hover:bg-white/90">
              <Link href="/brief/generate">
                ولّد بريف
                <IconArrowLeft size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
