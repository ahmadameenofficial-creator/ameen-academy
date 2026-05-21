import { prisma } from "@/lib/prisma";

export function findPublishedCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    include: {
      instructor: { select: { name: true, image: true } },
      _count: { select: { enrollments: true, lessons: true, ratings: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
  });
}

export function findCourseBySlug(slug: string, publishedOnly = false) {
  return prisma.course.findUnique({
    where: { slug, ...(publishedOnly && { isPublished: true }) },
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

export function findCourseById(id: string) {
  return prisma.course.findUnique({ where: { id } });
}

export function findCourseBySlugBasic(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    select: { id: true, slug: true, title: true, price: true },
  });
}

export function findCourseWithModules(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
      _count: { select: { lessons: true } },
    },
  });
}

export function findAdminCourses() {
  return prisma.course.findMany({
    include: {
      _count: { select: { enrollments: true, lessons: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function createCourse(data: {
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  instructorId: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isPublished?: boolean;
}) {
  return prisma.course.create({
    data: {
      ...data,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
}

export function updateCourse(id: string, data: Record<string, unknown>) {
  return prisma.course.update({ where: { id }, data });
}

export function deleteCourse(id: string) {
  return prisma.course.delete({ where: { id } });
}

export function courseSlugExists(slug: string, excludeId?: string) {
  return prisma.course.findFirst({
    where: { slug, ...(excludeId && { id: { not: excludeId } }) },
    select: { id: true },
  });
}
