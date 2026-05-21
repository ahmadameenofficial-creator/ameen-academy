"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconPlus, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ModuleCard } from "@/components/admin/modules";
import type { Module } from "@/components/admin/modules";

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
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}`, { method: "DELETE" });
      if (res.ok) {
        setModules((prev) => prev.filter((m) => m.id !== moduleId));
        router.refresh();
      }
    } catch {}
    setLoading(null);
  }

  // ============ Lessons ============

  async function addLesson(moduleId: string, data: { title: string; duration: number; isFree: boolean; video: File | null }) {
    setLoading(`lesson-${moduleId}`);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title, duration: data.duration * 60, isFree: data.isFree }),
      });
      if (res.ok) {
        const lesson = await res.json();
        if (data.video) {
          const videoId = await uploadVideoForLesson(lesson.id, data.title, data.video);
          if (videoId) lesson.videoId = videoId;
        }
        setModules((prev) => prev.map((m) => m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m));
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
          prev.map((m) => m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m),
        );
        router.refresh();
      }
    } catch {}
    setLoading(null);
  }

  // ============ Video Upload ============

  async function uploadVideoForLesson(lessonId: string, title: string, file: File): Promise<string | null> {
    try {
      setUploadingFor(lessonId);
      setUploadProgress(0);

      const createRes = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!createRes.ok) throw new Error("فشل إنشاء الفيديو");
      const { videoId, libraryId, apiKey } = await createRes.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`);
        xhr.setRequestHeader("AccessKey", apiKey);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 90));
        };
        xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`فشل الرفع: ${xhr.status}`)));
        xhr.onerror = () => reject(new Error("فشل الاتصال"));
        xhr.send(file);
      });

      setUploadProgress(95);
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
      setTimeout(() => { setUploadingFor(null); setUploadProgress(0); }, 1500);
    }
  }

  function handleUploadForExisting(lessonId: string, moduleId: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const lesson = modules.find((m) => m.id === moduleId)?.lessons.find((l) => l.id === lessonId);
      const videoId = await uploadVideoForLesson(lessonId, lesson?.title || "فيديو", file);
      if (videoId) {
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId
              ? { ...m, lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, videoId } : l)) }
              : m,
          ),
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
        <ModuleCard
          key={module.id}
          module={module}
          isAddingLesson={addingLessonTo === module.id}
          loadingId={loading}
          uploadingFor={uploadingFor}
          uploadProgress={uploadProgress}
          onDeleteModule={() => deleteModule(module.id)}
          onToggleLessonForm={() => setAddingLessonTo(addingLessonTo === module.id ? null : module.id)}
          onAddLesson={(data) => addLesson(module.id, data)}
          onDeleteLesson={(lessonId) => deleteLesson(lessonId, module.id)}
          onUploadVideo={(lessonId) => handleUploadForExisting(lessonId, module.id)}
          onCancelLessonForm={() => setAddingLessonTo(null)}
        />
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
              <>
                <IconPlus className="h-4 w-4" /> إضافة
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
