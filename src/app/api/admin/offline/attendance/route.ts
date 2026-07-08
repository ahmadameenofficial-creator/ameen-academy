import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { z } from "zod";

// حفظ حضور حصة كاملة دفعة واحدة (upsert لكل طالب على نفس التاريخ)
const attendanceSchema = z.object({
  groupId: z.string().min(1),
  date: z.string().min(8), // "YYYY-MM-DD"
  records: z
    .array(
      z.object({
        studentId: z.string().min(1),
        status: z.enum(["PRESENT", "ABSENT", "EXCUSED"]),
      })
    )
    .min(1),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const result = attendanceSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    const { groupId, date, records } = result.data;
    const sessionDate = new Date(`${date}T00:00:00.000Z`);

    await prisma.$transaction(
      records.map((r) =>
        prisma.offlineAttendance.upsert({
          where: { studentId_date: { studentId: r.studentId, date: sessionDate } },
          create: { studentId: r.studentId, date: sessionDate, status: r.status },
          update: { status: r.status },
        })
      )
    );

    revalidatePath(`/admin/offline/${groupId}`);
    revalidatePath("/admin/offline");
    return NextResponse.json({ message: "تم حفظ الحضور" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// مسح حصة كاملة (كل سجلات الحضور لجروب في تاريخ معين)
export async function DELETE(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const { groupId, date } = await req.json();
    if (!groupId || !date) {
      return NextResponse.json({ error: "groupId و date مطلوبين" }, { status: 400 });
    }
    const sessionDate = new Date(`${date}T00:00:00.000Z`);

    await prisma.offlineAttendance.deleteMany({
      where: { date: sessionDate, student: { groupId } },
    });

    revalidatePath(`/admin/offline/${groupId}`);
    return NextResponse.json({ message: "تم مسح الحصة" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في الحذف" }, { status: 500 });
  }
}
