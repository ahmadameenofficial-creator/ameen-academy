"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCheck,
  IconPlayerPlay,
  IconChevronDown,
  IconX,
  IconList,
} from "@tabler/icons-react";
import { formatDuration } from "@/lib/format";

interface Module {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: number }[];
}

interface CourseSidebarProps {
  courseTitle: string;
  courseSlug: string;
  modules: Module[];
  completedIds: string[];
  totalLessons: number;
}

export function CourseSidebar({
  courseTitle,
  courseSlug,
  modules,
  completedIds,
  totalLessons,
}: CourseSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // نعرف الدرس الحالي من الـ URL
  const currentLessonId = pathname.split("/lessons/")[1]?.split("/")[0] || "";
  const completedSet = new Set(completedIds);
  const completedCount = completedIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // نحسب الدرس الحالي رقم كام
  const allLessons = modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  const sidebarContent = (
    <>
      {/* هيدر السايدبار */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/dashboard/courses/${courseSlug}`}
            className="text-sm font-bold text-foreground hover:text-brand-600 transition-colors line-clamp-1"
          >
            {courseTitle}
          </Link>
          {/* زرار القفل في الموبايل بس */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="إغلاق القائمة"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* شريط التقدم */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {completedCount}/{totalLessons}
          </span>
        </div>
      </div>

      {/* قائمة الدروس */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {modules.map((module) => {
          const moduleDone = module.lessons.every((l) => completedSet.has(l.id));

          return (
            <div key={module.id}>
              {/* عنوان الموديول */}
              <div className="sticky top-0 z-10 px-4 py-2.5 bg-muted/60 backdrop-blur-sm border-b border-border">
                <div className="flex items-center gap-2">
                  {moduleDone && (
                    <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <IconCheck className="h-2.5 w-2.5 text-green-600" />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-muted-foreground truncate">
                    {module.title}
                  </span>
                </div>
              </div>

              {/* الدروس */}
              {module.lessons.map((lesson) => {
                const isCurrent = lesson.id === currentLessonId;
                const done = completedSet.has(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/courses/${courseSlug}/lessons/${lesson.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm border-b border-border/50 transition-all ${
                      isCurrent
                        ? "bg-brand-50 border-r-[3px] border-r-brand-500"
                        : "hover:bg-muted/40 active:bg-muted/60"
                    }`}
                  >
                    {/* أيقونة الحالة */}
                    <div className="shrink-0">
                      {done ? (
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <IconCheck className="h-3.5 w-3.5 text-green-600" />
                        </div>
                      ) : isCurrent ? (
                        <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center">
                          <IconPlayerPlay className="h-3.5 w-3.5 text-brand-600" />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                          <IconPlayerPlay className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* عنوان الدرس */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block truncate ${
                          isCurrent
                            ? "font-medium text-brand-700"
                            : done
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      {lesson.duration > 0 && (
                        <span className="text-[11px] text-muted-foreground">
                          {formatDuration(lesson.duration)}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* زرار فتح القائمة في الموبايل — ثابت في أسفل الشاشة */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-full shadow-lg shadow-brand-500/30 hover:bg-brand-500 active:scale-95 transition-all"
      >
        <IconList className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentIndex >= 0 ? `${currentIndex + 1}/${totalLessons}` : "الدروس"}
        </span>
      </button>

      {/* السايدبار في الموبايل — overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* خلفية شفافة */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* القائمة */}
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* السايدبار في الديسكتوب — ثابت */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 border-r border-border bg-background h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>
    </>
  );
}
