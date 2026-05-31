import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IconBriefcase, IconHeart, IconEye, IconPlus } from "@tabler/icons-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRIEF_TYPE_LABELS, BRIEF_LEVEL_LABELS } from "@/lib/brief/constants";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "بريفاتي",
  description: "البريفات اللي حفظتها وبتشتغل عليها",
};

export default async function MyBriefsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/brief/my");

  const briefs = await prisma.brief.findMany({
    where: { createdById: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      type: true,
      level: true,
      viewsCount: true,
      createdAt: true,
      _count: { select: { submissions: true } },
    },
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <IconBriefcase className="text-brand-500" size={26} />
              بريفاتي
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              البريفات اللي حفظتها — ارجعلها في أي وقت وارفع شغلك عليها.
            </p>
          </div>
          <Button asChild variant="gradient">
            <Link href="/brief/generate">
              <IconPlus size={18} />
              ولّد بريف جديد
            </Link>
          </Button>
        </div>

        {briefs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-10 text-center">
              <p className="mb-4 text-muted-foreground">
                لسه محفظتش أي بريف. ولّد بريف واحفظه عشان يبان هنا.
              </p>
              <Button asChild variant="gradient">
                <Link href="/brief/generate">ولّد أول بريف</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {briefs.map((b) => (
              <Link key={b.slug} href={`/brief/${b.slug}`}>
                <Card className="transition-colors hover:border-brand-300">
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-foreground">{b.title}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="soft">{BRIEF_TYPE_LABELS[b.type]}</Badge>
                        <Badge variant="outline">{BRIEF_LEVEL_LABELS[b.level]}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(b.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <IconHeart size={16} />
                        {b._count.submissions} حل
                      </span>
                      <span className="flex items-center gap-1">
                        <IconEye size={16} />
                        {b.viewsCount}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
