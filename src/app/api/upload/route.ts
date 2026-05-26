import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

// الحد الأقصى: 5 ميجا للصور، 50 ميجا للفيديو
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  // حماية من سبام الرفع: 10 ملفات كل 10 دقائق
  const rl = rateLimit(`upload:${session.user.id}`, RATE_LIMITS.upload);
  if (!rl.success) {
    return NextResponse.json({ error: "رفعت ملفات كتير، استنى شوية" }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "مفيش ملف" }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف مش مدعوم. استخدم JPG/PNG/WebP/GIF أو MP4/WebM" },
        { status: 400 }
      );
    }

    // Validate size based on type
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: isVideo ? "الفيديو لازم يكون أقل من 50 ميجا" : "الصورة لازم تكون أقل من 5 ميجا" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${randomBytes(16).toString("hex")}.${ext}`;

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, fileName), buffer);

    const url = `/uploads/${fileName}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في رفع الملف" }, { status: 500 });
  }
}
