import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { formatPrice, formatDuration, getLevelLabel } from "@/lib/format";
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
} from "@tabler/icons-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
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
}

async function getEnrollment(userId: string, courseId: string) {
  return prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { title: true, shortDescription: true },
  });
  if (!course) return { title: "كورس مش موجود" };
  return {
    title: course.title,
    description: course.shortDescription || course.title,
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

  const totalLessons = course.lessons.length;
  const avgRating =
    course.ratings.length > 0
      ? course.ratings.reduce((s, r) => s + r.rating, 0) / course.ratings.length
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-900 to-brand-800 text-white">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="solid">{course.category}</Badge>
                <Badge className="bg-white/10 text-white border-0">
                  {getLevelLabel(course.level)}
                </Badge>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="text-brand-200 text-base md:text-lg leading-relaxed max-w-2xl">
                {course.shortDescription || course.description.slice(0, 200)}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-200">
                {avgRating > 0 && (
                  <span className="flex items-center gap-1">
                    <IconStarFilled className="h-4 w-4 text-amber-400" />
                    <span className="text-white font-medium">{avgRating.toFixed(1)}</span>
                    <span>({course._count.ratings} تقييم)</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <IconUsers className="h-4 w-4" />
                  {course._count.enrollments} طالب
                </span>
                <span className="flex items-center gap-1">
                  <IconBook className="h-4 w-4" />
                  {totalLessons} درس
                </span>
                {course.duration > 0 && (
                  <span className="flex items-center gap-1">
                    <IconClock className="h-4 w-4" />
                    {formatDuration(course.duration)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-brand-700 flex items-center justify-center overflow-hidden">
                  {course.instructor.image ? (
                    <Image
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <IconUser className="h-5 w-5 text-brand-300" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-brand-300">المدرّب</p>
                  <p className="font-medium">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Pricing Card - Desktop */}
            <div className="hidden md:block">
              <PricingCard
                course={course}
                slug={slug}
                isEnrolled={isEnrolled}
                isLoggedIn={!!session}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-10">
            {/* وصف الكورس */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                عن الكورس ده
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {course.description}
              </div>
            </section>

            {/* محتوى الكورس */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                محتوى الكورس
              </h2>
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <details key={module.id} className="group" open>
                    <summary className="flex items-center justify-between cursor-pointer rounded-xl bg-muted/50 border border-border p-4 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <IconChevronDown className="h-5 w-5 text-brand-500 transition-transform group-open:rotate-180" />
                        <span className="font-medium text-foreground">
                          {module.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {module.lessons.length} درس
                      </span>
                    </summary>
                    <div className="mt-1 border border-border rounded-xl divide-y divide-border overflow-hidden">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between px-4 py-3 text-sm"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.isFree ? (
                              <IconPlayerPlay className="h-4 w-4 text-brand-500" />
                            ) : (
                              <IconLock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={lesson.isFree ? "text-foreground" : "text-muted-foreground"}>
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <Badge variant="success" className="text-[10px]">مجاني</Badge>
                            )}
                          </div>
                          {lesson.duration > 0 && (
                            <span className="text-xs text-muted-foreground">
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
                    <Card key={review.id} className="p-5">
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
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Pricing Card - appears in sidebar on desktop (already shown above in hero) */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            {course.comparePrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(course.comparePrice)}
              </span>
            )}
            <span className="text-lg font-bold text-brand-600">
              {formatPrice(course.price)}
            </span>
          </div>
          {isEnrolled ? (
            <Button variant="gradient" size="lg" asChild>
              <Link href={`/dashboard`}>كمّل تعلّم</Link>
            </Button>
          ) : (
            <Button variant="gradient" size="lg" asChild>
              <Link href={session ? `/courses/${slug}/checkout` : "/login"}>
                اشتري دلوقتي
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* spacer for mobile sticky */}
      <div className="md:hidden h-20" />
    </div>
  );
}

function PricingCard({
  course,
  slug,
  isEnrolled,
  isLoggedIn,
}: {
  course: {
    price: number;
    comparePrice: number | null;
    duration: number;
    lessons: { id: string }[];
  };
  slug: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}) {
  const totalLessons = course.lessons.length;
  const discount = course.comparePrice
    ? Math.round(((course.comparePrice - course.price) / course.comparePrice) * 100)
    : 0;

  return (
    <Card className="sticky top-24 overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
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

        {isEnrolled ? (
          <Button variant="gradient" size="xl" className="w-full" asChild>
            <Link href="/dashboard">كمّل تعلّم</Link>
          </Button>
        ) : (
          <Button variant="gradient" size="xl" className="w-full" asChild>
            <Link href={isLoggedIn ? `/courses/${slug}/checkout` : "/login"}>
              اشتري دلوقتي
            </Link>
          </Button>
        )}

        <div className="space-y-3 pt-2">
          <Feature icon={<IconBook className="h-4 w-4 text-brand-500" />}>
            {totalLessons} درس
          </Feature>
          {course.duration > 0 && (
            <Feature icon={<IconClock className="h-4 w-4 text-brand-500" />}>
              {formatDuration(course.duration)} محتوى
            </Feature>
          )}
          <Feature icon={<IconPlayerPlay className="h-4 w-4 text-brand-500" />}>
            وصول مدى الحياة
          </Feature>
          <Feature icon={<IconCheck className="h-4 w-4 text-brand-500" />}>
            شهادة إكمال
          </Feature>
        </div>
      </CardContent>
    </Card>
  );
}

function Feature({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span>{children}</span>
    </div>
  );
}
