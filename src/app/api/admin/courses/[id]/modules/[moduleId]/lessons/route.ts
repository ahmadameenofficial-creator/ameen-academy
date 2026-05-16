import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";

const lessonSchema = z.object({
  title: z.string().min(2, "العنوان قصير"),
  description: z.string().optional(),
  videoId: z.string().optional(),
  duration: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
});

interface RouteContext {
  params: Promise<{ id: string; moduleId: string }>;
}

export async function POST(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id: courseId, moduleId } = await context.params;

  try {
    const body = await req.json();
    const result = lessonSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const maxOrder = await prisma.lesson.aggregate({
      where: { moduleId },
      _max: { order: true },
    });

    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        moduleId,
        title: result.data.title,
        description: result.data.description,
        videoId: result.data.videoId,
        duration: result.data.duration || 0,
        isFree: result.data.isFree || false,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");

    return NextResponse.json(lesson, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
