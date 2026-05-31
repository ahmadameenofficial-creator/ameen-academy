import type { Metadata } from "next";
import Link from "next/link";
import { IconTargetArrow, IconCalendarEvent, IconMoodEmpty, IconFlame } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { BRIEF_TYPE_LABELS } from "@/lib/brief/constants";

export const metadata: Metadata = {
  title: "التحديات | منصة البريف",
  description: "تحديات تصميم بمواضيع محددة ومواعيد نهائية — نافس مصممين تانيين وابنِ بورتفوليو.",
  alternates: { canonical: "/brief/challenges" },
};

export const revalidate = 120;

export default async function ChallengesPage() {
  const now = new Date();
  const challenges = await prisma.briefChallenge.findMany({
    orderBy: [{ isActive: "desc" }, { endsAt: "desc" }],
    take: 60,
    select: {
      slug: true,
      title: true,
      theme: true,
      description: true,
      type: true,
      startsAt: true,
      endsAt: true,
      isActive: true,
      _count: { select: { briefs: true } },
    },
  });

  const active = challenges.filter((c) => c.isActive && c.endsAt >= now);
  const past = challenges.filter((c) => !c.isActive || c.endsAt < now);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
            <IconTargetArrow size={30} stroke={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">التحديات</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            تحديات بمواضيع محددة ومواعيد نهائية. اختار تحدي، حُلّه قبل ما الوقت يخلص، ونافس.
          </p>
        </div>

        {challenges.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
              <IconMoodEmpty size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground">
                لسه مفيش تحديات. في الوقت ده ولّد بريف عادي وابدأ اتدرّب.
              </p>
              <Link href="/brief/generate" className="text-sm font-medium text-brand-600 hover:underline">
                ولّد بريف
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-10">
            {active.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                  <IconFlame size={20} className="text-orange-500" />
                  تحديات شغّالة دلوقتي
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {active.map((c) => (
                    <ChallengeCard key={c.slug} c={c} live />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">تحديات سابقة</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {past.map((c) => (
                    <ChallengeCard key={c.slug} c={c} live={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

type ChallengeRow = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  type: import("@prisma/client").BriefType | null;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
  _count: { briefs: number };
};

function ChallengeCard({ c, live }: { c: ChallengeRow; live: boolean }) {
  return (
    <Link href={`/brief/challenges/${c.slug}`}>
      <Card className="h-full transition-colors hover:border-brand-300">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {live ? (
              <Badge variant="soft" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                شغّال
              </Badge>
            ) : (
              <Badge variant="outline">انتهى</Badge>
            )}
            {c.type && <Badge variant="outline">{BRIEF_TYPE_LABELS[c.type]}</Badge>}
          </div>
          <h3 className="font-bold text-foreground">{c.title}</h3>
          <p className="mt-1 text-sm text-brand-600">{c.theme}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
          <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <IconCalendarEvent size={14} />
              ينتهي {formatDate(c.endsAt)}
            </span>
            <span className="ms-auto">{c._count.briefs} بريف</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
