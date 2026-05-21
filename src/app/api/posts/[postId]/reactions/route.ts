import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { communityService } from "@/lib/services";
import { reactionSchema } from "@/lib/validations/post";
import { handleApiError, UnauthorizedError, ValidationError } from "@/lib/errors";
import type { RouteContext } from "@/lib/types";

export async function POST(req: Request, context: RouteContext<{ postId: string }>) {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const { postId } = await context.params;
    const body = await req.json();
    const result = reactionSchema.safeParse(body);
    if (!result.success) throw new ValidationError("نوع تفاعل مش صحيح");

    const data = await communityService.reactToPost(session.user.id, postId, result.data.type);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
