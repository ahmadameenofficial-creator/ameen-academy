import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params;

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
    include: {
      user: { select: { id: true, name: true, image: true } },
      replies: {
        where: { isDeleted: false },
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });

  return NextResponse.json(comments);
}

export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجل دخول الأول" }, { status: 401 });
  }

  const { slug } = await context.params;
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
}
