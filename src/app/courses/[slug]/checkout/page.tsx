import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "./checkout-form";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug, isPublished: true },
    select: { id: true, title: true, price: true, comparePrice: true },
  });

  if (!course) redirect("/courses");

  return <CheckoutForm course={course} />;
}
