import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconCalendarEvent, IconTargetArrow, IconHeart, IconEye } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { BRIEF_TYPE_LABELS, BRIEF_LEVEL_LABELS } from "@/lib/brief/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const c = await prisma.briefChallenge.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });
  if (!c) return { title: "تحدي غير موجود | منصة البريف" };
  return {
    title: `${c.title} | تحدي البريف`,
    description: c.description.slice(0, 160),
    alternates: { canonical: `/brief/challenges/${slug}` },
  };
}

export default async function ChallengeDetailPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);

  const challenge = await prisma.briefChallenge.findUnique({
    where: { slug },
    select: {
      title: true,
      theme: true,
      description: true,
      type: true,
      startsAt: true,
      endsAt: true,
      isActive: true,
      briefs: {
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        select: {
          slug: true,
          title: true,
          type: true,
          level: true,
          clientBusiness: true,
          viewsCount: true,
          _count: { select: { submissions: true } },
        },
      },
    },
  });

  if (!challenge) notFound();

  const now = new Date();
  const live = challenge.isActive && challenge.endsAt >= now;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* رأس التحدي */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-l from-brand-700 to-brand-500 p-6 text-white sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {live ? (
                <Badge variant="soft" className="bg-white/20 text-white">شغّال دلوقتي</Badge>
              ) : (
                <Badge variant="soft" className="bg-white/20 text-white">انتهى</Badge>
              )}
              {challenge.type && (
                <Badge variant="soft" className="bg-white/20 text-white">
                  {BRIEF_TYPE_LABELS[challenge.type]}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{challenge.title}</h1>
            <p className="mt-1 text-white/90">{challenge.theme}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <IconCalendarEvent size={16} />
                من {formatDate(challenge.startsAt)} لـ {formatDate(challenge.endsAt)}
              </span>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="whitespace-pre-line leading-relaxed text-foreground">{challenge.description}</p>
            {live && (
              <Button asChild variant="gradient" className="mt-5">
                <Link href="/brief/generate">
                  <IconTargetArrow size={18} />
                  ولّد بريف وشارك
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* بريفات التحدي */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            بريفات التحدي ({challenge.briefs.length})
          </h2>
          {challenge.briefs.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border py-10 text-center text-muted-foreground">
              لسه مفيش بريفات في التحدي ده.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {challenge.briefs.map((b) => (
                <Link key={b.slug} href={`/brief/${b.slug}`}>
                  <Card className="h-full transition-colors hover:border-brand-300">
                    <CardContent className="flex h-full flex-col p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge variant="soft">{BRIEF_TYPE_LABELS[b.type]}</Badge>
                        <Badge variant="outline">{BRIEF_LEVEL_LABELS[b.level]}</Badge>
                      </div>
                      <h3 className="line-clamp-2 font-bold text-foreground">{b.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{b.clientBusiness}</p>
                      <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconHeart size={14} />
                          {b._count.submissions} حل
                        </span>
                        <span className="flex items-center gap-1">
                          <IconEye size={14} />
                          {b.viewsCount}
                        </span>
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
