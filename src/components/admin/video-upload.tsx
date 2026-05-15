"use client";

import { useState, useRef } from "react";
import {
  IconUpload,
  IconLoader2,
  IconCheck,
  IconX,
  IconVideo,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface VideoUploadProps {
  onUploaded: (videoId: string) => void;
  currentVideoId?: string;
}

export function VideoUpload({ onUploaded, currentVideoId }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "creating" | "uploading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [videoId, setVideoId] = useState(currentVideoId || "");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    if (!file.type.startsWith("video/")) {
      setErrorMsg("لازم يكون ملف فيديو");
      setStatus("error");
      return;
    }

    // الحد الأقصى 5GB
    if (file.size > 5 * 1024 * 1024 * 1024) {
      setErrorMsg("الفيديو أكبر من 5GB");
      setStatus("error");
      return;
    }

    setUploading(true);
    setProgress(0);
    setErrorMsg("");

    try {
      // الخطوة 1: إنشاء الفيديو على Bunny
      setStatus("creating");
      const createRes = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: file.name.replace(/\.[^/.]+$/, "") }),
      });

      if (!createRes.ok) {
        throw new Error("فشل إنشاء الفيديو");
      }

      const { videoId: newVideoId, libraryId } = await createRes.json();

      // الخطوة 2: رفع الفيديو مباشرة لـ Bunny
      setStatus("uploading");

      const uploadUrl = `https://video.bunnycdn.com/library/${libraryId}/videos/${newVideoId}`;

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("AccessKey", ""); // API key يتبعت من السيرفر

      // استخدم fetch بدل XHR عشان الـ API key
      const uploadRes = await fetch(`/api/admin/videos/${newVideoId}/upload`, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) {
        // Fallback: رفع مباشر عبر TUS
        await uploadViaTus(newVideoId, libraryId, file);
      }

      setVideoId(newVideoId);
      setStatus("done");
      setProgress(100);
      onUploaded(newVideoId);
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(err instanceof Error ? err.message : "حصل مشكلة في الرفع");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  }

  async function uploadViaTus(videoId: string, libraryId: string, file: File) {
    // رفع مباشر باستخدام fetch chunks
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const res = await fetch(`/api/admin/videos/${videoId}/chunk`, {
        method: "PUT",
        headers: {
          "Content-Range": `bytes ${start}-${end - 1}/${file.size}`,
        },
        body: chunk,
      });

      if (!res.ok) throw new Error("فشل رفع جزء من الفيديو");

      setProgress(Math.round(((i + 1) / totalChunks) * 100));
    }
  }

  return (
    <div className="space-y-3">
      {/* حالة الفيديو الحالي */}
      {videoId && status !== "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
          <IconCheck className="h-4 w-4" />
          <span>الفيديو مرفوع</span>
          <span className="text-xs text-green-500 mr-auto font-mono" dir="ltr">{videoId.slice(0, 8)}...</span>
        </div>
      )}

      {/* منطقة الرفع */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          uploading
            ? "border-brand-300 bg-brand-50/30"
            : "border-border hover:border-brand-300 hover:bg-muted/30"
        }`}
        onClick={() => !uploading && fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />

        {status === "idle" && (
          <>
            <IconVideo className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">
              {currentVideoId ? "ارفع فيديو جديد (هيستبدل القديم)" : "اضغط أو اسحب الفيديو هنا"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI — أقصى حجم 5GB</p>
          </>
        )}

        {status === "creating" && (
          <div className="flex items-center justify-center gap-2">
            <IconLoader2 className="h-5 w-5 animate-spin text-brand-500" />
            <span className="text-sm text-muted-foreground">جاري التجهيز...</span>
          </div>
        )}

        {status === "uploading" && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <IconUpload className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium text-foreground">جاري الرفع... {progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === "done" && (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <IconCheck className="h-5 w-5" />
            <span className="text-sm font-medium">تم الرفع بنجاح!</span>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-destructive">
              <IconX className="h-5 w-5" />
              <span className="text-sm font-medium">{errorMsg}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setStatus("idle");
                setErrorMsg("");
              }}
            >
              حاول تاني
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
