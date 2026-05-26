"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconCertificate, IconConfetti } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";

export function CompletionBanner({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const [celebrate] = useState(true); // يظهر أول ما الصفحة تتحمل

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
            asChild
            className="bg-white text-brand-700 hover:bg-white/90"
          >
            <Link href={`/api/certificates?courseId=${courseId}`}>
              <IconCertificate className="size-4" />
              حمّل الشهادة
            </Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
