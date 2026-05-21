"use client";

import {
  IconPlus,
  IconTrash,
  IconLoader2,
  IconChevronDown,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LessonRow } from "./lesson-row";
import { LessonForm } from "./lesson-form";
import type { Module } from "./types";

interface ModuleCardProps {
  module: Module;
  isAddingLesson: boolean;
  loadingId: string | null;
  uploadingFor: string | null;
  uploadProgress: number;
  onDeleteModule: () => void;
  onToggleLessonForm: () => void;
  onAddLesson: (data: { title: string; duration: number; isFree: boolean; video: File | null }) => void;
  onDeleteLesson: (lessonId: string) => void;
  onUploadVideo: (lessonId: string) => void;
  onCancelLessonForm: () => void;
}

export function ModuleCard({
  module,
  isAddingLesson,
  loadingId,
  uploadingFor,
  uploadProgress,
  onDeleteModule,
  onToggleLessonForm,
  onAddLesson,
  onDeleteLesson,
  onUploadVideo,
  onCancelLessonForm,
}: ModuleCardProps) {
  return (
    <Card className="overflow-hidden">
      <details open>
        <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <IconChevronDown className="h-4 w-4 text-brand-500" />
            <span className="font-medium text-foreground">{module.title}</span>
            <Badge variant="soft">{module.lessons.length} درس</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => { e.preventDefault(); onToggleLessonForm(); }}
            >
              <IconPlus className="h-4 w-4 text-brand-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => { e.preventDefault(); onDeleteModule(); }}
              disabled={loadingId === module.id}
            >
              {loadingId === module.id ? (
                <IconLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <IconTrash className="h-4 w-4 text-destructive" />
              )}
            </Button>
          </div>
        </summary>

        <div className="border-t border-border">
          {module.lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              isLoading={loadingId === lesson.id}
              isUploading={uploadingFor === lesson.id}
              uploadProgress={uploadProgress}
              onDelete={() => onDeleteLesson(lesson.id)}
              onUpload={() => onUploadVideo(lesson.id)}
            />
          ))}

          {isAddingLesson && (
            <LessonForm
              isLoading={loadingId === `lesson-${module.id}`}
              onSubmit={onAddLesson}
              onCancel={onCancelLessonForm}
            />
          )}
        </div>
      </details>
    </Card>
  );
}
