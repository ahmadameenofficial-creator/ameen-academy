import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";

const schema = z.object({
  status: z.enum(["PUBLISHED", "HIDDEN", "FLAGGED"]).optional(),
  expertFeedback: z.string().max(2000).optional(),
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
  if (data.status === undefined && data.expertFeedback === undefined) {
    return badRequest("مفيش حاجة تتعدّل");
  }

  const submission = await prisma.briefSubmission.update({
    where: { id },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.expertFeedback !== undefined && {
        expertFeedback: data.expertFeedback || null,
      }),
    },
    select: { id: true, status: true, brief: { select: { slug: true } } },
  });

  revalidatePath(`/brief/${submission.brief.slug}`);
  revalidatePath("/admin/brief");

  return NextResponse.json({ id: submission.id, status: submission.status });
}
