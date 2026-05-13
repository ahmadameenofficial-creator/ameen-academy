"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconTrash,
  IconLoader2,
  IconPlayerPlay,
  IconLock,
  IconChevronDown,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
  order: number;
  videoId: string | null;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export function ModulesManager({
  courseId,
  initialModules,
}: {
  courseId: string;
  initialModules: Module[];
}) {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [addingModule, setAddingModule] = useState(false);
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState(0);
  const [newLessonFree, setNewLessonFree] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  async function addModule() {
    if (!newModuleTitle.trim()) return;
    setAddingModule(true);

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newModuleTitle }),
      });

      if (res.ok) {
        const module = await res.json();
        setModules((prev) => [...prev, { ...module, lessons: [] }]);
        setNewModuleTitle("");
        router.refresh();
      }
    } catch {}
    setAddingModule(false);
  }

  async function deleteModule(moduleId: string) {
    if (!confirm("متأكد من حذف الموديول ده وكل الدروس اللي فيه؟")) return;
    setLoading(moduleId);

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setModules((prev) => prev.filter((m) => m.id !== moduleId));
        router.refresh();
      }
    } catch {}
    setLoading(null);
  }

  async function addLesson(moduleId: string) {
    if (!newLessonTitle.trim()) return;
    setLoading(`lesson-${moduleId}`);

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newLessonTitle,
          duration: newLessonDuration * 60,
          isFree: newLessonFree,
        }),
      });

      if (res.ok) {
        const lesson = await res.json();
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m
          )
        );
        setNewLessonTitle("");
        setNewLessonDuration(0);
        setNewLessonFree(false);
        setAddingLessonTo(null);
        router.refresh();
      }
    } catch {}
    setLoading(null);
  }

  async function deleteLesson(lessonId: string, moduleId: string) {
    if (!confirm("متأكد من حذف الدرس ده؟")) return;
    setLoading(lessonId);

    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, { method: "DELETE" });
      if (res.ok) {
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId
              ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
              : m
          )
        );
        router.refresh();
      }
    } catch {}
    setLoading(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">المحتوى</h2>
        <span className="text-sm text-muted-foreground">
          {modules.length} موديول — {modules.reduce((s, m) => s + m.lessons.length, 0)} درس
        </span>
      </div>

      {modules.map((module) => (
        <Card key={module.id} className="overflow-hidden">
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
                  onClick={(e) => {
                    e.preventDefault();
                    setAddingLessonTo(addingLessonTo === module.id ? null : module.id);
                  }}
                >
                  <IconPlus className="h-4 w-4 text-brand-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteModule(module.id);
                  }}
                  disabled={loading === module.id}
                >
                  {loading === module.id ? (
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <IconTrash className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </div>
            </summary>

            <div className="border-t border-border">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between px-4 py-3 text-sm border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    {lesson.isFree ? (
                      <IconPlayerPlay className="h-4 w-4 text-brand-500" />
                    ) : (
                      <IconLock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-foreground">{lesson.title}</span>
                    {lesson.isFree && <Badge variant="success" className="text-[10px]">مجاني</Badge>}
                    {lesson.videoId && <Badge variant="default" className="text-[10px]">فيديو</Badge>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(lesson.duration / 60)} دقيقة
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => deleteLesson(lesson.id, module.id)}
                      disabled={loading === lesson.id}
                    >
                      {loading === lesson.id ? (
                        <IconLoader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <IconTrash className="h-3 w-3 text-destructive" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}

              {addingLessonTo === module.id && (
                <div className="p-4 bg-muted/30 border-t border-border space-y-3">
                  <Input
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="عنوان الدرس"
                    autoFocus
                  />
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={newLessonDuration || ""}
                      onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                      placeholder="المدة (دقائق)"
                      className="w-32"
                      dir="ltr"
                      min={0}
                    />
                    <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={newLessonFree}
                        onChange={(e) => setNewLessonFree(e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                      مجاني
                    </label>
                    <Button
                      size="sm"
                      onClick={() => addLesson(module.id)}
                      disabled={loading === `lesson-${module.id}`}
                    >
                      {loading === `lesson-${module.id}` ? (
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "إضافة"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setAddingLessonTo(null)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </details>
        </Card>
      ))}

      {/* إضافة موديول جديد */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Input
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="اسم الموديول الجديد"
            onKeyDown={(e) => e.key === "Enter" && addModule()}
          />
          <Button onClick={addModule} disabled={addingModule || !newModuleTitle.trim()}>
            {addingModule ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              <><IconPlus className="h-4 w-4" /> إضافة</>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
