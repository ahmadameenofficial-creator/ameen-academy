import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";

const updateModuleSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional().nullable(),
  order: z.number().optional(),
});

interface RouteContext {
  params: Promise<{ id: string; moduleId: string }>;
}

export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { moduleId } = await context.params;

  try {
    const body = await req.json();
    const result = updateModuleSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const module = await prisma.module.update({
      where: { id: moduleId },
      data: result.data,
    });

    revalidatePath("/admin/courses");

    return NextResponse.json(module);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { moduleId } = await context.params;

  try {
    await prisma.module.delete({ where: { id: moduleId } });

    revalidatePath("/admin/courses");

    return NextResponse.json({ message: "اتحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
