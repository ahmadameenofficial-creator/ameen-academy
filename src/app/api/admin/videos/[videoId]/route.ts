import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getVideo, deleteVideo } from "@/lib/bunny";

interface RouteContext {
  params: Promise<{ videoId: string }>;
}

// جلب بيانات فيديو
export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });
  }

  const { videoId } = await context.params;

  try {
    const video = await getVideo(videoId);
    return NextResponse.json(video);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Error getting video:", msg);
    return NextResponse.json(
      { error: msg, videoId },
      { status: msg.includes("404") ? 404 : 500 },
    );
  }
}

// حذف فيديو
export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 403 });
  }

  const { videoId } = await context.params;

  try {
    await deleteVideo(videoId);
    return NextResponse.json({ message: "اتحذف" });
  } catch (err) {
    console.error("Error deleting video:", err);
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
