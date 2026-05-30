"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlayerPlay,
  IconLoader2,
  IconCircleCheck,
  IconCircleDashed,
  IconAlertTriangle,
  IconRefresh,
} from "@tabler/icons-react";
import { useToast } from "@/components/ui/toast";
import { apiPost, API } from "@/lib/api";

interface VideoStatus {
  exists: boolean;
  status: number;
  isReady: boolean;
  message?: string;
}

interface VideoPlayerProps {
  lessonId: string;
  videoId: string | null;
  signedEmbedUrl: string | null;
  videoStatus: VideoStatus | null;
  lastPosition: number;
  isCompleted: boolean;
  userName: string;
  isAdmin?: boolean;
}

export function VideoPlayer({
  lessonId,
  videoId,
  signedEmbedUrl,
  videoStatus,
  lastPosition,
  isCompleted: initialCompleted,
  isAdmin = false,
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [marking, setMarking] = useState(false);
  const { error } = useToast();
  const router = useRouter();

  const toggleComplete = useCallback(async () => {
    setMarking(true);
    const newState = !isCompleted;
    setIsCompleted(newState);
    try {
      await apiPost(API.progress.track, { lessonId, isCompleted: newState });
      router.refresh();
    } catch {
      setIsCompleted(!newState);
      error("معرفناش نحفظ تقدّمك، جرّب تاني");
    }
    setMarking(false);
  }, [lessonId, isCompleted, error, router]);

  const embedUrl = signedEmbedUrl
    ? `${signedEmbedUrl}&autoplay=false&preload=true${lastPosition > 0 ? `&t=${lastPosition}` : ""}`
    : null;

  // نحدد إيه اللي هنعرضه على حسب حالة الفيديو
  const renderVideoArea = () => {
    // (1) الفيديو جاهز ومفيش مشاكل
    if (videoId && embedUrl) {
      return (
        <div className="relative aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>
      );
    }

    // (2) مفيش videoId — الفيديو لسه متعملش رفع
    if (!videoId) {
      return (
        <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center gap-3">
          <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
            <IconPlayerPlay className="h-8 w-8 text-white/40" />
          </div>
          <p className="text-white/40 text-sm">الفيديو هيتضاف قريب</p>
        </div>
      );
    }

    // (3) في videoId بس Bunny مردّش بالـ ready — نشوف ليه
    const status = videoStatus?.status ?? -1;

    // الفيديو موجود بس بيتعالج (status 1 = Uploaded, 2 = Processing, 3 = Transcoding)
    if (videoStatus?.exists && status >= 1 && status <= 3) {
      return (
        <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <IconLoader2 className="h-12 w-12 text-brand-400 animate-spin" />
          <div>
            <p className="text-white font-medium mb-1">الفيديو بيتجهّز</p>
            <p className="text-white/50 text-sm">
              Bunny بيعالج الفيديو دلوقتي — هيكون جاهز خلال دقايق
            </p>
          </div>
          <button
            onClick={() => router.refresh()}
            className="flex items-center gap-2 text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            <IconRefresh className="h-3.5 w-3.5" />
            حدّث الصفحة
          </button>
        </div>
      );
    }

    // الفيديو مش موجود أو الرفع فشل (status 0 = Created بدون رفع، 5/6 = Error)
    return (
      <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center">
          <IconAlertTriangle className="h-8 w-8 text-amber-500" />
        </div>
        <div>
          <p className="text-white font-medium mb-1">الفيديو مش متاح حالياً</p>
          <p className="text-white/50 text-sm">
            {videoStatus?.message || "الفيديو لسه بيترفع أو حصلت مشكلة في الرفع"}
          </p>
          {isAdmin && (
            <div className="mt-4 p-3 bg-black/40 rounded-lg text-left rtl:text-right">
              <p className="text-amber-400 text-xs font-mono mb-1">[Admin Diagnostic]</p>
              <p className="text-white/70 text-xs font-mono break-all">videoId: {videoId}</p>
              <p className="text-white/70 text-xs font-mono">
                status: {status} | exists: {videoStatus?.exists ? "yes" : "no"}
              </p>
              {videoStatus?.message && (
                <p className="text-white/70 text-xs font-mono">msg: {videoStatus.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-black">{renderVideoArea()}</div>

      <button
        onClick={toggleComplete}
        disabled={marking}
        className={`w-full flex items-center justify-center gap-2.5 text-sm font-medium transition-all px-4 py-3 ${
          isCompleted
            ? "bg-zinc-900 text-green-400 active:bg-zinc-800"
            : "bg-zinc-900 text-zinc-400 active:bg-zinc-800"
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
  );
}
