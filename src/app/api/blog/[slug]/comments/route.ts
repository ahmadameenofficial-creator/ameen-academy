import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "مقال مش موجود" }, { status: 404 });
    }

    const comments = await prisma.blogComment.findMany({
      where: { postId: post.id, parentId: null, isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        user: { select: { id: true, name: true, image: true } },
        replies: {
          where: { isDeleted: false },
          orderBy: { createdAt: "asc" },
          take: 20,
          include: {
            user: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجل دخول الأول" }, { status: 401 });
  }

  // حماية من السبام: 20 تعليق كل 10 دقايق للمستخدم الواحد
  const rl = rateLimit(`blog-comment:${session.user.id}`, RATE_LIMITS.comment);
  if (!rl.success) {
    return NextResponse.json(
      { error: "استنى شوية قبل ما تعلّق تاني" },
      { status: 429 },
    );
  }

  const { slug } = await context.params;

  try {
    const { content, parentId } = await req.json();

    if (!content || content.trim().length < 2) {
      return NextResponse.json({ error: "اكتب كومنت أطول من كدة" }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "مقال مش موجود" }, { status: 404 });
    }

    if (parentId) {
      const parent = await prisma.blogComment.findUnique({
        where: { id: parentId, postId: post.id },
      });
      if (!parent) {
        return NextResponse.json({ error: "الكومنت مش موجود" }, { status: 404 });
      }
    }

    const comment = await prisma.blogComment.create({
      data: {
        postId: post.id,
        userId: session.user.id,
        content: content.trim(),
        parentId: parentId || null,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        replies: {
          include: {
            user: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
