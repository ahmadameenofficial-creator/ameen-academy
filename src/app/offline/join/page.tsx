import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { JoinForm } from "@/components/offline/join-form";
import { IconMapPin, IconUsers, IconCertificate } from "@tabler/icons-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "سجّل في مجموعات أمين أكاديمي الحضورية",
  description:
    "احجز مكانك في المجموعات الأوفلاين — تعلم تصميم وسط ناس زيك، بمتابعة وتقييم أسبوعي.",
  alternates: { canonical: "/offline/join" },
};

export default async function OfflineJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: preselectedGroup } = await searchParams;

  const groups = await prisma.offlineGroup.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, dayOfWeek: true },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30">
        {/* الهيدر */}
        <section className="bg-gradient-to-b from-brand-50 dark:from-brand-900/20 to-transparent">
          <div className="max-w-xl mx-auto px-4 pt-10 pb-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-3 py-1 text-xs font-medium">
              <IconMapPin className="h-3.5 w-3.5" />
              مجموعات حضورية
            </span>
            <h1 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
              سجّل مكانك في المجموعة
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              املا الفورم في دقيقة — وهنكلمك واتساب نأكد معاك المكان والمواعيد
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <IconUsers className="h-4 w-4 text-brand-500" />
                مجموعات صغيرة
              </span>
              <span className="flex items-center gap-1">
                <IconCertificate className="h-4 w-4 text-brand-500" />
                متابعة وتقييم أسبوعي
              </span>
            </div>
          </div>
        </section>

        {/* الفورم */}
        <section className="max-w-xl mx-auto px-4 pb-16">
          <JoinForm groups={groups} preselectedGroup={preselectedGroup} />
        </section>
      </main>
      <Footer />
    </>
  );
}
