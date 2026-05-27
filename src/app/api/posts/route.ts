import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { communityDb } from "@/lib/db";
import { communityService } from "@/lib/services";
import { postSchema } from "@/lib/validations/post";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { handleApiError, UnauthorizedError, RateLimitError, ValidationError } from "@/lib/errors";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const session = await auth();

  const result = await communityService.getPosts({
    courseId,
    page,
    limit: 20,
    userId: session?.user?.id,
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const rl = rateLimit(`post:${session.user.id}`, RATE_LIMITS.post);
    if (!rl.success) throw new RateLimitError("استنى شوية قبل ما تنشر تاني");

    const body = await req.json();
    const result = postSchema.safeParse(body);
    if (!result.success) throw new ValidationError(result.error.errors[0].message);

    const post = await communityDb.createPost(session.user.id, result.data.content, result.data.courseId);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
