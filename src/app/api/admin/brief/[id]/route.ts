import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";

const schema = z.object({
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("طلب غير صالح");
  }

  const result = schema.safeParse(body);
  if (!result.success) return badRequest("بيانات غير صالحة");
  const data = result.data;
  if (data.isFeatured === undefined && data.isPublished === undefined) {
    return badRequest("مفيش حاجة تتعدّل");
  }

  const brief = await prisma.brief.update({
    where: { id },
    data,
    select: { slug: true, isFeatured: true, isPublished: true },
  });

  revalidatePath("/brief/explore");
  revalidatePath(`/brief/${brief.slug}`);
  revalidatePath("/admin/brief");

  return NextResponse.json(brief);
}
