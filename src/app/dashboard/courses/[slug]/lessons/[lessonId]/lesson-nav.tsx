"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface LessonNavProps {
  slug: string;
  lessonId: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
  isCompleted: boolean;
}

export function LessonNav({ slug, prevLesson, nextLesson }: LessonNavProps) {
  return (
    <div className="flex items-stretch gap-3">
      {/* الدرس اللي فات */}
      {prevLesson ? (
        <Link
          href={`/dashboard/courses/${slug}/lessons/${prevLesson.id}`}
          className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-border hover:border-brand-200 hover:bg-brand-50/50 transition-all group"
        >
          <div className="h-8 w-8 rounded-full bg-muted group-hover:bg-brand-100 flex items-center justify-center shrink-0 transition-colors">
            <IconChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-600 transition-colors" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-muted-foreground">السابق</span>
            <p className="text-sm font-medium text-foreground truncate">{prevLesson.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* الدرس الجاي */}
      {nextLesson ? (
        <Link
          href={`/dashboard/courses/${slug}/lessons/${nextLesson.id}`}
          className="flex-1 flex items-center justify-end gap-3 p-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-all group shadow-sm"
        >
          <div className="min-w-0 text-left">
            <span className="text-[11px] text-white/70">التالي</span>
            <p className="text-sm font-medium truncate">{nextLesson.title}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <IconChevronLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
      ) : (
        <Link
          href={`/dashboard/courses/${slug}`}
          className="flex-1 flex items-center justify-end gap-3 p-3 rounded-xl bg-green-600 hover:bg-green-500 text-white transition-all shadow-sm"
        >
          <div className="min-w-0 text-left">
            <span className="text-[11px] text-white/70">خلّصت!</span>
            <p className="text-sm font-medium">رجوع لمحتوى الكورس</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <IconArrowLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
      )}
    </div>
  );
}
