import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconBook, IconUsers, IconClock } from "@tabler/icons-react";
import { CourseEditor } from "./course-editor";
import { ModulesManager } from "./modules-manager";

interface Props {
  params: Promise<{ id: string }>;
}

async function getCourse(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
      _count: { select: { enrollments: true, lessons: true } },
    },
  });
}

export default async function AdminCourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant={course.isPublished ? "success" : "soft"}>
              {course.isPublished ? "منشور" : "مسودة"}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <IconBook className="h-4 w-4" />
              {course._count.lessons} درس
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <IconUsers className="h-4 w-4" />
              {course._count.enrollments} طالب
            </span>
            <span className="text-sm font-medium text-brand-600">
              {formatPrice(course.price)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ModulesManager courseId={course.id} initialModules={course.modules} />
        </div>
        <div>
          <CourseEditor course={course} />
        </div>
      </div>
    </div>
  );
}
