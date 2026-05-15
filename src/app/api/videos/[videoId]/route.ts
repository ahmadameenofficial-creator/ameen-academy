import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSignedEmbedUrl } from "@/lib/bunny";

interface RouteContext {
  params: Promise<{ videoId: string }>;
}

// جلب رابط فيديو محمي — بيتأكد إن الطالب مشترك في الكورس
export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { videoId } = await context.params;

  try {
    // جلب الدرس اللي فيه الفيديو ده
    const lesson = await prisma.lesson.findFirst({
      where: { videoId },
      select: {
        id: true,
        isFree: true,
        courseId: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "الفيديو مش موجود" }, { status: 404 });
    }

    // لو الدرس مجاني — أي حد يقدر يشوفه
    if (!lesson.isFree) {
      // تحقق من الاشتراك
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: lesson.courseId,
          },
        },
      });

      // الأدمن يشوف أي حاجة
      const isAdmin = session.user.role === "ADMIN";

      if (!enrollment && !isAdmin) {
        return NextResponse.json({ error: "لازم تشتري الكورس الأول" }, { status: 403 });
      }
    }

    const embedUrl = getSignedEmbedUrl(videoId, {
      expiresInSeconds: 7200,
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
