"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { IconSend, IconLoader2, IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/avatar";
import { useToast } from "@/components/ui/toast";
import { API } from "@/lib/api";

interface PostComposerProps {
  userName: string;
  userImage?: string | null;
  isLoggedIn: boolean;
  onPost: (content: string, image?: string) => Promise<void>;
}

export function PostComposer({ userName, userImage, isLoggedIn, onPost }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { error } = useToast();

  // نص ٣ حروف على الأقل، أو صورة لوحدها — نفس قاعدة السيرفر
  const canPost = !posting && !uploading && (content.trim().length >= 3 || !!image);

  async function handlePickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // عشان اختيار نفس الملف تاني يشتغل
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      error("الصورة لازم تكون أقل من 4 ميجا");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(API.upload, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setImage(data.url);
    } catch (err) {
      error(err instanceof Error && err.message ? err.message : "معرفناش نرفع الصورة، جرّب تاني");
    }
    setUploading(false);
  }

  async function handlePost() {
    if (!canPost) return;
    setPosting(true);
    try {
      await onPost(content.trim(), image || undefined);
      setContent("");
      setImage(null);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch {
      error("معرفناش ننشر المنشور، جرّب تاني");
    }
    setPosting(false);
  }

  if (!isLoggedIn) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-3">سجّل دخولك عشان تشارك في المجتمع</p>
        <Button variant="gradient" asChild>
          <Link href="/login">تسجيل الدخول</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar name={userName} image={userImage} />
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              // بيكبر مع الكتابة زي فيسبوك — مفيش سكرول جوه صندوق صغير
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 240)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handlePost();
            }}
            placeholder={`إيه اللي في بالك يا ${userName.split(" ")[0]}؟`}
            rows={2}
            className="flex-1 bg-muted/50 rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none transition-colors border-0"
            maxLength={2000}
          />
        </div>

        {/* معاينة الصورة قبل النشر */}
        {(image || uploading) && (
          <div className="mt-3 mr-12 relative">
            {uploading ? (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 justify-center text-sm text-muted-foreground">
                <IconLoader2 className="h-4 w-4 animate-spin text-brand-500" />
                بنرفع الصورة…
              </div>
            ) : (
              image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="معاينة الصورة"
                    className="w-full max-h-72 object-cover rounded-xl border border-border"
                  />
                  <button
                    onClick={() => setImage(null)}
                    aria-label="شيل الصورة"
                    className="absolute top-2 left-2 h-8 w-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <IconX className="h-4 w-4" />
                  </button>
                </>
              )
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/20">
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handlePickImage}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || !!image}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:bg-brand-50 rounded-lg px-2.5 py-1.5 transition-colors disabled:opacity-40"
          >
            <IconPhoto className="h-5 w-5" />
            صورة
          </button>
          {content.length > 1800 && (
            <span className="text-xs text-muted-foreground">{content.length}/2000</span>
          )}
        </div>
        <Button size="sm" onClick={handlePost} disabled={!canPost}>
          {posting ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconSend className="h-4 w-4" /> انشر
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
