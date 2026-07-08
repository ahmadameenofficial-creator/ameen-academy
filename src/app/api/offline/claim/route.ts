import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// ربط حساب الموقع بسجل الطالب الأوفلاين عن طريق لينك الدعوة
// لازم يكون مسجل دخول — الصفحة /offline/claim بتتصرف في ده
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "سجل دخولك الأول" }, { status: 401 });
    }

    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "اللينك مش صحيح" }, { status: 400 });
    }

    const student = await prisma.offlineStudent.findUnique({
      where: { inviteToken: token },
      select: { id: true, userId: true },
    });
    if (!student) {
      return NextResponse.json(
        { error: "اللينك ده مش صحيح أو اتستخدم قبل كده — اطلب لينك جديد من أحمد" },
        { status: 404 }
      );
    }
    if (student.userId) {
      return NextResponse.json({ error: "السجل ده مربوط بحساب تاني بالفعل" }, { status: 409 });
    }

    // الحساب الواحد بيرتبط بسجل واحد بس
    const alreadyLinked = await prisma.offlineStudent.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (alreadyLinked) {
      return NextResponse.json({ error: "حسابك مربوط بسجل تاني بالفعل" }, { status: 409 });
    }

    await prisma.offlineStudent.update({
      where: { id: student.id },
      data: { userId: session.user.id, inviteToken: null },
    });

    return NextResponse.json({ message: "تم الربط 🎉" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة — جرب تاني" }, { status: 500 });
  }
}
