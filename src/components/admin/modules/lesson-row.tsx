"use client";

import {
  IconPlayerPlay,
  IconLock,
  IconCheck,
  IconX,
  IconUpload,
  IconTrash,
  IconLoader2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoUploadProgress } from "./video-upload-progress";
import type { Lesson } from "./types";

interface LessonRowProps {
  lesson: Lesson;
  isLoading: boolean;
  isUploading: boolean;
  uploadProgress: number;
  onDelete: () => void;
  onUpload: () => void;
}

export function LessonRow({
  lesson,
  isLoading,
  isUploading,
  uploadProgress,
  onDelete,
  onUpload,
}: LessonRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        {lesson.isFree ? (
          <IconPlayerPlay className="h-4 w-4 text-brand-500" />
        ) : (
          <IconLock className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-foreground">{lesson.title}</span>
        {lesson.isFree && <Badge variant="success" className="text-[10px]">مجاني</Badge>}
        {lesson.videoId ? (
          <Badge variant="default" className="text-[10px] gap-1">
            <IconCheck className="h-2.5 w-2.5" /> فيديو
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300 gap-1">
            <IconX className="h-2.5 w-2.5" /> بدون فيديو
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isUploading ? (
          <VideoUploadProgress progress={uploadProgress} />
        ) : (
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={onUpload}>
            <IconUpload className="h-3 w-3" />
            {lesson.videoId ? "استبدال" : "رفع فيديو"}
          </Button>
        )}
        <span className="text-xs text-muted-foreground">
          {Math.floor(lesson.duration / 60)} دقيقة
        </span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDelete} disabled={isLoading}>
          {isLoading ? (
            <IconLoader2 className="h-3 w-3 animate-spin" />
          ) : (
            <IconTrash className="h-3 w-3 text-destructive" />
          )}
        </Button>
      </div>
    </div>
  );
}
