"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconPlus, IconLoader2, IconX } from "@tabler/icons-react";

export function CreateLiveButton({ members }: { members: { userId: string; name: string }[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    durationMins: 90,
    meetingUrl: "",
    hotSeatUserId: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/vip/lives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "حصلت مشكلة");
        return;
      }
      setOpen(false);
      setForm({ title: "", description: "", scheduledAt: "", durationMins: 90, meetingUrl: "", hotSeatUserId: "" });
      router.refresh();
    } catch {
      alert("حصلت مشكلة");
    }
    setLoading(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <IconPlus className="h-4 w-4" />
        لايف جديد
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-background z-10">
          <h3 className="font-bold text-lg">لايف جديد</h3>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
            <IconX className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field label="العنوان" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <Field label="الوصف (اختياري)" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="التاريخ والوقت" type="datetime-local" value={form.scheduledAt} onChange={(v) => setForm({ ...form, scheduledAt: v })} required />
            <Field label="المدة (دقيقة)" type="number" value={String(form.durationMins)} onChange={(v) => setForm({ ...form, durationMins: parseInt(v) || 90 })} required />
          </div>
          <Field label="لينك Meeting (Zoom/Meet)" value={form.meetingUrl} onChange={(v) => setForm({ ...form, meetingUrl: v })} />
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Hot Seat — مين دوره؟ (اختياري)</label>
            <select
              value={form.hotSeatUserId}
              onChange={(e) => setForm({ ...form, hotSeatUserId: e.target.value })}
              className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option value="">— مفيش —</option>
              {members.map((m) => (
                <option key={m.userId} value={m.userId}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="submit" disabled={loading} className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
              {loading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconPlus className="h-4 w-4" />}
              أنشئ اللايف
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground px-3 py-2.5">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500 resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500" />
      )}
    </div>
  );
}
