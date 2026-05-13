"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function NewCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "BEGINNER" as const,
    price: 0,
    comparePrice: 0,
    isPublished: false,
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^ء-يa-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || prev.slug === ""
        ? generateSlug(title)
        : prev.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price * 100,
          comparePrice: form.comparePrice > 0 ? form.comparePrice * 100 : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push(`/admin/courses/${data.id}`);
    } catch {
      setError("حصل مشكلة، جرّب تاني");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">كورس جديد</h1>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                {error}
              </div>
            )}

            <Field label="عنوان الكورس">
              <Input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="مثال: ورشة تصميم جرافيك"
                required
              />
            </Field>

            <Field label="Slug (رابط الكورس)">
              <Input
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="workshop-design"
                dir="ltr"
                required
              />
            </Field>

            <Field label="وصف قصير">
              <Input
                value={form.shortDescription}
                onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                placeholder="جملة أو اتنين عن الكورس"
              />
            </Field>

            <Field label="الوصف الكامل">
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="وصف تفصيلي للكورس..."
                rows={5}
                className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors resize-y"
                required
              />
            </Field>

            <Field label="التصنيف">
              <Input
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                placeholder="مثال: تصميم جرافيك"
                required
              />
            </Field>

            <Field label="المستوى">
              <select
                value={form.level}
                onChange={(e) => setForm((p) => ({ ...p, level: e.target.value as typeof form.level }))}
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors"
              >
                <option value="BEGINNER">مبتدئ</option>
                <option value="INTERMEDIATE">متوسط</option>
                <option value="ADVANCED">متقدم</option>
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="السعر (جنيه)">
                <Input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  placeholder="2000"
                  min={0}
                  dir="ltr"
                  required
                />
              </Field>
              <Field label="السعر قبل الخصم (اختياري)">
                <Input
                  type="number"
                  value={form.comparePrice || ""}
                  onChange={(e) => setForm((p) => ({ ...p, comparePrice: Number(e.target.value) }))}
                  placeholder="3000"
                  min={0}
                  dir="ltr"
                />
              </Field>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))}
                className="h-4 w-4 rounded border-input text-brand-500 focus:ring-brand-500"
              />
              <span className="text-sm text-foreground">نشر الكورس مباشرة</span>
            </label>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <IconLoader2 className="h-5 w-5 animate-spin" /> : "إنشاء الكورس"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
