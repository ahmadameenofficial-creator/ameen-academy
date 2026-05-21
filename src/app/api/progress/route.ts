import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { progressService } from "@/lib/services";
import { progressSchema } from "@/lib/validations/progress";
import { handleApiError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const body = await req.json();
    const result = progressSchema.safeParse(body);
    if (!result.success) throw new ValidationError(result.error.errors[0].message);

    const { lessonId, ...data } = result.data;
    const progress = await progressService.trackProgress(session.user.id, lessonId, data);

    return NextResponse.json(progress);
  } catch (error) {
    return handleApiError(error);
  }
}
