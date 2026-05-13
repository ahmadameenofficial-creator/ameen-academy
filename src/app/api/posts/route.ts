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

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
        comments: {
          where: { isDeleted: false },
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { id: true, name: true, image: true, role: true } },
          },
        },
        _count: { select: { comments: true, likes: true } },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, pages: Math.ceil(total / limit) });
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
