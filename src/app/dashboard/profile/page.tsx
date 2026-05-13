import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "حسابي",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      bio: true,
      image: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
          posts: { where: { isDeleted: false } },
        },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">حسابي</h1>
      <ProfileForm user={user} />
    </div>
  );
}
