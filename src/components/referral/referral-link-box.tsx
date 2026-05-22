"use client";

import { useState } from "react";
import { IconCopy, IconCheck, IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function ReferralLinkBox({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      success("اتنسخ اللينك! ابعته لأصحابك");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      error("معرفناش ننسخ، انسخه يدوي");
    }
  }

  const waText = encodeURIComponent(`اتعلم مهارات تجيبلك فلوس من أكاديمية أمين 👇\n${link}`);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-2">
        <input
          readOnly
          value={link}
          dir="ltr"
          className="flex-1 min-w-0 bg-transparent px-2 text-sm text-foreground outline-none truncate"
          onFocus={(e) => e.target.select()}
        />
        <Button size="sm" onClick={copy} className="shrink-0">
          {copied ? (
            <>
              <IconCheck className="h-4 w-4" /> اتنسخ
            </>
          ) : (
            <>
              <IconCopy className="h-4 w-4" /> انسخ
            </>
          )}
        </Button>
      </div>

      <a
        href={`https://wa.me/?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <IconBrandWhatsapp className="h-4 w-4" />
        شيّر على واتساب
      </a>
    </div>
  );
}
