import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  await requireAdmin();
  try {
    const body = await req.json();
    const { title, description, scheduledAt, durationMins, meetingUrl, hotSeatUserId } = body;

    if (!title?.trim() || !scheduledAt) {
      return NextResponse.json({ error: "العنوان والتاريخ مطلوبين" }, { status: 400 });
    }

    const live = await prisma.vipLive.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        scheduledAt: new Date(scheduledAt),
        durationMins: durationMins || 90,
        meetingUrl: meetingUrl?.trim() || null,
        hotSeatUserId: hotSeatUserId || null,
        status: "SCHEDULED",
      },
    });

    return NextResponse.json({ success: true, id: live.id });
  } catch (err) {
    console.error("[VIP Live Create] Error:", err);
    return NextResponse.json({ error: "حصلت مشكلة" }, { status: 500 });
  }
}
