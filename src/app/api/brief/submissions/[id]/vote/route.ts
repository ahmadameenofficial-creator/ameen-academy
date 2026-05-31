import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, unauthorized } from "@/lib/admin-api";

// تبديل التصويت (toggle): لو مصوّت يشيل، لو لأ يضيف
export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id: submissionId } = await context.params;
  const userId = session.user.id;

  const submission = await prisma.briefSubmission.findUnique({
    where: { id: submissionId },
    select: { id: true },
  });
  if (!submission) return badRequest("الحل مش موجود");

  const existing = await prisma.briefVote.findUnique({
    where: { submissionId_userId: { submissionId, userId } },
    select: { id: true },
  });

  const voted = await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.briefVote.delete({ where: { id: existing.id } });
      await tx.briefSubmission.update({
        where: { id: submissionId },
        data: { votesCount: { decrement: 1 } },
      });
      return false;
    }
    await tx.briefVote.create({ data: { submissionId, userId } });
    await tx.briefSubmission.update({
      where: { id: submissionId },
      data: { votesCount: { increment: 1 } },
    });
    return true;
  });

  const updated = await prisma.briefSubmission.findUnique({
    where: { id: submissionId },
    select: { votesCount: true },
  });

  return NextResponse.json({ voted, votesCount: updated?.votesCount ?? 0 });
}
