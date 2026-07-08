import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { z } from "zod";

// المبالغ بالقرش — التحويل من الجنيه بيحصل في الـ client
const studentSchema = z.object({
  groupId: z.string().min(1),
  fullName: z.string().min(3).max(120),
  email: z.string().email().max(120).nullable().optional().or(z.literal("")),
  whatsapp: z.string().min(8).max(20),
  guardianPhone: z.string().max(20).nullable().optional(),
  age: z.number().min(5).max(90).nullable().optional(),
  address: z.string().max(200).nullable().optional(),
  agreedPrice: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  nextDueDate: z.string().nullable().optional(), // ISO date
  nextDueAmount: z.number().min(0).nullable().optional(),
  status: z.enum(["PENDING", "ACTIVE", "DROPPED", "COMPLETED"]).optional(),
  notes: z.string().nullable().optional(),
});

function normalize(data: z.infer<typeof studentSchema>) {
  return {
    ...data,
    email: data.email?.trim().toLowerCase() || null,
    whatsapp: data.whatsapp.replace(/\D/g, ""),
    guardianPhone: data.guardianPhone?.replace(/\D/g, "") || null,
    nextDueDate: data.nextDueDate ? new Date(data.nextDueDate) : null,
    // المجاني مفيش عليه فلوس ولا مواعيد دفع
    ...(data.isFree ? { agreedPrice: 0, nextDueDate: null, nextDueAmount: null } : {}),
  };
}

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const result = studentSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const student = await prisma.offlineStudent.create({ data: normalize(result.data) });
    revalidatePath("/admin/offline");
    revalidatePath(`/admin/offline/${student.groupId}`);
    return NextResponse.json(student, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

    const result = studentSchema.partial().safeParse(rest);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const data: Record<string, unknown> = { ...result.data };
    if ("email" in data) {
      data.email =
        typeof data.email === "string" ? data.email.trim().toLowerCase() || null : null;
    }
    if ("whatsapp" in data && typeof data.whatsapp === "string") {
      data.whatsapp = data.whatsapp.replace(/\D/g, "");
    }
    if ("guardianPhone" in data) {
      data.guardianPhone =
        typeof data.guardianPhone === "string"
          ? data.guardianPhone.replace(/\D/g, "") || null
          : null;
    }
    if ("nextDueDate" in data) {
      data.nextDueDate = data.nextDueDate ? new Date(data.nextDueDate as string) : null;
    }

    const student = await prisma.offlineStudent.update({ where: { id }, data });
    revalidatePath("/admin/offline");
    revalidatePath(`/admin/offline/${student.groupId}`);
    return NextResponse.json(student);
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

    const student = await prisma.offlineStudent.delete({ where: { id } });
    revalidatePath("/admin/offline");
    revalidatePath(`/admin/offline/${student.groupId}`);
    return NextResponse.json({ message: "تم الحذف" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة في الحذف" }, { status: 500 });
  }
}
