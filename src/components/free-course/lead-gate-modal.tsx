"use client";

import { useState } from "react";
import { IconLoader2, IconBrandWhatsapp, IconMail, IconUser, IconGift } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { apiPost, ApiError, API } from "@/lib/api";

const LEAD_KEY = "ameen_lead_captured";

/** هل المستخدم سجّل بياناته قبل كده؟ (localStorage) */
export function hasLeadCaptured(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LEAD_KEY) === "1";
}

/** سجّل إن البيانات اتاخدت */
export function markLeadCaptured() {
  localStorage.setItem(LEAD_KEY, "1");
}

interface LeadGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** بعد ما يملا الفورم بنجاح */
  onSuccess: () => void;
}

export function LeadGateModal({ open, onOpenChange, onSuccess }: LeadGateModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("اكتب اسمك");
    if (!phone.trim() && !email.trim()) return setError("سيبلنا واتساب أو إيميل عشان نوصلك");

    setLoading(true);
    try {
      await apiPost(API.leads, { name, phone, email, source: "free-course-gate" });
      markLeadCaptured();
      onSuccess();
    } catch (e) {
      // لو مسجّل قبل كده — كمّل عادي من غير ما يعيد
      if (e instanceof ApiError && e.message.includes("مسجّل")) {
        markLeadCaptured();
        onSuccess();
        return;
      }
      setError(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-brand-50">
            <IconGift className="size-6 text-brand-600" />
          </div>
          <DialogTitle className="text-center text-xl">
            قبل ما تبدأ — عرّفنا بيك
          </DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            سيبلنا اسمك وطريقة نوصلك بيها — وابدأ الكورس المجاني فوراً
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="mt-2 space-y-3">
          <Field icon={IconUser}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمك"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              maxLength={80}
            />
          </Field>
          <Field icon={IconBrandWhatsapp}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="رقم الواتساب"
              dir="ltr"
              inputMode="tel"
              className="w-full bg-transparent text-right text-sm outline-none placeholder:text-muted-foreground"
            />
          </Field>
          <Field icon={IconMail}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="الإيميل (اختياري لو سيبت واتساب)"
              dir="ltr"
              inputMode="email"
              className="w-full bg-transparent text-right text-sm outline-none placeholder:text-muted-foreground"
            />
          </Field>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <IconLoader2 className="size-5 animate-spin" />
            ) : (
              "ابدأ الكورس ببلاش"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            مفيش سبام — بس عشان نعرف مين معانا.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      {children}
    </div>
  );
}
