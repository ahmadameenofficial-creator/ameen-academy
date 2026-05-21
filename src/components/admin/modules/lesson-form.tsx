"use client";

import { useState } from "react";
import {
  IconPlus,
  IconLoader2,
  IconUpload,
  IconVideo,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LessonFormProps {
  isLoading: boolean;
  onSubmit: (data: { title: string; duration: number; isFree: boolean; video: File | null }) => void;
  onCancel: () => void;
}

export function LessonForm({ isLoading, onSubmit, onCancel }: LessonFormProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [video, setVideo] = useState<File | null>(null);

  function handleSubmit() {
    if (!title.trim()) return;
    onSubmit({ title, duration, isFree, video });
  }

  function pickVideo() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setVideo(file);
    };
    input.click();
  }

  return (
    <div className="p-4 bg-muted/30 border-t border-border space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان الدرس"
        autoFocus
      />
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          type="number"
          value={duration || ""}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="المدة (دقائق)"
          className="w-32"
          dir="ltr"
          min={0}
        />
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          مجاني
        </label>
      </div>

      {/* رفع فيديو مع الدرس */}
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer ${
          video ? "border-brand-300 bg-brand-50/30" : "border-border hover:border-brand-300"
        }`}
        onClick={pickVideo}
      >
        {video ? (
          <div className="flex items-center justify-center gap-2 text-sm">
            <IconVideo className="h-5 w-5 text-brand-500" />
            <span className="text-foreground font-medium">{video.name}</span>
            <span className="text-muted-foreground">
              ({(video.size / (1024 * 1024)).toFixed(1)} MB)
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setVideo(null); }}
              className="text-destructive hover:bg-destructive/10 rounded p-0.5"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <IconUpload className="h-5 w-5" />
            <span>اضغط لاختيار فيديو الدرس (اختياري)</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleSubmit} disabled={isLoading || !title.trim()}>
          {isLoading ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconPlus className="h-4 w-4" />
              {video ? "إضافة + رفع" : "إضافة"}
            </>
          )}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </div>
  );
}
