import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, unauthorized } from "@/lib/admin-api";
import { awardForSubmission } from "@/lib/brief/gamification";

const schema = z.object({
  imageUrl: z.string().min(1).max(1000),
  note: z.string().max(1000).optional(),
});

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("طلب غير صالح");
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    return badRequest(result.error.errors[0]?.message ?? "بيانات غير صالحة");
  }

  const brief = await prisma.brief.findUnique({ where: { id }, select: { id: true } });
  if (!brief) return badRequest("البريف مش موجود");

  const userId = session.user.id;

  const submission = await prisma.$transaction(async (tx) => {
    const created = await tx.briefSubmission.create({
      data: {
        briefId: brief.id,
        userId,
        imageUrl: result.data.imageUrl,
        note: result.data.note,
      },
      select: { id: true },
    });
    await awardForSubmission(tx, userId);
    return created;
  });

  return NextResponse.json({ id: submission.id }, { status: 201 });
}
