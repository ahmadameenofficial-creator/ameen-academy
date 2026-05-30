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
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const [uploadFileSize, setUploadFileSize] = useState<number>(0);
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

      // أضف الدرس للقائمة أولاً (حتى لو الفيديو لسه)
      setModules((prev) => prev.map((m) => m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m));
      setAddingLessonTo(null);
      setLoading(null);

      // لو في فيديو — ارفعه بعد إضافة الدرس (مش هيبلوك الـ UI)
      if (data.video) {
        try {
          const videoId = await uploadVideoForLesson(lesson.id, data.title, data.video);
          if (videoId) {
            setModules((prev) =>
              prev.map((m) => m.id === moduleId
                ? { ...m, lessons: m.lessons.map((l) => l.id === lesson.id ? { ...l, videoId } : l) }
                : m
              ),
            );
          }
        } catch (err) {
          console.error("[Upload] فشل رفع الفيديو مع الدرس:", err);
          error("الدرس اتضاف بنجاح بس رفع الفيديو فشل — جرّب ترفعه تاني من زرار الرفع");
        }
      }

      router.refresh();
    } catch (err) {
      console.error("[Lesson] فشل إضافة الدرس:", err);
      error("معرفناش نضيف الدرس، جرّب تاني");
      setLoading(null);
    }
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
      // فحص الملف قبل الرفع
      if (!file || file.size === 0) {
        error("الملف فاضي أو مش صالح");
        return null;
      }

      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(0);
      console.log(`[Upload] بدء رفع: ${file.name} (${fileSizeMB} MB)`);

      setUploadingFor(lessonId);
      setUploadProgress(0);
      setUploadFileName(file.name);
      setUploadFileSize(file.size);

      // (1) إنشاء الفيديو + الحصول على توقيع رفع مؤقت
      setUploadProgress(1);
      let creds: TusUploadCredentials;
      try {
        creds = await apiPost<TusUploadCredentials>(API.admin.videos.create, { title });
      } catch (err) {
        console.error("[Upload] فشل إنشاء الفيديو:", err);
        error("فشل إنشاء الفيديو — تأكد إن إعدادات Bunny مظبوطة");
        return null;
      }

      if (!creds || !creds.videoId || !creds.signature) {
        console.error("[Upload] بيانات الرفع مش كاملة:", creds);
        error("بيانات الرفع مش كاملة — تأكد من إعدادات Bunny");
        return null;
      }

      console.log(`[Upload] جلسة رفع جاهزة: videoId=${creds.videoId}`);

      // (2) الرفع المباشر للـ Bunny عبر TUS — بنظام chunks
      try {
        await uploadVideoViaTus(creds, file, (pct) => setUploadProgress(Math.max(2, Math.round(pct * 0.95))));
      } catch (err) {
        console.error("[Upload] فشل رفع الفيديو:", err);
        error(`فشل رفع الفيديو: ${err instanceof Error ? err.message : "خطأ غير معروف"}`);
        return null;
      }

      // (3) ربط الفيديو بالدرس
      setUploadProgress(98);
      try {
        await apiPut(API.admin.lessons.update(lessonId), { videoId: creds.videoId });
      } catch (err) {
        console.error("[Upload] فشل ربط الفيديو بالدرس:", err);
        error("الفيديو اترفع بس فشل ربطه بالدرس — جرّب تاني من زرار الرفع");
        return null;
      }

      setUploadProgress(100);
      success(`تم رفع الفيديو بنجاح (${fileSizeMB} MB)`);
      console.log(`[Upload] تم بنجاح: ${file.name}`);
      return creds.videoId;
    } catch (err) {
      console.error("[Upload] خطأ غير متوقع:", err);
      error("حصل مشكلة غير متوقعة — افتح Console في المتصفح وابعتلي الـ error");
      return null;
    } finally {
      setTimeout(() => { setUploadingFor(null); setUploadProgress(0); setUploadFileName(""); setUploadFileSize(0); }, 2000);
    }
  }

  function handleUploadForExisting(lessonId: string, moduleId: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = async (e) => {
      try {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        console.log(`[Upload] تم اختيار ملف: ${file.name} (${(file.size / (1024 * 1024)).toFixed(0)} MB)`);

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
      } catch (err) {
        console.error("[Upload] خطأ في handleUploadForExisting:", err);
        error("حصل مشكلة في رفع الفيديو — شوف Console");
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
          uploadFileName={uploadFileName}
          uploadFileSize={uploadFileSize}
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
