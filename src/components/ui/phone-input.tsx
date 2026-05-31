"use client";

import { useState, useRef, useEffect } from "react";
import { IconChevronDown, IconBrandWhatsapp, IconCheck, IconSearch } from "@tabler/icons-react";
import { COUNTRIES, DEFAULT_COUNTRY, countryFromE164, type Country } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  /** القيمة الكاملة بصيغة دولية: +201012345678 */
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

/** يفصل رقم E.164 لكود الدولة + الرقم المحلي */
function splitValue(value?: string): { country: Country; local: string } {
  if (!value) return { country: DEFAULT_COUNTRY, local: "" };
  const country = countryFromE164(value) ?? DEFAULT_COUNTRY;
  const digits = value.replace(/[^\d]/g, "");
  const local = digits.startsWith(country.dial)
    ? digits.slice(country.dial.length)
    : digits;
  return { country, local };
}

export function PhoneInput({ value, onChange, placeholder = "رقم الواتساب", className, id }: PhoneInputProps) {
  const initial = splitValue(value);
  const [country, setCountry] = useState<Country>(initial.country);
  const [local, setLocal] = useState<string>(initial.local);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // اقفل الـ dropdown لو ضغط بره
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function emit(c: Country, l: string) {
    const cleanLocal = l.replace(/[^\d]/g, "").replace(/^0+/, ""); // شيل الأصفار البادئة (زي 010 → 10)
    onChange(cleanLocal ? `+${c.dial}${cleanLocal}` : "");
  }

  function pickCountry(c: Country) {
    setCountry(c);
    setOpen(false);
    setQuery("");
    emit(c, local);
  }

  function handleLocal(e: React.ChangeEvent<HTMLInputElement>) {
    const l = e.target.value;
    setLocal(l);
    emit(country, l);
  }

  const filtered = query.trim()
    ? COUNTRIES.filter(
        (c) => c.name.includes(query.trim()) || c.dial.includes(query.replace(/[^\d]/g, "")),
      )
    : COUNTRIES;

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div className="flex items-stretch gap-2 rounded-xl border border-border bg-background focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition">
        {/* زرار اختيار الدولة */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 px-3 border-l border-border text-sm text-foreground shrink-0 hover:bg-muted/50 rounded-r-xl transition-colors"
          dir="ltr"
        >
          <span className="font-medium">+{country.dial}</span>
          <IconChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>

        {/* الرقم */}
        <div className="flex items-center gap-2 flex-1 px-3 py-2.5">
          <IconBrandWhatsapp className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            id={id}
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={local}
            onChange={handleLocal}
            placeholder={placeholder}
            className="w-full bg-transparent text-right text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* قائمة الدول */}
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-72 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="sticky top-0 flex items-center gap-2 border-b border-border bg-background px-3 py-2">
            <IconSearch className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="دوّر على الدولة..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-muted-foreground">مفيش نتيجة</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => pickCountry(c)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/60 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {country.code === c.code && <IconCheck className="h-4 w-4 text-brand-500" />}
                    <span className={cn(country.code !== c.code && "pr-6")}>{c.name}</span>
                  </span>
                  <span className="text-muted-foreground" dir="ltr">+{c.dial}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
