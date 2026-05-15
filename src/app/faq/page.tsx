import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconMessageCircle } from "@tabler/icons-react";
import { FaqSchema, BreadcrumbSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة — تعلّم مهارات تجيبلك فلوس",
  description:
    "إجابات على أشهر الأسئلة: ازاي اجيب فلوس من الانترنت، هل الفريلانس مربح، إزاي أتعلم AI، إيه المهارات المطلوبة في 2026، وكل اللي محتاج تعرفه عن كورسات أكاديمية أمين.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "الأسئلة الشائعة | أكاديمية أمين",
    description: "كل اللي محتاج تعرفه عن تعلّم المهارات والشغل أونلاين في 2026",
  },
};

// ============ القسم 1: أسئلة عن الفلوس والشغل (أعلى بحث) ============
const moneyFaqs = [
  {
    q: "إزاي أجيب فلوس من الإنترنت في مصر في 2026؟",
    a: "أقوى طريقة هي إنك تتعلم مهارة مطلوبة في السوق وتبيعها كخدمة. المهارات اللي عليها أعلى طلب دلوقتي: تصميم الجرافيك، إدارة السوشيال ميديا، تعديل الفيديو، واستخدام أدوات الذكاء الاصطناعي. تقدر تشتغل على مواقع فريلانس زي Upwork ومستقل وخمسات، أو تجيب عملاء مباشرة من إنستجرام. في أكاديمية أمين بنعلمك المهارة وكمان إزاي تحوّلها لمصدر دخل حقيقي.",
  },
  {
    q: "إيه أكتر المهارات المطلوبة في سوق العمل 2026؟",
    a: "حسب تقارير LinkedIn والعربية نت، أكتر المهارات طلباً في 2026 هي: 1) الذكاء الاصطناعي واستخدام أدوات AI في الشغل. 2) تصميم الجرافيك والهوية البصرية. 3) إدارة وتسويق السوشيال ميديا. 4) تعديل الفيديو وصناعة المحتوى. 5) تحليل البيانات. الشاطر هو اللي بيجمع بين أكتر من مهارة — مثلاً مصمم بيعرف يستخدم AI بيكسب ضعف المصمم العادي.",
  },
  {
    q: "هل الفريلانس مربح فعلاً ولا كلام فاضي؟",
    a: "مربح جداً لو اتعلمت صح. فريلانسر مصري شاطر في التصميم بياخد من 500 لـ 3,000 جنيه على المشروع الواحد. لو بتشتغل مع عملاء أجانب بالدولار، المبالغ بتبقى أكبر بكتير. المفتاح هو: 1) تتعلم مهارة بجودة عالية. 2) تعمل بورتفوليو قوي. 3) تبني سمعة على مواقع الفريلانس. أول 3 شهور هم الأصعب، وبعدها الشغل بييجي لوحده.",
  },
  {
    q: "إزاي أشتغل فريلانس بالدولار من مصر؟",
    a: "1) اتعلم مهارة مطلوبة عالمياً (تصميم، فيديو، AI). 2) اعمل بورتفوليو على Behance أو موقع شخصي. 3) سجّل على Upwork أو Fiverr واكتب بروفايل احترافي بالإنجليزي. 4) ابدأ بأسعار تنافسية وخد تقييمات 5 نجوم. 5) افتح حساب Payoneer أو Wise عشان تقبض بالدولار. فيه فريلانسرز مصريين بيعملوا 1,000-5,000 دولار شهرياً من البيت.",
  },
  {
    q: "أنا لسه طالب — أقدر أتعلم وأشتغل أونلاين؟",
    a: "أيوا 100%. كتير من أنجح الفريلانسرز بدأوا وهم لسه في الجامعة أو حتى ثانوي. الميزة إنك عندك وقت تتعلم فيه. ابدأ بمهارة واحدة بس — زي التصميم مثلاً — واتمرّن عليها شهرين. بعدها ابدأ اعرض خدماتك. مش محتاج شهادة جامعية عشان تشتغل أونلاين — محتاج بورتفوليو كويس بس.",
  },
];

