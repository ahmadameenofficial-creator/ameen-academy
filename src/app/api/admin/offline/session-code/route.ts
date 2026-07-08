import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { cairoToday } from "@/lib/offline-utils";

// كود الحصة — 4 أرقام، صالح ليوم واحد بس (بتوقيت مصر)
// نفس اليوم بيرجّع نفس الكود عشان لو الأدمن قفل الدايالوج وفتحه تاني
export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const { groupId, regenerate } = await req.json();
    if (!groupId) return NextResponse.json({ error: "groupId مطلوب" }, { status: 400 });

    const group = await prisma.offlineGroup.findUnique({
      where: { id: groupId },
      select: { sessionCode: true, sessionCodeDate: true },
    });
    if (!group) return NextResponse.json({ error: "الجروب مش موجود" }, { status: 404 });

    const today = cairoToday();
    const isToday =
      group.sessionCodeDate &&
      group.sessionCodeDate.toISOString().slice(0, 10) === today;

    if (group.sessionCode && isToday && !regenerate) {
      return NextResponse.json({ code: group.sessionCode, date: today });
    }

    const code = String(Math.floor(1000 + Math.random() * 9000));
    await prisma.offlineGroup.update({
      where: { id: groupId },
      data: { sessionCode: code, sessionCodeDate: new Date(`${today}T00:00:00.000Z`) },
    });

    return NextResponse.json({ code, date: today });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
