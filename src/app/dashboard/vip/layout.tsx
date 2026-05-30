import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function VipLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/vip");

  // التحقق من العضوية الفعّالة
  const membership = await prisma.vipMembership.findUnique({
    where: { userId: session.user.id },
  });

  if (!membership || membership.status !== "ACTIVE") {
    redirect("/vip");
  }

  return <>{children}</>;
}
