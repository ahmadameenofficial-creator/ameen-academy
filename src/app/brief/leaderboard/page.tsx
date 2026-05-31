import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IconTrophy, IconFlame, IconStar, IconMoodEmpty, IconCrown } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "المتصدرين | منصة البريف",
  description: "أفضل المصممين على منصة البريف — رتّب نفسك، اكسب نقاط، وحافظ على سلسلتك.",
  alternates: { canonical: "/brief/leaderboard" },
};

export const revalidate = 120;

export default async function LeaderboardPage() {
  const top = await prisma.designerStats.findMany({
    where: { xp: { gt: 0 } },
    orderBy: [{ xp: "desc" }, { briefsSolved: "desc" }],
    take: 50,
    select: {
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
      briefsSolved: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          _count: { select: { designerBadges: true } },
        },
      },
    },
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
            <IconTrophy size={30} stroke={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">المتصدرين</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            أفضل المصممين اللي بيحلّوا أكتر بريفات ويحافظوا على سلسلتهم. حُلّ أكتر، اطلع أعلى.
          </p>
        </div>

        {top.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
              <IconMoodEmpty size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground">
                لسه مفيش حد على المتصدرين. كن أول واحد يحل بريف ويتصدّر.
              </p>
              <Link
                href="/brief/explore"
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                تصفّح البريفات
              </Link>
            </CardContent>
          </Card>
        ) : (
          <ol className="space-y-2">
            {top.map((row, i) => {
              const rank = i + 1;
              return (
                <li key={row.user.id}>
                  <Link href={`/brief/designers/${row.user.id}`}>
                    <Card
                      className={cn(
                        "transition-colors hover:border-brand-300",
                        rank <= 3 && "border-brand-200 bg-brand-50/40 dark:bg-brand-900/10"
                      )}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <RankBadge rank={rank} />
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                          {row.user.image ? (
                            <Image
                              src={row.user.image}
                              alt={row.user.name ?? "مصمم"}
                              fill
                              className="object-cover"
                              unoptimized
                              sizes="44px"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center">
                              {getInitials(row.user.name ?? "؟")}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-bold text-foreground">
                              {row.user.name ?? "مصمم مجهول"}
                            </span>
                            <Badge variant="soft" className="shrink-0">
                              لفل {row.level}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>{row.briefsSolved} بريف</span>
                            {row.currentStreak > 0 && (
                              <span className="flex items-center gap-1 text-orange-500">
                                <IconFlame size={13} />
                                {row.currentStreak} يوم
                              </span>
                            )}
                            {row.user._count.designerBadges > 0 && (
                              <span className="flex items-center gap-1">
                                <IconStar size={13} />
                                {row.user._count.designerBadges} شارة
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0 text-end">
                          <div className="text-lg font-bold text-brand-600">{row.xp}</div>
                          <div className="text-[11px] text-muted-foreground">XP</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </main>
      <Footer />
    </>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    const colors = {
      1: "bg-yellow-400 text-yellow-950",
      2: "bg-slate-300 text-slate-800",
      3: "bg-amber-600 text-amber-50",
    } as const;
    return (
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          colors[rank as 1 | 2 | 3]
        )}
      >
        <IconCrown size={18} stroke={2} />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
      {rank}
    </div>
  );
}
