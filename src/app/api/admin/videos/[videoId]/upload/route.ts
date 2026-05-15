import { NextResponse } from "next/server";
import { auth } from "@/auth";

interface RouteContext {
  params: Promise<{ videoId: string }>;
}

// رفع الفيديو لـ Bunny عبر السيرفر (الـ API Key ميظهرش في البراوزر)
export async function PUT(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });
  }

  const { videoId } = await context.params;
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID!;
  const apiKey = process.env.BUNNY_STREAM_API_KEY!;

  try {
    const body = await req.arrayBuffer();

    const bunnyRes = await fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`,
      {
        method: "PUT",
        headers: {
          AccessKey: apiKey,
          "Content-Type": "application/octet-stream",
        },
        body,
      }
    );

    if (!bunnyRes.ok) {
      const text = await bunnyRes.text();
      console.error("Bunny upload failed:", text);
      return NextResponse.json({ error: "فشل رفع الفيديو" }, { status: 500 });
    }

    const result = await bunnyRes.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("Upload proxy error:", err);
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// زيادة الحد الأقصى لحجم الطلب (Vercel default 4.5MB)
export const config = {
  api: {
    bodyParser: false,
  },
};
