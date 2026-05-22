import type { Metadata } from "next";
import Link from "next/link";
import {
  IconGift,
  IconCheck,
  IconClock,
  IconPlayerPlay,
  IconUsers,
  IconBook,
} from "@tabler/icons-react";
import { auth } from "@/auth";
import { enrollmentService } from "@/lib/services";
import { enrollmentsDb } from "@/lib/db";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { ClaimFreeButton } from "./claim-button";

export const metadata: Metadata = {
  title: "الكورس المجاني | ازاي تبقى مصمم في 2026 — ببلاش",
  description:
    "كراش كورس قيمته 1500 جنيه، بتاخده ببلاش بدون أي جنيه. هتطلع منه فاهم يعني إيه تصميم وازاي تبقى مصمم في 2026. زكاة علم وهيفضل مجاني للأبد.",
};

const outcomes = [
  "تفهم يعني إيه تصميم بجد، مش كلام نظري",
  "تعرف ازاي تبقى مصمم مطلوب في سوق 2026",
  "تمشي على الطريق الصح من أول يوم بدل ما تتوه",
  "تبني أساس مهارة حقيقية تقدر تكسب منها",
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
        <section className="relative overflow-hidden py-14 lg:py-20">
          <div className="absolute inset-0 mesh-bg" aria-hidden />
          <div
            className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-500/10 blur-3xl"
            aria-hidden
          />

          <div className="container relative max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <IconGift className="size-4" />
              زكاة علم — مجاني للأبد
            </div>

            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              ابدأ دلوقتي بالكورس المجاني —{" "}
              <span className="text-gradient-brand">قيمته 1500 جنيه ببلاش</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              كراش كورس هيخليك تفهم يعني إيه تصميم وازاي تبقى مصمم في 2026.
              هدفه إنه يساعدك بجد ويحطك على الطريق الصح — مش هزار ومش تسويق فيك.
              خده دلوقتي بدون ولا جنيه.
            </p>

            {/* Price contrast */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-2xl font-bold text-foreground">0 جنيه</span>
              <span className="text-lg text-muted-foreground line-through">1500 جنيه</span>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              {course ? (
                <ClaimFreeButton
                  isLoggedIn={Boolean(session?.user)}
                  alreadyEnrolled={alreadyEnrolled}
                  slug={course.slug}
                />
              ) : (
                <div className="rounded-xl border border-border bg-muted/40 px-6 py-4 text-muted-foreground">
                  الكورس المجاني هيتضاف قريب جداً — استنانا 👀
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              الكورس ممكن تتغيّر قيمته في أي لحظة — الحق استفيد وهو مجاني.
            </p>
          </div>
        </section>

        {/* What you'll get */}
        <section className="py-12 lg:py-16">
          <div className="container max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  هتطلع من الكورس فاهم إيه؟
                </h2>
                <ul className="mt-6 space-y-3">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <IconCheck className="size-4" />
                      </span>
                      <span className="text-foreground/90 leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {course && (
                <Card className="p-6">
                  <h3 className="font-bold text-foreground">{course.title}</h3>
                  {course.shortDescription && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {course.shortDescription}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                  <div className="mt-5">
                    <ClaimFreeButton
                      isLoggedIn={Boolean(session?.user)}
                      alreadyEnrolled={alreadyEnrolled}
                      slug={course.slug}
                    />
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Trust line */}
        <section className="pb-16">
          <div className="container max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <IconPlayerPlay className="size-4 text-brand-500" />
              مفيش رسوم خفية — الكورس مجاني فعلاً وهيفضل مجاني.
            </div>
            <div className="mt-4">
              <Link href="/courses" className="text-sm font-medium text-brand-600 hover:underline">
                أو شوف باقي الكورسات المدفوعة
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
