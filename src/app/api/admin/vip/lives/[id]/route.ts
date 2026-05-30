import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: Request, context: Ctx) {
  await requireAdmin();
  const { id } = await context.params;
  try {
    await prisma.vipLive.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حصلت مشكلة" }, { status: 500 });
  }
}
