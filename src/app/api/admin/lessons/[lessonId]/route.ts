import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";

const updateLessonSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional().nullable(),
  videoId: z.string().optional().nullable(),
  duration: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  order: z.number().optional(),
});

interface RouteContext {
  params: Promise<{ lessonId: string }>;
}

export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { lessonId } = await context.params;

  try {
    const body = await req.json();
    const result = updateLessonSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: result.data,
    });
    return NextResponse.json(lesson);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { lessonId } = await context.params;

  try {
    await prisma.lesson.delete({ where: { id: lessonId } });
    return NextResponse.json({ message: "اتحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
