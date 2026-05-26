import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";
import { auditLog } from "@/lib/audit";

const updateSchema = z.object({
  role: z.enum(["ADMIN", "INSTRUCTOR", "STUDENT"]),
});

// تغيير صلاحية عضو
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await params;

  try {
    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return badRequest("البيانات مش صحيحة");
    }

    const { role } = result.data;

    // مينفعش يغيّر role نفسه
    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!target) {
      return badRequest("مفيش يوزر بالـ ID ده");
    }

    if (target.email === session.user.email) {
      return badRequest("مينفعش تغيّر صلاحياتك أنت");
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    const roleLabel = role === "ADMIN" ? "أدمن" : role === "INSTRUCTOR" ? "مدرس" : "طالب";

    auditLog({
      userId: session.user.id,
      action: "team.role_change",
      target: updated.id,
      details: `${updated.name || updated.email} → ${roleLabel}`,
    });

    return NextResponse.json({
      message: `تم تغيير صلاحية ${updated.name || updated.email} لـ ${roleLabel}`,
      user: updated,
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

// إزالة من الفريق (رجوع طالب)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await params;

  try {
    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!target) {
      return badRequest("مفيش يوزر بالـ ID ده");
    }

    if (target.email === session.user.email) {
      return badRequest("مينفعش تشيل نفسك من الأدمنز");
    }

    if (target.role === "STUDENT") {
      return badRequest("الشخص ده طالب أصلاً");
    }

    await prisma.user.update({
      where: { id },
      data: { role: "STUDENT" },
    });

    auditLog({
      userId: session.user.id,
      action: "team.remove",
      target: id,
      details: `${target.name || target.email} (كان ${target.role})`,
    });

    return NextResponse.json({
      message: `تم إزالة ${target.name || target.email} من الفريق`,
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
