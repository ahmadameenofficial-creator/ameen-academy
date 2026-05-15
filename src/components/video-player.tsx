"use client";

import { useState, useEffect } from "react";
import { IconLoader2, IconLock } from "@tabler/icons-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch(`/api/videos/${videoId}`);
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "مش مسموح");
          return;
        }
        const data = await res.json();
        setEmbedUrl(data.embedUrl);
        setWatermark(data.watermark || "");
      } catch {
        setError("حصل مشكلة في تحميل الفيديو");
      } finally {
        setLoading(false);
      }
    }

    fetchUrl();
  }, [videoId]);

  if (loading) {
    return (
      <div className="aspect-video bg-black/90 rounded-xl flex items-center justify-center">
        <IconLoader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-video bg-black/90 rounded-xl flex flex-col items-center justify-center gap-3 text-white/70">
        <IconLock className="h-10 w-10" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
      {/* Watermark — اسم الطالب */}
      {watermark && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <span
            className="text-white/10 text-xl md:text-2xl font-bold rotate-[-20deg] select-none"
            style={{ textShadow: "none" }}
          >
            {watermark}
          </span>
        </div>
      )}

      {/* Bunny iframe player */}
      <iframe
        src={embedUrl || ""}
        title={title || "فيديو الدرس"}
        className="w-full h-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        allowFullScreen
        style={{ border: 0 }}
      />
    </div>
  );
}
