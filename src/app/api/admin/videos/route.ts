import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createVideo, listVideos, getTusUploadCredentials } from "@/lib/bunny";

// إنشاء فيديو + إرجاع توقيع رفع مؤقت
// المتصفح هيستخدم tus-js-client بعد كده عشان يرفع المحتوى مباشرة لـ Bunny
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });
  }

  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "العنوان مطلوب" }, { status: 400 });
    }

    const video = await createVideo(title);
    console.log(`[Videos API] تم إنشاء فيديو: ${video.guid}`);

    // التوقيع صالح لـ 6 ساعات — كفاية لأي فيديو حتى لو كبير
    return NextResponse.json(getTusUploadCredentials(video.guid));
  } catch (err) {
    console.error("Error creating video:", err);
    return NextResponse.json(
      { error: `فشل إنشاء الفيديو: ${err instanceof Error ? err.message : "خطأ غير معروف"}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });
  }

  try {
    const data = await listVideos();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error listing videos:", err);
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
