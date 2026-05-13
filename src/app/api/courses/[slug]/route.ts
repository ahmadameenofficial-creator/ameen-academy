import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params;

  const course = await prisma.course.findUnique({
    where: { slug, isPublished: true },
    select: { id: true, title: true, price: true, comparePrice: true },
  });

  if (!course) {
    return NextResponse.json({ error: "مش موجود" }, { status: 404 });
  }

  return NextResponse.json(course);
}
