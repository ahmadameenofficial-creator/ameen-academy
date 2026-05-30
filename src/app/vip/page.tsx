import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  IconCheck,
  IconX,
  IconArrowLeft,
  IconShield,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";
import { ApplyForm } from "./apply-form";
import { EarlyBirdBanner } from "./_components/early-bird-banner";
import { Hero } from "./_components/hero";
import { ValueStack } from "./_components/value-stack";
import { Pricing } from "./_components/pricing";
import { ROUND_INFO } from "./_constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIP Community · Round الأول | أكاديمية أمين",
  description:
    "30 مصمم بس. الـ Round الأول بيبدأ يوليو 2026. لو حجزت قبل 3 يونيو بـ خصم 50%.",
  openGraph: {
    title: "VIP Community · احجز قبل 3 يونيو بخصم 50%",
    description: "30 مكان للـ Round الأول. لايف، مراجعات شخصية، Job Board، ومجتمع جدّي.",
    locale: "ar_EG",
  },
};

export default async function VipLandingPage() {
  const session = await auth();

  // لو عضو فعّال، نوديه للـ dashboard
  if (session?.user) {
    const membership = await prisma.vipMembership.findUnique({
      where: { userId: session.user.id },
    });
    if (membership?.status === "ACTIVE") {
      redirect("/dashboard/vip");
    }
  }

  // عدد المقاعد المتبقية = إجمالي - (محجوزات أولية + أعضاء فعليين)
  const activeMembers = await prisma.vipMembership.count({
    where: { status: "ACTIVE" },
  });
  const filledSeats = ROUND_INFO.initialReservations + activeMembers;
  const remainingSeats = Math.max(0, ROUND_INFO.totalSeats - filledSeats);

  return (
    <div className="bg-black text-white" dir="rtl">
      {/* Early Bird Sticky Banner */}
      <EarlyBirdBanner remainingSeats={remainingSeats} />

      <Navbar />

      {/* HERO */}
      <Hero remainingSeats={remainingSeats} />

      {/* ============ Problem (Egyptian style) ============ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[1.1] text-white">
            خد بالك من اللي بيحصلك ده.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-white/70 leading-[1.9]">
            <p>
              كل يوم بتعمل نفس الـ scene بالظبط: بتفتح Photoshop، تلف ساعتين، تطلع بـ
              تصميم «كويس»، تعرضه على صحبك المصمم، يقولك <span className="text-white/40">«حلو»</span>،
              ترجع تنامي.
            </p>
            <p>
              بعد شهر بتكتشف إنك مكنتش بتشتغل — كنت بتلهي نفسك. عدّت 30 يوم وأنت في
              مكانك. مفيش تطوّر، مفيش شغلانة، مفيش حد كلّمك حتى.
            </p>
            <p>
              المشكلة مش إنك مش شاطر. ولا إنك محتاج كورس تاني.
              <br />
              المشكلة الحقيقية إنك{" "}
              <span className="text-white font-bold">مفيش حد بياخدك جدّ</span>. مفيش حد
              بيقولك «ده غلط، اعمله كده» أو «خد، الشغلانة دي ليك».
            </p>
            <p className="pt-6 text-2xl md:text-3xl font-black text-white border-r-4 border-brand-500 pr-5">
              أنت بتشتغل في الفراغ.
              <br />
              <span className="text-brand-400">وده اللي بنصلّحه.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Transformation ============ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-brand-400 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
              الفرق بين الـ Scene الـ 2
            </p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white">
              مصمم بره الـ VIP
              <br />
              <span className="text-brand-400">vs</span> مصمم جوّاه
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Outside */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
              <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                بره الـ VIP
              </p>
              <ul className="space-y-4">
                {[
                  "بيكفّر في تصميم لساعتين، يطلع بـ«كويس»، محدش بيتفاعل",
                  "بيدوّر على شغل في كومنتات فيسبوك بـ 200 ج",
                  "Feedback من صحبه اللي مهارته زيّه بالظبط",
                  "كل تصميم لوحده، مفيش حكاية بتربطهم",
                  "بياخد شغل بسعر بيكسر السوق عليه",
                  "بيبدأ كورس جديد كل شهر، مبيخلّصش حاجة",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/55">
                    <IconX className="h-5 w-5 text-red-500/60 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inside */}
            <div className="relative bg-gradient-to-br from-brand-900/40 to-brand-950/60 border-2 border-brand-500/40 rounded-3xl p-8 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl" />
              <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 relative">
                جوّا الـ VIP
              </p>
              <ul className="space-y-4 relative">
                {[
                  "بياخد feedback أسبوعياً على شغله من خبير + 29 مصمم",
                  "الشغل بييجي من Job Board، مبتدوّرش",
                  "بيشتغل على Brief بأسلوب client حقيقي كل شهر",
                  "بعد سنة عنده 12 مشروع في الـ portfolio",
                  "بيعرف يسعّر صح، بيقول «لا» للسعر الرخيص",
                  "بيخلّص اللي بدأه، لأن في حد بيحاسبه",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <IconCheck className="h-5 w-5 text-brand-300 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUE STACK ============ */}
      <ValueStack />

      {/* ============ Why this is NOT another course ============ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight text-white">
            «ده شكله كورس تاني»{" "}
            <span className="text-white/30">— لأ.</span>
          </h2>

          <div className="space-y-6 text-lg text-white/70 leading-[1.9]">
            <p>
              الكورس بيعلّمك تعمل ايه. الـ VIP بيخلّيك تطبّق ايه فعلاً.
            </p>
            <p>
              لو خدت 10 كورسات ولسه بتشتغل في الفراغ، المشكلة مش في الكورسات.
              المشكلة إنك مفيش حد بياخدك جدّ.
            </p>
            <p className="bg-gradient-to-br from-brand-900/30 to-transparent border-r-2 border-brand-500 pr-5 py-4 text-xl text-white font-bold">
              الـ VIP مش بيعلّمك Photoshop.
              <br />
              الـ VIP بيخلّيك تستخدمه فعلاً.
            </p>
          </div>
        </div>
      </section>

      {/* ============ Who It's For ============ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center leading-tight text-white">
            مش لكل حد.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-3xl p-7 md:p-8">
              <p className="text-emerald-400 font-black mb-6 text-lg">
                دخلك لو إنت كده:
              </p>
              <ul className="space-y-3.5 text-white/85">
                {[
                  "بتشتغل في التصميم، حتى لو لسه في البداية",
                  "بتاخد كورسات وبتطبّق فعلاً (مش بس بتسمع)",
                  "متاح ساعتين في الأسبوع للـ Brief والمتابعة",
                  "هدفك واضح: تكسب من شغلك خلال سنة",
                  "feedback صعب بيوجعك بس مش بيكسرك",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-950/15 border border-red-500/20 rounded-3xl p-7 md:p-8">
              <p className="text-red-400 font-black mb-6 text-lg">
                مش دخلك لو:
              </p>
              <ul className="space-y-3.5 text-white/85">
                {[
                  "بتدوّر على كورس تاني تحفظه وما تطبّقش",
                  "هدفك «10K في شهر» من غير ما تشتغل",
                  "feedback مباشر بيقهرك بدل ما يحرّكك",
                  "مش لاقي ساعتين في الأسبوع",
                  "ولا فتحت Photoshop ولا Figma خالص",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconX className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ About Ahmed ============ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-brand-400 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
            مين أنا
          </p>
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
            أحمد أمين
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-white/70 leading-[1.9]">
            <p>
              8 سنين شغل في التصميم. بدأت من صفر زيّك بالظبط. عملت لـ براندات
              مصرية وسعودية كبيرة. درّبت 500+ مصمم في الكورسات.
            </p>
            <p>
              الـ VIP ده نفس الـ Inner Circle اللي بكوّنه دلوقتي مع الـ junior
              اللي بيشتغلوا معايا في الـ studio. اللي مش لاقي مكان فيه، بأعرضه عليه هنا.
            </p>
            <p className="text-white font-bold pt-4 text-xl md:text-2xl">
              مش هتاخد «شخصية مشهورة بتعمل لايف ع الجنب».
              <br />
              هتاخد <span className="text-brand-300">مدرّب فعلي</span> مهتم بنتيجتك.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <Pricing />

      {/* ============ GUARANTEE ============ */}
      <section className="py-20 md:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="relative bg-gradient-to-br from-brand-900/30 via-brand-950/50 to-black border border-brand-500/20 rounded-[2rem] p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />

            <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-500/20 border border-brand-500/40 mb-6">
              <IconShield className="h-8 w-8 text-brand-300" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-5 text-white">
              ضمان 7 أيام.
              <br />
              فلوسك مرجّعالك بالكامل.
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
              ادخل، احضر أول لايف، شوف المحتوى، اتكلم مع الأعضاء. لو حسّيت إن
              ده مش مكانك في الـ 7 أيام الأولى،{" "}
              <span className="text-brand-300 font-bold">فلوسك بترجعلك من غير أسئلة</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center text-white leading-tight">
            أسئلة شائعة.
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "إيه الفرق بين ده والكورس؟",
                a: "الكورس بيعلّمك مهارة، الـ VIP بيخليك تطبّقها كل أسبوع. الـ VIP بييجي بعد ما تكون عندك أساسيات. لو لسه ما عندكش، خد ورشة أمين الأول، وارجع بعدها.",
              },
              {
                q: "الـ Round الأول بيبدأ إمتى بالظبط؟",
                a: "يوليو 2026. أول لايف هيكون في أول أسبوع منه. كل من بيحجز قبل 3 يونيو بياخد خصم 50% على فترة الـ subscription الأولى.",
              },
              {
                q: "لو فاتني لايف؟",
                a: "كل لايف بيتسجّل ويتاح في الـ dashboard خلال 24 ساعة. تقدر تسأل أسئلتك في الجروب وأنا برد قبل اللايف الجاي.",
              },
              {
                q: "إزاي بيتختار اللي يدخل واللي لا؟",
                a: "الـ Application فيه 4 أسئلة. بشوف: عندك أساسيات؟ بتشتغل فعلاً؟ هدفك واضح؟ متاح ساعتين في الأسبوع؟ مش بنرفض حد لخبرة قليلة — بنرفض اللي مش هياخد قيمة.",
              },
              {
                q: "ينفع أكنسل؟",
                a: "آه، في أي وقت من الـ dashboard. مفيش commitment ولا غرامة. الـ subscription بيقف نهاية الـ period الحالي.",
              },
              {
                q: "ينفع أدفع فودافون كاش/إنستاباي؟",
                a: "آه. كل وسائل الدفع المصرية متاحة (فيزا، فودافون كاش، إنستاباي، فوري).",
              },
              {
                q: "بعد الـ Early Bird هل السعر هيرجع؟",
                a: "آه. بعد 3 يونيو السعر بيرجع لطبيعته (349 ج شهري). الـ Early Bird مش هيتكرّر للـ Round الأول.",
              },
              {
                q: "متى دوري في Hot Seat؟",
                a: "كل عضو ياخد Hot Seat مرة كل 6-8 لايفات (مرة كل 3 شهور تقريباً). الـ Annual بياخد Priority — دورهم بييجي أسرع.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 list-none">
                  <span className="font-bold text-base md:text-lg pr-4 text-white">{item.q}</span>
                  <IconArrowLeft className="h-5 w-5 text-white/40 shrink-0 group-open:-rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-[1.9]">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLY FORM ============ */}
      <section id="apply" className="py-24 md:py-32 border-t border-white/5 scroll-mt-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,2,255,0.1),transparent_60%)]" />

        <div className="relative max-w-2xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
              الخطوة الأخيرة
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
              قدّم طلبك،
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                واحجز مكانك.
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg">
              4 أسئلة. 6 دقايق. لو الطلب اتقبل، بتاخد لينك الدفع. لو لا، بترجعلك بـ feedback.
            </p>
          </div>

          {session?.user ? (
            <ApplyForm
              prefilledName={session.user.name || ""}
              prefilledEmail={session.user.email || ""}
            />
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
              <p className="text-white/70 mb-6 text-base">
                لازم تسجّل دخول الأول عشان تقدر تقدّم طلبك.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/login?callbackUrl=/vip"
                  className="inline-block bg-gradient-to-br from-brand-400 to-brand-600 hover:from-brand-300 hover:to-brand-500 text-white font-black px-8 py-3.5 rounded-full transition-all shadow-lg shadow-brand-500/30"
                >
                  تسجيل دخول
                </Link>
                <Link
                  href="/register?callbackUrl=/vip"
                  className="inline-block bg-white/10 hover:bg-white/15 text-white font-medium px-8 py-3.5 rounded-full transition-all"
                >
                  حساب جديد
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ Final Scarcity CTA ============ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-brand-400 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
            آخر تنبيه
          </p>

          <h2 className="text-4xl md:text-7xl font-black mb-6 leading-[1.05] text-white">
            {remainingSeats > 0 ? (
              <>
                <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                  {remainingSeats} مكان
                </span>
                {" "}
                لسه فاضي.
              </>
            ) : (
              "الـ Round اتقفل."
            )}
          </h2>

          {remainingSeats > 0 && (
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              بعد ما يتلموا الـ 30، الـ Round الأول بيقفل، والسعر بيرجع لطبيعته (349 ج).
              <br />
              قرارك دلوقتي.
            </p>
          )}

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-brand-400 to-brand-700 hover:from-brand-300 hover:to-brand-600 text-white font-black px-10 py-5 rounded-full shadow-2xl shadow-brand-500/40 transition-all hover:scale-105 text-lg"
          >
            احجز قبل ما يقفل
            <IconArrowLeft className="h-5 w-5" />
          </a>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-white/40 flex-wrap">
            <span className="flex items-center gap-1.5">
              <IconShield className="h-4 w-4" />
              ضمان 7 أيام
            </span>
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4" />
              كنسل في أي وقت
            </span>
            <span className="flex items-center gap-1.5">
              <IconUsers className="h-4 w-4" />
              Application فقط
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
