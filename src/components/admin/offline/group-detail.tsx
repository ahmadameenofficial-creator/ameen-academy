"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconBrandWhatsapp,
  IconCash,
  IconPencil,
  IconTrash,
  IconSettings,
  IconReceipt,
  IconUserCheck,
  IconChartBar,
  IconUsers,
  IconLink,
  IconQrcode,
  IconRefresh,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DAY_NAMES,
  formatEGP,
  toCents,
  waLink,
  formatArabicDate,
  formatTime,
  PAY_METHOD_LABELS,
  STUDENT_STATUS_LABELS,
} from "@/lib/offline-utils";

// ============ الأنواع (مطابقة للسيريالايز في page.tsx) ============

type Payment = {
  id: string;
  amount: number;
  method: string;
  paidAt: string;
  note: string | null;
};

type AttendanceRecord = {
  date: string;
  status: string;
  self: boolean;
  checkInAt: string | null;
  checkOutAt: string | null;
};

type Student = {
  id: string;
  fullName: string;
  email: string | null;
  whatsapp: string;
  guardianPhone: string | null;
  age: number | null;
  address: string | null;
  agreedPrice: number;
  isFree: boolean;
  nextDueDate: string | null;
  nextDueAmount: number | null;
  status: string;
  notes: string | null;
  userId: string | null;
  payments: Payment[];
  attendance: AttendanceRecord[];
};

type Group = {
  id: string;
  name: string;
  dayOfWeek: number | null;
  price: number;
  expenses: number;
  notes: string | null;
  isActive: boolean;
  sessionCode: string | null;
  sessionCodeDate: string | null;
  students: Student[];
};

const emptyStudentForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  guardianPhone: "",
  age: "",
  address: "",
  agreedPrice: "",
  isFree: false,
  nextDueDate: "",
  nextDueAmount: "",
  status: "ACTIVE",
  notes: "",
};

