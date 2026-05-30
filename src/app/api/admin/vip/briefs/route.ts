import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await requireAdmin();
  try {
    const { title, description, clientStyle, deliverables, dueDate } = await req.json();
    if (!title?.trim() || !description?.trim() || !clientStyle?.trim() || !deliverables?.trim() || !dueDate) {
      return NextResponse.json({ error: "كل الحقول مطلوبة" }, { status: 400 });
    }
    const brief = await prisma.vipBrief.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        clientStyle: clientStyle.trim(),
        deliverables: deliverables.trim(),
        dueDate: new Date(dueDate),
      },
    });
    return NextResponse.json({ success: true, id: brief.id });
  } catch (err) {
    console.error("[VIP Brief] Error:", err);
    return NextResponse.json({ error: "حصلت مشكلة" }, { status: 500 });
  }
}
