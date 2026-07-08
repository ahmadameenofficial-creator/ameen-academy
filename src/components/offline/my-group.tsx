"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconQrcode,
  IconLoader2,
  IconCash,
  IconCalendar,
  IconUserCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DAY_NAMES,
  formatEGP,
  formatArabicDate,
  formatTime,
  cairoToday,
  PAY_METHOD_LABELS,
  ATTENDANCE_STATUS_LABELS,
} from "@/lib/offline-utils";

type StudentData = {
  fullName: string;
  status: string;
  isFree: boolean;
  agreedPrice: number;
  nextDueDate: string | null;
  nextDueAmount: number | null;
  group: { name: string; dayOfWeek: number | null };
  payments: { id: string; amount: number; method: string; paidAt: string }[];
  attendance: {
    date: string;
    status: string;
    checkInAt: string | null;
    checkOutAt: string | null;
  }[];
};

export function MyGroup({ student }: { student: StudentData }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const paid = student.payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(student.agreedPrice - paid, 0);

  const today = cairoToday();
  const todayRecord = student.attendance.find((a) => a.date === today);
  const attendanceStats = useMemo(() => {
    const total = student.attendance.length;
    const present = student.attendance.filter((a) => a.status === "PRESENT").length;
    return { total, present, rate: total ? Math.round((present / total) * 100) : null };
  }, [student.attendance]);

  async function checkin() {
    if (!/^\d{4}$/.test(code)) {
      setFeedback({ ok: false, msg: "اكتب الكود اللي على السبورة (4 أرقام)" });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/offline/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setFeedback({ ok: res.ok, msg: data.message || data.error });
      if (res.ok) {
        setCode("");
        router.refresh();
      }
    } catch {
      setFeedback({ ok: false, msg: "النت فصل؟ جرب تاني" });
    } finally {
      setBusy(false);
    }
  }

  const checkinLabel = todayRecord?.checkInAt && !todayRecord.checkOutAt
    ? "سجّل انصرافك"
    : "سجّل حضورك";

  return (
    <div className="space-y-4">
      {/* ===== بطاقة المجموعة + تسجيل الحضور ===== */}
      <div className="rounded-2xl border border-border bg-background p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-bold text-lg text-foreground">{student.group.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {student.group.dayOfWeek !== null
                ? `الحصة كل ${DAY_NAMES[student.group.dayOfWeek]}`
                : "المواعيد بتتحدد مع أحمد"}
            </p>
          </div>
          {student.status !== "ACTIVE" && (
            <Badge variant="warning">الاشتراك مش نشط</Badge>
          )}
        </div>

        {/* حالة النهارده */}
        {todayRecord?.checkInAt && (
          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-700 dark:text-green-300">
            حضرت النهارده الساعة {formatTime(todayRecord.checkInAt)}
            {todayRecord.checkOutAt
              ? ` — ومشيت ${formatTime(todayRecord.checkOutAt)} 👋`
              : " — متنساش تسجل انصرافك وانت ماشي"}
          </div>
        )}

        {/* إدخال كود الحصة */}
        {student.status === "ACTIVE" && !(todayRecord?.checkInAt && todayRecord.checkOutAt) && (
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <IconQrcode className="h-4 w-4 text-brand-500" />
              انت في الحصة؟ اكتب الكود اللي على السبورة
            </label>
            <div className="flex gap-2">
              <Input
                inputMode="numeric"
                dir="ltr"
                maxLength={4}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, ""));
                  setFeedback(null);
                }}
                placeholder="- - - -"
                className="text-center text-xl tracking-[0.5em] font-bold w-36"
              />
              <Button onClick={checkin} disabled={busy} className="flex-1">
                {busy ? <IconLoader2 className="h-5 w-5 animate-spin" /> : checkinLabel}
              </Button>
            </div>
            {feedback && (
              <p
                className={`text-sm rounded-xl px-3 py-2 ${
                  feedback.ok
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                }`}
              >
                {feedback.msg}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ===== الفلوس (شفافية كاملة) ===== */}
      {!student.isFree && (
        <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
          <div className="flex items-center gap-2">
            <IconCash className="h-5 w-5 text-brand-500" />
            <h3 className="font-bold text-foreground">حسابك</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 py-3">
              <p className="font-bold text-foreground">{formatEGP(student.agreedPrice)}</p>
              <p className="text-[11px] text-muted-foreground">الاشتراك</p>
            </div>
            <div className="rounded-xl bg-green-50 dark:bg-green-900/20 py-3">
              <p className="font-bold text-green-700 dark:text-green-300">{formatEGP(paid)}</p>
              <p className="text-[11px] text-muted-foreground">دفعت</p>
            </div>
            <div
              className={`rounded-xl py-3 ${
                remaining > 0 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-muted/60"
              }`}
            >
              <p
                className={`font-bold ${
                  remaining > 0 ? "text-amber-700 dark:text-amber-300" : "text-foreground"
                }`}
              >
                {formatEGP(remaining)}
              </p>
              <p className="text-[11px] text-muted-foreground">الباقي</p>
            </div>
          </div>

          {student.nextDueDate && (
            <p className="text-sm text-muted-foreground rounded-xl bg-muted/60 px-3 py-2">
              📅 الدفعة الجاية {formatArabicDate(student.nextDueDate)}
              {student.nextDueAmount ? ` — ${formatEGP(student.nextDueAmount)}` : ""}
            </p>
          )}

          {student.payments.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {student.payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm border-b border-border/50 last:border-0 pb-1.5 last:pb-0"
                >
                  <span className="text-muted-foreground">
                    {formatArabicDate(p.paidAt)} · {PAY_METHOD_LABELS[p.method] ?? p.method}
                  </span>
                  <span className="font-medium text-foreground">{formatEGP(p.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== سجل الحضور ===== */}
      <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconUserCheck className="h-5 w-5 text-brand-500" />
            <h3 className="font-bold text-foreground">حضورك</h3>
          </div>
          {attendanceStats.rate !== null && (
            <Badge variant={attendanceStats.rate >= 80 ? "success" : "warning"}>
              {attendanceStats.rate}% حضور
            </Badge>
          )}
        </div>

        {student.attendance.length === 0 ? (
          <p className="text-sm text-muted-foreground">لسه مفيش حصص مسجلة</p>
        ) : (
          <div className="space-y-1.5">
            {student.attendance.map((a) => (
              <div
                key={a.date}
                className="flex items-center justify-between text-sm border-b border-border/50 last:border-0 pb-1.5 last:pb-0"
              >
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <IconCalendar className="h-3.5 w-3.5" />
                  {formatArabicDate(a.date)}
                  {a.checkInAt && (
                    <span className="text-[11px]">
                      ({formatTime(a.checkInAt)}
                      {a.checkOutAt ? ` → ${formatTime(a.checkOutAt)}` : ""})
                    </span>
                  )}
                </span>
                <Badge
                  variant={
                    a.status === "PRESENT"
                      ? "success"
                      : a.status === "EXCUSED"
                        ? "warning"
                        : "danger"
                  }
                >
                  {ATTENDANCE_STATUS_LABELS[a.status]}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