// ============ القسم 2: أسئلة عن الذكاء الاصطناعي والمهارات الحديثة ============
const aiFaqs = [
  {
    q: "إزاي أتعلم الذكاء الاصطناعي واستخدمه في الشغل؟",
    a: "مش لازم تكون مبرمج عشان تستفيد من AI. دلوقتي فيه أدوات AI بتساعدك في كل حاجة: ChatGPT للكتابة والأفكار، Midjourney للصور، Runway لتعديل الفيديو، Canva AI للتصميم. اللي محتاج تتعلمه هو إزاي تستخدم الأدوات دي صح عشان تنجز شغل في ساعة بدل يوم. في كورساتنا بنعلمك تستخدم AI كأداة تزوّد إنتاجيتك وتفتحلك فرص شغل جديدة.",
  },
  {
    q: "هل الذكاء الاصطناعي هياخد شغلي كمصمم أو فريلانسر؟",
    a: "لا. AI بيستبدل اللي بيعمل شغل بسيط وتكراري — بس المصمم أو الفريلانسر اللي بيفهم العميل وبيحلّله مشاكله مش هيتعوّض. بالعكس، اللي بيستخدم AI في شغله بقى أسرع وأكفأ وبياخد فلوس أكتر. السر هو إنك تخلّي AI يشتغل معاك مش بدلك.",
  },
  {
    q: "إيه الفرق بين تعلّم مهارة تقليدية ومهارة حديثة؟",
    a: "المهارة التقليدية زي التصميم لوحده بتاخد وقت أطول عشان تبدأ تكسب منها. المهارة الحديثة هي إنك تدمج أكتر من أداة مع بعض — مثلاً: تصميم + AI + سوشيال ميديا = باقة خدمات كاملة تقدمها للعملاء بسعر أعلى. ده اللي بنعلمهولك في أكاديمية أمين — مش مهارة واحدة بس، لكن إزاي تجمعهم عشان تبقى مطلوب في السوق.",
  },
  {
    q: "هل فيه شغل للذكاء الاصطناعي في مصر والوطن العربي؟",
    a: "أيوا والطلب بيزيد كل يوم. شركات كتير في مصر والخليج بتدور على ناس تعرف تستخدم AI في التسويق، التصميم، كتابة المحتوى، وتحليل البيانات. كمان فيه فرص فريلانس كبيرة — عملاء أجانب مستعدين يدفعوا بالدولار لحد يعرف يستخدم AI صح. المجال لسه في بدايته وده معناه إن فرصتك أحسن لو دخلت دلوقتي.",
  },
];

// ============ القسم 3: أسئلة عن التصميم (لأن فيه كورسات تصميم) ============
const designFaqs = [
  {
    q: "إزاي أتعلم جرافيك ديزاين من الصفر؟",
    a: "ابدأ بتعلم أساسيات التصميم (الألوان، التايبوجرافي، التكوين) وبعدين اتعلم البرامج زي Photoshop و Illustrator. في أكاديمية أمين بنبدأ معاك من الصفر تماماً — مفيش أي خبرة مطلوبة. الكورس بياخدك خطوة بخطوة من إنك متعرفش حاجة لحد ما تبقى قادر تصمم بورتفوليو احترافي وتبدأ تاخد شغل.",
  },
  {
    q: "كام مرتب مصمم الجرافيك في مصر 2026؟",
    a: "المرتب بيختلف حسب الخبرة: المبتدئ (أقل من سنة) بياخد من 4,000 لـ 8,000 جنيه. اللي عنده خبرة 1-3 سنين بياخد من 8,000 لـ 15,000 جنيه. السينيور (5+ سنين) بياخد من 15,000 لـ 30,000 جنيه أو أكتر. الفريلانسر الشاطر ممكن يعمل أكتر من كده بكتير لأنه بيشتغل مع عملاء من بره مصر بالدولار.",
  },
  {
    q: "إيه البرامج المطلوبة للجرافيك ديزاين؟",
    a: "البرامج الأساسية: Adobe Photoshop (لتعديل الصور والتصميمات الرقمية)، Adobe Illustrator (للشعارات والفيكتور). كمان فيه أدوات حديثة زي Canva و Figma. في الكورس بنعلمك البرامج الأساسية + إزاي تستخدم AI في التصميم عشان تبقى أسرع وأكفأ من أي مصمم تاني.",
  },
  {
    q: "الجرافيك ديزاين محتاج شهادة جامعية؟",
    a: "لا مش شرط خالص. معظم المصممين الناجحين اتعلموا أونلاين. اللي بيفرق هو البورتفوليو بتاعك — الشغل اللي بتعرضه هو اللي بيجيبلك الشغل، مش الشهادة. كورس احترافي + تمرين مستمر + بورتفوليو قوي = فرص شغل حقيقية.",
  },
  {
    q: "أتعلم الجرافيك ديزاين في قد إيه؟",
    a: "تعلم الأساسيات ممكن في أسبوع لأسبوعين. إنك تصمم حاجات بسيطة بشكل كويس محتاج شهر لشهرين. إنك تبقى محترف وتاخد فلوس محتاج 3 لـ 6 شهور من التعلم والممارسة. الأهم من الوقت هو الاستمرارية — ساعة كل يوم أحسن من 10 ساعات في يوم واحد.",
  },
];

