import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

interface RouteContext {
  params: Promise<{ commentId: string }>;
}

const updateSchema = z.object({
  content: z.string().min(1, "التعليق فاضي").max(1000, "التعليق طويل أوي"),
});

// تعديل كومنت
export async function PUT(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });

  const { commentId } = await context.params;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return NextResponse.json({ error: "مش موجود" }, { status: 404 });

    const isOwner = comment.userId === session.user.id;
    if (!isOwner) return NextResponse.json({ error: "مش مسموح — تقدر تعدل كومنتاتك بس" }, { status: 403 });

    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { content: result.data.content },
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// حذف كومنت
export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });

  const { commentId } = await context.params;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return NextResponse.json({ error: "مش موجود" }, { status: 404 });

    const isOwner = comment.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    if (!isOwner && !isAdmin) return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });

    await prisma.$transaction([
      prisma.comment.update({
        where: { id: commentId },
        data: { isDeleted: true },
      }),
      prisma.post.update({
        where: { id: comment.postId },
        data: { commentsCount: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ message: "اتحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
