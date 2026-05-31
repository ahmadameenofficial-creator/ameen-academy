"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconRefresh, IconWand, IconLoader2, IconBookmark } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { BriefPrintButton } from "./brief-print-button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BRIEF_TYPES, BRIEF_LEVELS } from "@/lib/brief/constants";
import { BriefDisplay } from "./brief-display";
import type { GeneratedBrief } from "@/lib/brief/engine";
import type { BriefType, BriefLevel } from "@prisma/client";

export function BriefGenerator() {
  const router = useRouter();
  const [type, setType] = useState<BriefType>("LOGO");
  const [level, setLevel] = useState<BriefLevel>("BEGINNER");
  const [brief, setBrief] = useState<GeneratedBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/brief/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, level }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "حصل خطأ، جرّب تاني");
      }
      const data = await res.json();
      setBrief(data.brief);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حصل خطأ، جرّب تاني");
    } finally {
      setLoading(false);
    }
  }

  async function solveBrief() {
    if (!brief) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/brief/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      if (res.status === 401) {
        router.push("/login?callbackUrl=/brief/generate");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "حصل خطأ، جرّب تاني");
      router.push(`/brief/${data.slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حصل خطأ، جرّب تاني");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* نوع البريف */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-foreground">نوع المشروع</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {BRIEF_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={cn(
                    "rounded-xl border-2 p-4 text-right transition-all",
                    type === t.value
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                      : "border-border hover:border-brand-300"
                  )}
                >
                  <div className="font-semibold text-foreground">{t.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* المستوى */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-foreground">مستوى التحدي</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {BRIEF_LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  className={cn(
                    "rounded-xl border-2 p-4 text-right transition-all",
                    level === l.value
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                      : "border-border hover:border-brand-300"
                  )}
                >
                  <div className="font-semibold text-foreground">{l.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{l.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={generate}
            disabled={loading}
          >
            {loading ? (
              <IconLoader2 className="animate-spin" size={20} />
            ) : brief ? (
              <IconRefresh size={20} />
            ) : (
              <IconWand size={20} />
            )}
            {loading ? "بنولّد البريف..." : brief ? "ولّد بريف تاني" : "ولّد البريف"}
          </Button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-center text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      {brief && (
        <div className="space-y-4">
          <BriefDisplay brief={brief} />
          <p className="text-center text-sm text-muted-foreground">
            عجبك البريف؟ احفظه عشان ميتوهش — هياخد صفحة دايمة تقدر ترجعله منها وترفع شغلك عليها.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="gradient"
              size="lg"
              className="flex-1"
              onClick={solveBrief}
              disabled={saving}
            >
              {saving ? (
                <IconLoader2 className="animate-spin" size={20} />
              ) : (
                <IconBookmark size={20} />
              )}
              {saving ? "بنحفظ البريف..." : "احفظ البريف وابدأ تشتغل عليه"}
            </Button>
            <BriefPrintButton className="sm:w-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
