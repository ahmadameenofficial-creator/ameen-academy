"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  IconUpload,
  IconHeart,
  IconHeartFilled,
  IconLoader2,
  IconPhoto,
  IconSparkles,
  IconCircleCheck,
  IconBulb,
  IconUserStar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getInitials, formatDate } from "@/lib/utils";

export interface AiFeedbackView {
  strengths: string[];
  improvements: string[];
}

export interface SubmissionView {
  id: string;
  imageUrl: string;
  note: string | null;
  votesCount: number;
  hasVoted: boolean;
  createdAt: string;
  aiScore: number | null;
  aiFeedback: AiFeedbackView | null;
  expertFeedback: string | null;
  user: { id: string; name: string; image: string | null };
}

export function BriefSolveSection({
  briefId,
  submissions,
}: {
  briefId: string;
  submissions: SubmissionView[];
}) {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const currentUserId = session?.user?.id;

  return (
    <div className="space-y-10">
      {isAuthed ? (
        <SolveForm briefId={briefId} />
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-muted-foreground">سجّل دخولك عشان ترفع حلّك للبريف ده.</p>
            <Button asChild variant="gradient">
              <Link href="/login">سجّل دخول</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-4 text-xl font-bold text-foreground">
          الحلول المرفوعة ({submissions.length})
        </h2>
        {submissions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-10 text-center text-muted-foreground">
            لسه مفيش حلول. كن أول واحد يحل البريف ده.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {submissions.map((s) => (
              <SubmissionCard
                key={s.id}
                submission={s}
                canVote={isAuthed}
                isOwner={currentUserId === s.user.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SolveForm({ briefId }: { briefId: string }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }

  async function submit() {
    if (!file) {
      setError("اختار صورة الحل الأول");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      const upData = await up.json();
      if (!up.ok) throw new Error(upData.error ?? "فشل رفع الصورة");

      const res = await fetch(`/api/brief/${briefId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: upData.url, note: note || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "فشل رفع الحل");

      setFile(null);
      setPreview(null);
      setNote("");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "حصل خطأ، جرّب تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">ارفع حلّك</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            اشتغل على البريف على راحتك، ولما تخلّص ارفع التصميم هنا عشان يتقيّم ويتشاف.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-8 text-muted-foreground transition-colors hover:border-brand-400 hover:text-brand-500"
        >
          {preview ? (
            <Image
              src={preview}
              alt="معاينة"
              width={320}
              height={200}
              className="max-h-48 w-auto rounded-lg object-contain"
              unoptimized
            />
          ) : (
            <>
              <IconPhoto size={36} stroke={1.5} />
              <span className="text-sm">اضغط لاختيار صورة الحل (JPG/PNG/WebP — أقل من 5 ميجا)</span>
            </>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onPick}
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={1000}
          placeholder="ملاحظات على حلّك (اختياري) — اشرح فكرتك"
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-400"
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </p>
        )}

        <Button variant="gradient" className="w-full" onClick={submit} disabled={loading}>
          {loading ? <IconLoader2 className="animate-spin" size={20} /> : <IconUpload size={20} />}
          {loading ? "بنرفع..." : "ارفع الحل"}
        </Button>
      </CardContent>
    </Card>
  );
}

function SubmissionCard({
  submission,
  canVote,
  isOwner,
}: {
  submission: SubmissionView;
  canVote: boolean;
  isOwner: boolean;
}) {
  const [votesCount, setVotesCount] = useState(submission.votesCount);
  const [hasVoted, setHasVoted] = useState(submission.hasVoted);
  const [pending, setPending] = useState(false);

  // فيدباك الـ AI
  const [aiScore, setAiScore] = useState(submission.aiScore);
  const [aiFeedback, setAiFeedback] = useState<AiFeedbackView | null>(submission.aiFeedback);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  async function getAiFeedback() {
    if (aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch(`/api/brief/submissions/${submission.id}/ai-feedback`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "تعذّر توليد الفيدباك");
      setAiScore(typeof data.score === "number" ? data.score : null);
      setAiFeedback({
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        improvements: Array.isArray(data.improvements) ? data.improvements : [],
      });
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "حصل خطأ");
    } finally {
      setAiLoading(false);
    }
  }

  async function toggleVote() {
    if (!canVote || pending) return;
    setPending(true);
    // تحديث متفائل
    const prevVoted = hasVoted;
    const prevCount = votesCount;
    setHasVoted(!prevVoted);
    setVotesCount(prevVoted ? prevCount - 1 : prevCount + 1);
    try {
      const res = await fetch(`/api/brief/submissions/${submission.id}/vote`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setHasVoted(data.voted);
      setVotesCount(data.votesCount);
    } catch {
      setHasVoted(prevVoted);
      setVotesCount(prevCount);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/brief/submissions/${submission.id}`} className="relative block aspect-square bg-muted">
        <Image
          src={submission.imageUrl}
          alt={`حل بواسطة ${submission.user.name}`}
          fill
          className="object-cover transition-transform hover:scale-105"
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <CardContent className="space-y-3 p-4">
        <Link
          href={`/brief/designers/${submission.user.id}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {submission.user.image ? (
              <Image
                src={submission.user.image}
                alt={submission.user.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              getInitials(submission.user.name)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{submission.user.name}</div>
            <div className="text-xs text-muted-foreground">{formatDate(submission.createdAt)}</div>
          </div>
        </Link>

        {submission.note && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{submission.note}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleVote}
            disabled={!canVote || pending}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              hasVoted ? "text-brand-600" : "text-muted-foreground hover:text-brand-500",
              !canVote && "cursor-default"
            )}
          >
            {hasVoted ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
            {votesCount}
          </button>

          {aiScore !== null && (
            <span className="ms-auto flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              <IconSparkles size={13} />
              {aiScore}/100
            </span>
          )}
        </div>

        {/* فيدباك الـ AI */}
        {aiFeedback && (
          <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-xs">
            {aiFeedback.strengths.length > 0 && (
              <div>
                <div className="mb-1 flex items-center gap-1 font-bold text-green-600">
                  <IconCircleCheck size={14} />
                  نقاط القوة
                </div>
                <ul className="space-y-0.5 text-muted-foreground">
                  {aiFeedback.strengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            )}
            {aiFeedback.improvements.length > 0 && (
              <div>
                <div className="mb-1 flex items-center gap-1 font-bold text-amber-600">
                  <IconBulb size={14} />
                  للتحسين
                </div>
                <ul className="space-y-0.5 text-muted-foreground">
                  {aiFeedback.improvements.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* زر طلب فيدباك AI — لصاحب الحل بس ولو لسه مفيش فيدباك */}
        {isOwner && !aiFeedback && (
          <div>
            <Button
              size="sm"
              variant="soft"
              className="w-full"
              onClick={getAiFeedback}
              disabled={aiLoading}
            >
              {aiLoading ? <IconLoader2 className="animate-spin" size={14} /> : <IconSparkles size={14} />}
              {aiLoading ? "بنحلّل..." : "احصل على فيدباك AI"}
            </Button>
            {aiError && <p className="mt-1 text-xs text-red-600">{aiError}</p>}
          </div>
        )}

        {/* فيدباك الخبير */}
        {submission.expertFeedback && (
          <div className="rounded-lg border border-brand-200 bg-brand-50/50 p-3 text-xs dark:bg-brand-900/10">
            <div className="mb-1 flex items-center gap-1 font-bold text-brand-700 dark:text-brand-300">
              <IconUserStar size={14} />
              فيدباك خبير
            </div>
            <p className="whitespace-pre-line text-muted-foreground">{submission.expertFeedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
