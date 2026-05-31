"use client";

import { useState } from "react";
import { IconLoader2, IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { apiPut, ApiError, API } from "@/lib/api";

interface PhoneGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** بعد ما يحفظ رقمه بنجاح */
  onSuccess: () => void;
  /** الاسم الحالي للمستخدم — مطلوب في تحديث البروفايل */
  name: string;
}

/**
 * بياخد رقم الواتساب من المستخدم اللي مسجّل بجوجل (ملوش رقم).
 * التسجيل بقى مرة واحدة عالموقع — ده بس بياخد الرقم الناقص.
 */
export function PhoneGateModal({ open, onOpenChange, onSuccess, name }: PhoneGateModalProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!phone.trim()) return setError("سيبلنا رقم الواتساب عشان نوصلك");

    setLoading(true);
    try {
      await apiPut(API.profile.update, { name, phone });
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "حصل مشكلة، جرّب تاني");
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-green-50">
            <IconBrandWhatsapp className="size-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">
            رقم واتساب واحد وتبدأ
          </DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            عشان نوصلك بالجديد ونساعدك وانت ماشي — سيبلنا رقمك على واتساب
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="mt-2 space-y-3">
          <PhoneInput value={phone} onChange={setPhone} />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full">
            {loading ? <IconLoader2 className="size-5 animate-spin" /> : "ابدأ الكورس ببلاش"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            مفيش سبام — بس عشان نقدر نوصلك ونساعدك.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
