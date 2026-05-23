"use client";

import { useState } from "react";
import { IconLoader2, IconCheck, IconBrandWhatsapp, IconMail, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { apiPost, ApiError, API } from "@/lib/api";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("اكتب اسمك");
    if (!phone.trim() && !email.trim()) return setError("سيبلنا واتساب أو إيميل عشان نوصلك");

    setLoading(true);
    try {
      await apiPost(API.leads, { name, phone, email, source: "free-course" });
      setDone(true);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-100">
          <IconCheck className="size-6 text-green-600" />
        </div>
        <p className="font-bold text-green-800">تمام يا بطل! 🎉</p>
        <p className="mt-1 text-sm text-green-700">
          سجّلناك. هتكون أول واحد ياخد الكورس أول ما ينزل — استنانا.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
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
          "احجزلي مكاني — هكون أول واحد"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        مفيش سبام. هنبعتلك بس أول ما الكورس ينزل.
      </p>
    </form>
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
