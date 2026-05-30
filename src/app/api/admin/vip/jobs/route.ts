import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await requireAdmin();
  try {
    const { title, description, budget, type, clientInfo, contactInfo, expiresAt } = await req.json();
    if (!title?.trim() || !description?.trim() || !budget?.trim() || !type?.trim() || !contactInfo?.trim() || !expiresAt) {
      return NextResponse.json({ error: "كل الحقول الأساسية مطلوبة" }, { status: 400 });
    }
    const job = await prisma.vipJob.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        budget: budget.trim(),
        type: type.trim(),
        clientInfo: clientInfo?.trim() || null,
        contactInfo: contactInfo.trim(),
        expiresAt: new Date(expiresAt),
      },
    });
    return NextResponse.json({ success: true, id: job.id });
  } catch (err) {
    console.error("[VIP Job] Error:", err);
    return NextResponse.json({ error: "حصلت مشكلة" }, { status: 500 });
  }
}
