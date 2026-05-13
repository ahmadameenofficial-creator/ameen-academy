import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";

const moduleSchema = z.object({
  title: z.string().min(2, "العنوان قصير"),
  description: z.string().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id: courseId } = await context.params;

  try {
    const body = await req.json();
    const result = moduleSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const maxOrder = await prisma.module.aggregate({
      where: { courseId },
      _max: { order: true },
    });

    const module = await prisma.module.create({
      data: {
        courseId,
        title: result.data.title,
        description: result.data.description,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    return NextResponse.json(module, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
