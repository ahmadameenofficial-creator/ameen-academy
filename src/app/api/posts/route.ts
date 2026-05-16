import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const postSchema = z.object({
  content: z.string().min(3, "المنشور قصير أوي").max(2000, "المنشور طويل أوي"),
  courseId: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where = {
    isDeleted: false,
    ...(courseId && { courseId }),
  };

  // جلب الـ session عشان نعرف تفاعل اليوزر الحالي
  const session = await auth();

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
        comments: {
          where: { isDeleted: false, parentId: null }, // الكومنتات الرئيسية بس
          take: 3,
          orderBy: { createdAt: "asc" },
          include: {
            user: { select: { id: true, name: true, image: true, role: true } },
            replies: {
              where: { isDeleted: false },
              orderBy: { createdAt: "asc" },
              take: 10,
              include: {
                user: { select: { id: true, name: true, image: true, role: true } },
              },
            },
          },
        },
        reactions: {
          select: { type: true, userId: true },
        },
        _count: {
          select: {
            comments: { where: { isDeleted: false } },
            likes: true,
            reactions: true,
          },
        },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  // تجهيز البيانات مع التفاعلات
  const postsWithReactions = posts.map((post) => {
    // حساب التفاعلات بالنوع
    const reactionsByType: Record<string, number> = {};
    post.reactions.forEach((r) => {
      reactionsByType[r.type] = (reactionsByType[r.type] || 0) + 1;
    });

    // تفاعل اليوزر الحالي
    const myReaction = session?.user
      ? post.reactions.find((r) => r.userId === session.user.id)?.type || null
      : null;

    return {
      ...post,
      reactions: undefined, // مش هنبعت كل الـ reactions
      reactionsSummary: {
        total: post.reactions.length,
        byType: reactionsByType,
        myReaction,
      },
    };
  });

  return NextResponse.json({ posts: postsWithReactions, total, pages: Math.ceil(total / limit) });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const rl = rateLimit(`post:${session.user.id}`, RATE_LIMITS.post);
  if (!rl.success) {
    return NextResponse.json({ error: "استنى شوية قبل ما تنشر تاني" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const result = postSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        userId: session.user.id,
        content: result.data.content,
        courseId: result.data.courseId || null,
      },
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
