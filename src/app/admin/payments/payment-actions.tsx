"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconX, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function PaymentActions({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: "approve" | "reject") {
    if (action === "reject" && !confirm("متأكد إنك عايز ترفض الدفعة دي؟")) return;
    setLoading(action);

    try {
      const res = await fetch(`/api/admin/payments/${paymentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (res.ok) router.refresh();
    } catch {}
    setLoading(null);
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        size="sm"
        onClick={() => handleAction("approve")}
        disabled={loading !== null}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {loading === "approve" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <><IconCheck className="h-4 w-4" /> تأكيد</>
        )}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleAction("reject")}
        disabled={loading !== null}
      >
        {loading === "reject" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <><IconX className="h-4 w-4" /> رفض</>
        )}
      </Button>
    </div>
  );
}
