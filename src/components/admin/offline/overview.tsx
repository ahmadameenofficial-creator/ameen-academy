"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconBrandWhatsapp,
  IconUsers,
  IconCash,
  IconHourglass,
  IconTrendingUp,
  IconAlertTriangle,
  IconCalendarDue,
  IconChevronLeft,
  IconUserPlus,
  IconCheck,
  IconX,
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
  dueReminderMessage,
} from "@/lib/offline-utils";

type GroupCard = {
  id: string;
  name: string;
  dayOfWeek: number | null;
  isActive: boolean;
  price: number;
  expenses: number;
  activeCount: number;
  freeCount: number;
  collected: number;
  expected: number;
  profit: number;
};

type DueStudent = {
  id: string;
  fullName: string;
  whatsapp: string;
  guardianPhone: string | null;
  nextDueDate: string;
  nextDueAmount: number | null;
  groupId: string;
  group: { name: string };
};

type PendingStudent = {
  id: string;
  fullName: string;
  email: string | null;
  whatsapp: string;
  guardianPhone: string | null;
  age: number | null;
  address: string | null;
  notes: string | null;
  createdAt: string;
  groupId: string;
  group: { name: string; price: number };
};

type RiskStudent = {
  id: string;
  fullName: string;
  whatsapp: string;
  groupId: string;
  group: { name: string };
  absences: number;
};

