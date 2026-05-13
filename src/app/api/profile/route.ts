import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(2, "الاسم لازم حرفين على الأقل").max(100),
  phone: z.string().max(20).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { name, phone, bio, image } = result.data;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone: phone || null,
        bio: bio || null,
        image: image || null,
      },
    });

    return NextResponse.json({ message: "البيانات اتحدثت" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
