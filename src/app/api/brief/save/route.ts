import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { badRequest, unauthorized } from "@/lib/admin-api";
import { createLead, findExistingLead } from "@/lib/db/leads.db";

const deliverableSchema = z.object({
  name: z.string(),
  format: z.string(),
  size: z.string(),
});

const copySchema = z.object({
  headline: z.string().max(300),
  subline: z.string().max(600),
  cta: z.string().max(120),
  hashtag: z.string().max(120),
});

const detailsSchema = z.object({
  goal: z.string().max(600),
  keyMessage: z.string().max(600),
  copy: copySchema.optional(),
  mustInclude: z.array(z.string().max(300)).max(20),
  moodKeywords: z.array(z.string().max(60)).max(12),
  dos: z.array(z.string().max(300)).max(20),
  donts: z.array(z.string().max(300)).max(20),
});

const schema = z.object({
  type: z.enum(["LOGO", "SOCIAL_POST", "BRAND_IDENTITY"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "PRO"]),
  source: z.enum(["TEMPLATE", "AI"]),
  clientName: z.string().min(1).max(120),
  clientBusiness: z.string().min(1).max(160),
  businessCategory: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  scenario: z.string().min(1).max(4000),
  audience: z.string().min(1).max(600),
  brandTone: z.string().min(1).max(120),
  constraints: z.object({
    budget: z.string().max(160),
    deadline: z.string().max(160),
    forbiddenColor: z.string().max(60).optional(),
    notes: z.string().max(600),
  }),
  deliverables: z.array(deliverableSchema).min(1).max(12),
  details: detailsSchema.optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return unauthorized();

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

  const base = slugify(data.title).slice(0, 60) || "brief";
  const slug = `${base}-${randomBytes(4).toString("hex")}`;

  const brief = await prisma.brief.create({
    data: {
      slug,
      type: data.type,
      level: data.level,
      source: data.source,
      clientName: data.clientName,
      clientBusiness: data.clientBusiness,
      businessCategory: data.businessCategory,
      title: data.title,
      scenario: data.scenario,
      audience: data.audience,
      brandTone: data.brandTone,
      constraints: data.constraints,
      deliverables: data.deliverables,
      details: data.details ?? undefined,
      createdById: session.user.id,
    },
    select: { slug: true },
  });

  // ربط الأكاديمية: نسجّل المصمم كـ lead بمصدر "brief" أول مرة فقط.
  // لا يوقف الحفظ إطلاقاً لو فشل أو لو الـ lead موجود قبل كده.
  const email = session.user.email ?? undefined;
  const name = session.user.name ?? "مصمم بريف";
  if (email) {
    findExistingLead(email)
      .then((existing) => {
        if (!existing) return createLead({ name, email, source: "brief" });
      })
      .catch(() => {});
  }

  return NextResponse.json({ slug: brief.slug }, { status: 201 });
}
