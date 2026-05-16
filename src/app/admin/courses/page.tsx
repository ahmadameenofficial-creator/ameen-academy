import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const revalidate = 30;
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconPlus, IconEdit, IconBook } from "@tabler/icons-react";

async function getCourses() {
  return prisma.course.findMany({
    include: {
      _count: { select: { enrollments: true, lessons: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">الكورسات</h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <IconPlus className="h-4 w-4" />
            كورس جديد
          </Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          مفيش كورسات لسه. اضغط "كورس جديد" عشان تبدأ.
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <Card key={course.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <IconBook className="h-6 w-6 text-brand-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {course.title}
                      </h3>
                      <Badge variant={course.isPublished ? "success" : "soft"}>
                        {course.isPublished ? "منشور" : "مسودة"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{course._count.lessons} درس</span>
                      <span>{course._count.enrollments} طالب</span>
                      <span>{formatPrice(course.price)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/courses/${course.id}`}>
                      <IconEdit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
