"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds, done: ms === 0 };
}

const PADS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

export function Countdown({ launchISO }: { launchISO: string }) {
  const target = new Date(launchISO).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-5 py-2 text-sm font-semibold text-green-700">
        الكورس نزل دلوقتي — احجز مكانك!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" dir="ltr">
      {PADS.map(({ key, label }) => (
        <div
          key={key}
          className="flex min-w-[64px] flex-col items-center rounded-2xl border border-brand-200 bg-white px-3 py-3 shadow-sm sm:min-w-[76px]"
        >
          <span className="text-2xl font-extrabold tabular-nums text-brand-600 sm:text-3xl">
            {String(t[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[11px] font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
