import { auth } from "@/auth";
import { enrollmentService } from "@/lib/services";
import { handleApiError, UnauthorizedError } from "@/lib/errors";
import { NextResponse } from "next/server";

// اشتراك فوري في الكورس المجاني (من غير دفع)
export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const result = await enrollmentService.claimFreeCourse(session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
