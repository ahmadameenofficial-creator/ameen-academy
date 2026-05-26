"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FreeEnrollButton } from "@/components/free-course/free-enroll-button";

interface EnrollCtaProps {
  slug: string;
  price: number;
  isLoggedIn: boolean;
  isEnrolled: boolean;
  /** السيرفر شيّك وإيميله موجود في Leads */
  serverLeadCaptured?: boolean;
  size?: "lg" | "xl";
  fullWidth?: boolean;
}

/**
 * زر ذكي — لو الكورس مجاني يفتح LeadGate (لو محتاج)، لو مدفوع يروح Checkout
 */
export function EnrollCta({
  slug,
  price,
  isLoggedIn,
  isEnrolled,
  serverLeadCaptured = false,
  size = "xl",
  fullWidth = true,
}: EnrollCtaProps) {
  const isFree = price === 0;

  if (isFree) {
    return (
      <FreeEnrollButton
        isLoggedIn={isLoggedIn}
        isEnrolled={isEnrolled}
        slug={slug}
        serverLeadCaptured={serverLeadCaptured}
        size={size}
        fullWidth={fullWidth}
      />
    );
  }

  if (isEnrolled) {
    return (
      <Button
        variant="gradient"
        size={size}
        className={fullWidth ? "w-full text-base" : "text-base"}
        asChild
      >
        <Link href="/dashboard">كمّل تعلّم</Link>
      </Button>
    );
  }

  return (
    <Button
      variant="gradient"
      size={size}
      className={fullWidth ? "w-full text-base" : "text-base"}
      asChild
    >
      <Link href={isLoggedIn ? `/courses/${slug}/checkout` : "/login"}>
        اشتري دلوقتي
      </Link>
    </Button>
  );
}
