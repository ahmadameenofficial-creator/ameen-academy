import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cairoToday } from "@/lib/offline-utils";

// تسجيل حضور/انصراف الطالب بنفسه بكود الحصة
// أول إدخال صحيح للكود = حضور بوقته، تاني إدخال = انصراف بوقته
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "سجل دخولك الأول" }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code || !/^\d{4}$/.test(String(code))) {
      return NextResponse.json({ error: "اكتب كود الحصة (4 أرقام)" }, { status: 400 });
    }

    const student = await prisma.offlineStudent.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        status: true,
        group: { select: { sessionCode: true, sessionCodeDate: true } },
      },
    });
    if (!student) {
      return NextResponse.json({ error: "حسابك مش مربوط بمجموعة" }, { status: 404 });
    }
    if (student.status !== "ACTIVE") {
      return NextResponse.json({ error: "اشتراكك مش نشط — كلم أحمد" }, { status: 403 });
    }

    const today = cairoToday();
    const codeValid =
      student.group.sessionCode === String(code) &&
      student.group.sessionCodeDate?.toISOString().slice(0, 10) === today;
    if (!codeValid) {
      return NextResponse.json(
        { error: "الكود غلط أو مش بتاع النهارده — اتأكد من الكود اللي على السبورة" },
        { status: 400 }
      );
    }

    const sessionDate = new Date(`${today}T00:00:00.000Z`);
    const existing = await prisma.offlineAttendance.findUnique({
      where: { studentId_date: { studentId: student.id, date: sessionDate } },
    });

    // انصراف
    if (existing?.checkInAt && !existing.checkOutAt) {
      await prisma.offlineAttendance.update({
        where: { id: existing.id },
        data: { checkOutAt: new Date() },
      });
      return NextResponse.json({ message: "انصرافك اتسجل — سلامتك 👋" });
    }
    if (existing?.checkInAt && existing.checkOutAt) {
      return NextResponse.json(
        { error: "انت مسجل حضور وانصراف النهارده بالفعل" },
        { status: 409 }
      );
    }

    // حضور (لو الأدمن كان معلّمه يدوي قبلها بنحدّث نفس السجل)
    await prisma.offlineAttendance.upsert({
      where: { studentId_date: { studentId: student.id, date: sessionDate } },
      create: {
        studentId: student.id,
        date: sessionDate,
        status: "PRESENT",
        self: true,
        checkInAt: new Date(),
      },
      update: { status: "PRESENT", self: true, checkInAt: new Date() },
    });

    return NextResponse.json({ message: "حضورك اتسجل ✅ حصة موفقة!" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة — جرب تاني" }, { status: 500 });
  }
}
