"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
            <IconAlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">حصل مشكلة</h1>
          <p className="text-muted-foreground">
            في حاجة غلط حصلت. جرّب تحمّل الصفحة تاني.
          </p>
        </div>

        <Button onClick={reset} variant="gradient">
          <IconRefresh className="h-4 w-4" />
          حاول تاني
        </Button>
      </div>
    </div>
  );
}
