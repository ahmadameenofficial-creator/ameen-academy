"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPost, ApiError, API } from "@/lib/api";
import { LeadGateModal, hasLeadCaptured, markLeadCaptured } from "@/components/free-course/lead-gate-modal";

interface FreeEnrollButtonProps {
  isLoggedIn: boolean;
  isEnrolled: boolean;
  slug: string;
  /** السيرفر شيّك وإيميله موجود في Leads */
  serverLeadCaptured?: boolean;
  fullWidth?: boolean;
  size?: "lg" | "xl";
}

export function FreeEnrollButton({
  isLoggedIn,
  isEnrolled,
  slug,
  serverLeadCaptured = false,
  fullWidth = true,
  size = "xl",
}: FreeEnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const { error } = useToast();

  // لو السيرفر قال إنه lead — سجّل في localStorage كمان عشان ميشوفش المودال تاني
  useEffect(() => {
    if (serverLeadCaptured) markLeadCaptured();
  }, [serverLeadCaptured]);

  if (isEnrolled) {
    return (
      <Button
        asChild
        variant="gradient"
        size={size}
        className={fullWidth ? "w-full text-base" : "text-base"}
      >
        <a href={`/dashboard/courses/${slug}`}>
          كمّل الكورس
          <IconArrowLeft className="size-5" />
        </a>
      </Button>
    );
  }

  function handleClick() {
    // لو السيرفر أو localStorage قالوا إنه سجّل قبل كده → كمّل على طول
    if (serverLeadCaptured || hasLeadCaptured()) {
      proceedToEnroll();
      return;
    }
    setShowLeadModal(true);
  }

  function handleLeadSuccess() {
    setShowLeadModal(false);
    proceedToEnroll();
  }

  async function proceedToEnroll() {
    if (!isLoggedIn) {
      router.push("/register?next=/free");
      return;
    }

    setLoading(true);
    try {
      const { slug: courseSlug } = await apiPost<{ slug: string }>(API.enrollments.free, {});
      router.push(`/dashboard/courses/${courseSlug}`);
    } catch (e) {
      error(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={loading}
        variant="gradient"
        size={size}
        className={fullWidth ? "w-full text-base" : "text-base"}
      >
        {loading ? (
          <IconLoader2 className="size-5 animate-spin" />
        ) : (
          "ابدأ ببلاش"
        )}
      </Button>

      <LeadGateModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        onSuccess={handleLeadSuccess}
      />
    </>
  );
}
