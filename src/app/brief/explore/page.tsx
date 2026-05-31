import type { Metadata } from "next";
import Link from "next/link";
import { IconHeart, IconEye, IconWand, IconMoodEmpty } from "@tabler/icons-react";
import type { BriefType, BriefLevel, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { BRIEF_TYPES, BRIEF_LEVELS, BRIEF_TYPE_LABELS, BRIEF_LEVEL_LABELS } from "@/lib/brief/constants";

export const metadata: Metadata = {
  title: "تصفّح البريفات | منصة البريف",
  description: "اكتشف بريفات تصميم حقيقية — لوجو، سوشيال ميديا، وهوية بصرية. اختار بريف وابدأ اتدرّب.",
  alternates: { canonical: "/brief/explore" },
};

export const revalidate = 60;

const TYPE_VALUES: BriefType[] = ["LOGO", "SOCIAL_POST", "BRAND_IDENTITY"];
const LEVEL_VALUES: BriefLevel[] = ["BEGINNER", "INTERMEDIATE", "PRO"];

interface Props {
  searchParams: Promise<{ type?: string; level?: string }>;
}

export default async function ExplorePage({ searchParams }: Props) {
  const sp = await searchParams;
  const type = TYPE_VALUES.includes(sp.type as BriefType) ? (sp.type as BriefType) : undefined;
  const level = LEVEL_VALUES.includes(sp.level as BriefLevel) ? (sp.level as BriefLevel) : undefined;

  const where: Prisma.BriefWhereInput = { isPublished: true };
  if (type) where.type = type;
  if (level) where.level = level;

  const briefs = await prisma.brief.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 60,
    select: {
      slug: true,
      title: true,
      type: true,
      level: true,
      clientBusiness: true,
      viewsCount: true,
      createdAt: true,
      _count: { select: { submissions: true } },
    },
  });

  // بناء رابط فلتر يحافظ على باقي الفلاتر
  const buildHref = (next: { type?: BriefType | null; level?: BriefLevel | null }) => {
    const params = new URLSearchParams();
    const t = next.type === null ? undefined : next.type ?? type;
    const l = next.level === null ? undefined : next.level ?? level;
    if (t) params.set("type", t);
    if (l) params.set("level", l);
    const q = params.toString();
    return q ? `/brief/explore?${q}` : "/brief/explore";
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">تصفّح البريفات</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              اختار بريف وابدأ اتدرّب عليه — أو ولّد واحد جديد على مزاجك.
            </p>
          </div>
          <Button asChild variant="gradient">
            <Link href="/brief/generate">
              <IconWand size={18} />
              ولّد بريف
            </Link>
          </Button>
        </div>

        {/* الفلاتر */}
        <div className="mb-8 space-y-3">
          <FilterRow label="النوع">
            <FilterChip href={buildHref({ type: null })} active={!type}>
              الكل
            </FilterChip>
            {BRIEF_TYPES.map((t) => (
              <FilterChip key={t.value} href={buildHref({ type: t.value })} active={type === t.value}>
                {t.label}
              </FilterChip>
            ))}
          </FilterRow>
          <FilterRow label="المستوى">
            <FilterChip href={buildHref({ level: null })} active={!level}>
              الكل
            </FilterChip>
            {BRIEF_LEVELS.map((l) => (
              <FilterChip key={l.value} href={buildHref({ level: l.value })} active={level === l.value}>
                {l.label}
              </FilterChip>
            ))}
          </FilterRow>
        </div>

        {briefs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
              <IconMoodEmpty size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground">مفيش بريفات بالفلتر ده لسه. جرّب فلتر تاني أو ولّد بريف جديد.</p>
              <Button asChild variant="gradient">
                <Link href="/brief/generate">ولّد بريف</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {briefs.map((b) => (
              <Link key={b.slug} href={`/brief/${b.slug}`}>
                <Card className="h-full transition-colors hover:border-brand-300">
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge variant="soft">{BRIEF_TYPE_LABELS[b.type]}</Badge>
                      <Badge variant="outline">{BRIEF_LEVEL_LABELS[b.level]}</Badge>
                    </div>
                    <h2 className="line-clamp-2 font-bold text-foreground">{b.title}</h2>
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
                      <span className="ms-auto">{formatDate(b.createdAt)}</span>
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

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      {children}
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
          : "border-border text-muted-foreground hover:border-brand-300 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
