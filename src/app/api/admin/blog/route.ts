import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { broadcastNewArticle } from "@/lib/notifications";
import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string().min(3, "العنوان قصير أوي"),
  slug: z.string().min(3, "الـ slug قصير"),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(10, "المحتوى قصير أوي"),
  thumbnail: z.string().optional().nullable(),
  category: z.string().min(1, "التصنيف مطلوب"),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

// جلب كل المقالات (أدمن)
export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { author: { select: { name: true, image: true } } },
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// إنشاء مقال جديد
export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const result = createBlogSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const data = result.data;
    const wordCount = data.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
        excerpt: data.excerpt || null,
        content: data.content,
        thumbnail: data.thumbnail || null,
        category: data.category,
        tags: data.tags || [],
        readingTime,
        authorId: session.user.id,
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    // اتنشر من أول لحظة؟ — push لكل المشتركين
    if (post.isPublished) {
      broadcastNewArticle(post.title, post.slug).catch(() => {});
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
