import Link from "next/link";
import { IconPalette, IconFlag, IconTargetArrow } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import {
  BriefAdminRow,
  SubmissionModerationRow,
  ChallengeForm,
} from "@/components/admin/brief-admin";

export const dynamic = "force-dynamic";

export default async function AdminBriefPage() {
  const [briefs, flagged, recent, stats] = await Promise.all([
    prisma.brief.findMany({
      orderBy: { createdAt: "desc" },
      take: 40,
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        isFeatured: true,
        isPublished: true,
        _count: { select: { submissions: true } },
      },
    }),
    // الحلول المتبلّغ عنها أو المخفية = أولوية المراجعة
    prisma.briefSubmission.findMany({
      where: { status: { in: ["FLAGGED", "HIDDEN"] } },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        imageUrl: true,
        status: true,
        expertFeedback: true,
        brief: { select: { slug: true, title: true } },
        user: { select: { name: true } },
      },
    }),
    prisma.briefSubmission.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: {
        id: true,
        imageUrl: true,
        status: true,
        expertFeedback: true,
        brief: { select: { slug: true, title: true } },
        user: { select: { name: true } },
      },
    }),
    Promise.all([
      prisma.brief.count(),
      prisma.briefSubmission.count(),
      prisma.briefChallenge.count(),
    ]),
  ]);

  const [briefCount, submissionCount, challengeCount] = stats;
  const moderation = [...flagged, ...recent];

  const mapSub = (s: (typeof moderation)[number]) => ({
    id: s.id,
    imageUrl: s.imageUrl,
    status: s.status,
    expertFeedback: s.expertFeedback,
    briefSlug: s.brief.slug,
    briefTitle: s.brief.title,
    userName: s.user.name ?? "مصمم",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
          <IconPalette size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">إدارة منصة البريف</h1>
          <p className="text-sm text-muted-foreground">
            {briefCount} بريف · {submissionCount} حل · {challengeCount} تحدي
          </p>
        </div>
        <Link
          href="/brief"
          target="_blank"
          className="ms-auto text-sm text-brand-600 hover:underline"
        >
          شوف المنصة
        </Link>
      </div>

      {/* إنشاء تحدي */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
          <IconTargetArrow size={20} className="text-brand-500" />
          أنشئ تحدي جديد
        </h2>
        <ChallengeForm />
      </section>

      {/* مراجعة الحلول */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
          <IconFlag size={20} className="text-brand-500" />
          مراجعة الحلول
          {flagged.length > 0 && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {flagged.length} محتاج مراجعة
            </span>
          )}
        </h2>
        {moderation.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            مفيش حلول لسه.
          </p>
        ) : (
          <div className="space-y-3">
            {moderation.map((s) => (
              <SubmissionModerationRow key={s.id} submission={mapSub(s)} />
            ))}
          </div>
        )}
      </section>

      {/* البريفات: تمييز + نشر */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-foreground">البريفات (آخر 40)</h2>
        {briefs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            مفيش بريفات لسه.
          </p>
        ) : (
          <div className="space-y-2">
            {briefs.map((b) => (
              <BriefAdminRow
                key={b.id}
                brief={{
                  id: b.id,
                  slug: b.slug,
                  title: b.title,
                  type: b.type,
                  isFeatured: b.isFeatured,
                  isPublished: b.isPublished,
                  submissions: b._count.submissions,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
