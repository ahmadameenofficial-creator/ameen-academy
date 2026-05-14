import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconShieldCheck,
  IconClock,
  IconCheck,
  IconX,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "سياسة الاسترجاع",
};

export default function RefundPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">سياسة الاسترجاع</h1>
            <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
              رضاك أهم حاجة عندنا — عشان كده بنقدملك ضمان استرجاع كامل
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* الضمان */}
            <Card className="border-brand-200 bg-brand-50/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center">
                  <IconShieldCheck className="h-8 w-8 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  ضمان 14 يوم — استرجاع كامل
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  لو اشتريت أي كورس وحسيت إنه مش مناسبك، تقدر تطلب استرجاع فلوسك كاملة خلال 14 يوم من تاريخ الشراء — من غير أي أسئلة.
                </p>
              </CardContent>
            </Card>

            {/* إزاي تسترد فلوسك */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">إزاي تسترد فلوسك؟</h3>
              <div className="space-y-3">
                {[
                  "ابعتلنا على واتساب أو الإيميل إنك عايز تسترد فلوسك",
                  "اكتب اسمك والإيميل المسجّل بيه وإسم الكورس",
                  "هنراجع الطلب ونرد عليك خلال 48 ساعة",
                  "المبلغ هيرجعلك بنفس طريقة الدفع خلال 5-7 أيام عمل",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-brand-600">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* الشروط */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <IconCheck className="h-5 w-5 text-green-500" />
                    بنقبل الاسترجاع لو
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <IconCheck className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>الطلب خلال 14 يوم من الشراء</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCheck className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>المحتوى مش عاجبك أو مش مناسب لمستواك</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCheck className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>واجهتك مشكلة تقنية ومقدرناش نحلها</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <IconX className="h-5 w-5 text-red-500" />
                    مش بنقبل الاسترجاع لو
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <IconX className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>عدت 14 يوم من تاريخ الشراء</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconX className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>خلصت أكتر من 50% من المحتوى</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconX className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>شاركت المحتوى مع حد تاني</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* ملاحظة */}
            <div className="flex items-start gap-3 rounded-xl bg-muted/50 border border-border p-5">
              <IconClock className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">ملاحظة:</strong> رسوم بوابة الدفع (~3.5%) بتتخصم من المبلغ المسترد لأنها بتتحسب علينا من شركة الدفع.
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <p className="text-muted-foreground mb-4">محتاج تطلب استرجاع؟</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="gradient" asChild>
                  <Link href="/contact">
                    <IconBrandWhatsapp className="h-5 w-5" />
                    تواصل معنا
                  </Link>
                </Button>
                <Button variant="soft" asChild>
                  <a href="mailto:info@ameenacademy.com">
                    ابعت إيميل
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
