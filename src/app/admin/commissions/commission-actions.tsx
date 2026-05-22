"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPut, ApiError, API } from "@/lib/api";

export function CommissionPayButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  async function pay() {
    if (!confirm("متأكد إنك دفعت العمولة دي للمستخدم؟")) return;
    setLoading(true);
    try {
      await apiPut(API.admin.commissions.pay(id), { action: "pay" });
      success("اتعلّمت كمدفوعة");
      router.refresh();
    } catch (e) {
      error(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
    }
    setLoading(false);
  }

  return (
    <Button
      size="sm"
      onClick={pay}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      {loading ? (
        <IconLoader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <IconCheck className="h-4 w-4" /> اتدفعت
        </>
      )}
    </Button>
  );
}
