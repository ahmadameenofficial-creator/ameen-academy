import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconMessageCircle } from "@tabler/icons-react";
import { FaqSchema, BreadcrumbSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة عن تعلّم الجرافيك ديزاين",
  description:
    "إجابات على أشهر الأسئلة عن تعلّم الجرافيك ديزاين — ازاي ابدأ من الصفر، هل المجال مربح، كام مرتب المصمم في مصر، وإيه البرامج المطلوبة.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "الأسئلة الشائعة عن تعلّم الجرافيك ديزاين | أكاديمية أمين",
    description: "كل اللي محتاج تعرفه قبل ما تبدأ تتعلم جرافيك ديزاين — من الصفر للاحتراف",
  },
};

// ============ الأسئلة مقسمة لأقسام ============

// القسم 1: أسئلة عن المجال (أعلى بحث على Google)
const fieldFaqs = [
  {
    q: "إزاي أتعلم جرافيك ديزاين من الصفر؟",
    a: "ابدأ بتعلم أساسيات التصميم (الألوان، التايبوجرافي، التكوين) وبعدين اتعلم البرامج زي Photoshop و Illustrator. في أكاديمية أمين بنبدأ معاك من الصفر تماماً — مفيش أي خبرة مطلوبة. الكورس بياخدك خطوة بخطوة من إنك متعرفش حاجة لحد ما تبقى قادر تصمم بورتفوليو احترافي.",
  },
  {
    q: "هل الجرافيك ديزاين مربح في مصر؟",
    a: "أيوا جداً. مصمم الجرافيك الشاطر يقدر يكسب من 8,000 لحد 30,000 جنيه شهرياً في شركة، أو أكتر من كده كفريلانسر. المجال عليه طلب كبير في مصر والخليج لأن كل بيزنس محتاج تصميمات — سوشيال ميديا، شعارات، مطبوعات، مواقع. لو اتعلمت صح واشتغلت على بورتفوليو قوي، الفلوس هتيجي.",
  },
  {
    q: "كام مرتب مصمم الجرافيك في مصر؟",
    a: "المرتب بيختلف حسب الخبرة: المبتدئ (أقل من سنة) بياخد من 4,000 لـ 8,000 جنيه. اللي عنده خبرة 1-3 سنين بياخد من 8,000 لـ 15,000 جنيه. السينيور (5+ سنين) بياخد من 15,000 لـ 30,000 جنيه أو أكتر. الفريلانسر الشاطر ممكن يعمل أكتر من كده بكتير لأنه بيشتغل مع عملاء من بره مصر بالدولار.",
  },
  {
    q: "أبدأ منين في الجرافيك ديزاين؟",
    a: "أول حاجة: اتعلم أساسيات التصميم — نظرية الألوان، التايبوجرافي، مبادئ التكوين. تاني حاجة: اتعلم Photoshop (للتعديل على الصور) و Illustrator (للشعارات والرسومات). تالت حاجة: ابدأ اعمل تصميمات تجريبية واتمرّن. رابع حاجة: اعمل بورتفوليو على Behance. في أكاديمية أمين الكورس بيغطي كل ده بالترتيب.",
  },
  {
    q: "إيه البرامج المطلوبة لتعلم الجرافيك ديزاين؟",
    a: "البرامج الأساسية هي: Adobe Photoshop (لتعديل الصور والتصميمات الرقمية)، Adobe Illustrator (للشعارات والرسومات والفيكتور)، وممكن Adobe InDesign (للمطبوعات والكتب). في الكورس بتاعنا بنعلمك Photoshop و Illustrator بالتفصيل من الصفر — وبنقولك إزاي تاخد النسخة الرسمية من Adobe.",
  },
  {
    q: "الجرافيك ديزاين محتاج شهادة جامعية؟",
    a: "لا مش شرط خالص. معظم المصممين الناجحين في السوق اتعلموا أونلاين أو من كورسات متخصصة. اللي بيفرق هو البورتفوليو بتاعك — الشغل اللي بتعرضه هو اللي بيجيبلك الشغل، مش الشهادة الجامعية. كورس احترافي كويس + تمرين مستمر + بورتفوليو قوي = فرص شغل حقيقية.",
  },
  {
    q: "أتعلم الجرافيك ديزاين في قد إيه؟",
    a: "تعلم الأساسيات وحفظ واجهة البرامج ممكن في أسبوع لأسبوعين. إنك تبقى قادر تصمم حاجات بسيطة بشكل كويس محتاج شهر لشهرين. إنك تبقى مصمم محترف وتقدر تشتغل وتاخد فلوس على شغلك محتاج 3 لـ 6 شهور من التعلم والممارسة المستمرة.",
  },
  {
    q: "إزاي أشتغل فريلانس كمصمم جرافيك؟",
    a: "1) اتعلم التصميم كويس واعمل بورتفوليو عليه 10-15 شغلانة. 2) اعمل حساب على Behance وحساب على مواقع فريلانس زي Upwork أو مستقل أو خمسات. 3) ابدأ اعرض خدماتك بسعر مناسب وخد تقييمات كويسة. 4) اعمل صفحة على إنستجرام لشغلك. المفتاح هو الاستمرارية وبناء سمعة قوية — أول 3 شهور هم الأصعب وبعدها الشغل بييجي لوحده.",
  },
  {
    q: "هل الجرافيك ديزاين له مستقبل مع الذكاء الاصطناعي؟",
    a: "أيوا 100%. الـ AI بيساعد المصمم مش بيستبدله. المصمم الشاطر هو اللي بيفهم العميل ويحوّل فكرته لتصميم يبيع — ده مش حاجة AI يقدر يعملها لوحده. بالعكس، المصممين اللي بيستخدموا AI كأداة مساعدة بقوا أسرع وأكفأ. المستقبل للمصمم اللي بيجمع بين الإبداع والتكنولوجيا.",
  },
  {
    q: "إيه الفرق بين الجرافيك ديزاين والـ UI/UX؟",
    a: "الجرافيك ديزاين بيركز على التصميم البصري — شعارات، بوسترات، سوشيال ميديا، مطبوعات. الـ UI/UX بيركز على تصميم واجهات التطبيقات والمواقع وتجربة المستخدم. الاتنين بيكملوا بعض. لو بتحب التصميم الإبداعي والألوان والأشكال — ابدأ بالجرافيك ديزاين. لو بتحب التكنولوجيا والتطبيقات — ابدأ بالـ UI/UX.",
  },
];

