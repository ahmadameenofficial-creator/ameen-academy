import { NextResponse } from "next/server";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auditLog } from "@/lib/audit";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const actionSchema = z.object({
  action: z.enum(["ban", "unban"]),
  reason: z.string().max(500).optional(),
});

export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const student = await prisma.user.findUnique({ where: { id } });
    if (!student) {
      return NextResponse.json({ error: "الطالب مش موجود" }, { status: 404 });
    }

    // ممنوع حظر أدمن تاني
    if (student.role === "ADMIN") {
      return badRequest("مش ممكن تحظر أدمن");
    }

    const body = await req.json();
    const result = actionSchema.safeParse(body);
    if (!result.success) {
      return badRequest(result.error.errors[0].message);
    }

    const { action, reason } = result.data;

    if (action === "ban") {
      await prisma.user.update({
        where: { id },
        data: { isBanned: true, bannedReason: reason || null },
      });
      auditLog({
        userId: session.user.id,
        action: "student.ban",
        target: id,
        details: `${student.name || student.email}${reason ? ` — السبب: ${reason}` : ""}`,
      });
      return NextResponse.json({ message: "تم الحظر" });
    }

    // فك الحظر
    await prisma.user.update({
      where: { id },
      data: { isBanned: false, bannedReason: null },
    });
    auditLog({
      userId: session.user.id,
      action: "student.unban",
      target: id,
      details: student.name || student.email,
    });
    return NextResponse.json({ message: "تم فك الحظر" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const student = await prisma.user.findUnique({ where: { id } });
    if (!student) {
      return NextResponse.json({ error: "الطالب مش موجود" }, { status: 404 });
    }

    if (student.role === "ADMIN") {
      return badRequest("مش ممكن تحذف حساب أدمن");
    }

    await prisma.user.delete({ where: { id } });

    auditLog({
      userId: session.user.id,
      action: "student.delete",
      target: id,
      details: `حذف نهائي: ${student.name || student.email}`,
    });

    return NextResponse.json({ message: "تم حذف الحساب نهائيا" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في الحذف" }, { status: 500 });
  }
}
