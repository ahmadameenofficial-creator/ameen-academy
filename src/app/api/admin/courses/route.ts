import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(3, "العنوان قصير"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug لازم يكون حروف إنجليزي صغيرة وأرقام و -"),
  description: z.string().min(10, "الوصف قصير"),
  shortDescription: z.string().optional(),
  category: z.string().min(1, "التصنيف مطلوب"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  price: z.number().min(0),
  comparePrice: z.number().optional().nullable(),
  isPublished: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const result = createCourseSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.errors[0].message);

    const existing = await prisma.course.findUnique({ where: { slug: result.data.slug } });
    if (existing) return badRequest("الـ slug ده موجود قبل كده");

    const course = await prisma.course.create({
      data: {
        ...result.data,
        instructorId: session.user.id,
        publishedAt: result.data.isPublished ? new Date() : null,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");

    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
