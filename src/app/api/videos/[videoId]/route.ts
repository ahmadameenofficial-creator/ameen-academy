import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSignedEmbedUrl } from "@/lib/bunny";

interface RouteContext {
  params: Promise<{ videoId: string }>;
}

// جلب رابط فيديو محمي (للطالب المشترك فقط)
export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { videoId } = await context.params;

  // TODO: تأكد إن الطالب مشترك في الكورس اللي فيه الفيديو ده
  // const hasAccess = await checkCourseAccess(session.user.id, videoId);
  // if (!hasAccess) return NextResponse.json({ error: "مش مشترك" }, { status: 403 });

  try {
    const embedUrl = getSignedEmbedUrl(videoId, {
      expiresInSeconds: 7200, // ساعتين
    });

    return NextResponse.json({
      embedUrl,
      watermark: session.user.name || session.user.email,
    });
  } catch (err) {
    console.error("Error generating signed URL:", err);
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
