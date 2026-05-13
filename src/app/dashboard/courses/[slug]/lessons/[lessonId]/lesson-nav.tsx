"use client";

import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface LessonNavProps {
  slug: string;
  lessonId: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
  isCompleted: boolean;
}

export function LessonNav({ slug, prevLesson, nextLesson }: LessonNavProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {prevLesson ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/courses/${slug}/lessons/${prevLesson.id}`}>
            <IconArrowRight className="h-4 w-4" />
            {prevLesson.title}
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Button variant="soft" size="sm" asChild>
          <Link href={`/dashboard/courses/${slug}/lessons/${nextLesson.id}`}>
            {nextLesson.title}
            <IconArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="soft" size="sm" asChild>
          <Link href={`/dashboard/courses/${slug}`}>
            رجوع للمحتوى
          </Link>
        </Button>
      )}
    </div>
  );
}
