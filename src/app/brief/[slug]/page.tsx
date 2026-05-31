import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { BriefType } from "@prisma/client";
import { IconArrowLeft, IconSchool } from "@tabler/icons-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BriefDisplay } from "@/components/brief/brief-display";
import { BriefSolveSection, type SubmissionView } from "@/components/brief/brief-solve-section";
import { BriefPrintButton } from "@/components/brief/brief-print-button";
import { BRIEF_TYPE_LABELS } from "@/lib/brief/constants";
import type { GeneratedBrief } from "@/lib/brief/engine";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const brief = await prisma.brief.findUnique({
    where: { slug },
    select: { title: true, scenario: true, type: true },
  });

  if (!brief) return { title: "البريف مش موجود" };

  const description = brief.scenario.slice(0, 160);
  return {
    title: `${brief.title} — بريف ${BRIEF_TYPE_LABELS[brief.type]}`,
    description,
    alternates: { canonical: `/brief/${slug}` },
    openGraph: {
      type: "article",
      title: brief.title,
      description,
      url: `/brief/${slug}`,
      siteName: "أكاديمية أمين",
    },
  };
}

export default async function BriefDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const brief = await prisma.brief.findUnique({
    where: { slug },
    include: {
      submissions: {
        where: { status: "PUBLISHED" },
        orderBy: [{ votesCount: "desc" }, { createdAt: "desc" }],
        include: { user: { select: { id: true, name: true, image: true } } },
      },
    },
  });

  if (!brief || !brief.isPublished) notFound();

  // عدّاد المشاهدات — لا يوقف الصفحة لو فشل
  prisma.brief
    .update({ where: { id: brief.id }, data: { viewsCount: { increment: 1 } } })
    .catch(() => {});

  const session = await auth();
  const userId = session?.user?.id;

  // أصوات المستخدم الحالي على حلول هذا البريف
  let votedIds = new Set<string>();
  if (userId && brief.submissions.length > 0) {
    const votes = await prisma.briefVote.findMany({
      where: {
        userId,
        submissionId: { in: brief.submissions.map((s) => s.id) },
      },
      select: { submissionId: true },
    });
    votedIds = new Set(votes.map((v) => v.submissionId));
  }

  const generated: GeneratedBrief = {
    type: brief.type,
    level: brief.level,
    source: brief.source,
    clientName: brief.clientName,
    clientBusiness: brief.clientBusiness,
    businessCategory: brief.businessCategory,
    title: brief.title,
    scenario: brief.scenario,
    audience: brief.audience,
    brandTone: brief.brandTone,
    constraints: brief.constraints as GeneratedBrief["constraints"],
    deliverables: brief.deliverables as GeneratedBrief["deliverables"],
    details: (brief.details ?? {
      goal: "",
      keyMessage: "",
      mustInclude: [],
      moodKeywords: [],
      dos: [],
      donts: [],
    }) as unknown as GeneratedBrief["details"],
  };

  const submissions: SubmissionView[] = brief.submissions.map((s) => ({
    id: s.id,
    imageUrl: s.imageUrl,
    note: s.note,
    votesCount: s.votesCount,
    hasVoted: votedIds.has(s.id),
    createdAt: s.createdAt.toISOString(),
    aiScore: s.aiScore,
    aiFeedback: (s.aiFeedback as SubmissionView["aiFeedback"]) ?? null,
    expertFeedback: s.expertFeedback,
    user: { id: s.user.id, name: s.user.name, image: s.user.image },
  }));

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        {/* شريط: البريف محفوظ + تحميل PDF */}
        <div className="no-print mb-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            البريف ده محفوظ وليه صفحة دايمة — تقدر ترجعله في أي وقت من{" "}
            <span className="font-medium text-foreground">«بريفاتي»</span>، أو تحمّله PDF وتشتغل عليه.
          </p>
          <BriefPrintButton className="no-print shrink-0" />
        </div>

        <BriefDisplay brief={generated} />

        {/* CTA الأكاديمية — ذكي حسب نوع البريف */}
        <AcademyCta type={brief.type} />

        <div className="mt-10">
          <BriefSolveSection briefId={brief.id} submissions={submissions} />
        </div>
      </main>
      <Footer />
    </>
  );
}

// نص CTA حسب نوع البريف — يربط المصمم بكورسات الأكاديمية
const CTA_BY_TYPE: Record<BriefType, { title: string; desc: string }> = {
  LOGO: {
    title: "عايز تتعلّم تصمّم لوجو زي المحترفين؟",
    desc: "اتعلّم أصول تصميم الشعارات، التسعير، والتعامل مع العميل في كورسات أكاديمية أمين.",
  },
  SOCIAL_POST: {
    title: "عايز محتوى السوشيال بتاعك يبيع فعلاً؟",
    desc: "اتعلّم الكتابة الإعلانية والتصميم اللي بيوقف الـ scroll في كورسات أكاديمية أمين.",
  },
  BRAND_IDENTITY: {
    title: "عايز تبني هويات بصرية كاملة وتتقاضى عليها صح؟",
    desc: "اتعلّم بناء الهوية من الاستراتيجية للتنفيذ والتسعير في كورسات أكاديمية أمين.",
  },
};

function AcademyCta({ type }: { type: BriefType }) {
  const cta = CTA_BY_TYPE[type];
  return (
    <div className="no-print mt-10 overflow-hidden rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 p-6 text-white sm:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <IconSchool size={28} stroke={1.5} className="mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg font-bold">{cta.title}</h3>
            <p className="mt-1 text-sm text-white/90">{cta.desc}</p>
          </div>
        </div>
        <Link
          href="/courses"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:bg-white/90"
        >
          شوف الكورسات
          <IconArrowLeft size={18} />
        </Link>
      </div>
    </div>
  );
}
