"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconTrash, IconLoader2 } from "@tabler/icons-react";

export function DeleteLiveButton({ liveId }: { liveId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("متأكد من حذف اللايف ده؟")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/vip/lives/${liveId}`, { method: "DELETE" });
      if (!res.ok) {
        alert("حصلت مشكلة في الحذف");
        return;
      }
      router.refresh();
    } catch {
      alert("حصلت مشكلة");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
      title="حذف"
    >
      {loading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconTrash className="h-4 w-4" />}
    </button>
  );
}
