"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconStar,
  IconStarOff,
  IconArticle,
  IconClock,
  IconLoader2,
} from "@tabler/icons-react";
import { apiClient, apiPost, apiPut, apiDelete, API } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content?: string;
  thumbnail?: string | null;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  viewsCount: number;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  author: { name: string; image: string | null };
}

export function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { error } = useToast();

  async function fetchPosts() {
    try {
      setPosts(await apiClient<BlogPost[]>(API.admin.blog.list));
    } catch {
      error("معرفناش نحمّل المقالات");
    }
  }

  async function deletePost(id: string) {
    if (!confirm("متأكد إنك عايز تحذف المقال ده؟")) return;
    try {
      await apiDelete(API.admin.blog.delete(id));
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      error("معرفناش نحذف المقال، جرّب تاني");
    }
  }

  async function togglePublish(post: BlogPost) {
    try {
      await apiPut(API.admin.blog.update(post.id), { isPublished: !post.isPublished });
      fetchPosts();
    } catch {
      error("معرفناش نغيّر حالة النشر، جرّب تاني");
    }
  }

  async function toggleFeatured(post: BlogPost) {
    try {
      await apiPut(API.admin.blog.update(post.id), { isFeatured: !post.isFeatured });
      fetchPosts();
    } catch {
      error("معرفناش نغيّر التمييز، جرّب تاني");
    }
  }

  if (showEditor || editingPost) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={() => {
          setShowEditor(false);
          setEditingPost(null);
          fetchPosts();
        }}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المدونة</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {posts.length} مقال
          </p>
        </div>
        <Button onClick={() => setShowEditor(true)}>
          <IconPlus className="h-4 w-4 ml-2" />
          مقال جديد
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16">
            <IconArticle className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">مفيش مقالات لسه</p>
            <Button className="mt-4" onClick={() => setShowEditor(true)}>
              <IconPlus className="h-4 w-4 ml-2" />
              اكتب أول مقال
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {post.title}
                      </h3>
                      {post.isFeatured && (
                        <Badge variant="solid" className="text-[10px]">مميّز</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                      {post.excerpt || "بدون ملخص"}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant={post.isPublished ? "soft" : "outline"} className="text-[10px]">
                        {post.isPublished ? "منشور" : "مسودة"}
                      </Badge>
                      <span>{post.category}</span>
                      <span className="flex items-center gap-1">
                        <IconClock className="h-3 w-3" />
                        {post.readingTime} دقيقة
                      </span>
                      <span className="flex items-center gap-1">
                        <IconEye className="h-3 w-3" />
                        {post.viewsCount}
                      </span>
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(post)}
                      title={post.isPublished ? "إلغاء النشر" : "نشر"}
                    >
                      {post.isPublished ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(post)}
                      title={post.isFeatured ? "إلغاء التمييز" : "مميّز"}
                    >
                      {post.isFeatured ? (
                        <IconStar className="h-4 w-4 text-amber-500" />
                      ) : (
                        <IconStarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogEditor({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const { error } = useToast();
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    thumbnail: post?.thumbnail || "",
    category: post?.category || "مهارات",
    tags: post?.tags?.join(", ") || "",
    isPublished: post?.isPublished || false,
    isFeatured: post?.isFeatured || false,
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^ء-يa-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (post) await apiPut(API.admin.blog.update(post.id), body);
      else await apiPost(API.admin.blog.create, body);
      onSave();
    } catch {
      error("حصل مشكلة — حاول تاني");
    } finally {
      setSaving(false);
    }
  }

  const categories = ["مهارات", "AI", "فريلانس", "تصميم", "أدوات"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {post ? "تعديل مقال" : "مقال جديد"}
        </h1>
        <Button variant="ghost" onClick={onCancel}>
          رجوع
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                العنوان
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm({
                    ...form,
                    title,
                    slug: post ? form.slug : generateSlug(title),
                  });
                }}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                placeholder="عنوان المقال"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Slug (رابط المقال)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none font-mono text-sm"
                dir="ltr"
                placeholder="article-slug"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                الملخص
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none"
                rows={2}
                placeholder="ملخص قصير يظهر في كروت المقالات ونتائج البحث"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  التصنيف
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  الكلمات المفتاحية
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="فريلانس, AI, فلوس (مفصولة بفاصلة)"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                رابط صورة الغلاف
              </label>
              <input
                type="url"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                dir="ltr"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                المحتوى (Markdown)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none font-mono text-sm leading-relaxed"
                rows={20}
                placeholder={"# عنوان المقال\n\nاكتب المحتوى هنا بالـ Markdown...\n\n## قسم فرعي\n\n- نقطة 1\n- نقطة 2"}
                required
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  className="rounded border-border text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-foreground">نشر المقال</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded border-border text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-foreground">مقال مميّز</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <IconLoader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : post ? (
              "حفظ التعديلات"
            ) : (
              "نشر المقال"
            )}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
