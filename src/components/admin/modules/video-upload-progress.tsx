"use client";

import { useEffect, useRef, useState } from "react";

interface VideoUploadProgressProps {
  progress: number;
  fileName?: string;
  fileSize?: number;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "—";
  if (seconds < 60) return `${Math.round(seconds)} ثانية`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins < 60) return `${mins} د ${secs} ث`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} س ${mins % 60} د`;
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec >= 1024 * 1024) return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
  if (bytesPerSec >= 1024) return `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
  return `${Math.round(bytesPerSec)} B/s`;
}

export function VideoUploadProgress({ progress, fileName, fileSize }: VideoUploadProgressProps) {
  // نتتبع السرعة + الوقت المتبقي
  const [speed, setSpeed] = useState(0); // bytes/sec
  const [eta, setEta] = useState(0); // seconds
  const lastSampleRef = useRef<{ time: number; bytes: number } | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const totalBytes = fileSize || 0;
  const uploadedBytes = Math.floor((progress / 100) * totalBytes);
  const remainingBytes = Math.max(0, totalBytes - uploadedBytes);

  useEffect(() => {
    if (!totalBytes || progress >= 99) return;

    const now = Date.now();
    if (!lastSampleRef.current) {
      lastSampleRef.current = { time: now, bytes: uploadedBytes };
      return;
    }

    const dt = (now - lastSampleRef.current.time) / 1000; // ثواني
    const db = uploadedBytes - lastSampleRef.current.bytes; // bytes

    // نحدّث السرعة كل ثانية على الأقل
    if (dt >= 1 && db > 0) {
      const instantSpeed = db / dt;
      // متوسط متحرّك (smoothing) عشان السرعة ما تتغيرش بسرعة جنونية
      setSpeed((prev) => (prev > 0 ? prev * 0.6 + instantSpeed * 0.4 : instantSpeed));
      setEta(remainingBytes / instantSpeed);
      lastSampleRef.current = { time: now, bytes: uploadedBytes };
    }
  }, [uploadedBytes, totalBytes, progress, remainingBytes]);

  return (
    <div className="flex flex-col gap-1.5 min-w-[200px]">
      {/* اسم الملف + النسبة */}
      <div className="flex items-center justify-between gap-2">
        {fileName && (
          <span className="text-[11px] text-muted-foreground truncate max-w-[140px]" title={fileName}>
            {fileName}
          </span>
        )}
        <span className="text-xs font-bold text-brand-600 shrink-0">{progress}%</span>
      </div>

      {/* شريط التقدم */}
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* المعلومات: تم / المتبقي */}
      {totalBytes > 0 && (
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>
            <span className="text-foreground font-medium">{formatFileSize(uploadedBytes)}</span>
            {" / "}
            {formatFileSize(totalBytes)}
          </span>
          {progress < 100 && (
            <span className="text-brand-600">
              {formatFileSize(remainingBytes)} متبقي
            </span>
          )}
        </div>
      )}

      {/* السرعة + الوقت المتبقي */}
      {speed > 0 && progress < 99 && (
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{formatSpeed(speed)}</span>
          <span>~{formatTime(eta)}</span>
        </div>
      )}

      {progress >= 98 && (
        <span className="text-[10px] text-amber-600">بنتأكد من Bunny...</span>
      )}
    </div>
  );
}
