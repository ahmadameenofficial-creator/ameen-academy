import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ postId: string }>;
}

export async function POST(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { postId } = await context.params;

  try {
    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: session.user.id, postId } },
    });

    if (existing) {
      await prisma.$transaction([
        prisma.like.delete({ where: { id: existing.id } }),
        prisma.post.update({
          where: { id: postId },
          data: { likesCount: { decrement: 1 } },
        }),
      ]);
      return NextResponse.json({ liked: false });
    }

    await prisma.$transaction([
      prisma.like.create({
        data: { userId: session.user.id, postId },
      }),
      prisma.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ liked: true });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
