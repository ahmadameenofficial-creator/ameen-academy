"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";
import { REFERRAL_STORAGE_KEY } from "@/components/referral-capture";

interface GoogleButtonProps {
  callbackUrl?: string;
  label?: string;
}

export function GoogleButton({
  callbackUrl = "/dashboard",
  label = "كمّل بحساب جوجل",
}: GoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // ننقل كود الإحالة (لو موجود) لكوكي عشان يتربط مع حساب جوجل الجديد
    try {
      const ref = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (ref) {
        document.cookie = `ameen_ref=${encodeURIComponent(
          ref,
        )}; path=/; max-age=1800; samesite=lax`;
      }
    } catch {
      // localStorage مش متاح — نتجاهل
    }
    signIn("google", { callbackUrl });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
    >
      {isLoading ? (
        <IconLoader2 className="h-5 w-5 animate-spin" />
      ) : (
        <IconBrandGoogle className="h-5 w-5 text-brand-500" />
      )}
      <span>{label}</span>
    </button>
  );
}
