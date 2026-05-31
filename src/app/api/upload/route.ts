import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { randomBytes } from "crypto";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

// الحد الأقصى: 4 ميجا للصور (تحت حد Vercel للـ request body = 4.5 ميجا).
// الفيديو بيترفع عبر Bunny Stream في مكان تاني، مش من هنا.
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_TYPES = ALLOWED_IMAGE_TYPES;

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

    // التحقق من النوع
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف مش مدعوم. استخدم JPG/PNG/WebP/GIF" },
        { status: 400 }
      );
    }

    // التحقق من الحجم
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "الصورة لازم تكون أقل من 4 ميجا" },
        { status: 400 }
      );
    }

    // اسم فريد عشوائي (منمنعش تخمين أو دهس ملفات) + امتداد آمن
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
    const fileName = `uploads/${randomBytes(16).toString("hex")}.${ext}`;

    // الرفع على Vercel Blob — تخزين دائم على الـ CDN (مش على قرص السيرفر المؤقت)
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في رفع الملف" }, { status: 500 });
  }
}
