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
  IconVideo,
  IconUpload,
  IconCheck,
  IconX,
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
  const [newLessonVideo, setNewLessonVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ============ Modules ============

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

  // ============ Lessons ============

  async function addLesson(moduleId: string) {
    if (!newLessonTitle.trim()) return;
    setLoading(`lesson-${moduleId}`);

    try {
      // الخطوة 1: إضافة الدرس
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

        // الخطوة 2: رفع الفيديو لو موجود
        if (newLessonVideo) {
          const videoId = await uploadVideoForLesson(lesson.id, newLessonTitle, newLessonVideo);
          if (videoId) {
            lesson.videoId = videoId;
          }
        }

        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m
          )
        );
        setNewLessonTitle("");
        setNewLessonDuration(0);
        setNewLessonFree(false);
        setNewLessonVideo(null);
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

  // ============ رفع فيديو ============

  async function uploadVideoForLesson(lessonId: string, title: string, file: File): Promise<string | null> {
    try {
      setUploadingFor(lessonId);
      setUploadProgress(0);

      // 1. إنشاء الفيديو على Bunny
      const createRes = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!createRes.ok) throw new Error("فشل إنشاء الفيديو");
      const { videoId } = await createRes.json();

      // 2. رفع الفيديو
      setUploadProgress(10);
      const uploadRes = await fetch(`/api/admin/videos/${videoId}/upload`, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) throw new Error("فشل رفع الفيديو");
      setUploadProgress(80);

      // 3. ربط الفيديو بالدرس
      await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      setUploadProgress(100);
      return videoId;
    } catch (err) {
      console.error("Video upload failed:", err);
      return null;
    } finally {
      setTimeout(() => {
        setUploadingFor(null);
        setUploadProgress(0);
      }, 1500);
    }
  }

  async function handleUploadForExisting(lessonId: string, moduleId: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const lesson = modules
        .find((m) => m.id === moduleId)
        ?.lessons.find((l) => l.id === lessonId);

      const videoId = await uploadVideoForLesson(lessonId, lesson?.title || "فيديو", file);

      if (videoId) {
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId
              ? {
                  ...m,
                  lessons: m.lessons.map((l) =>
                    l.id === lessonId ? { ...l, videoId } : l
                  ),
                }
              : m
          )
        );
        router.refresh();
      }
    };
    input.click();
  }

  // ============ Render ============

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
                    {/* حالة الرفع */}
                    {uploadingFor === lesson.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-1.5">
                          <div
                            className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-brand-500">{uploadProgress}%</span>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={() => handleUploadForExisting(lesson.id, module.id)}
                      >
                        <IconUpload className="h-3 w-3" />
                        {lesson.videoId ? "استبدال" : "رفع فيديو"}
                      </Button>
                    )}
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

              {/* فورم إضافة درس جديد */}
              {addingLessonTo === module.id && (
                <div className="p-4 bg-muted/30 border-t border-border space-y-3">
                  <Input
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="عنوان الدرس"
                    autoFocus
                  />
                  <div className="flex items-center gap-3 flex-wrap">
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
                  </div>

                  {/* رفع فيديو مع الدرس */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer ${
                      newLessonVideo ? "border-brand-300 bg-brand-50/30" : "border-border hover:border-brand-300"
                    }`}
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "video/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) setNewLessonVideo(file);
                      };
                      input.click();
                    }}
                  >
                    {newLessonVideo ? (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <IconVideo className="h-5 w-5 text-brand-500" />
                        <span className="text-foreground font-medium">{newLessonVideo.name}</span>
                        <span className="text-muted-foreground">
                          ({(newLessonVideo.size / (1024 * 1024)).toFixed(1)} MB)
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewLessonVideo(null);
                          }}
                          className="text-destructive hover:bg-destructive/10 rounded p-0.5"
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <IconUpload className="h-5 w-5" />
                        <span>اضغط لاختيار فيديو الدرس (اختياري)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => addLesson(module.id)}
                      disabled={loading === `lesson-${module.id}` || !newLessonTitle.trim()}
                    >
                      {loading === `lesson-${module.id}` ? (
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <IconPlus className="h-4 w-4" />
                          {newLessonVideo ? "إضافة + رفع" : "إضافة"}
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setAddingLessonTo(null);
                        setNewLessonVideo(null);
                      }}
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
