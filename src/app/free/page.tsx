import type { Metadata } from "next";
import Link from "next/link";
import {
  IconGift,
  IconEye,
  IconSparkles,
  IconMap2,
  IconUsersGroup,
  IconMessages,
  IconArrowLeft,
} from "@tabler/icons-react";
import { auth } from "@/auth";
import { enrollmentService } from "@/lib/services";
import { enrollmentsDb, usersDb } from "@/lib/db";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClaimFreeButton } from "./claim-button";
import { FadeIn, StaggerContainer, StaggerItem, FloatOnHover } from "./_components/fade-in";
import { FloatingOrbs, PulseDot } from "./_components/floating-orbs";

export const metadata: Metadata = {
  title: "الكورس المجاني | من صفر لأول شغلانة تصميم — خريطة طريق 2026",
  description:
    "4 محاضرات مجانية هتفهّمك يعني إيه تصميم في 2026، إزاي AI غيّر اللعبة، وإزاي تمشي على خريطة طريق واضحة توصلك لأول شغلانة وفلوس حقيقية. زكاة علم — مجاني للأبد.",
};

const outcomes = [
  {
    icon: IconEye,
    text: "تفهم يعني إيه تصميم جرافيك فعلاً في 2026",
  },
  {
    icon: IconSparkles,
    text: "تعرف إزاي AI غيّر اللعبة والمصمم الذكي بيكسب أكتر",
  },
  {
    icon: IconMap2,
    text: "تمشي على خريطة طريق واضحة من صفر لأول شغلانة",
  },
  {
    icon: IconUsersGroup,
    text: "تشوف ناس عادية بدأت تكسب — وتعرف إنك تقدر كمان",
  },
];

export default async function FreeCoursePage() {
  const session = await auth();
  const course = await enrollmentService.getFreeCourse();

  const alreadyEnrolled =
    session?.user && course
      ? Boolean(await enrollmentsDb.findEnrollment(session.user.id, course.id))
      : false;

  // بيانات المستخدم (عشان نعرف عنده رقم واتساب ولا لأ — مستخدمي جوجل ممكن مايكونش)
  const user = session?.user?.id ? await usersDb.findUserById(session.user.id) : null;
  const hasPhone = Boolean(user?.phone);
  const userName = user?.name ?? session?.user?.name ?? "";

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20">
          {/* Background — خفيف */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 mesh-bg opacity-60" aria-hidden />
            <FloatingOrbs />
          </div>

          <div className="container relative max-w-2xl text-center px-4">
            {/* Badge */}
            <FadeIn direction="scale" duration={0.5}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 backdrop-blur-sm px-4 py-1.5 text-xs md:text-sm font-medium text-brand-700">
                <IconGift className="size-3.5 md:size-4" />
                زكاة علم — مجاني للأبد
              </div>
            </FadeIn>

            {/* Title */}
            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                من صفر لأول شغلانة تصميم
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-brand leading-[1.45] pb-1">
                خريطة طريق 2026 — ببلاش
              </p>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.3}>
              <p className="mx-auto mt-5 max-w-xl text-balance text-base md:text-lg leading-[1.8] text-muted-foreground">
                4 محاضرات هتفهّمك يعني إيه تصميم في 2026، إزاي AI غيّر اللعبة،
                وإزاي تبدأ تكسب فعلاً.
              </p>
            </FadeIn>

            {/* Price contrast */}
            <FadeIn delay={0.45} direction="scale">
              <div className="mt-7 flex items-center justify-center gap-3">
                <span className="text-3xl md:text-4xl font-black text-foreground">
                  0 جنيه
                </span>
                <span className="text-lg md:text-xl text-muted-foreground line-through decoration-2">
                  1500 جنيه
                </span>
              </div>
            </FadeIn>

            {/* Available badge */}
            <FadeIn delay={0.55}>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm px-3.5 py-1.5 text-xs md:text-sm font-medium text-emerald-700">
                <PulseDot color="emerald" />
                متاح دلوقتي — ابدأ في ثانية
              </div>
            </FadeIn>

            {/* PRIMARY CTA */}
            {course && (
              <FadeIn delay={0.65} direction="scale">
                <div className="mt-8">
                  <ClaimFreeButton
                    isLoggedIn={Boolean(session?.user)}
                    alreadyEnrolled={alreadyEnrolled}
                    slug={course.slug}
                    hasPhone={hasPhone}
                    userName={userName}
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* ============ Outcomes ============ */}
        <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
          <div className="container max-w-3xl px-4">
            <FadeIn>
              <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-2 leading-snug">
                هتطلع منه فاهم إيه؟
              </h2>
              <p className="text-center text-sm text-muted-foreground mb-10">
                4 محاضرات. 4 نقلات حقيقية في تفكيرك.
              </p>
            </FadeIn>

            <StaggerContainer staggerDelay={0.1} className="grid gap-3 md:grid-cols-2">
              {outcomes.map((o) => {
                const Icon = o.icon;
                return (
                  <StaggerItem key={o.text}>
                    <FloatOnHover className="h-full">
                      <div className="flex items-start gap-3 h-full rounded-2xl border border-border bg-background p-4 md:p-5 transition-colors hover:border-brand-200 hover:bg-brand-50/40">
                        <div className="shrink-0 flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Icon className="size-5" />
                        </div>
                        <p className="text-sm md:text-base leading-[1.7] text-foreground/90 pt-1">
                          {o.text}
                        </p>
                      </div>
                    </FloatOnHover>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ============ Community Bonus ============ */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl px-4">
            <FadeIn direction="up">
              <FloatOnHover>
                <Link
                  href="/community"
                  className="group relative block overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/50 p-5 md:p-7 transition-all hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10"
                >
                  <div
                    className="absolute -top-20 -left-20 size-48 rounded-full bg-brand-500/10 blur-3xl"
                    aria-hidden
                  />

                  <div className="relative flex items-start gap-4">
                    <div className="shrink-0 flex size-12 md:size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
                      <IconMessages className="size-6 md:size-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-700">
                        <PulseDot color="brand" />
                        بونص مجاني
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-foreground leading-snug mb-2">
                        ادخل المجتمع وشاركنا رأيك وتطوّرك
                      </h3>

                      <p className="text-sm md:text-base text-muted-foreground leading-[1.7] mb-3">
                        مش هتتعلّم لوحدك. ناس بدأت زيّك بالظبط، تسأل وترد،
                        تشارك شغلك، وتشوف غيرك ماشي ازاي.
                      </p>

                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:gap-2 transition-all">
                        ادخل المجتمع
                        <IconArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FloatOnHover>
            </FadeIn>
          </div>
        </section>

        {/* ============ Final CTA (Mobile-friendly) ============ */}
        {course && (
          <section className="pb-16 md:pb-24">
            <div className="container max-w-2xl px-4 text-center">
              <FadeIn>
                <p className="text-base md:text-lg text-muted-foreground mb-5">
                  جاهز تبدأ؟
                </p>
                <ClaimFreeButton
                  isLoggedIn={Boolean(session?.user)}
                  alreadyEnrolled={alreadyEnrolled}
                  slug={course.slug}
                  hasPhone={hasPhone}
                  userName={userName}
                />
              </FadeIn>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
