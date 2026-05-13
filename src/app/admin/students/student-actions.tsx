"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconBan, IconCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface StudentActionsProps {
  studentId: string;
  isBanned: boolean;
}

export function StudentActions({ studentId, isBanned }: StudentActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");

  async function handleToggleBan() {
    if (!isBanned && !showReason) {
      setShowReason(true);
      return;
    }

    if (isBanned) {
      if (!confirm("متأكد إنك عايز تفك الحظر عن الطالب ده؟")) return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isBanned ? "unban" : "ban",
          reason: reason || undefined,
        }),
      });

      if (res.ok) {
        setShowReason(false);
        setReason("");
        router.refresh();
      }
    } catch {}
    setLoading(false);
  }

  if (showReason) {
    return (
      <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="سبب الحظر (اختياري)"
          className="w-full sm:w-56 px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground"
        />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleToggleBan}
            disabled={loading}
          >
            {loading ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <IconBan className="h-4 w-4" />
                تأكيد الحظر
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowReason(false)}
            disabled={loading}
          >
            إلغاء
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0">
      {isBanned ? (
        <Button
          size="sm"
          onClick={handleToggleBan}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconCheck className="h-4 w-4" />
              فك الحظر
            </>
          )}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="destructive"
          onClick={handleToggleBan}
          disabled={loading}
        >
          <IconBan className="h-4 w-4" />
          حظر
        </Button>
      )}
    </div>
  );
}