// القسم 2: أسئلة عن الأكاديمية والكورسات
const academyFaqs = [
  {
    q: "الكورس ده مناسب للمبتدئين؟",
    a: "أيوا 100%. الكورس بيبدأ معاك من الصفر — مش محتاج أي خبرة سابقة. هنعلمك كل حاجة خطوة بخطوة بأسلوب بسيط وعملي.",
  },
  {
    q: "لو المحتوى مش عاجبني أقدر أسترد فلوسي؟",
    a: "طبعاً! عندك 14 يوم ضمان كامل. لو حسيت إن الكورس مش مناسبك لأي سبب، تواصل معانا وهنرجعلك فلوسك كاملة من غير أي أسئلة.",
  },
  {
    q: "هل الكورس مسجّل ولا لايف؟",
    a: "الكورس مسجّل بالكامل بجودة عالية — تقدر تتفرج في أي وقت يناسبك وترجع لأي درس عدد مرات غير محدود. الفيديوهات محمية بتقنية Signed URLs مع واترمارك باسمك.",
  },
  {
    q: "هل فيه شهادة بعد ما أخلص الكورس؟",
    a: "أيوا، بعد ما تخلص كل الدروس بتاخد شهادة إكمال باسمك تقدر تحمّلها وتضيفها لبروفايلك على LinkedIn أو CV بتاعك.",
  },
  {
    q: "الوصول للكورس بيكون لمدة قد إيه؟",
    a: "وصول مدى الحياة! بمجرد ما تشتري الكورس تقدر تتفرج عليه في أي وقت وأي مكان للأبد. وكمان أي تحديثات مستقبلية هتوصلك مجاناً.",
  },
  {
    q: "طرق الدفع المتاحة إيه؟",
    a: "تقدر تدفع بأكتر من طريقة: فيزا، ماستركارد، فودافون كاش، أو فوري. كل الطرق آمنة ومشفرة بالكامل. لو عندك مشكلة في الدفع تواصل معانا وهنساعدك.",
  },
  {
    q: "هل فيه متابعة أو دعم فني بعد الشراء؟",
    a: "أيوا، فيه مجتمع خاص للطلاب تقدر تسأل فيه أي سؤال وتشارك شغلك وتاخد feedback. وكمان فيه دعم مباشر على واتساب لو عندك أي مشكلة تقنية.",
  },
  {
    q: "أقدر أتفرج على الكورس من الموبايل؟",
    a: "أيوا، المنصة متوافقة مع كل الأجهزة — موبايل، تابلت، لابتوب، أو كمبيوتر. تقدر تتعلم من أي مكان.",
  },
  {
    q: "إزاي أتواصل معاكم لو عندي مشكلة؟",
    a: "تقدر تكلمنا على واتساب أو تبعتلنا على info@ameenacademy.com وهنرد عليك في أقرب وقت. كمان تقدر تسأل في مجتمع الطلاب وهتلاقي حد يساعدك.",
  },
];

// دمج كل الأسئلة عشان الـ Schema
const allFaqs = [...fieldFaqs, ...academyFaqs];

export default function FaqPage() {
  return (
    <>
      <FaqSchema faqs={allFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: SITE_CONFIG.url },
          { name: "الأسئلة الشائعة", url: `${SITE_CONFIG.url}/faq` },
        ]}
      />
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
            <h1 className="text-3xl md:text-4xl font-bold">الأسئلة الشائعة عن تعلّم الجرافيك ديزاين</h1>
            <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
              كل اللي محتاج تعرفه عن المجال والكورسات قبل ما تبدأ
            </p>
          </div>
        </section>

        {/* القسم 1: أسئلة عن المجال */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              أسئلة عن مجال الجرافيك ديزاين
            </h2>
            <div className="space-y-3">
              {fieldFaqs.map((faq, i) => (
                <details key={`field-${i}`} className="group rounded-xl border border-border bg-card overflow-hidden" open={i === 0}>
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
          </div>
        </section>

        {/* القسم 2: أسئلة عن الأكاديمية */}
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              أسئلة عن كورسات أكاديمية أمين
            </h2>
            <div className="space-y-3">
              {academyFaqs.map((faq, i) => (
                <details key={`academy-${i}`} className="group rounded-xl border border-border bg-card overflow-hidden">
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
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="rounded-2xl bg-muted/50 border border-border p-8">
              <IconMessageCircle className="h-10 w-10 text-brand-500 mx-auto mb-3" />
              <h3 className="font-bold text-foreground text-lg">لسه عندك سؤال؟</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                تواصل معانا وهنرد عليك في أقرب وقت
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="gradient" asChild>
                  <Link href="/contact">تواصل معنا</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/courses">شوف الكورسات</Link>
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
