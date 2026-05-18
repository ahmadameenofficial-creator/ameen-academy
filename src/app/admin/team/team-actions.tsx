"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconLoader2,
  IconTrash,
  IconShieldCheck,
  IconChalkboard,
  IconArrowsExchange,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface TeamActionsProps {
  memberId: string;
  memberName: string;
  currentRole: string;
}

export function TeamActions({ memberId, memberName, currentRole }: TeamActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"role" | "remove" | null>(null);

  // تبديل بين أدمن ومدرس
  async function handleToggleRole() {
    const newRole = currentRole === "ADMIN" ? "INSTRUCTOR" : "ADMIN";
    const newLabel = newRole === "ADMIN" ? "أدمن" : "مدرس";

    if (!confirm(`متأكد إنك عايز تغيّر صلاحية "${memberName}" لـ ${newLabel}؟`)) return;

    setLoading("role");
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "حصل مشكلة");
      }
    } catch {
      alert("حصل مشكلة، جرّب تاني");
    }
    setLoading(null);
  }

  // إزالة من الفريق
  async function handleRemove() {
    if (
      !confirm(
        `متأكد إنك عايز تشيل "${memberName}" من الفريق؟\n\nهيرجع حسابه طالب عادي.`
      )
    )
      return;

    setLoading("remove");
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "حصل مشكلة");
      }
    } catch {
      alert("حصل مشكلة، جرّب تاني");
    }
    setLoading(null);
  }

  return (
    <div className="shrink-0 flex items-center gap-2">
      {/* تبديل الصلاحية */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleToggleRole}
        disabled={loading !== null}
        title={currentRole === "ADMIN" ? "حوّل لمدرس" : "حوّل لأدمن"}
      >
        {loading === "role" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <IconArrowsExchange className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentRole === "ADMIN" ? "حوّل لمدرس" : "حوّل لأدمن"}
            </span>
          </>
        )}
      </Button>

      {/* إزالة من الفريق */}
      <Button
        size="sm"
        variant="ghost"
        onClick={handleRemove}
        disabled={loading !== null}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        title="إزالة من الفريق"
      >
        {loading === "remove" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <IconTrash className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
