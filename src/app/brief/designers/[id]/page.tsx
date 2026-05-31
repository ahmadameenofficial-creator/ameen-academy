import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IconFlame,
  IconHeart,
  IconTrophy,
  IconChecklist,
  IconStar,
} from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, formatDate } from "@/lib/utils";
import { xpForLevel } from "@/lib/brief/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { name: true },
  });
  if (!user) return { title: "مصمم غير موجود | منصة البريف" };
  return {
    title: `${user.name ?? "مصمم"} | بورتفوليو البريف`,
    description: `شوف حلول وتصاميم ${user.name ?? "المصمم"} على منصة البريف.`,
    alternates: { canonical: `/brief/designers/${id}` },
  };
}

export default async function DesignerProfilePage({ params }: Props) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
      designerStats: true,
      designerBadges: {
        orderBy: { earnedAt: "desc" },
        select: {
          earnedAt: true,
          badge: { select: { key: true, name: true, description: true, icon: true } },
        },
      },
      briefSubmissions: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 60,
        select: {
          id: true,
          imageUrl: true,
          votesCount: true,
          createdAt: true,
          brief: { select: { slug: true, title: true } },
        },
      },
    },
  });

  if (!user) notFound();

  const stats = user.designerStats;
  const xp = stats?.xp ?? 0;
  const level = stats?.level ?? 1;
  const nextLevelXp = xpForLevel(level + 1);
  const curLevelXp = xpForLevel(level);
  const progress =
    nextLevelXp > curLevelXp
      ? Math.min(100, Math.round(((xp - curLevelXp) / (nextLevelXp - curLevelXp)) * 100))
      : 100;
  const totalVotes = user.briefSubmissions.reduce((s, sub) => s + sub.votesCount, 0);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* رأس البروفايل */}
        <Card>
          <CardContent className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:p-8">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "مصمم"}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="96px"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  {getInitials(user.name ?? "؟")}
                </span>
              )}
            </div>

            <div className="flex-1 text-center sm:text-start">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="text-2xl font-bold text-foreground">{user.name ?? "مصمم مجهول"}</h1>
                <Badge variant="soft">لفل {level}</Badge>
              </div>

              {/* شريط تقدّم المستوى */}
              <div className="mt-4 max-w-md">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{xp} XP</span>
                  <span>لفل {level + 1} عند {nextLevelXp} XP</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-brand-700 to-brand-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* إحصائيات */}
              <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Stat icon={IconChecklist} value={stats?.briefsSolved ?? 0} label="بريف اتحل" />
                <Stat icon={IconHeart} value={totalVotes} label="إعجاب" />
                <Stat icon={IconFlame} value={stats?.currentStreak ?? 0} label="سلسلة حالية" />
                <Stat icon={IconTrophy} value={stats?.longestStreak ?? 0} label="أطول سلسلة" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الشارات */}
        {user.designerBadges.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
              <IconStar size={20} className="text-brand-500" />
              الشارات ({user.designerBadges.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {user.designerBadges.map((db) => (
                <Card key={db.badge.key}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
                      <IconTrophy size={22} stroke={1.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-foreground">{db.badge.name}</div>
                      <div className="text-xs text-muted-foreground">{db.badge.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* البورتفوليو */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            الأعمال ({user.briefSubmissions.length})
          </h2>
          {user.briefSubmissions.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border py-10 text-center text-muted-foreground">
              لسه مفيش أعمال مرفوعة.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {user.briefSubmissions.map((sub) => (
                <Link key={sub.id} href={`/brief/${sub.brief.slug}`} className="group">
                  <Card className="overflow-hidden transition-colors hover:border-brand-300">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={sub.imageUrl}
                        alt={sub.brief.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        unoptimized
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="line-clamp-1 text-xs font-medium text-foreground">
                        {sub.brief.title}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconHeart size={12} />
                          {sub.votesCount}
                        </span>
                        <span>{formatDate(sub.createdAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof IconFlame;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2">
      <Icon size={18} className="text-brand-500" />
      <div>
        <div className="text-sm font-bold leading-none text-foreground">{value}</div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
