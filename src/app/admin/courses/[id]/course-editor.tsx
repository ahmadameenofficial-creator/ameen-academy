"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  category: string;
  level: string;
  price: number;
  comparePrice: number | null;
  isPublished: boolean;
  isFeatured: boolean;
}

export function CourseEditor({ course }: { course: Course }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: course.title,
    slug: course.slug,
    description: course.description,
    shortDescription: course.shortDescription || "",
    category: course.category,
    level: course.level,
    price: course.price / 100,
    comparePrice: course.comparePrice ? course.comparePrice / 100 : 0,
    isPublished: course.isPublished,
    isFeatured: course.isFeatured,
  });

  async function handleSave() {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price * 100,
          comparePrice: form.comparePrice > 0 ? form.comparePrice * 100 : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error);
        return;
      }

      setMessage("اتحفظ بنجاح");
      router.refresh();
    } catch {
      setMessage("حصل مشكلة");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("متأكد إنك عايز تحذف الكورس ده؟ العملية دي مش هتترجع.")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/courses");
    } catch {
      setMessage("مقدرتش أحذف");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <h2 className="font-bold text-foreground">إعدادات الكورس</h2>

        {message && (
          <div className={`rounded-lg p-2 text-xs text-center ${message.includes("بنجاح") ? "bg-green-50 text-green-700" : "bg-destructive/10 text-destructive"}`}>
            {message}
          </div>
        )}

        <Field label="العنوان">
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>

        <Field label="Slug">
          <Input
            value={form.slug}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
            dir="ltr"
          />
        </Field>

        <Field label="التصنيف">
          <Input
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
          />
        </Field>

        <Field label="المستوى">
          <select
            value={form.level}
            onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
            className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <option value="BEGINNER">مبتدئ</option>
            <option value="INTERMEDIATE">متوسط</option>
            <option value="ADVANCED">متقدم</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="السعر (جنيه)">
            <Input
              type="number"
              value={form.price || ""}
              onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
              dir="ltr"
            />
          </Field>
          <Field label="قبل الخصم">
            <Input
              type="number"
              value={form.comparePrice || ""}
              onChange={(e) => setForm((p) => ({ ...p, comparePrice: Number(e.target.value) }))}
              dir="ltr"
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">منشور</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">مميّز</span>
        </label>

        <Button onClick={handleSave} className="w-full" disabled={isLoading}>
          {isLoading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : "حفظ التغييرات"}
        </Button>

        <Button
          onClick={handleDelete}
          variant="destructive"
          size="sm"
          className="w-full"
          disabled={isDeleting}
        >
          {isDeleting ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <><IconTrash className="h-4 w-4" /> حذف الكورس</>}
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
