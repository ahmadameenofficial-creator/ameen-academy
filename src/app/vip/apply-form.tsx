"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

interface ApplyFormProps {
  prefilledName?: string;
  prefilledEmail?: string;
}

export function ApplyForm({ prefilledName = "", prefilledEmail = "" }: ApplyFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // وقت ظهور الفورم — لو الـ submit حصل بعد أقل من 3 ثواني = bot
  const formLoadedAt = useRef<number>(Date.now());

  // Honeypot — حقل مخفي. أي بوت بيملاه. الإنسان مش بيشوفه أصلاً.
  const [honeypot, setHoneypot] = useState("");

  // نسجّل وقت أول تفاعل من اليوزر — يميّز الإنسان عن الـ bot
  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const [form, setForm] = useState({
    name: prefilledName,
    email: prefilledEmail,
    phone: "",
    experience: "",
    currentWork: "",
    goal: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Anti-bot: Honeypot filled = bot
    if (honeypot) {
      // نظهر success كاذب عشان البوت ما يعرفش إنه اتمسك
      setSuccess(true);
      return;
    }

    // Anti-bot: submitted فورم في أقل من 3 ثواني = bot
    const timeSinceLoad = Date.now() - formLoadedAt.current;
    if (timeSinceLoad < 3000) {
      setError("بطئ شوية يا معلم — املي الفورم بهدوء");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/vip/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "حصلت مشكلة");
      }

      setSuccess(true);
      setTimeout(() => router.refresh(), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حصلت مشكلة، جرّب تاني");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-gradient-to-br from-brand-900/40 to-brand-950/60 border border-brand-500/30 rounded-2xl p-10 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-500/20 border border-brand-500/40 mb-6">
          <IconCheck className="h-8 w-8 text-brand-300" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black mb-4">طلبك وصلني!</h3>
        <p className="text-white/70 leading-relaxed">
          هابعت لك إيميل بقبول/رفض الطلب خلال 48 ساعة.
          <br />
          لو اتقبل، الإيميل هيكون فيه لينك الدفع المباشر.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
      {error && (
        <div className="bg-red-950/30 border border-red-500/30 text-red-300 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      {/* Honeypot — مخفي عن البشر، البوتات بتملاه */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website (leave empty)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="الاسم"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          required
        />
        <Field
          label="الإيميل"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
      </div>

      <Field
        label="رقم الواتساب (للتواصل)"
        type="tel"
        value={form.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
        placeholder="01xxxxxxxxx"
        required
      />

      <Textarea
        label="مستوى خبرتك دلوقتي؟"
        hint="بدأت إمتى؟ بتشتغل على إيه برامج؟ عندك بورتفوليو؟"
        value={form.experience}
        onChange={(v) => setForm({ ...form, experience: v })}
        required
      />

      <Textarea
        label="بتشتغل على إيه دلوقتي؟"
        hint="فري لانس؟ شغل ثابت؟ بتدرس؟ مشروع شخصي؟"
        value={form.currentWork}
        onChange={(v) => setForm({ ...form, currentWork: v })}
        required
      />

      <Textarea
        label="إيه اللي عايز توصله بعد سنة من الـ VIP؟"
        hint="كن واضح. هدف رقمي أحسن. مثلاً: أكسب 10K شهرياً، أو أبني بورتفوليو محترم."
        value={form.goal}
        onChange={(v) => setForm({ ...form, goal: v })}
        required
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-br from-brand-500 to-brand-700 hover:from-brand-400 hover:to-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <IconLoader2 className="h-5 w-5 animate-spin" />
            بنبعت طلبك...
          </>
        ) : (
          "ابعت الطلب"
        )}
      </button>

      <p className="text-xs text-white/40 text-center">
        ⚡ الرد خلال 48 ساعة. مفيش commitment لحد ما تقبل الـ offer وتدفع.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2 text-white/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/5 border border-white/10 focus:border-brand-500 focus:bg-white/[0.07] text-white rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-white/30"
      />
    </label>
  );
}

function Textarea({
  label,
  hint,
  value,
  onChange,
  required,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1 text-white/80">{label}</span>
      {hint && <span className="block text-xs text-white/40 mb-2">{hint}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={3}
        className="w-full bg-white/5 border border-white/10 focus:border-brand-500 focus:bg-white/[0.07] text-white rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-white/30 resize-none"
      />
    </label>
  );
}
