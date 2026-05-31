"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPost, ApiError, API } from "@/lib/api";
import { PhoneGateModal } from "@/components/free-course/phone-gate-modal";

interface ClaimButtonProps {
  isLoggedIn: boolean;
  alreadyEnrolled: boolean;
  slug: string;
  /** عند المستخدم رقم واتساب محفوظ؟ (مستخدمي جوجل ممكن مايكونش عندهم) */
  hasPhone?: boolean;
  /** اسم المستخدم — محتاجينه لو هنطلب الرقم */
  userName?: string;
}

export function ClaimFreeButton({
  isLoggedIn,
  alreadyEnrolled,
  slug,
  hasPhone = false,
  userName = "",
}: ClaimButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const { error } = useToast();

  // لو مشترك بالفعل → روح للكورس على طول
  if (alreadyEnrolled) {
    return (
      <Button asChild variant="gradient" size="xl" className="w-full sm:w-auto">
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
    proceedToClaim();
  }

  function handlePhoneSuccess() {
    setShowPhoneModal(false);
    proceedToClaim();
  }

  async function proceedToClaim() {
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
        size="xl"
        className="w-full sm:w-auto"
      >
        {loading ? (
          <IconLoader2 className="size-5 animate-spin" />
        ) : (
          <>
            ابدأ دلوقتي ببلاش
            <IconArrowLeft className="size-5" />
          </>
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
