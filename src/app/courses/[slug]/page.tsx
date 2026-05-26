import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// صفحة تفاصيل الكورس — ديناميكية عشان حالة الاشتراك تبان صح
export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { formatPrice, formatDuration, getLevelLabel } from "@/lib/format";
import { CourseSchema, BreadcrumbSchema } from "@/lib/structured-data";
import { leadsDb } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconClock,
  IconBook,
  IconUsers,
  IconStar,
  IconStarFilled,
  IconPlayerPlay,
  IconLock,
  IconCheck,
  IconChevronDown,
  IconUser,
  IconInfinity,
  IconCertificate,
} from "@tabler/icons-react";
import { EnrollCta } from "@/components/courses/enroll-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

const getCourse = cache(async (slug: string) => {
  return prisma.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      instructor: { select: { id: true, name: true, image: true, bio: true } },
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, duration: true, isFree: true, order: true },
          },
        },
      },
      lessons: { select: { id: true } },
      _count: { select: { enrollments: true, ratings: true } },
      ratings: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        take: 6,
      },
    },
  });
});

async function getEnrollment(userId: string, courseId: string) {
  return prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "كورس مش موجود" };

  const description = course.shortDescription || course.description.slice(0, 160);
  const priceEGP = `${(course.price / 100).toLocaleString()} جنيه`;

  return {
    title: course.title,
    description: `${description} | ${priceEGP} | ${course.category}`,
    alternates: {
      canonical: `/courses/${slug}`,
    },
    openGraph: {
      type: "article",
      title: course.title,
      description,
      url: `/courses/${slug}`,
      siteName: "أكاديمية أمين",
      locale: "ar_EG",
      images: course.thumbnail
        ? [{ url: course.thumbnail, width: 1200, height: 630, alt: course.title }]
        : undefined,
      authors: [course.instructor.name],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: course.thumbnail ? [course.thumbnail] : undefined,
    },
    other: {
      "product:price:amount": String(course.price / 100),
      "product:price:currency": "EGP",
    },
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <IconStarFilled key={star} className="h-4 w-4 text-amber-500" />
        ) : (
          <IconStar key={star} className="h-4 w-4 text-amber-500" />
        )
      )}
    </div>
  );
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const session = await auth();
  const enrollment = session?.user
    ? await getEnrollment(session.user.id, course.id)
    : null;
  const isEnrolled = !!enrollment;

  // شيّك لو إيميله موجود في Leads — عشان ميكتبش بياناته تاني
  const isLead = session?.user?.email
    ? Boolean(await leadsDb.isLeadByEmail(session.user.email))
    : false;

  const totalLessons = course.lessons.length;
  const avgRating =
    course.ratings.length > 0
      ? course.ratings.reduce((s, r) => s + r.rating, 0) / course.ratings.length
      : 0;
  const discount = course.comparePrice
    ? Math.round(((course.comparePrice - course.price) / course.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD: Course Schema */}
      <CourseSchema
        title={course.title}
        description={course.shortDescription || course.description.slice(0, 300)}
        slug={slug}
        thumbnail={course.thumbnail}
        price={course.price}
        comparePrice={course.comparePrice}
        duration={course.duration}
        totalLessons={totalLessons}
        rating={avgRating}
        ratingCount={course._count.ratings}
        enrollmentCount={course._count.enrollments}
        instructorName={course.instructor.name}
        category={course.category}
        level={course.level}
        publishedAt={course.publishedAt}
        updatedAt={course.updatedAt}
      />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: SITE_CONFIG.url },
          { name: "الكورسات", url: `${SITE_CONFIG.url}/courses` },
          { name: course.title, url: `${SITE_CONFIG.url}/courses/${slug}` },
        ]}
      />

      {/* ======= Hero Section ======= */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-[#1a0033]" />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-400/10 rounded-full blur-[100px]" />

        <div className="relative container mx-auto px-4 py-10 md:py-16 lg:py-20">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* ---- المحتوى (3 أعمدة) ---- */}
            <div className="lg:col-span-3 space-y-5 text-white">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-brand-500/90 text-white border-0 px-3 py-1">
                  {course.category}
                </Badge>
                <Badge className="bg-white/10 text-white/90 border-0 backdrop-blur-sm px-3 py-1">
                  {getLevelLabel(course.level)}
                </Badge>
              </div>

              {/* العنوان */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.25] tracking-tight">
                {course.title}
              </h1>

              {/* الوصف */}
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                {course.shortDescription || course.description.slice(0, 200)}
              </p>

              {/* الإحصائيات */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                {avgRating > 0 && (
                  <span className="flex items-center gap-1.5">
                    <IconStarFilled className="h-4 w-4 text-amber-400" />
                    <span className="text-white font-semibold">{avgRating.toFixed(1)}</span>
                    <span>({course._count.ratings} تقييم)</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <IconUsers className="h-4 w-4" />
                  {course._count.enrollments} طالب
                </span>
                <span className="flex items-center gap-1.5">
                  <IconBook className="h-4 w-4" />
                  {totalLessons} درس
                </span>
                {course.duration > 0 && (
                  <span className="flex items-center gap-1.5">
                    <IconClock className="h-4 w-4" />
                    {formatDuration(course.duration)}
                  </span>
                )}
              </div>

              {/* المدرّب */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-12 w-12 rounded-full ring-2 ring-white/20 overflow-hidden bg-brand-700 flex items-center justify-center shrink-0">
                  {course.instructor.image ? (
                    <Image
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <IconUser className="h-6 w-6 text-brand-300" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-white/50">المدرّب</p>
                  <p className="font-semibold text-white">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* ---- كارت السعر (عمودين) — Desktop ---- */}
            <div className="hidden lg:block lg:col-span-2 w-full">
              <PricingCard
                course={course}
                slug={slug}
                isEnrolled={isEnrolled}
                isLoggedIn={!!session}
                discount={discount}
                totalLessons={totalLessons}
                serverLeadCaptured={isLead}
              />
            </div>

            {/* ---- كارت السعر — Tablet (يظهر تحت المحتوى) ---- */}
            <div className="hidden md:block lg:hidden w-full max-w-md">
              <PricingCard
                course={course}
                slug={slug}
                isEnrolled={isEnrolled}
                isLoggedIn={!!session}
                discount={discount}
                totalLessons={totalLessons}
                serverLeadCaptured={isLead}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======= محتوى الصفحة ======= */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* العمود الرئيسي */}
          <div className="lg:col-span-3 space-y-10">
            {/* وصف الكورس */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                عن الكورس ده
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                {course.description}
              </div>
            </section>

            {/* المدرّب */}
            {course.instructor.bio && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  عن المدرّب
                </h2>
                <Card>
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center overflow-hidden shrink-0">
                      {course.instructor.image ? (
                        <Image
                          src={course.instructor.image}
                          alt={course.instructor.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <IconUser className="h-8 w-8 text-brand-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{course.instructor.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {course.instructor.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* محتوى الكورس */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  محتوى الكورس
                </h2>
                <span className="text-sm text-muted-foreground">
                  {course.modules.length} أقسام | {totalLessons} درس
                </span>
              </div>
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <details key={module.id} className="group" open>
                    <summary className="flex items-center justify-between cursor-pointer rounded-xl bg-muted/50 border border-border p-4 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <IconChevronDown className="h-5 w-5 text-brand-500 transition-transform group-open:rotate-180" />
                        <span className="font-medium text-foreground text-sm md:text-base">
                          {module.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 mr-2">
                        {module.lessons.length} درس
                      </span>
                    </summary>
                    <div className="mt-1 border border-border rounded-xl divide-y divide-border overflow-hidden">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between px-4 py-3 text-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {lesson.isFree ? (
                              <IconPlayerPlay className="h-4 w-4 text-brand-500 shrink-0" />
                            ) : (
                              <IconLock className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                            <span className={`truncate ${lesson.isFree ? "text-foreground" : "text-muted-foreground"}`}>
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <Badge variant="success" className="text-[10px] shrink-0">مجاني</Badge>
                            )}
                          </div>
                          {lesson.duration > 0 && (
                            <span className="text-xs text-muted-foreground shrink-0 mr-2">
                              {formatDuration(lesson.duration)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}

                {course.modules.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    المحتوى هيتضاف قريب
                  </div>
                )}
              </div>
            </section>

            {/* التقييمات */}
            {course.ratings.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  آراء الطلاب
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {course.ratings.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-9 w-9 rounded-full bg-brand-50 flex items-center justify-center">
                            <IconUser className="h-4 w-4 text-brand-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {review.user.name}
                            </p>
                            <Stars rating={review.rating} />
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — sticky pricing (desktop only, hidden because it's in hero) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <PricingCard
                course={course}
                slug={slug}
                isEnrolled={isEnrolled}
                isLoggedIn={!!session}
                discount={discount}
                totalLessons={totalLessons}
                serverLeadCaptured={isLead}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======= Mobile Sticky CTA ======= */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-50 safe-area-pb">
        {course.price === 0 ? (
          <EnrollCta
            slug={slug}
            price={0}
            isLoggedIn={!!session}
            isEnrolled={isEnrolled}
            serverLeadCaptured={isLead}
            size="lg"
          />
        ) : isEnrolled ? (
          <Button variant="gradient" size="lg" className="w-full" asChild>
            <Link href="/dashboard">كمّل تعلّم</Link>
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-brand-600">
                {formatPrice(course.price)}
              </span>
              {course.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(course.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <Badge variant="success" className="text-[10px]">-{discount}%</Badge>
              )}
            </div>
            <Button variant="gradient" size="lg" asChild>
              <Link href={session ? `/courses/${slug}/checkout` : "/login"}>
                اشتري دلوقتي
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Spacer للموبايل */}
      <div className="md:hidden h-24" />
    </div>
  );
}

// ============ Pricing Card ============

function PricingCard({
  course,
  slug,
  isEnrolled,
  isLoggedIn,
  discount,
  totalLessons,
  serverLeadCaptured = false,
}: {
  course: {
    price: number;
    comparePrice: number | null;
    duration: number;
  };
  slug: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
  discount: number;
  totalLessons: number;
  serverLeadCaptured?: boolean;
}) {
  return (
    <Card className="overflow-hidden border-0 shadow-2xl shadow-black/20 bg-white">
      <CardContent className="p-6 space-y-5">
        {/* السعر */}
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-foreground">
              {formatPrice(course.price)}
            </span>
            {course.comparePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(course.comparePrice)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <Badge variant="success" className="mt-2">
              خصم {discount}%
            </Badge>
          )}
        </div>

        {/* زر الشراء / الاشتراك المجاني */}
        <EnrollCta
          slug={slug}
          price={course.price}
          isLoggedIn={isLoggedIn}
          isEnrolled={isEnrolled}
          serverLeadCaptured={serverLeadCaptured}
        />

        {/* المميزات */}
        <div className="space-y-3 pt-2 border-t border-border">
          <Feature icon={<IconBook className="h-4 w-4 text-brand-500" />}>
            {totalLessons} درس
          </Feature>
          {course.duration > 0 && (
            <Feature icon={<IconClock className="h-4 w-4 text-brand-500" />}>
              {formatDuration(course.duration)} محتوى
            </Feature>
          )}
          <Feature icon={<IconInfinity className="h-4 w-4 text-brand-500" />}>
            وصول مدى الحياة
          </Feature>
          <Feature icon={<IconCertificate className="h-4 w-4 text-brand-500" />}>
            شهادة إكمال
          </Feature>
        </div>
      </CardContent>
    </Card>
  );
}

function Feature({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {icon}
      <span>{children}</span>
    </div>
  );
}
