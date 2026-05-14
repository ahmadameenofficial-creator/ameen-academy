import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconMail,
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconClock,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "تواصل معنا",
};

const contactMethods = [
  {
    icon: IconBrandWhatsapp,
    title: "واتساب",
    desc: "تقدر تكلمنا مباشرة على واتساب",
    value: "+20 109 091 2747",
    href: "https://wa.me/201090912747",
    color: "bg-green-50 text-green-600",
    iconColor: "text-green-500",
  },
  {
    icon: IconMail,
    title: "الإيميل",
    desc: "ابعتلنا وهنرد عليك في أقرب وقت",
    value: "info@ameenacademy.com",
    href: "mailto:info@ameenacademy.com",
    color: "bg-brand-50 text-brand-600",
    iconColor: "text-brand-500",
  },
  {
    icon: IconBrandInstagram,
    title: "إنستجرام",
    desc: "شوف أعمالنا وشغل الطلاب",
    value: "@Ahmadameenofficial",
    href: "https://www.instagram.com/Ahmadameenofficial",
    color: "bg-pink-50 text-pink-600",
    iconColor: "text-pink-500",
  },
  {
    icon: IconBrandLinkedin,
    title: "لينكد إن",
    desc: "تابع مسيرتنا المهنية",
    value: "Ahmad Ameen",
    href: "https://www.linkedin.com/in/ahmad-ameen/",
    color: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-500",
  },
];

export default function ContactPage() {
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

          <div className="relative container mx-auto px-4 py-16 md:py-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold">تواصل معنا</h1>
            <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
              عندك سؤال أو محتاج مساعدة؟ احنا هنا عشانك
            </p>
          </div>
        </section>

        {/* طرق التواصل */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {contactMethods.map((m) => (
              <Link key={m.title} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined}>
                <Card className="h-full hover:shadow-lg hover:border-brand-200 transition-all duration-200 cursor-pointer">
                  <CardContent className="p-6 space-y-3">
                    <div className={`h-12 w-12 rounded-xl ${m.color} flex items-center justify-center`}>
                      <m.icon className={`h-6 w-6 ${m.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                    <p className="text-sm font-medium text-foreground" dir="ltr">{m.value}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* أوقات الرد */}
          <div className="mt-10 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
              <IconClock className="h-4 w-4 text-brand-500" />
              <span>بنرد خلال 24 ساعة في أيام العمل (الأحد — الخميس)</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
