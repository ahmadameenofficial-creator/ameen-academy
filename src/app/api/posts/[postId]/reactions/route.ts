import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const VALID_TYPES = ["like", "love", "haha", "wow", "sad"] as const;

const reactionSchema = z.object({
  type: z.enum(VALID_TYPES),
});

interface RouteContext {
  params: Promise<{ postId: string }>;
}

// إضافة/تغيير/إزالة تفاعل
export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { postId } = await context.params;

  try {
    const body = await req.json();
    const result = reactionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "نوع تفاعل مش صحيح" }, { status: 400 });
    }

    const existing = await prisma.reaction.findUnique({
      where: { userId_postId: { userId: session.user.id, postId } },
    });

    // لو نفس التفاعل → إزالة
    if (existing && existing.type === result.data.type) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      const reactions = await getPostReactions(postId);
      return NextResponse.json({ removed: true, reactions });
    }

    // لو تفاعل مختلف → تحديث، لو مفيش → إنشاء
    if (existing) {
      await prisma.reaction.update({
        where: { id: existing.id },
        data: { type: result.data.type },
      });
    } else {
      await prisma.reaction.create({
        data: { userId: session.user.id, postId, type: result.data.type },
      });
    }

    const reactions = await getPostReactions(postId);
    return NextResponse.json({ type: result.data.type, reactions });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// جلب التفاعلات لبوست
async function getPostReactions(postId: string) {
  const reactions = await prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: true,
  });

  const total = reactions.reduce((sum, r) => sum + r._count, 0);
  const byType: Record<string, number> = {};
  reactions.forEach((r) => {
    byType[r.type] = r._count;
  });

  return { total, byType };
}