export function GroupDetail({
  group,
  sessionDates,
}: {
  group: Group;
  sessionDates: string[];
}) {
  const router = useRouter();
  const { success, error } = useToast();
  const [tab, setTab] = useState<"students" | "attendance" | "stats">("students");
  const [saving, setSaving] = useState(false);

  // دايالوجات
  const [studentDialog, setStudentDialog] = useState<null | { editId?: string }>(null);
  const [studentForm, setStudentForm] = useState(emptyStudentForm);
  const [payDialog, setPayDialog] = useState<null | Student>(null);
  const [payForm, setPayForm] = useState({
    amount: "",
    method: "CASH",
    paidAt: new Date().toISOString().slice(0, 10),
    note: "",
    nextDueDate: "",
    nextDueAmount: "",
  });
  const [historyStudent, setHistoryStudent] = useState<null | Student>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    name: group.name,
    dayOfWeek: group.dayOfWeek === null ? "" : String(group.dayOfWeek),
    price: String(group.price / 100 || ""),
    expenses: String(group.expenses / 100 || ""),
  });

  // كود الحصة
  const [codeDialog, setCodeDialog] = useState(false);
  const [sessionCode, setSessionCode] = useState<string | null>(null);

  // الحضور
  const [attDate, setAttDate] = useState(new Date().toISOString().slice(0, 10));
  const activeStudents = group.students.filter((s) => s.status === "ACTIVE");
  const [attRecords, setAttRecords] = useState<Record<string, string>>({});

  // حسابات لكل طالب
  const computed = useMemo(
    () =>
      group.students.map((s) => {
        const paid = s.payments.reduce((sum, p) => sum + p.amount, 0);
        const remaining = Math.max(s.agreedPrice - paid, 0);
        const absences = s.attendance.filter((a) => a.status === "ABSENT").length;
        return { ...s, paid, remaining, absences };
      }),
    [group.students]
  );

  // ============ API helpers ============

  async function api(path: string, method: string, body: unknown) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/offline/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        error(data.error || "حصل مشكلة");
        return null;
      }
      router.refresh();
      return data;
    } finally {
      setSaving(false);
    }
  }

  // ============ الطلاب ============

  function openAddStudent() {
    setStudentForm({
      ...emptyStudentForm,
      agreedPrice: group.price ? String(group.price / 100) : "",
    });
    setStudentDialog({});
  }

  function openEditStudent(s: Student) {
    setStudentForm({
      fullName: s.fullName,
      email: s.email ?? "",
      whatsapp: s.whatsapp,
      guardianPhone: s.guardianPhone ?? "",
      age: s.age === null ? "" : String(s.age),
      address: s.address ?? "",
      agreedPrice: String(s.agreedPrice / 100 || ""),
      isFree: s.isFree,
      nextDueDate: s.nextDueDate?.slice(0, 10) ?? "",
      nextDueAmount: s.nextDueAmount === null ? "" : String(s.nextDueAmount / 100),
      status: s.status,
      notes: s.notes ?? "",
    });
    setStudentDialog({ editId: s.id });
  }

  async function saveStudent() {
    if (studentForm.fullName.trim().length < 3) return error("اكتب الاسم الثلاثي");
    if (studentForm.whatsapp.replace(/\D/g, "").length < 8) return error("اكتب رقم واتس صحيح");

    const body = {
      groupId: group.id,
      fullName: studentForm.fullName.trim(),
      email: studentForm.email.trim() || null,
      whatsapp: studentForm.whatsapp,
      guardianPhone: studentForm.guardianPhone || null,
      age: studentForm.age ? Number(studentForm.age) : null,
      address: studentForm.address || null,
      agreedPrice: studentForm.isFree
        ? 0
        : studentForm.agreedPrice
          ? toCents(Number(studentForm.agreedPrice))
          : 0,
      isFree: studentForm.isFree,
      nextDueDate: studentForm.isFree ? null : studentForm.nextDueDate || null,
      nextDueAmount:
        studentForm.isFree || !studentForm.nextDueAmount
          ? null
          : toCents(Number(studentForm.nextDueAmount)),
      status: studentForm.status,
      notes: studentForm.notes || null,
    };

    const result = studentDialog?.editId
      ? await api("students", "PATCH", { id: studentDialog.editId, ...body })
      : await api("students", "POST", body);

    if (result) {
      success(studentDialog?.editId ? "اتحدّث ✅" : "الطالب اتضاف ✅");
      setStudentDialog(null);
    }
  }

  // لينك دعوة ربط الحساب — بيتبعت واتساب برسالة جاهزة
  async function sendInvite(s: Student) {
    const result = await api("invite", "POST", { studentId: s.id });
    if (!result?.token) return;
    const link = `${window.location.origin}/offline/claim?t=${result.token}`;
    const msg = `أهلًا ${s.fullName.split(" ")[0]} 🌟\nده لينك حسابك في أكاديمية أمين — سجل بيه وهتلاقي حضورك ودفعاتك وكل حاجة بتاعتك:\n${link}`;
    window.open(waLink(s.whatsapp, msg), "_blank");
  }

  async function approveStudent(s: Student) {
    const result = await api("students", "PATCH", {
      id: s.id,
      status: "ACTIVE",
      // بنبدأ بسعر الجروب لو مفيش سعر متفق عليه — عدّله بعدين لو لزم
      ...(s.agreedPrice === 0 && !s.isFree ? { agreedPrice: group.price } : {}),
    });
    if (result) success(`${s.fullName.split(" ")[0]} بقى طالب رسمي ✅`);
  }

  async function deleteStudent(s: Student) {
    if (!confirm(`متأكد إنك عايز تمسح ${s.fullName}؟ كل دفعاته وحضوره هيتمسحوا معاه.`)) return;
    const result = await api("students", "DELETE", { id: s.id });
    if (result) success("اتمسح");
  }

  // ============ الدفعات ============

  function openPayDialog(s: Student & { remaining: number }) {
    setPayForm({
      amount: s.remaining ? String(s.remaining / 100) : "",
      method: "CASH",
      paidAt: new Date().toISOString().slice(0, 10),
      note: "",
      nextDueDate: "",
      nextDueAmount: "",
    });
    setPayDialog(s);
  }

  async function savePayment() {
    if (!payDialog) return;
    const amount = Number(payForm.amount);
    if (!amount || amount <= 0) return error("اكتب المبلغ");

    const result = await api("payments", "POST", {
      studentId: payDialog.id,
      amount: toCents(amount),
      method: payForm.method,
      paidAt: payForm.paidAt,
      note: payForm.note || null,
      nextDueDate: payForm.nextDueDate || null,
      nextDueAmount: payForm.nextDueAmount ? toCents(Number(payForm.nextDueAmount)) : null,
    });
    if (result) {
      success("الدفعة اتسجلت ✅");
      setPayDialog(null);
    }
  }

  async function deletePayment(paymentId: string) {
    if (!confirm("متأكد إنك عايز تمسح الدفعة دي؟")) return;
    const result = await api("payments", "DELETE", { id: paymentId });
    if (result) {
      success("اتمسحت");
      setHistoryStudent(null);
    }
  }

  // ============ الحضور ============

  function loadAttendanceForDate(date: string) {
    setAttDate(date);
    const records: Record<string, string> = {};
    for (const s of activeStudents) {
      const rec = s.attendance.find((a) => a.date === date);
      if (rec) records[s.id] = rec.status;
    }
    setAttRecords(records);
  }

  async function openSessionCode(regenerate = false) {
    setCodeDialog(true);
    const result = await api("session-code", "POST", { groupId: group.id, regenerate });
    if (result?.code) setSessionCode(result.code);
  }

  async function saveAttendance() {
    const records = activeStudents
      .filter((s) => attRecords[s.id])
      .map((s) => ({ studentId: s.id, status: attRecords[s.id] }));
    if (!records.length) return error("علّم حضور طالب واحد على الأقل");

    const result = await api("attendance", "POST", {
      groupId: group.id,
      date: attDate,
      records,
    });
    if (result) success("الحضور اتحفظ ✅");
  }

  // ============ إعدادات الجروب ============

  async function saveSettings() {
    const result = await api("groups", "PATCH", {
      id: group.id,
      name: settingsForm.name.trim(),
      dayOfWeek: settingsForm.dayOfWeek === "" ? null : Number(settingsForm.dayOfWeek),
      price: settingsForm.price ? toCents(Number(settingsForm.price)) : 0,
      expenses: settingsForm.expenses ? toCents(Number(settingsForm.expenses)) : 0,
    });
    if (result) {
      success("اتحدّث ✅");
      setSettingsOpen(false);
    }
  }

  async function deleteGroup() {
    if (!confirm(`متأكد إنك عايز تمسح "${group.name}" بكل طلابه ودفعاته وحضوره؟ مفيش رجوع.`))
      return;
    const result = await api("groups", "DELETE", { id: group.id });
    if (result) {
      success("الجروب اتمسح");
      router.push("/admin/offline");
    }
  }

  // ============ إحصائيات ============

  const stats = useMemo(() => {
    const active = computed.filter((s) => s.status === "ACTIVE");
    const collected = computed.reduce((sum, s) => sum + s.paid, 0);
    const expected = active.reduce((sum, s) => sum + s.agreedPrice, 0);
    const methodTotals: Record<string, number> = {};
    for (const s of computed)
      for (const p of s.payments)
        methodTotals[p.method] = (methodTotals[p.method] ?? 0) + p.amount;

    const sessions = sessionDates.map((date) => {
      let present = 0;
      let total = 0;
      for (const s of computed) {
        const rec = s.attendance.find((a) => a.date === date);
        if (rec) {
          total++;
          if (rec.status === "PRESENT") present++;
        }
      }
      return { date, present, total };
    });
    const attendanceRate = sessions.length
      ? Math.round(
          (sessions.reduce((sum, x) => sum + (x.total ? x.present / x.total : 0), 0) /
            sessions.length) *
            100
        )
      : null;

    const ages = active.map((s) => s.age).filter((a): a is number => a !== null);

    return {
      collected,
      expected,
      remaining: Math.max(expected - collected, 0),
      profit: collected - group.expenses,
      collectionRate: expected ? Math.round((collected / expected) * 100) : null,
      methodTotals,
      sessions,
      attendanceRate,
      activeCount: active.length,
      freeCount: active.filter((s) => s.isFree).length,
      droppedCount: computed.filter((s) => s.status === "DROPPED").length,
      avgAge: ages.length ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : null,
    };
  }, [computed, sessionDates, group.expenses]);

  // ============ الواجهة ============

  const tabs = [
    { id: "students" as const, label: "الطلاب", icon: IconUsers },
    { id: "attendance" as const, label: "الحضور", icon: IconUserCheck },
    { id: "stats" as const, label: "الإحصائيات", icon: IconChartBar },
  ];

  return (
    <div className="space-y-5">
      {/* التابات + الإعدادات */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-xl bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                tab === t.id
                  ? "bg-background text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setSettingsOpen(true)}>
          <IconSettings className="h-4 w-4" />
        </Button>
      </div>

      {/* ===== تاب الطلاب ===== */}
      {tab === "students" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {activeStudents.length} طالب نشط
            </p>
            <Button size="sm" onClick={openAddStudent}>
              <IconPlus className="h-4 w-4 ml-1" />
              طالب جديد
            </Button>
          </div>

          {computed.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              لسه مفيش طلاب في الجروب ده
            </div>
          ) : (
            <div className="space-y-2">
              {computed.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-2xl border bg-background p-4 ${
                    s.status === "PENDING"
                      ? "border-brand-300 dark:border-brand-700"
                      : s.status !== "ACTIVE"
                        ? "border-border opacity-60"
                        : "border-border"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground">{s.fullName}</h3>
                        {s.isFree && <Badge variant="soft">مجانًا</Badge>}
                        {s.status === "PENDING" ? (
                          <Badge variant="solid">طلب جديد</Badge>
                        ) : (
                          s.status !== "ACTIVE" && (
                            <Badge variant="warning">{STUDENT_STATUS_LABELS[s.status]}</Badge>
                          )
                        )}
                        {!s.isFree && s.remaining === 0 && s.agreedPrice > 0 && (
                          <Badge variant="success">مدفوع بالكامل</Badge>
                        )}
                        {s.userId && <Badge variant="outline">مربوط بالموقع</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {[
                          s.age ? `${s.age} سنة` : null,
                          s.address,
                          s.email,
                          s.absences ? `${s.absences} غيابات` : "مفيش غيابات",
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={waLink(s.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="افتح واتساب"
                      >
                        <Button size="icon" variant="ghost">
                          <IconBrandWhatsapp className="h-4 w-4 text-green-600" />
                        </Button>
                      </a>
                      {!s.userId && s.status === "ACTIVE" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          title="ابعتله لينك ربط حسابه بالموقع"
                          onClick={() => sendInvite(s)}
                        >
                          <IconLink className="h-4 w-4 text-brand-500" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        title="سجل الدفعات"
                        onClick={() => setHistoryStudent(s)}
                      >
                        <IconReceipt className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="تعديل"
                        onClick={() => openEditStudent(s)}
                      >
                        <IconPencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="حذف"
                        onClick={() => deleteStudent(s)}
                      >
                        <IconTrash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  {s.status === "PENDING" && (
                    <div className="mt-3">
                      <Button size="sm" onClick={() => approveStudent(s)} disabled={saving}>
                        قبول الطلب
                      </Button>
                    </div>
                  )}

                  {!s.isFree && s.status !== "PENDING" && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2.5 py-1 text-xs">
                        دفع {formatEGP(s.paid)}
                      </span>
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs ${
                          s.remaining > 0
                            ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        باقي {formatEGP(s.remaining)}
                      </span>
                      {s.nextDueDate && (
                        <span className="rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2.5 py-1 text-xs">
                          الدفعة الجاية {formatArabicDate(s.nextDueDate)}
                          {s.nextDueAmount ? ` (${formatEGP(s.nextDueAmount)})` : ""}
                        </span>
                      )}
                      <Button size="sm" variant="soft" onClick={() => openPayDialog(s)}>
                        <IconCash className="h-4 w-4 ml-1" />
                        سجّل دفعة
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== تاب الحضور ===== */}
      {tab === "attendance" && (
        <div className="space-y-4">
          {/* كود الحصة — الطلاب بيسجلوا بنفسهم بيه */}
          <Button variant="soft" size="sm" onClick={() => openSessionCode()}>
            <IconQrcode className="h-4 w-4 ml-1" />
            كود الحصة (للطلاب يسجلوا بنفسهم)
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">تاريخ الحصة</label>
              <Input
                type="date"
                value={attDate}
                onChange={(e) => loadAttendanceForDate(e.target.value)}
                className="w-44"
              />
            </div>
            {sessionDates.length > 0 && (
              <div className="flex-1">
                <label className="text-sm text-muted-foreground block mb-1">
                  حصص سابقة
                </label>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {sessionDates.map((d) => (
                    <button
                      key={d}
                      onClick={() => loadAttendanceForDate(d)}
                      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs border transition-colors ${
                        attDate === d
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {formatArabicDate(d)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {activeStudents.length === 0 ? (
            <p className="text-muted-foreground text-sm">مفيش طلاب نشطين</p>
          ) : (
            <>
              <div className="space-y-2">
                {activeStudents.map((s) => {
                  const current = attRecords[s.id];
                  const rec = s.attendance.find((a) => a.date === attDate);
                  return (
                    <div
                      key={s.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2"
                    >
                      <div>
                        <span className="font-medium text-foreground">{s.fullName}</span>
                        {rec?.checkInAt && (
                          <p className="text-[11px] text-green-600 dark:text-green-400">
                            سجل بنفسه {formatTime(rec.checkInAt)}
                            {rec.checkOutAt ? ` → انصرف ${formatTime(rec.checkOutAt)}` : ""}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {(
                          [
                            ["PRESENT", "حضر", "bg-green-500 text-white border-green-500"],
                            ["ABSENT", "غاب", "bg-red-500 text-white border-red-500"],
                            ["EXCUSED", "بعذر", "bg-amber-500 text-white border-amber-500"],
                          ] as const
                        ).map(([value, label, activeCls]) => (
                          <button
                            key={value}
                            onClick={() =>
                              setAttRecords({ ...attRecords, [s.id]: value })
                            }
                            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                              current === value
                                ? activeCls
                                : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const all: Record<string, string> = {};
                    for (const s of activeStudents) all[s.id] = "PRESENT";
                    setAttRecords(all);
                  }}
                >
                  علّم الكل حضور
                </Button>
                <Button size="sm" onClick={saveAttendance} disabled={saving}>
                  {saving ? "ثواني..." : "حفظ الحضور"}
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ===== تاب الإحصائيات ===== */}
      {tab === "stats" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MiniStat label="المحصّل" value={formatEGP(stats.collected)} />
            <MiniStat label="المتبقي" value={formatEGP(stats.remaining)} />
            <MiniStat
              label="صافي الربح"
              value={formatEGP(stats.profit)}
              sub={group.expenses ? `بعد مصاريف ${formatEGP(group.expenses)}` : "مفيش مصاريف مسجلة"}
            />
            <MiniStat
              label="نسبة التحصيل"
              value={stats.collectionRate === null ? "—" : `${stats.collectionRate}%`}
            />
            <MiniStat
              label="متوسط الحضور"
              value={stats.attendanceRate === null ? "—" : `${stats.attendanceRate}%`}
            />
            <MiniStat
              label="طالب نشط"
              value={`${stats.activeCount}`}
              sub={stats.freeCount ? `منهم ${stats.freeCount} مجانًا` : undefined}
            />
            <MiniStat label="انسحبوا" value={`${stats.droppedCount}`} />
            <MiniStat
              label="متوسط السن"
              value={stats.avgAge === null ? "—" : `${stats.avgAge} سنة`}
            />
          </div>

          {Object.keys(stats.methodTotals).length > 0 && (
            <div className="rounded-2xl border border-border bg-background p-4">
              <h3 className="font-bold text-foreground mb-3">طرق الدفع</h3>
              <div className="space-y-2">
                {Object.entries(stats.methodTotals).map(([method, total]) => (
                  <div key={method} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {PAY_METHOD_LABELS[method] ?? method}
                    </span>
                    <span className="font-medium text-foreground">{formatEGP(total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.sessions.length > 0 && (
            <div className="rounded-2xl border border-border bg-background p-4">
              <h3 className="font-bold text-foreground mb-3">الحصص</h3>
              <div className="space-y-2">
                {stats.sessions.map((sess) => (
                  <div key={sess.date} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{formatArabicDate(sess.date)}</span>
                    <span className="font-medium text-foreground">
                      حضر {sess.present} من {sess.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== دايالوج إضافة/تعديل طالب ===== */}
      <Dialog open={studentDialog !== null} onOpenChange={(o) => !o && setStudentDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{studentDialog?.editId ? "تعديل طالب" : "طالب جديد"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="الاسم الثلاثي">
              <Input
                value={studentForm.fullName}
                onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                placeholder="محمد أحمد علي"
              />
            </Field>
            <Field label="الإيميل (اختياري)">
              <Input
                type="email"
                dir="ltr"
                className="text-left"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                placeholder="student@gmail.com"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="رقم الواتس">
                <Input
                  inputMode="tel"
                  dir="ltr"
                  value={studentForm.whatsapp}
                  onChange={(e) => setStudentForm({ ...studentForm, whatsapp: e.target.value })}
                  placeholder="01xxxxxxxxx"
                />
              </Field>
              <Field label="رقم ولي الأمر (اختياري)">
                <Input
                  inputMode="tel"
                  dir="ltr"
                  value={studentForm.guardianPhone}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, guardianPhone: e.target.value })
                  }
                  placeholder="لو تحت 18"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="السن">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={studentForm.age}
                  onChange={(e) => setStudentForm({ ...studentForm, age: e.target.value })}
                />
              </Field>
              <Field label="العنوان / المنطقة">
                <Input
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                />
              </Field>
            </div>

            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={studentForm.isFree}
                onChange={(e) => setStudentForm({ ...studentForm, isFree: e.target.checked })}
                className="h-4 w-4 accent-brand-500"
              />
              مشترك مجانًا
            </label>

            {!studentForm.isFree && (
              <>
                <Field label="المبلغ المتفق عليه (جنيه)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={studentForm.agreedPrice}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, agreedPrice: e.target.value })
                    }
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="ميعاد الدفعة الجاية">
                    <Input
                      type="date"
                      value={studentForm.nextDueDate}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, nextDueDate: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="مبلغها (جنيه)">
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={studentForm.nextDueAmount}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, nextDueAmount: e.target.value })
                      }
                    />
                  </Field>
                </div>
              </>
            )}

            {studentDialog?.editId && (
              <Field label="الحالة">
                <select
                  value={studentForm.status}
                  onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                >
                  {Object.entries(STUDENT_STATUS_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="ملاحظات (اختياري)">
              <Input
                value={studentForm.notes}
                onChange={(e) => setStudentForm({ ...studentForm, notes: e.target.value })}
              />
            </Field>

            <Button className="w-full" onClick={saveStudent} disabled={saving}>
              {saving ? "ثواني..." : studentDialog?.editId ? "حفظ التعديلات" : "إضافة الطالب"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== دايالوج تسجيل دفعة ===== */}
      <Dialog open={payDialog !== null} onOpenChange={(o) => !o && setPayDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>دفعة من {payDialog?.fullName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="المبلغ (جنيه)">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={payForm.amount}
                  onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })}
                />
              </Field>
              <Field label="طريقة الدفع">
                <select
                  value={payForm.method}
                  onChange={(e) => setPayForm({ ...payForm, method: e.target.value })}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                >
                  {Object.entries(PAY_METHOD_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="تاريخ الدفع">
              <Input
                type="date"
                value={payForm.paidAt}
                onChange={(e) => setPayForm({ ...payForm, paidAt: e.target.value })}
              />
            </Field>
            <div className="rounded-xl bg-muted/60 p-3 space-y-3">
              <p className="text-xs text-muted-foreground">
                لو لسه فيه فلوس باقية، حدّد ميعاد الدفعة الجاية عشان التذكير يشتغل — سيبها فاضية لو دي آخر دفعة
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="ميعاد الدفعة الجاية">
                  <Input
                    type="date"
                    value={payForm.nextDueDate}
                    onChange={(e) => setPayForm({ ...payForm, nextDueDate: e.target.value })}
                  />
                </Field>
                <Field label="مبلغها (جنيه)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={payForm.nextDueAmount}
                    onChange={(e) => setPayForm({ ...payForm, nextDueAmount: e.target.value })}
                  />
                </Field>
              </div>
            </div>
            <Field label="ملاحظة (اختياري)">
              <Input
                value={payForm.note}
                onChange={(e) => setPayForm({ ...payForm, note: e.target.value })}
              />
            </Field>
            <Button className="w-full" onClick={savePayment} disabled={saving}>
              {saving ? "ثواني..." : "تسجيل الدفعة"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== دايالوج سجل الدفعات ===== */}
      <Dialog open={historyStudent !== null} onOpenChange={(o) => !o && setHistoryStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>دفعات {historyStudent?.fullName}</DialogTitle>
          </DialogHeader>
          {historyStudent?.payments.length ? (
            <div className="space-y-2">
              {historyStudent.payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-foreground">{formatEGP(p.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {PAY_METHOD_LABELS[p.method] ?? p.method} ·{" "}
                      {formatArabicDate(p.paidAt)}
                      {p.note ? ` · ${p.note}` : ""}
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => deletePayment(p.id)}>
                    <IconTrash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لسه مفيش دفعات مسجلة</p>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== دايالوج كود الحصة ===== */}
      <Dialog open={codeDialog} onOpenChange={setCodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>كود الحصة — النهارده بس</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            {sessionCode ? (
              <p className="text-6xl font-bold tracking-[0.3em] text-brand-500" dir="ltr">
                {sessionCode}
              </p>
            ) : (
              <p className="text-muted-foreground py-4">ثواني...</p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">
              اكتبه على السبورة — الطالب يدخّله من صفحة &quot;مجموعتي&quot; في موبايله:
              <br />
              أول مرة = حضور بوقته · تاني مرة وهو ماشي = انصراف
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openSessionCode(true)}
              disabled={saving}
            >
              <IconRefresh className="h-4 w-4 ml-1" />
              كود جديد (يلغي القديم)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== دايالوج إعدادات الجروب ===== */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إعدادات الجروب</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="اسم الجروب">
              <Input
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="يوم الحصة">
                <select
                  value={settingsForm.dayOfWeek}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, dayOfWeek: e.target.value })
                  }
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                >
                  <option value="">بدون يوم محدد</option>
                  {DAY_NAMES.map((d, i) => (
                    <option key={i} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="السعر الافتراضي (جنيه)">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={settingsForm.price}
                  onChange={(e) => setSettingsForm({ ...settingsForm, price: e.target.value })}
                />
              </Field>
            </div>
            <Field label="مصاريف الجروب (جنيه) — قاعة/طباعة/غيره">
              <Input
                type="number"
                inputMode="numeric"
                value={settingsForm.expenses}
                onChange={(e) => setSettingsForm({ ...settingsForm, expenses: e.target.value })}
              />
            </Field>
            <Button className="w-full" onClick={saveSettings} disabled={saving}>
              {saving ? "ثواني..." : "حفظ"}
            </Button>
            <Button variant="destructive" className="w-full" onClick={deleteGroup} disabled={saving}>
              حذف الجروب نهائيًا
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ مكونات صغيرة ============

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground block mb-1">{label}</label>
      {children}
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{sub}</p>}
    </div>
  );
}
