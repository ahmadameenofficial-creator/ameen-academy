"use client";

import { useState, useCallback } from "react";
import { IconPlayerPlay, IconCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  lessonId: string;
  videoId: string | null;
  signedEmbedUrl: string | null;
  lastPosition: number;
  isCompleted: boolean;
  userName: string;
}

export function VideoPlayer({
  lessonId,
  videoId,
  signedEmbedUrl,
  lastPosition,
  isCompleted: initialCompleted,
  userName,
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [marking, setMarking] = useState(false);

  const markComplete = useCallback(async () => {
    setMarking(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, isCompleted: true }),
      });
      if (res.ok) setIsCompleted(true);
    } catch {}
    setMarking(false);
  }, [lessonId]);

  const markIncomplete = useCallback(async () => {
    setMarking(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, isCompleted: false }),
      });
      if (res.ok) setIsCompleted(false);
    } catch {}
    setMarking(false);
  }, [lessonId]);

  // بناء رابط الـ embed مع الإعدادات
  const embedUrl = signedEmbedUrl
    ? `${signedEmbedUrl}&autoplay=false&preload=true${lastPosition > 0 ? `&t=${lastPosition}` : ""}`
    : null;

  return (
    <div className="bg-black">
      {videoId && embedUrl ? (
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 0 }}
            />
            {/* Watermark بيتعامل معاه Bunny نفسه — بيظهر على الفيديو حتى في fullscreen */}
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-brand-900 to-brand-800 flex flex-col items-center justify-center gap-4">
            <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
              <IconPlayerPlay className="h-10 w-10 text-white/60" />
            </div>
            <p className="text-white/60 text-sm">
              {videoId ? "جاري تحميل الفيديو..." : "الفيديو هيتضاف قريب"}
            </p>
          </div>
        </div>
      )}

      {/* علّم كمكتمل */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between bg-zinc-900">
        <span className="text-sm text-zinc-400">
          {isCompleted ? "خلّصت الدرس ده" : "خلّصت الدرس؟"}
        </span>
        {isCompleted ? (
          <Button
            size="sm"
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-zinc-800"
            onClick={markIncomplete}
            disabled={marking}
          >
            {marking ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              <><IconCheck className="h-4 w-4" /> مكتمل</>
            )}
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-brand-600 hover:bg-brand-500 text-white"
            onClick={markComplete}
            disabled={marking}
          >
            {marking ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              "علّم كمكتمل"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
