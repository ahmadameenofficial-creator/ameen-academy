import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

interface RouteContext {
  params: Promise<{ postId: string }>;
}

const updateSchema = z.object({
  content: z.string().min(3).max(2000),
});

export async function PUT(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });

  const { postId } = await context.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return NextResponse.json({ error: "مش موجود" }, { status: 404 });

    const isOwner = post.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    if (!isOwner && !isAdmin) return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });

    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });

    const updated = await prisma.post.update({
      where: { id: postId },
      data: { content: result.data.content },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });

  const { postId } = await context.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return NextResponse.json({ error: "مش موجود" }, { status: 404 });

    const isOwner = post.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    if (!isOwner && !isAdmin) return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });

    await prisma.post.update({
      where: { id: postId },
      data: { isDeleted: true },
    });

    return NextResponse.json({ message: "اتحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