// ============ القسم 4: أسئلة عن الأكاديمية والكورسات ============
const academyFaqs = [
  {
    q: "أكاديمية أمين فيها كورسات إيه بالظبط؟",
    a: "أكاديمية أمين منصة تعليمية بتعلمك المهارات اللي السوق محتاجها عشان تجيب فلوس في 2026 — مش مجرد كورس تصميم وخلاص. عندنا كورسات في الجرافيك ديزاين، استخدام الذكاء الاصطناعي في الشغل، وإزاي تبدأ تشتغل فريلانس. كل كورس عملي 100% — بتتعلم وبتطبق فوري.",
  },
  {
    q: "الكورسات مناسبة للمبتدئين ولا لازم أكون فاهم؟",
    a: "مناسبة للمبتدئين 100%. كل كورس بيبدأ معاك من الصفر — مش محتاج أي خبرة سابقة. بنشرح كل حاجة خطوة بخطوة بأسلوب بسيط وبالعامية المصرية.",
  },
  {
    q: "لو المحتوى مش عاجبني أقدر أسترد فلوسي؟",
    a: "طبعاً! عندك 14 يوم ضمان كامل. لو حسيت إن الكورس مش مناسبك لأي سبب، تواصل معانا وهنرجعلك فلوسك كاملة من غير أي أسئلة.",
  },
  {
    q: "هل الكورس مسجّل ولا لايف؟",
    a: "الكورسات مسجّلة بجودة عالية — تقدر تتفرج في أي وقت يناسبك وترجع لأي درس عدد مرات غير محدود. الفيديوهات محمية بتقنيات حديثة مع واترمارك باسمك.",
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
    a: "تقدر تدفع بأكتر من طريقة: فيزا، ماستركارد، فودافون كاش، أو فوري. كل الطرق آمنة ومشفرة بالكامل.",
  },
  {
    q: "هل فيه دعم فني ومجتمع للطلاب؟",
    a: "أيوا، فيه مجتمع خاص للطلاب تقدر تسأل فيه أي سؤال وتشارك شغلك وتاخد feedback من المدربين والطلاب. وكمان فيه دعم مباشر على واتساب.",
  },
  {
    q: "أقدر أتفرج من الموبايل؟",
    a: "أيوا، المنصة متوافقة مع كل الأجهزة — موبايل، تابلت، لابتوب. تقدر تتعلم من أي مكان وفي أي وقت.",
  },
];

// دمج كل الأسئلة عشان الـ Schema
const allFaqs = [...moneyFaqs, ...aiFaqs, ...designFaqs, ...academyFaqs];

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
            <h1 className="text-3xl md:text-4xl font-bold">
              الأسئلة الشائعة
            </h1>
            <p className="mt-3 text-white/70 text-lg max-w-2xl mx-auto">
              كل اللي محتاج تعرفه عن الشغل أونلاين، المهارات المطلوبة، والكورسات بتاعتنا
            </p>
          </div>
        </section>

        {/* القسم 1: فلوس وشغل */}
        <section className="container mx-auto px-4 pt-12 md:pt-16 pb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              إزاي أجيب فلوس وأشتغل أونلاين؟
            </h2>
            <div className="space-y-3">
              {moneyFaqs.map((faq, i) => (
                <details key={`money-${i}`} className="group rounded-xl border border-border bg-card overflow-hidden" open={i === 0}>
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

        {/* القسم 2: AI والمهارات الحديثة */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              الذكاء الاصطناعي والمهارات الحديثة
            </h2>
            <div className="space-y-3">
              {aiFaqs.map((faq, i) => (
                <details key={`ai-${i}`} className="group rounded-xl border border-border bg-card overflow-hidden">
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

        {/* القسم 3: التصميم */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              تعلّم الجرافيك ديزاين
            </h2>
            <div className="space-y-3">
              {designFaqs.map((faq, i) => (
                <details key={`design-${i}`} className="group rounded-xl border border-border bg-card overflow-hidden">
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

        {/* القسم 4: الأكاديمية */}
        <section className="container mx-auto px-4 py-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              عن كورسات أكاديمية أمين
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
