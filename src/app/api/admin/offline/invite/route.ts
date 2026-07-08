import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";

// توليد/إعادة استخدام لينك دعوة الطالب لربط حسابه بالموقع
// الأدمن بيبعته واتساب — اللينك: /offline/claim?t=<token>
export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const { studentId } = await req.json();
    if (!studentId) return NextResponse.json({ error: "studentId مطلوب" }, { status: 400 });

    const student = await prisma.offlineStudent.findUnique({
      where: { id: studentId },
      select: { id: true, userId: true, inviteToken: true },
    });
    if (!student) return NextResponse.json({ error: "الطالب مش موجود" }, { status: 404 });
    if (student.userId) {
      return NextResponse.json({ error: "الطالب ده مربوط بحساب بالفعل" }, { status: 409 });
    }

    let token = student.inviteToken;
    if (!token) {
      token = randomBytes(16).toString("hex");
      await prisma.offlineStudent.update({
        where: { id: studentId },
        data: { inviteToken: token },
      });
    }

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
