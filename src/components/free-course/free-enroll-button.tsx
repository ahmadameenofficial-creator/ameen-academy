"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPost, ApiError, API } from "@/lib/api";
import { PhoneGateModal } from "@/components/free-course/phone-gate-modal";

interface FreeEnrollButtonProps {
  isLoggedIn: boolean;
  isEnrolled: boolean;
  slug: string;
  /** المستخدم عنده رقم واتساب محفوظ؟ (مستخدمي جوجل ممكن مايكونش) */
  hasPhone?: boolean;
  /** اسم المستخدم — محتاجينه لو هنطلب الرقم */
  userName?: string;
  fullWidth?: boolean;
  size?: "lg" | "xl";
}

export function FreeEnrollButton({
  isLoggedIn,
  isEnrolled,
  slug,
  hasPhone = false,
  userName = "",
  fullWidth = true,
  size = "xl",
}: FreeEnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const { error } = useToast();

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
    // التسجيل مرة واحدة هو البوابة — لو مش مسجّل ودّيه يسجّل ويرجع
    if (!isLoggedIn) {
      router.push("/register?callbackUrl=/free");
      return;
    }
    // مسجّل بس ملوش رقم (غالباً دخل بجوجل) → خد رقمه الأول
    if (!hasPhone) {
      setShowPhoneModal(true);
      return;
    }
    proceedToEnroll();
  }

  function handlePhoneSuccess() {
    setShowPhoneModal(false);
    proceedToEnroll();
  }

  async function proceedToEnroll() {
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

      <PhoneGateModal
        open={showPhoneModal}
        onOpenChange={setShowPhoneModal}
        onSuccess={handlePhoneSuccess}
        name={userName}
      />
    </>
  );
}
