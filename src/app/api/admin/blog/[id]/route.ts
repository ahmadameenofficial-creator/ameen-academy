import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// جلب مقال واحد بالمحتوى الكامل
export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const { id } = await context.params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "المقال مش موجود" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// تعديل مقال
export async function PUT(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await req.json();
  const { title, slug, excerpt, content, thumbnail, category, tags, isPublished, isFeatured } = body;

  // حساب وقت القراءة
  const readingTime = content
    ? Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
    : undefined;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "المقال مش موجود" }, { status: 404 });
  }

  // لو بينشر لأول مرة — حط تاريخ النشر
  const publishedAt =
    isPublished && !existing.publishedAt ? new Date() : existing.publishedAt;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(slug && { slug: slug.toLowerCase().replace(/\s+/g, "-") }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content && { content }),
      ...(thumbnail !== undefined && { thumbnail }),
      ...(category && { category }),
      ...(tags && { tags }),
      ...(readingTime && { readingTime }),
      ...(isPublished !== undefined && { isPublished }),
      ...(isFeatured !== undefined && { isFeatured }),
      publishedAt,
    },
  });

  return NextResponse.json(post);
}

// حذف مقال
export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const { id } = await context.params;

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
