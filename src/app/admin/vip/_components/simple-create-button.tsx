"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconPlus, IconLoader2, IconX } from "@tabler/icons-react";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "datetime-local" | "number" | "email" | "url";
  required?: boolean;
  rows?: number;
  placeholder?: string;
  hint?: string;
}

interface Props {
  endpoint: string;
  buttonLabel: string;
  modalTitle: string;
  fields: FieldDef[];
}

export function SimpleCreateButton({ endpoint, buttonLabel, modalTitle, fields }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
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
      setForm(Object.fromEntries(fields.map((f) => [f.name, ""])));
      router.refresh();
    } catch {
      alert("حصلت مشكلة في الاتصال");
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
        {buttonLabel}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-background z-10">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
            <IconX className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-foreground mb-1">{field.label}</label>
              {field.hint && <p className="text-[11px] text-muted-foreground mb-1.5">{field.hint}</p>}
              {field.type === "textarea" ? (
                <textarea
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  rows={field.rows || 3}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500 resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500"
                />
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <button type="submit" disabled={loading} className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
              {loading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconPlus className="h-4 w-4" />}
              أنشئ
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
