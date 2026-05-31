"use client";

import { IconFileDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// زرار تحميل البريف PDF — بيستخدم طباعة المتصفح (اختار "حفظ كـ PDF")
// من غير أي مكتبة خارجية — خفيف زي ما المشروع عايز
export function BriefPrintButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => window.print()}
      className={className}
    >
      <IconFileDownload size={18} />
      حمّل البريف PDF
    </Button>
  );
}
