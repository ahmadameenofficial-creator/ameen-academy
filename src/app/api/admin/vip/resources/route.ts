import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await requireAdmin();
  try {
    const { title, description, category, fileUrl, thumbnailUrl } = await req.json();
    if (!title?.trim() || !category?.trim() || !fileUrl?.trim()) {
      return NextResponse.json({ error: "العنوان، التصنيف، والرابط مطلوبين" }, { status: 400 });
    }
    const resource = await prisma.vipResource.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        category: category.trim(),
        fileUrl: fileUrl.trim(),
        thumbnailUrl: thumbnailUrl?.trim() || null,
      },
    });
    return NextResponse.json({ success: true, id: resource.id });
  } catch (err) {
    console.error("[VIP Resource] Error:", err);
    return NextResponse.json({ error: "حصلت مشكلة" }, { status: 500 });
  }
}
