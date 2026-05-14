import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconBrush,
  IconTarget,
  IconUsers,
  IconTrophy,
  IconArrowLeft,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "عن الأكاديمية",
};

const values = [
  {
    icon: IconBrush,
    title: "محتوى عملي 100%",
    desc: "مفيش كلام نظري وبس — كل درس فيه تطبيق عملي حقيقي تقدر تضيفه لشغلك.",
  },
  {
    icon: IconTarget,
    title: "تجهيز للسوق",
    desc: "مش بنعلمك برامج بس — بنعلمك إزاي تبيع شغلك وتبني اسمك كمصمم.",
  },
  {
    icon: IconUsers,
    title: "مجتمع داعم",
    desc: "مجتمع من المصممين والمبدعين بيتشاركوا خبراتهم ويساعدوا بعض.",
  },
  {
    icon: IconTrophy,
    title: "ضمان الجودة",
    desc: "لو المحتوى مش عاجبك خلال 14 يوم، فلوسك ترجعلك كاملة.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-[#1a0033]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }} />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]" />

          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              أكاديمية أمين
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              منصة تعليمية مصرية متخصصة في التصميم الجرافيكي — هدفنا نأهلك تنزل السوق كمصمم محترف يقدر يبيع شغله ويعيش منه.
            </p>
          </div>
        </section>

        {/* القصة */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                مين أحمد أمين؟
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  أنا أحمد أمين، مصمم جرافيك بخبرة أكتر من 10 سنين في السوق المصري والخليجي، ومدير تسويق سابق لمدة 3 سنين.
                </p>
                <p>
                  شغلت مع عشرات الشركات والبراندات، واتعلمت إن التصميم مش بس إنك تعرف تفتح فوتوشوب — التصميم هو إنك تفهم السوق، تعرف تبيع شغلك، وتبني اسم ليك.
                </p>
                <p>
                  عملت أكاديمية أمين عشان أوصّل الخبرة دي لأكبر عدد من الناس — بأسلوب عملي، مباشر، وبدون لف ودوران.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden ring-4 ring-brand-100">
                <Image
                  src="/images/03.png"
                  alt="أحمد أمين"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* الرؤية */}
        <section className="bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 py-16 md:py-20 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              رؤيتنا
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              إن أي حد عنده شغف بالتصميم يقدر يتعلّم صح ويبني مصدر دخل حقيقي من شغله — مش مجرد شهادة على الحيط، لكن مهارة في إيده تأكّله عيش.
            </p>
          </div>
        </section>

        {/* القيم */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            ليه أكاديمية أمين؟
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center">
                    <v.icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="font-bold text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 text-center">
          <Button variant="gradient" size="xl" asChild>
            <Link href="/courses">
              تصفّح الكورسات
              <IconArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
