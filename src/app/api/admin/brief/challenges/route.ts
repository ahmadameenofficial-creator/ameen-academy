import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { requireAdminApi, unauthorized, badRequest } from "@/lib/admin-api";

const schema = z
  .object({
    title: z.string().min(1).max(160),
    theme: z.string().min(1).max(160),
    description: z.string().min(1).max(4000),
    type: z.enum(["LOGO", "SOCIAL_POST", "BRAND_IDENTITY"]).optional(),
    startsAt: z.string().datetime(),
    endsAt: z.string().datetime(),
    isActive: z.boolean().optional(),
  })
  .refine((d) => new Date(d.endsAt) > new Date(d.startsAt), {
    message: "تاريخ النهاية لازم يكون بعد البداية",
  });

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("طلب غير صالح");
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return badRequest(result.error.errors[0]?.message ?? "بيانات غير صالحة");
  }
  const data = result.data;

  const base = slugify(data.title).slice(0, 60) || "challenge";
  const slug = `${base}-${randomBytes(3).toString("hex")}`;

  const challenge = await prisma.briefChallenge.create({
    data: {
      slug,
      title: data.title,
      theme: data.theme,
      description: data.description,
      type: data.type,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
      isActive: data.isActive ?? true,
    },
    select: { slug: true },
  });

  revalidatePath("/brief/challenges");
  revalidatePath("/admin/brief");

  return NextResponse.json({ slug: challenge.slug }, { status: 201 });
}
