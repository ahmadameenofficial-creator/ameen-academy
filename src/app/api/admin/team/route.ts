import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";
import { auditLog } from "@/lib/audit";

// جلب كل الأدمنز والمدرسين
export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const team = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "INSTRUCTOR"] } },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      isBanned: true,
      createdAt: true,
      lastLoginAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ team });
}

// إضافة أدمن أو مدرس جديد
const addSchema = z.object({
  email: z.string().email("إيميل مش صحيح"),
  role: z.enum(["ADMIN", "INSTRUCTOR"]),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const result = addSchema.safeParse(body);
    if (!result.success) {
      return badRequest("البيانات مش صحيحة");
    }

    const { email, role } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // مينفعش يغيّر role نفسه
    if (normalizedEmail === session.user.email?.toLowerCase()) {
      return badRequest("مينفعش تغيّر صلاحياتك أنت");
    }

    // دوّر على اليوزر
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return badRequest("مفيش حساب بالإيميل ده. لازم الشخص يسجّل الأول.");
    }

    if (user.role === role) {
      return badRequest(`الشخص ده ${role === "ADMIN" ? "أدمن" : "مدرس"} أصلاً`);
    }

    // ترقية اليوزر
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    auditLog({
      userId: session.user.id,
      action: "team.promote",
      target: updated.id,
      details: `${updated.name || updated.email} → ${role}`,
    });

    return NextResponse.json({
      message: `تم ترقية ${updated.name || updated.email} لـ ${role === "ADMIN" ? "أدمن" : "مدرس"}`,
      user: updated,
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
