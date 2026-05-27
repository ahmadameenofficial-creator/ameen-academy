"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlayerPlay,
  IconCheck,
  IconLoader2,
  IconCircleCheck,
  IconCircleDashed,
} from "@tabler/icons-react";
import { useToast } from "@/components/ui/toast";
import { apiPost, API } from "@/lib/api";

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
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [marking, setMarking] = useState(false);
  const { error } = useToast();
  const router = useRouter();

  const toggleComplete = useCallback(async () => {
    setMarking(true);
    const newState = !isCompleted;
    // تحديث optimistic — بنغيّر الحالة فوراً
    setIsCompleted(newState);
    try {
      await apiPost(API.progress.track, { lessonId, isCompleted: newState });
      // بنعمل refresh عشان الـ layout sidebar يتحدّث
      router.refresh();
    } catch {
      // لو فشل — نرجّع الحالة
      setIsCompleted(!newState);
      error("معرفناش نحفظ تقدّمك، جرّب تاني");
    }
    setMarking(false);
  }, [lessonId, isCompleted, error, router]);

  // بناء رابط الـ embed
  const embedUrl = signedEmbedUrl
    ? `${signedEmbedUrl}&autoplay=false&preload=true${lastPosition > 0 ? `&t=${lastPosition}` : ""}`
    : null;

  return (
    <div>
      {/* الفيديو */}
      <div className="bg-black">
        {videoId && embedUrl ? (
          <div className="relative aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <IconPlayerPlay className="h-8 w-8 text-white/40" />
            </div>
            <p className="text-white/40 text-sm">
              {videoId ? "جاري تحميل الفيديو..." : "الفيديو هيتضاف قريب"}
            </p>
          </div>
        )}
      </div>

      {/* شريط أسفل الفيديو — علّم كمكتمل */}
      <div className="bg-zinc-900 px-4 py-2.5">
        <button
          onClick={toggleComplete}
          disabled={marking}
          className={`flex items-center gap-2 text-sm font-medium transition-all rounded-lg px-3 py-1.5 -mx-1 ${
            isCompleted
              ? "text-green-400 hover:text-green-300 hover:bg-white/5"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {marking ? (
            <IconLoader2 className="h-5 w-5 animate-spin" />
          ) : isCompleted ? (
            <IconCircleCheck className="h-5 w-5" />
          ) : (
            <IconCircleDashed className="h-5 w-5" />
          )}
          {isCompleted ? "مكتمل — اضغط عشان تلغي" : "علّم الدرس كمكتمل"}
        </button>
      </div>
    </div>
  );
}
