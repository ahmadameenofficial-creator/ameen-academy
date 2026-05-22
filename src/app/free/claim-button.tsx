"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPost, ApiError, API } from "@/lib/api";

interface ClaimButtonProps {
  isLoggedIn: boolean;
  alreadyEnrolled: boolean;
  slug: string;
}

export function ClaimFreeButton({ isLoggedIn, alreadyEnrolled, slug }: ClaimButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  async function claim() {
    // مش مسجّل؟ ودّيه يعمل حساب وبعدها يرجع ياخد الكورس
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
    <Button
      onClick={claim}
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
  );
}
