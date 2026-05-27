"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { IconSend, IconLoader2, IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/avatar";
import { useToast } from "@/components/ui/toast";

interface PostComposerProps {
  userName: string;
  userImage?: string | null;
  isLoggedIn: boolean;
  onPost: (content: string, image?: string) => Promise<void>;
}

export function PostComposer({ userName, userImage, isLoggedIn, onPost }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { error } = useToast();

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "فشل الرفع" }));
        throw new Error(data.error);
      }
      const data = await res.json();
      return data.url;
    } catch (err) {
      error(err instanceof Error ? err.message : "فشل رفع الصورة");
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handlePost() {
    if ((!content.trim() && !imageFile) || posting) return;
    setPosting(true);
    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const url = await uploadImage(imageFile);
        if (url) imageUrl = url;
      }
      await onPost(content, imageUrl);
      setContent("");
      setImagePreview(null);
      setImageFile(null);
    } catch {
      error("معرفناش ننشر المنشور، جرّب تاني");
    }
    setPosting(false);
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // تحقق من الحجم (5 ميجا)
    if (file.size > 5 * 1024 * 1024) {
      error("الصورة لازم تكون أقل من 5 ميجا");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`إيه اللي في بالك يا ${userName.split(" ")[0]}؟`}
            rows={3}
            className="flex-1 bg-muted/50 rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none transition-colors border-0"
            maxLength={2000}
          />
        </div>

        {/* معاينة الصورة */}
        {imagePreview && (
          <div className="relative mt-3 mr-12">
            <img
              src={imagePreview}
              alt="معاينة"
              className="rounded-xl max-h-48 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 left-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            disabled={uploading}
          >
            <IconPhoto className="h-4 w-4 text-green-600" />
            صورة
          </button>
          <span className="text-xs text-muted-foreground">{content.length}/2000</span>
        </div>
        <Button
          size="sm"
          onClick={handlePost}
          disabled={posting || uploading || (!content.trim() && !imageFile)}
        >
          {posting || uploading ? (
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
