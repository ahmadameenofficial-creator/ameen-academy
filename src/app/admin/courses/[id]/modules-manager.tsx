"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconPlus, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ModuleCard } from "@/components/admin/modules";
import type { Module, Lesson } from "@/components/admin/modules";
import { uploadVideoViaTus, type TusUploadCredentials } from "@/lib/upload";
import { useToast } from "@/components/ui/toast";
import { apiPost, apiPut, apiDelete, API } from "@/lib/api";

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
  const { success, error } = useToast();

  // ============ Modules ============

  async function addModule() {
    if (!newModuleTitle.trim()) return;
    setAddingModule(true);
    try {
      const module = await apiPost<{ id: string; title: string; order: number }>(
        API.admin.courses.modules(courseId),
        { title: newModuleTitle },
      );
      setModules((prev) => [...prev, { ...module, lessons: [] }]);
      setNewModuleTitle("");
      router.refresh();
    } catch {
      error("معرفناش نضيف الموديول، جرّب تاني");
    }
    setAddingModule(false);
  }

  async function deleteModule(moduleId: string) {
    if (!confirm("متأكد من حذف الموديول ده وكل الدروس اللي فيه؟")) return;
    setLoading(moduleId);
    try {
      await apiDelete(API.admin.courses.module(courseId, moduleId));
      setModules((prev) => prev.filter((m) => m.id !== moduleId));
      router.refresh();
    } catch {
      error("معرفناش نحذف الموديول، جرّب تاني");
    }
    setLoading(null);
  }

  // ============ Lessons ============

  async function addLesson(moduleId: string, data: { title: string; duration: number; isFree: boolean; video: File | null }) {
    setLoading(`lesson-${moduleId}`);
    try {
      const lesson = await apiPost<Lesson>(
        API.admin.courses.lessons(courseId, moduleId),
        { title: data.title, duration: data.duration * 60, isFree: data.isFree },
      );
      if (data.video) {
        const videoId = await uploadVideoForLesson(lesson.id, data.title, data.video);
        if (videoId) lesson.videoId = videoId;
        else error("الدرس اتضاف بس رفع الفيديو فشل — جرّب ترفعه تاني");
      }
      setModules((prev) => prev.map((m) => m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m));
      setAddingLessonTo(null);
      router.refresh();
    } catch {
      error("معرفناش نضيف الدرس، جرّب تاني");
    }
    setLoading(null);
  }

  async function deleteLesson(lessonId: string, moduleId: string) {
    if (!confirm("متأكد من حذف الدرس ده؟")) return;
    setLoading(lessonId);
    try {
      await apiDelete(API.admin.lessons.delete(lessonId));
      setModules((prev) =>
        prev.map((m) => m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m),
      );
      router.refresh();
    } catch {
      error("معرفناش نحذف الدرس, جرّب تاني");
    }
    setLoading(null);
  }

  // ============ Video Upload ============

  async function uploadVideoForLesson(lessonId: string, title: string, file: File): Promise<string | null> {
    try {
      setUploadingFor(lessonId);
      setUploadProgress(0);

      // (1) إنشاء الفيديو + الحصول على توقيع رفع مؤقت (المفتاح بيفضل على السيرفر)
      const creds = await apiPost<TusUploadCredentials>(API.admin.videos.create, { title });

      // (2) الرفع المباشر للـ Bunny عبر TUS — التوقيع بييجي من السيرفر والمفتاح مبيخرجش
      await uploadVideoViaTus(creds, file, (pct) => setUploadProgress(Math.round(pct * 0.9)));

      // (3) ربط الفيديو بالدرس
      setUploadProgress(95);
      await apiPut(API.admin.lessons.update(lessonId), { videoId: creds.videoId });
      setUploadProgress(100);
      success("تم رفع الفيديو بنجاح");
      return creds.videoId;
    } catch {
      error("فشل رفع الفيديو، جرّب تاني");
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
