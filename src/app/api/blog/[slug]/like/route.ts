import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  const { slug } = await context.params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    select: { id: true },
  });

  if (!post) {
    return NextResponse.json({ error: "مقال مش موجود" }, { status: 404 });
  }

  const likesCount = await prisma.blogLike.count({
    where: { postId: post.id },
  });

  let isLiked = false;
  if (session?.user) {
    const existing = await prisma.blogLike.findUnique({
      where: { userId_postId: { userId: session.user.id, postId: post.id } },
    });
    isLiked = !!existing;
  }

  return NextResponse.json({ likesCount, isLiked });
}

export async function POST(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجل دخول الأول" }, { status: 401 });
  }

  const { slug } = await context.params;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "مقال مش موجود" }, { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.blogLike.findUnique({
        where: { userId_postId: { userId: session.user.id, postId: post.id } },
      });

      if (existing) {
        await tx.blogLike.delete({ where: { id: existing.id } });
        const likesCount = await tx.blogLike.count({ where: { postId: post.id } });
        return { isLiked: false, likesCount };
      }

      await tx.blogLike.create({
        data: { postId: post.id, userId: session.user.id },
      });
      const likesCount = await tx.blogLike.count({ where: { postId: post.id } });
      return { isLiked: true, likesCount };
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
