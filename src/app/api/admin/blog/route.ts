import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// جلب كل المقالات (أدمن)
export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

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
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, thumbnail, category, tags, isPublished } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/\s+/g, "-"),
        excerpt,
        content,
        thumbnail,
        category,
        tags: tags || [],
        readingTime,
        authorId: session.user.id,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