export function OfflineOverview({
  groups,
  totals,
  dueStudents,
  riskStudents,
  pendingStudents,
}: {
  groups: GroupCard[];
  totals: {
    students: number;
    free: number;
    collected: number;
    expected: number;
    remaining: number;
    profit: number;
  };
  dueStudents: DueStudent[];
  riskStudents: RiskStudent[];
  pendingStudents: PendingStudent[];
}) {
  const router = useRouter();
  const { success, error } = useToast();
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", dayOfWeek: "", price: "" });

  async function createGroup() {
    if (form.name.trim().length < 2) return error("اكتب اسم الجروب");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/offline/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          dayOfWeek: form.dayOfWeek === "" ? null : Number(form.dayOfWeek),
          price: form.price ? toCents(Number(form.price)) : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) return error(data.error || "حصل مشكلة");
      success("الجروب اتعمل ✅");
      setShowNewGroup(false);
      setForm({ name: "", dayOfWeek: "", price: "" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function approvePending(s: PendingStudent) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/offline/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: s.id,
          status: "ACTIVE",
          // بنبدأ بسعر الجروب الافتراضي — عدّله من صفحة الجروب لو اتفقتم على غيره
          agreedPrice: s.group.price,
        }),
      });
      const data = await res.json();
      if (!res.ok) return error(data.error || "حصل مشكلة");
      success(`${s.fullName.split(" ")[0]} بقى طالب رسمي ✅`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function rejectPending(s: PendingStudent) {
    if (!confirm(`ترفض طلب ${s.fullName}؟ هيتمسح نهائيًا.`)) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/offline/students", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id }),
      });
      const data = await res.json();
      if (!res.ok) return error(data.error || "حصل مشكلة");
      success("الطلب اتمسح");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      {/* ===== طلبات انضمام جديدة (من الفورم العامة) ===== */}
      {pendingStudents.length > 0 && (
        <div className="rounded-2xl border-2 border-brand-300 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <IconUserPlus className="h-5 w-5 text-brand-500" />
            <h2 className="font-bold text-foreground">
              طلبات انضمام جديدة ({pendingStudents.length})
            </h2>
          </div>
          <div className="space-y-2">
            {pendingStudents.map((s) => (
              <div key={s.id} className="rounded-xl bg-background p-3 space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-foreground">{s.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {[
                        s.group.name,
                        s.age ? `${s.age} سنة` : null,
                        s.address,
                        s.email,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {s.notes && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                        {s.notes}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatArabicDate(s.createdAt)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" onClick={() => approvePending(s)} disabled={saving}>
                    <IconCheck className="h-4 w-4 ml-1" />
                    قبول
                  </Button>
                  <a
                    href={waLink(
                      s.guardianPhone || s.whatsapp,
                      `أهلًا ${s.fullName.split(" ")[0]} 🌟 وصلنا طلبك للانضمام لـ${s.group.name} — نتكلم في التفاصيل؟`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="soft">
                      <IconBrandWhatsapp className="h-4 w-4 ml-1" />
                      كلمه
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => rejectPending(s)}
                    disabled={saving}
                  >
                    <IconX className="h-4 w-4 ml-1 text-red-500" />
                    رفض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ===== إحصائيات سريعة ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<IconUsers className="h-5 w-5" />}
          label="طالب نشط"
          value={`${totals.students}`}
          sub={totals.free ? `منهم ${totals.free} مجانًا` : undefined}
        />
        <StatCard
          icon={<IconCash className="h-5 w-5" />}
          label="المحصّل"
          value={formatEGP(totals.collected)}
        />
        <StatCard
          icon={<IconHourglass className="h-5 w-5" />}
          label="المتبقي المتوقع"
          value={formatEGP(totals.remaining)}
        />
        <StatCard
          icon={<IconTrendingUp className="h-5 w-5" />}
          label="صافي الربح"
          value={formatEGP(totals.profit)}
          sub="بعد مصاريف الجروبات"
        />
      </div>

      {/* ===== مستحقات قريبة / متأخرة ===== */}
      {dueStudents.length > 0 && (
        <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
          <div className="flex items-center gap-2">
            <IconCalendarDue className="h-5 w-5 text-brand-500" />
            <h2 className="font-bold text-foreground">دفعات مستحقة (خلال 3 أيام أو متأخرة)</h2>
          </div>
          <div className="space-y-2">
            {dueStudents.map((s) => {
              const overdue = s.nextDueDate.slice(0, 10) < today;
              const phone = s.guardianPhone || s.whatsapp;
              const msg = dueReminderMessage(
                s.fullName.split(" ")[0],
                s.nextDueAmount ?? 0,
                s.nextDueDate
              );
              return (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-3 py-2"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/offline/${s.groupId}`}
                      className="font-medium text-foreground hover:text-brand-600"
                    >
                      {s.fullName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {s.group.name} · {formatArabicDate(s.nextDueDate)}
                      {s.nextDueAmount ? ` · ${formatEGP(s.nextDueAmount)}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {overdue && <Badge variant="danger">متأخرة</Badge>}
                    <a href={waLink(phone, msg)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="soft">
                        <IconBrandWhatsapp className="h-4 w-4 ml-1" />
                        فكّره
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== إنذار تسريب ===== */}
      {riskStudents.length > 0 && (
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <IconAlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="font-bold text-foreground">إنذار تسريب — غابوا مرتين+ في آخر 30 يوم</h2>
          </div>
          <div className="space-y-2">
            {riskStudents.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-background px-3 py-2"
              >
                <div>
                  <Link
                    href={`/admin/offline/${s.groupId}`}
                    className="font-medium text-foreground hover:text-brand-600"
                  >
                    {s.fullName}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {s.group.name} · {s.absences} غيابات
                  </p>
                </div>
                <a
                  href={waLink(s.whatsapp, `عامل إيه يا ${s.fullName.split(" ")[0]}؟ افتقدناك في آخر حصص 🌟 كل حاجة تمام؟`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="ghost">
                    <IconBrandWhatsapp className="h-4 w-4 ml-1" />
                    اطمّن عليه
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== الجروبات ===== */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-foreground">الجروبات</h2>
        <Button size="sm" onClick={() => setShowNewGroup(true)}>
          <IconPlus className="h-4 w-4 ml-1" />
          جروب جديد
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          لسه مفيش جروبات — ابدأ بإضافة أول جروب
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <Link
              key={g.id}
              href={`/admin/offline/${g.id}`}
              className="group rounded-2xl border border-border bg-background p-4 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-brand-600">
                    {g.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {g.dayOfWeek !== null ? `كل ${DAY_NAMES[g.dayOfWeek]}` : "بدون يوم محدد"}
                    {!g.isActive && " · مقفول"}
                  </p>
                </div>
                <IconChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-brand-500" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted/60 py-2">
                  <p className="text-sm font-bold text-foreground">{g.activeCount}</p>
                  <p className="text-[11px] text-muted-foreground">طالب</p>
                </div>
                <div className="rounded-lg bg-muted/60 py-2">
                  <p className="text-sm font-bold text-foreground">{formatEGP(g.collected)}</p>
                  <p className="text-[11px] text-muted-foreground">محصّل</p>
                </div>
                <div className="rounded-lg bg-muted/60 py-2">
                  <p className="text-sm font-bold text-green-600">{formatEGP(g.profit)}</p>
                  <p className="text-[11px] text-muted-foreground">ربح</p>
                </div>
              </div>
              {g.expected > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{
                        width: `${Math.min((g.collected / g.expected) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    التحصيل {Math.round((g.collected / g.expected) * 100)}% من المتوقع
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* ===== دايالوج جروب جديد ===== */}
      <Dialog open={showNewGroup} onOpenChange={setShowNewGroup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>جروب جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">اسم الجروب</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="مثال: جروب السبت — دفعة يناير"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">يوم الحصة</label>
                <select
                  value={form.dayOfWeek}
                  onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                >
                  <option value="">بدون يوم محدد</option>
                  {DAY_NAMES.map((d, i) => (
                    <option key={i} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">السعر (جنيه)</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="مثال: 1500"
                />
              </div>
            </div>
            <Button className="w-full" onClick={createGroup} disabled={saving}>
              {saving ? "ثواني..." : "إنشاء الجروب"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-2 text-brand-500">{icon}</div>
      <p className="mt-2 text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{sub}</p>}
    </div>
  );
}
