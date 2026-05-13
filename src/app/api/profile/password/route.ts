import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8, "الباسورد الجديد لازم 8 حروف على الأقل")
    .regex(/[A-Z]/, "لازم حرف كبير واحد على الأقل")
    .regex(/[0-9]/, "لازم رقم واحد على الأقل"),
});

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = passwordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json({ error: "مش ممكن تغيّر الباسورد" }, { status: 400 });
    }

    // التأكد من الباسورد الحالي
    const isValid = await bcrypt.compare(result.data.currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "الباسورد الحالي غلط" }, { status: 400 });
    }

    // تحديث الباسورد
    const hashedPassword = await bcrypt.hash(result.data.newPassword, 12);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "الباسورد اتغيّر" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
