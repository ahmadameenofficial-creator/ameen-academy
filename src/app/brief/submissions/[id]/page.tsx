import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IconArrowRight,
  IconSparkles,
  IconCircleCheck,
  IconBulb,
  IconUserStar,
} from "@tabler/icons-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, formatDate } from "@/lib/utils";
import { BRIEF_TYPE_LABELS } from "@/lib/brief/constants";
import { SubmissionActions } from "@/components/brief/submission-actions";

interface Props {
  params: Promise<{ id: string }>;
}

type AiFeedback = { strengths?: string[]; improvements?: string[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sub = await prisma.briefSubmission.findUnique({
    where: { id },
    select: { user: { select: { name: true } }, brief: { select: { title: true } } },
  });
  if (!sub) return { title: "حل غير موجود | منصة البريف" };
  const title = `حل ${sub.user.name ?? "مصمم"} لبريف ${sub.brief.title}`;
  return {
    title: `${title} | منصة البريف`,
    description: `شوف حل التصميم ده على منصة البريف من أكاديمية أمين.`,
    alternates: { canonical: `/brief/submissions/${id}` },
    openGraph: { type: "article", title, url: `/brief/submissions/${id}`, siteName: "أكاديمية أمين" },
  };
}

export default async function SubmissionDetailPage({ params }: Props) {
  const { id } = await params;

  const sub = await prisma.briefSubmission.findUnique({
    where: { id },
    select: {
      id: true,
      imageUrl: true,
      note: true,
      votesCount: true,
      aiScore: true,
      aiFeedback: true,
      expertFeedback: true,
      status: true,
      createdAt: true,
      user: { select: { id: true, name: true, image: true } },
      brief: { select: { slug: true, title: true, type: true, clientBusiness: true } },
    },
  });

  if (!sub || sub.status !== "PUBLISHED") notFound();

  const session = await auth();
  let hasVoted = false;
  if (session?.user?.id) {
    const vote = await prisma.briefVote.findUnique({
      where: { submissionId_userId: { submissionId: sub.id, userId: session.user.id } },
      select: { id: true },
    });
    hasVoted = Boolean(vote);
  }

  const ai = (sub.aiFeedback as AiFeedback | null) ?? null;
  const designerName = sub.user.name ?? "مصمم";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {/* رجوع للبريف */}
        <Link
          href={`/brief/${sub.brief.slug}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand-600"
        >
          <IconArrowRight size={16} />
          رجوع لبريف: {sub.brief.title}
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* صورة الحل */}
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              <Image
                src={sub.imageUrl}
                alt={`حل بواسطة ${designerName}`}
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </Card>

          {/* التفاصيل */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="soft">{BRIEF_TYPE_LABELS[sub.brief.type]}</Badge>
              {sub.aiScore !== null && (
                <Badge variant="outline" className="gap-1">
                  <IconSparkles size={13} />
                  {sub.aiScore}/100
                </Badge>
              )}
            </div>

            {/* المصمم */}
            <Link
              href={`/brief/designers/${sub.user.id}`}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {sub.user.image ? (
                  <Image
                    src={sub.user.image}
                    alt={designerName}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="48px"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    {getInitials(designerName)}
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-foreground">{designerName}</div>
                <div className="text-xs text-muted-foreground">{formatDate(sub.createdAt)}</div>
              </div>
            </Link>

            {sub.note && <p className="text-sm leading-relaxed text-muted-foreground">{sub.note}</p>}

            <SubmissionActions
              submissionId={sub.id}
              initialVotes={sub.votesCount}
              initialHasVoted={hasVoted}
              shareTitle={`حل ${designerName} لبريف ${sub.brief.title}`}
            />
          </div>
        </div>

        {/* فيدباك AI */}
        {ai && (ai.strengths?.length || ai.improvements?.length) ? (
          <Card className="mt-8">
            <CardContent className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <IconSparkles size={20} className="text-brand-500" />
                فيدباك الذكاء الاصطناعي
              </h2>
              {ai.strengths && ai.strengths.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 font-bold text-green-600">
                    <IconCircleCheck size={16} />
                    نقاط القوة
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {ai.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {ai.improvements && ai.improvements.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 font-bold text-amber-600">
                    <IconBulb size={16} />
                    للتحسين
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {ai.improvements.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}

        {/* فيدباك الخبير */}
        {sub.expertFeedback && (
          <Card className="mt-6 border-brand-200">
            <CardContent className="p-6">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-brand-700 dark:text-brand-300">
                <IconUserStar size={20} />
                فيدباك خبير
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {sub.expertFeedback}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </>
  );
}
