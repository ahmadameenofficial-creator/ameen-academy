"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconBan, IconCheck, IconLoader2, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPut, apiDelete, ApiError, API } from "@/lib/api";

interface StudentActionsProps {
  studentId: string;
  studentName: string;
  isBanned: boolean;
}

export function StudentActions({ studentId, studentName, isBanned }: StudentActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"ban" | "delete" | null>(null);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const { success, error } = useToast();

  async function handleToggleBan() {
    if (!isBanned && !showReason) {
      setShowReason(true);
      return;
    }

    if (isBanned) {
      if (!confirm("متأكد إنك عايز تفك الحظر عن الطالب ده؟")) return;
    }

    setLoading("ban");
    try {
      await apiPut(API.admin.students.update(studentId), {
        action: isBanned ? "unban" : "ban",
        reason: reason || undefined,
      });
      setShowReason(false);
      setReason("");
      success(isBanned ? "تم فك الحظر" : "تم حظر الطالب");
      router.refresh();
    } catch {
      error("معرفناش ننفّذ العملية، جرّب تاني");
    }
    setLoading(null);
  }

  async function handleDelete() {
    if (
      !confirm(
        `متأكد إنك عايز تحذف حساب "${studentName}" نهائيا؟\n\nده هيحذف كل بياناته: الاشتراكات، المدفوعات، التعليقات، والشهادات.\n\nالعملية دي مش ممكن التراجع عنها.`
      )
    )
      return;

    setLoading("delete");
    try {
      await apiDelete(API.admin.students.delete(studentId));
      success("تم حذف الحساب");
      router.refresh();
    } catch (e) {
      error(e instanceof ApiError ? e.message : "معرفناش نحذف الحساب، جرّب تاني");
    }
    setLoading(null);
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
            disabled={loading !== null}
          >
            {loading === "ban" ? (
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
            disabled={loading !== null}
          >
            إلغاء
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 flex items-center gap-2">
      {isBanned ? (
        <Button
          size="sm"
          onClick={handleToggleBan}
          disabled={loading !== null}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading === "ban" ? (
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
          disabled={loading !== null}
        >
          <IconBan className="h-4 w-4" />
          حظر
        </Button>
      )}
      <Button
        size="sm"
        variant="ghost"
        onClick={handleDelete}
        disabled={loading !== null}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        {loading === "delete" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <IconTrash className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
