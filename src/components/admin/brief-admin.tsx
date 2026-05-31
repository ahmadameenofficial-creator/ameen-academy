"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconStar, IconStarFilled, IconLoader2, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-400";

// ===== صف البريف: featured + publish =====
export function BriefAdminRow({
  brief,
}: {
  brief: {
    id: string;
    slug: string;
    title: string;
    type: string;
    isFeatured: boolean;
    isPublished: boolean;
    submissions: number;
  };
}) {
  const router = useRouter();
  const [featured, setFeatured] = useState(brief.isFeatured);
  const [published, setPublished] = useState(brief.isPublished);
  const [pending, setPending] = useState(false);

  async function patch(data: { isFeatured?: boolean; isPublished?: boolean }) {
    setPending(true);
    try {
      const res = await fetch(`/api/admin/brief/${brief.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (data.isFeatured !== undefined) setFeatured(data.isFeatured);
      if (data.isPublished !== undefined) setPublished(data.isPublished);
      router.refresh();
    } catch {
      // رجوع للحالة السابقة ضمنياً (مفيش تغيير)
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/brief/${brief.slug}`}
              target="_blank"
              className="truncate font-medium text-foreground hover:text-brand-600"
            >
              {brief.title}
            </Link>
            <IconExternalLink size={13} className="shrink-0 text-muted-foreground" />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {brief.submissions} حل · {brief.type}
          </div>
        </div>

        <button
          type="button"
          onClick={() => patch({ isFeatured: !featured })}
          disabled={pending}
          title="مميّز"
          className={cn(
            "rounded-lg p-2 transition-colors",
            featured ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"
          )}
        >
          {featured ? <IconStarFilled size={18} /> : <IconStar size={18} />}
        </button>

        <button
          type="button"
          onClick={() => patch({ isPublished: !published })}
          disabled={pending}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            published
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              : "bg-muted text-muted-foreground"
          )}
        >
          {published ? "منشور" : "مخفي"}
        </button>
      </CardContent>
    </Card>
  );
}

// ===== صف الحل: moderation + expert feedback =====
export function SubmissionModerationRow({
  submission,
}: {
  submission: {
    id: string;
    imageUrl: string;
    status: string;
    expertFeedback: string | null;
    briefSlug: string;
    briefTitle: string;
    userName: string;
  };
}) {
  const router = useRouter();
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(submission.expertFeedback ?? "");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function patch(data: { status?: string; expertFeedback?: string }) {
    setPending(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/brief/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (data.status) setStatus(data.status);
      setSaved(true);
      router.refresh();
    } catch {
      // تجاهل
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={submission.imageUrl}
            alt={submission.briefTitle}
            fill
            className="object-cover"
            unoptimized
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/brief/${submission.briefSlug}`}
              target="_blank"
              className="truncate text-sm font-medium text-foreground hover:text-brand-600"
            >
              {submission.briefTitle}
            </Link>
            <Badge variant="outline">{submission.userName}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={status}
              onChange={(e) => patch({ status: e.target.value })}
              disabled={pending}
              className={cn(inputCls, "max-w-[160px] py-1.5")}
            >
              <option value="PUBLISHED">منشور</option>
              <option value="HIDDEN">مخفي</option>
              <option value="FLAGGED">متبلّغ عنه</option>
            </select>
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
            maxLength={2000}
            placeholder="فيدباك خبير (اختياري)"
            className={cn(inputCls, "resize-none")}
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => patch({ expertFeedback: feedback })}
              disabled={pending}
            >
              {pending ? <IconLoader2 className="animate-spin" size={14} /> : null}
              احفظ الفيدباك
            </Button>
            {saved && <span className="text-xs text-green-600">اتحفظ</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ===== نموذج إنشاء تحدي =====
export function ChallengeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit() {
    setError(null);
    setOk(false);
    if (!title || !theme || !description || !startsAt || !endsAt) {
      setError("املأ كل الحقول المطلوبة");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/brief/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          theme,
          description,
          type: type || undefined,
          startsAt: new Date(startsAt).toISOString(),
          endsAt: new Date(endsAt).toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "فشل إنشاء التحدي");
      setOk(true);
      setTitle("");
      setTheme("");
      setDescription("");
      setType("");
      setStartsAt("");
      setEndsAt("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "حصل خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان التحدي"
          className={inputCls}
          maxLength={160}
        />
        <input
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="الثيم (مثلاً: رمضان، التقنية المالية...)"
          className={inputCls}
          maxLength={160}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="وصف التحدي والمطلوب"
          className={cn(inputCls, "resize-none")}
          maxLength={4000}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
          <option value="">كل الأنواع</option>
          <option value="LOGO">تصميم شعار</option>
          <option value="SOCIAL_POST">بوست سوشيال ميديا</option>
          <option value="BRAND_IDENTITY">هوية بصرية كاملة</option>
        </select>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm text-muted-foreground">
            يبدأ
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className={cn(inputCls, "mt-1")}
            />
          </label>
          <label className="text-sm text-muted-foreground">
            ينتهي
            <input
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className={cn(inputCls, "mt-1")}
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {ok && <p className="text-sm text-green-600">اتعمل التحدي بنجاح</p>}

        <Button variant="gradient" onClick={submit} disabled={loading}>
          {loading ? <IconLoader2 className="animate-spin" size={18} /> : null}
          أنشئ التحدي
        </Button>
      </CardContent>
    </Card>
  );
}
