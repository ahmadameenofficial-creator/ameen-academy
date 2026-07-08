"use client";

import { useState } from "react";
import {
  IconCircleCheck,
  IconBrandWhatsapp,
  IconLoader2,
  IconCalendar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DAY_NAMES } from "@/lib/offline-utils";

type GroupOption = { id: string; name: string; dayOfWeek: number | null };

const initialForm = {
  groupId: "",
  fullName: "",
  email: "",
  whatsapp: "",
  age: "",
  guardianPhone: "",
  address: "",
  notes: "",
  website: "", // honeypot
};

export function JoinForm({
  groups,
  preselectedGroup,
}: {
  groups: GroupOption[];
  preselectedGroup?: string;
}) {
  const [form, setForm] = useState({
    ...initialForm,
    groupId:
      preselectedGroup && groups.some((g) => g.id === preselectedGroup)
        ? preselectedGroup
        : groups.length === 1
          ? groups[0].id
          : "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isMinor = form.age !== "" && Number(form.age) < 18;

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrorMsg("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // فاليديشن سريعة قبل ما نبعت — رسائل واضحة تحت بعض
    if (!form.groupId) return setErrorMsg("اختار المجموعة الأول");
    if (form.fullName.trim().split(/\s+/).length < 3)
      return setErrorMsg("اكتب اسمك الثلاثي كامل");
    if (!form.age || Number(form.age) < 8 || Number(form.age) > 60)
      return setErrorMsg("اكتب سنك صح");
    if (isMinor && !form.guardianPhone)
      return setErrorMsg("سنك تحت 18 — محتاجين رقم ولي أمرك");

    setSending(true);
    try {
      const res = await fetch("/api/offline/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: form.groupId,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.replace(/\D/g, ""),
          guardianPhone: form.guardianPhone.replace(/\D/g, "") || null,
          age: Number(form.age),
          address: form.address.trim(),
          notes: form.notes.trim() || undefined,
          website: form.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "حصل مشكلة — جرب تاني");
        return;
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorMsg("النت فصل؟ جرب تاني");
    } finally {
      setSending(false);
    }
  }

  // ===== شاشة النجاح =====
  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center space-y-4">
        <IconCircleCheck className="h-16 w-16 text-brand-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">طلبك وصلنا ✅</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          هنراجع طلبك ونكلمك واتساب خلال يوم على الأكتر
          <br />
          نأكد معاك المكان والمواعيد وكل التفاصيل
        </p>
        <a
          href="https://wa.me/201090912747?text=%D9%85%D8%B3%D8%A7%D8%A1%20%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%84%D8%B3%D9%87%20%D9%85%D8%B3%D8%AC%D9%84%20%D9%81%D9%8A%20%D9%81%D9%88%D8%B1%D9%85%20%D8%A7%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AD%D8%B6%D9%88%D8%B1%D9%8A%D8%A9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button variant="soft" size="lg">
            <IconBrandWhatsapp className="h-5 w-5 ml-1.5" />
            مستعجل؟ كلمنا واتساب
          </Button>
        </a>
      </div>
    );
  }

  // ===== الفورم =====
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-background p-5 md:p-6 space-y-5"
    >
      {/* اختيار المجموعة */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          المجموعة
        </label>
        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-xl bg-muted p-3">
            مفيش مجموعات متاحة دلوقتي — تابعنا على السوشيال أو كلمنا واتساب
          </p>
        ) : (
          <div className="grid gap-2">
            {groups.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => set("groupId", g.id)}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-right transition-colors ${
                  form.groupId === g.id
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                    : "border-border hover:border-brand-200"
                }`}
              >
                <span className="font-medium text-foreground text-sm">{g.name}</span>
                {g.dayOfWeek !== null && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconCalendar className="h-3.5 w-3.5" />
                    كل {DAY_NAMES[g.dayOfWeek]}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <Field label="اسمك الثلاثي">
        <Input
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="محمد أحمد علي"
          autoComplete="name"
          required
        />
      </Field>

      <Field label="الإيميل">
        <Input
          type="email"
          dir="ltr"
          className="text-left"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@gmail.com"
          autoComplete="email"
          required
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="رقم الواتس">
          <Input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            className="text-left"
            value={form.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder="01xxxxxxxxx"
            autoComplete="tel"
            maxLength={11}
            required
          />
        </Field>
        <Field label="سنك">
          <Input
            type="number"
            inputMode="numeric"
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
            placeholder="مثلا: 17"
            min={8}
            max={60}
            required
          />
        </Field>
      </div>

      {/* رقم ولي الأمر — بيظهر بس لو تحت 18 */}
      {isMinor && (
        <Field label="رقم واتس ولي الأمر" hint="عشان سنك تحت 18 — التواصل بخصوص المواعيد والمتابعة هيكون معاه">
          <Input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            className="text-left"
            value={form.guardianPhone}
            onChange={(e) => set("guardianPhone", e.target.value)}
            placeholder="01xxxxxxxxx"
            maxLength={11}
          />
        </Field>
      )}

      <Field label="ساكن فين؟" hint="المنطقة بس كفاية — بتساعدنا نظبط أماكن المجموعات">
        <Input
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="مثلا: شبرا، المنصورة، 6 أكتوبر..."
          required
        />
      </Field>

      <Field label="عايز تقولنا حاجة؟ (اختياري)">
        <Input
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="أي سؤال أو ظرف خاص"
        />
      </Field>

      {/* honeypot — مخفي عن البشر */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {errorMsg && (
        <p className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={sending || groups.length === 0}
      >
        {sending ? (
          <>
            <IconLoader2 className="h-5 w-5 ml-1.5 animate-spin" />
            ثواني...
          </>
        ) : (
          "احجز مكانك"
        )}
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">
        بياناتك في أمان — بنستخدمها بس للتواصل معاك بخصوص المجموعة
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
