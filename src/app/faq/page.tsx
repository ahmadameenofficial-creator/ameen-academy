import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconMessageCircle } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
};

const faqs = [
  {
    q: "الكورس ده مناسب للمبتدئين؟",
    a: "أيوا 100%. الكورس بيبدأ معاك من الصفر — مش محتاج أي خبرة سابقة. هنعلمك كل حاجة خطوة بخطوة.",
  },
  {
    q: "لو المحتوى مش عاجبني أقدر أسترد فلوسي؟",
    a: "طبعاً! عندك 14 يوم ضمان كامل. لو حسيت إن الكورس مش مناسبك لأي سبب، تواصل معانا وهنرجعلك فلوسك كاملة من غير أي أسئلة.",
  },
  {
    q: "هل الكورس مسجّل ولا لايف؟",
    a: "الكورس مسجّل بالكامل — تقدر تتفرج في أي وقت يناسبك وترجع لأي درس عدد مرات غير محدود.",
  },
  {
    q: "هل فيه شهادة بعد ما أخلص؟",
    a: "أيوا، بعد ما تخلص كل الدروس بتاخد شهادة إكمال تقدر تحمّلها وتضيفها لبروفايلك.",
  },
  {
    q: "إيه البرامج اللي هحتاجها؟",
    a: "هتحتاج Adobe Photoshop و Adobe Illustrator. لو معندكش لايسنس، هنعلمك إزاي تاخد النسخة الرسمية.",
  },
  {
    q: "الوصول للكورس بيكون لمدة قد إيه؟",
    a: "وصول مدى الحياة! بمجرد ما تشتري الكورس تقدر تتفرج عليه في أي وقت وأي مكان للأبد.",
  },
  {
    q: "طرق الدفع المتاحة إيه؟",
    a: "تقدر تدفع بـ فيزا أو ماستركارد أو فودافون كاش أو فوري — كلها آمنة ومشفرة.",
  },
  {
    q: "هل فيه متابعة أو دعم فني؟",
    a: "أيوا، فيه مجتمع خاص للطلاب تقدر تسأل فيه أي سؤال. وكمان فيه دعم مباشر على واتساب.",
  },
  {
    q: "إزاي أتواصل معاكم لو عندي مشكلة؟",
    a: "تقدر تكلمنا على واتساب أو تبعتلنا على info@ameenacademy.com وهنرد عليك في أقرب وقت.",
  },
];

export default function FaqPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">الأسئلة الشائعة</h1>
            <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
              لقينا إن معظم الناس بتسأل نفس الأسئلة — فجمعناهم هنا عشان نوفّر عليك
            </p>
          </div>
        </section>

        {/* الأسئلة */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-muted/50 transition-colors">
                  <span className="font-semibold text-foreground text-sm md:text-base pl-4">
                    {faq.q}
                  </span>
                  <IconChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center max-w-xl mx-auto">
            <div className="rounded-2xl bg-muted/50 border border-border p-8">
              <IconMessageCircle className="h-10 w-10 text-brand-500 mx-auto mb-3" />
              <h3 className="font-bold text-foreground text-lg">لسه عندك سؤال؟</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                تواصل معانا وهنرد عليك في أقرب وقت
              </p>
              <Button variant="gradient" asChild>
                <Link href="/contact">تواصل معنا</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
