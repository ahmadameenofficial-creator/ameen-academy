import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notifyNewComment } from "@/lib/notifications";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1, "التعليق فاضي").max(1000, "التعليق طويل أوي"),
});

interface RouteContext {
  params: Promise<{ postId: string }>;
}

export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { postId } = await context.params;

  try {
    const body = await req.json();
    const result = commentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const [comment] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          postId,
          userId: session.user.id,
          content: result.data.content,
        },
        include: {
          user: { select: { id: true, name: true, image: true, role: true } },
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
    if (post && post.userId !== session.user.id) {
      notifyNewComment(post.userId, session.user.name || "شخص");
    }

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
