"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerTrackNext,
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
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-3">
      {/* الدرس الجاي — يظهر فوق في الموبايل عشان هو الأهم */}
      {nextLesson ? (
        <Link
          href={`/dashboard/courses/${slug}/lessons/${nextLesson.id}`}
          className="flex items-center gap-3 p-3.5 sm:p-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white transition-all group shadow-sm sm:flex-1 sm:justify-end order-first sm:order-last"
        >
          <IconPlayerTrackNext className="h-5 w-5 sm:hidden shrink-0" />
          <div className="min-w-0 flex-1 sm:text-left">
            <span className="text-[11px] text-white/70">الدرس التالي</span>
            <p className="text-sm font-medium truncate">{nextLesson.title}</p>
          </div>
          <div className="hidden sm:flex h-8 w-8 rounded-full bg-white/20 items-center justify-center shrink-0">
            <IconChevronLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
      ) : (
        <Link
          href={`/dashboard/courses/${slug}`}
          className="flex items-center gap-3 p-3.5 sm:p-3 rounded-xl bg-green-600 hover:bg-green-500 active:bg-green-700 text-white transition-all shadow-sm sm:flex-1 sm:justify-end order-first sm:order-last"
        >
          <div className="min-w-0 flex-1 sm:text-left">
            <span className="text-[11px] text-white/70">خلّصت الكورس!</span>
            <p className="text-sm font-medium">رجوع لمحتوى الكورس</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <IconArrowLeft className="h-4 w-4 text-white" />
          </div>
        </Link>
      )}

      {/* الدرس اللي فات */}
      {prevLesson ? (
        <Link
          href={`/dashboard/courses/${slug}/lessons/${prevLesson.id}`}
          className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-brand-200 hover:bg-brand-50/50 active:bg-brand-50 transition-all group sm:flex-1"
        >
          <div className="h-8 w-8 rounded-full bg-muted group-hover:bg-brand-100 flex items-center justify-center shrink-0 transition-colors">
            <IconChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-600 transition-colors" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-muted-foreground">الدرس السابق</span>
            <p className="text-sm font-medium text-foreground truncate">{prevLesson.title}</p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}
    </div>
  );
}
