import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { broadcastNewArticle } from "@/lib/notifications";
import { z } from "zod";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(1).optional(),
  thumbnail: z.string().optional().nullable(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "المقال مش موجود" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    const body = await req.json();
    const result = updateBlogSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const data = result.data;
    const readingTime = data.content
      ? Math.max(1, Math.ceil(data.content.split(/\s+/).length / 200))
      : undefined;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المقال مش موجود" }, { status: 404 });
    }

    const publishedAt =
      data.isPublished && !existing.publishedAt ? new Date() : existing.publishedAt;

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug.toLowerCase().replace(/\s+/g, "-") }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content && { content: data.content }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.category && { category: data.category }),
        ...(data.tags && { tags: data.tags }),
        ...(readingTime && { readingTime }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        publishedAt,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    // أول مرة يتنشر فيها المقال (مش كل تعديل) — push لكل المشتركين
    if (data.isPublished && !existing.publishedAt) {
      broadcastNewArticle(post.title, post.slug).catch(() => {});
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
