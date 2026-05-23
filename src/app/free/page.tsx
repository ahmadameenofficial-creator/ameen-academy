import type { Metadata } from "next";
import {
  IconGift,
  IconCheck,
  IconClock,
  IconUsers,
  IconBook,
  IconBolt,
} from "@tabler/icons-react";
import { auth } from "@/auth";
import { enrollmentService } from "@/lib/services";
import { enrollmentsDb } from "@/lib/db";
import { FREE_COURSE } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { ClaimFreeButton } from "./claim-button";
import { Countdown } from "@/components/free-course/countdown";
import { LeadForm } from "@/components/free-course/lead-form";

export const metadata: Metadata = {
  title: "الكورس المجاني | ازاي تبقى مصمم في 2026 — ببلاش",
  description:
    "كراش كورس قيمته 1500 جنيه، بتاخده ببلاش. هتطلع منه فاهم يعني إيه تصميم وازاي تبقى مصمم في 2026 وتكسب فلوس بمهارتك. زكاة علم وهيفضل مجاني للأبد.",
};

const outcomes = [
  "تفهم يعني إيه تصميم بجد، مش كلام نظري",
  "تعرف ازاي تبقى مصمم مطلوب في سوق 2026",
  "تمشي على خريطة طريق واضحة من أول يوم",
  "تبني مهارة حقيقية تقدر تكسب منها فلوس",
];

export default async function FreeCoursePage() {
  const session = await auth();
  const course = await enrollmentService.getFreeCourse();

  const alreadyEnrolled =
    session?.user && course
      ? Boolean(await enrollmentsDb.findEnrollment(session.user.id, course.id))
      : false;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden py-14 lg:py-20">
          <div className="absolute inset-0 mesh-bg" aria-hidden />
          <div
            className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-700/10 blur-3xl"
            aria-hidden
          />

          <div className="container relative max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <IconGift className="size-4" />
              زكاة علم — مجاني للأبد
            </div>

            <h1 className="mx-auto mt-7 max-w-2xl text-balance text-3xl font-bold leading-[1.4] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              ابدأ دلوقتي بالكورس المجاني
              <span className="mt-3 block text-gradient-brand pb-1 leading-[1.45]">
                قيمته 1500 جنيه — ببلاش
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-[1.9] text-muted-foreground">
              كراش كورس هيخليك تفهم يعني إيه تصميم وازاي تبقى مصمم في 2026.
              هدفنا إنك تجرّب وتكسب فلوس بجد بخريطة طريق واضحة — مش هزار ومش تسويق فيك.
            </p>

            {/* Price contrast */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-3xl font-extrabold text-foreground">0 جنيه</span>
              <span className="text-xl text-muted-foreground line-through decoration-2">1500 جنيه</span>
            </div>

            {/* Countdown */}
            <div className="mt-10">
              <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                <IconBolt className="size-4 text-brand-500" />
                بنجهّزه مخصوص ليك — بينزل خلال
              </p>
              <Countdown launchISO={FREE_COURSE.launchDate} />
            </div>
          </div>
        </section>

        {/* ===== Lead capture + claim ===== */}
        <section className="pb-4">
          <div className="container max-w-xl">
            <Card className="p-6 lg:p-8">
              <div className="text-center">
                <h2 className="text-xl font-bold leading-[1.5] text-foreground sm:text-2xl">
                  احجز مكانك دلوقتي
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  سيبلنا اسمك وواتساب أو إيميل — وأول ما الكورس ينزل تكون{" "}
                  <span className="font-semibold text-foreground">أول واحد</span> ياخده ببلاش.
                </p>
              </div>

              <div className="mt-6">
                <LeadForm />
              </div>

              {/* لو الكورس نزل فعلاً ومتاح */}
              {course && (
                <div className="mt-6 border-t border-border pt-6 text-center">
                  <p className="mb-3 text-sm text-muted-foreground">الكورس متاح دلوقتي 🎉</p>
                  <ClaimFreeButton
                    isLoggedIn={Boolean(session?.user)}
                    alreadyEnrolled={alreadyEnrolled}
                    slug={course.slug}
                  />
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* ===== What you'll get ===== */}
        <section className="py-14 lg:py-20">
          <div className="container max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold leading-[1.5] text-foreground sm:text-3xl">
                  هتطلع من الكورس فاهم إيه؟
                </h2>
                <ul className="mt-7 space-y-4">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <IconCheck className="size-4" />
                      </span>
                      <span className="leading-relaxed text-foreground/90">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {course && (
                <Card className="p-7">
                  <h3 className="font-bold leading-[1.5] text-foreground">{course.title}</h3>
                  {course.shortDescription && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {course.shortDescription}
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <IconBook className="size-4 text-brand-500" />
                      {course._count.lessons} درس
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconUsers className="size-4 text-brand-500" />
                      {course._count.enrollments} طالب
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconClock className="size-4 text-brand-500" />
                      {Math.round((course.duration || 0) / 60)} دقيقة
                    </span>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
