import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createVideo, listVideos, getTusUploadCredentials } from "@/lib/bunny";

// إنشاء فيديو جديد (الخطوة الأولى — بيرجع الـ ID للرفع)
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

    // بنرجّع بيانات رفع TUS موقّعة — من غير ما المفتاح يخرج للمتصفح إطلاقاً
    return NextResponse.json(getTusUploadCredentials(video.guid));
  } catch (err) {
    console.error("Error creating video:", err);
    return NextResponse.json({ error: "حصل مشكلة في إنشاء الفيديو" }, { status: 500 });
  }
}

// جلب كل الفيديوهات
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
