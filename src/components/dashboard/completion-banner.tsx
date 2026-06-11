"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconCertificate,
  IconConfetti,
  IconLoader2,
  IconX,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { useToast } from "@/components/ui/toast";

export function CompletionBanner({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const [celebrate] = useState(true); // يظهر أول ما الصفحة تتحمل
  const [loading, setLoading] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [certName, setCertName] = useState("");
  const { error } = useToast();

  // الاسم لازم ثلاثي بالإنجليزي: 3 كلمات على الأقل، كل كلمة حرفين أو أكتر
  const nameWords = certName.trim().split(/\s+/).filter((w) => w.length >= 2);
  const nameValid =
    nameWords.length >= 3 &&
    certName.trim().length <= 60 &&
    /^[a-zA-Z\s'.-]+$/.test(certName.trim());

  // 1) ننشئ الشهادة (POST) ونرجع الـ certificateCode
  // 2) نفتح صفحة الـ PDF (GET /api/certificates/[code]) في تبويب جديد
  async function issueCertificate(name?: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, certificateName: name }),
      });
      const data = await res.json();

      // أول إصدار ومفيش اسم ثلاثي مسجّل — نفتح نافذة الاسم
      if (!res.ok && data.needName) {
        setShowNameDialog(true);
        return;
      }
      if (!res.ok) throw new Error(data.error || "حصل مشكلة في إصدار الشهادة");

      setShowNameDialog(false);
      // نفتح الـ PDF في تبويب جديد عشان الطالب يحفظها/يطبعها
      window.open(`/api/certificates/${data.certificateCode}`, "_blank");
    } catch (e) {
      error(e instanceof Error ? e.message : "حصل مشكلة، جرّب تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Confetti trigger={celebrate} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl gradient-brand p-6 text-white text-center"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <IconConfetti className="size-12 mx-auto" />
          </motion.div>
          <h2 className="text-xl font-bold">مبروك! خلّصت {courseTitle}</h2>
          <p className="text-white/80 text-sm">شهادتك جاهزة للتحميل — شاركها على لينكدإن</p>
          <Button
            onClick={() => issueCertificate()}
            disabled={loading}
            className="bg-white text-brand-700 hover:bg-white/90"
          >
            {loading && !showNameDialog ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <IconCertificate className="size-4" />
            )}
            {loading && !showNameDialog ? "بنحضّر الشهادة..." : "حمّل الشهادة"}
          </Button>
        </div>
      </motion.div>

      {/* نافذة الاسم الثلاثي — بتظهر مرة واحدة قبل أول شهادة */}
      {showNameDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !loading && setShowNameDialog(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-foreground">اسمك على الشهادة</h3>
              <button
                onClick={() => setShowNameDialog(false)}
                disabled={loading}
                aria-label="إغلاق"
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <IconX className="size-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              اكتب اسمك <strong className="text-foreground">الثلاثي كامل بالإنجليزي</strong> زي
              ما عايزه يظهر على الشهادة بالظبط.
            </p>

            <input
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="مثال: Ahmed Mohamed Ali"
              autoFocus
              maxLength={60}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              onKeyDown={(e) => e.key === "Enter" && nameValid && issueCertificate(certName)}
            />

            <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
              <IconAlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                الاسم ده هيتطبع على الشهادة زي ما هو ومش هتقدر تغيّره بسهولة بعدين.
                اكتبه <strong>بالإنجليزي</strong> بنفس إملاء باسبورك أو حسابك على لينكدإن.
              </p>
            </div>

            <Button
              onClick={() => issueCertificate(certName)}
              disabled={!nameValid || loading}
              className="w-full"
            >
              {loading ? (
                <IconLoader2 className="size-4 animate-spin" />
              ) : (
                <IconCertificate className="size-4" />
              )}
              {loading ? "بنحضّر الشهادة..." : "أصدر الشهادة باسم ده"}
            </Button>
            {certName.trim() && !nameValid && (
              <p className="text-xs text-destructive text-center">
                الاسم لازم يكون 3 كلمات على الأقل وبالحروف الإنجليزية بس
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
