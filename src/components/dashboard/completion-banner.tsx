"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconCertificate, IconConfetti, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { useToast } from "@/components/ui/toast";

export function CompletionBanner({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const [celebrate] = useState(true); // يظهر أول ما الصفحة تتحمل
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  // 1) ننشئ الشهادة (POST) ونرجع الـ certificateCode
  // 2) نفتح صفحة الـ PDF (GET /api/certificates/[code]) في تبويب جديد
  async function downloadCertificate() {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حصل مشكلة في إصدار الشهادة");

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
            onClick={downloadCertificate}
            disabled={loading}
            className="bg-white text-brand-700 hover:bg-white/90"
          >
            {loading ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <IconCertificate className="size-4" />
            )}
            {loading ? "بنحضّر الشهادة..." : "حمّل الشهادة"}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
