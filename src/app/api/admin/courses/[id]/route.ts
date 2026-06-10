import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { broadcastNewCourse } from "@/lib/notifications";
import { z } from "zod";

const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().min(10).optional(),
  shortDescription: z.string().optional().nullable(),
  category: z.string().optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  price: z.number().min(0).optional(),
  comparePrice: z.number().optional().nullable(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const body = await req.json();
    const result = updateCourseSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const data: Record<string, unknown> = { ...result.data };
    let firstPublish = false;
    if (result.data.isPublished === true) {
      const existing = await prisma.course.findUnique({ where: { id } });
      if (existing && !existing.publishedAt) {
        data.publishedAt = new Date();
        firstPublish = true;
      }
    }

    const course = await prisma.course.update({ where: { id }, data });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");

    // أول نشر للكورس — أهم إشعار في المنصة، بيوصل لكل المشتركين
    if (firstPublish) {
      broadcastNewCourse(course.title, course.slug).catch(() => {});
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    await prisma.course.delete({ where: { id } });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");

    return NextResponse.json({ message: "اتحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
