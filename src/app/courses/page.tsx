import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// الكورسات بتتحدث كل 60 ثانية — مش محتاجة تتجاب من الـ DB كل request
export const revalidate = 60;

export const metadata: Metadata = {
  title: "الكورسات",
  description: "تصفّح كورسات أكاديمية أمين في الجرافيك ديزاين والتصميم الاحترافي",
};
import { formatPrice, formatDuration, getLevelLabel } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconClock,
  IconBook,
  IconUsers,
  IconStar,
} from "@tabler/icons-react";

async function getCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    include: {
      instructor: { select: { name: true, image: true } },
      _count: { select: { enrollments: true, lessons: true, ratings: true } },
      ratings: { select: { rating: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
  });
}

function getAverageRating(ratings: { rating: number }[]) {
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-brand-50 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            الكورسات
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            كورسات احترافية هتنقلك من الصفر للاحتراف
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <IconBook className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground">
              لسه مفيش كورسات
            </h2>
            <p className="mt-2 text-muted-foreground">
              الكورسات جاية قريب، استنّونا
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const avgRating = getAverageRating(course.ratings);
              return (
                <Link key={course.id} href={`/courses/${course.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-lg hover:shadow-brand-500/5 hover:border-brand-200 transition-all h-full flex flex-col">
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      {course.thumbnail ? (
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={400}
                          height={225}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-100 to-brand-50">
                          <IconBook className="h-12 w-12 text-brand-300" />
                        </div>
                      )}
                      {course.isFeatured && (
                        <Badge variant="solid" className="absolute top-3 right-3">
                          مميّز
                        </Badge>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default">{getLevelLabel(course.level)}</Badge>
                        <Badge variant="soft">{course.category}</Badge>
                      </div>

                      <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>

                      {course.shortDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {course.shortDescription}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto mb-4">
                        <span className="flex items-center gap-1">
                          <IconBook className="h-4 w-4 text-brand-500" />
                          {course._count.lessons} درس
                        </span>
                        {course.duration > 0 && (
                          <span className="flex items-center gap-1">
                            <IconClock className="h-4 w-4 text-brand-500" />
                            {formatDuration(course.duration)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <IconUsers className="h-4 w-4 text-brand-500" />
                          {course._count.enrollments} طالب
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          {avgRating > 0 && (
                            <>
                              <IconStar className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-medium">
                                {avgRating.toFixed(1)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({course._count.ratings})
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {course.comparePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(course.comparePrice)}
                            </span>
                          )}
                          <span className="font-bold text-brand-600">
                            {formatPrice(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
