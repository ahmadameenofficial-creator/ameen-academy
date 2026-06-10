import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notifyNewComment, notifyCommentReply } from "@/lib/notifications";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1, "التعليق فاضي").max(1000, "التعليق طويل أوي"),
  parentId: z.string().optional(), // للرد على كومنت
});

interface RouteContext {
  params: Promise<{ postId: string }>;
}

const COMMENT_USER_SELECT = { id: true, name: true, image: true, role: true };

// كل تعليقات البوست — لزرار "عرض كل التعليقات" (الفيد بيجيب أول 3 بس)
export async function GET(_req: Request, context: RouteContext) {
  const { postId } = await context.params;

  const comments = await prisma.comment.findMany({
    where: { postId, isDeleted: false, parentId: null },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: COMMENT_USER_SELECT },
      replies: {
        where: { isDeleted: false },
        orderBy: { createdAt: "asc" },
        include: { user: { select: COMMENT_USER_SELECT } },
      },
    },
  });

  return NextResponse.json({ comments });
}

// إضافة كومنت أو رد
export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  // حماية من السبام: 20 تعليق كل 10 دقايق للمستخدم الواحد
  const rl = rateLimit(`comment:${session.user.id}`, RATE_LIMITS.comment);
  if (!rl.success) {
    return NextResponse.json(
      { error: "استنى شوية قبل ما تعلّق تاني" },
      { status: 429 },
    );
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
          parentId: result.data.parentId || null,
        },
        include: {
          user: { select: { id: true, name: true, image: true, role: true } },
          replies: {
            where: { isDeleted: false },
            include: {
              user: { select: { id: true, name: true, image: true, role: true } },
            },
          },
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    // إشعار لصاحب البوست — بمعاينة من نص التعليق
    const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
    if (post && post.userId !== session.user.id) {
      notifyNewComment(post.userId, session.user.name || "شخص", result.data.content);
    }

    // إشعار لصاحب الكومنت الأصلي (لو رد)
    if (result.data.parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: result.data.parentId },
        select: { userId: true },
      });
      if (parentComment && parentComment.userId !== session.user.id) {
        notifyCommentReply(parentComment.userId, session.user.name || "شخص", result.data.content);
      }
    }

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
