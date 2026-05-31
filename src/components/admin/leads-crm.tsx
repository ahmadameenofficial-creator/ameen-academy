"use client";

import { useState, useMemo } from "react";
import {
  IconBrandWhatsapp,
  IconMail,
  IconSearch,
  IconFilter,
  IconUsers,
  IconUserCheck,
  IconCoin,
  IconPhone,
  IconSend,
  IconCheck,
  IconX,
  IconChevronDown,
  IconDownload,
  IconCopy,
  IconExternalLink,
  IconClock,
  IconBook,
  IconPercentage,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
// النوع ده بييجي من السيرفر بعد تحويل التواريخ لـ ISO strings
export interface CrmContactSerialized {
  id: string;
  type: "user" | "lead";
  name: string;
  email: string | null;
  phone: string | null;
  source: string;
  createdAt: string;
  lastLoginAt: string | null;
  enrolledCourses: { title: string; price: number; completedAt: string | null }[];
  totalPaid: number;
  hasPaidCourse: boolean;
  hasFreeCourseOnly: boolean;
  inFreeCourse: boolean;
  freeProgress: number;
  leadTier: "hot" | "warm" | "cold" | "none";
  progressPercent: number;
}

type FilterType =
  | "all"
  | "free-only"
  | "paid"
  | "no-course"
  | "leads-form"
  | "has-phone"
  | "strong-leads";

const TIER_LABEL: Record<CrmContactSerialized["leadTier"], string> = {
  hot: "ساخن — خلّص الكورس",
  warm: "دافي — نص الكورس",
  cold: "بدأ الكورس",
  none: "",
};

interface CrmStats {
  totalContacts: number;
  totalUsers: number;
  totalLeads: number;
  usersWithPhone: number;
  freeEnrollments: number;
  paidEnrollments: number;
  conversionRate: number;
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function timeAgo(date: Date | string | null) {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `${mins} د`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} س`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} يوم`;
  return formatDate(date);
}

function formatMoney(piasters: number) {
  if (piasters === 0) return "0";
  return `${(piasters / 100).toLocaleString("ar-EG")} ج.م`;
}

function toWhatsAppLink(phone: string, message?: string) {
  // حوّل الرقم المصري لصيغة دولية
  let num = phone.replace(/[^0-9]/g, "");
  if (num.startsWith("01")) num = "2" + num; // مصر +20
  if (!num.startsWith("20")) num = "20" + num;
  const url = `https://wa.me/${num}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

const FILTERS: { key: FilterType; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "الكل", icon: IconUsers },
  { key: "free-only", label: "كورس مجاني بس", icon: IconBook },
  { key: "paid", label: "مشترين", icon: IconCoin },
  { key: "no-course", label: "مسجّل بس", icon: IconUserCheck },
  { key: "strong-leads", label: "ليدز أقوياء", icon: IconPercentage },
  { key: "leads-form", label: "من فورم الاهتمام", icon: IconSend },
  { key: "has-phone", label: "عنده واتساب", icon: IconPhone },
];

export function LeadsCrm({
  contacts,
  stats,
}: {
  contacts: CrmContactSerialized[];
  stats: CrmStats;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkMessage, setBulkMessage] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const { success } = useToast();

  const filtered = useMemo(() => {
    let list = contacts;

    // فلتر حسب النوع
    switch (filter) {
      case "free-only":
        list = list.filter((c) => c.hasFreeCourseOnly);
        break;
      case "paid":
        list = list.filter((c) => c.hasPaidCourse);
        break;
      case "no-course":
        list = list.filter((c) => c.type === "user" && c.enrolledCourses.length === 0);
        break;
      case "strong-leads":
        // اللي خدوا 50% أو أكتر من الكورس المجاني = ليد أقوى
        list = list.filter((c) => c.leadTier === "warm" || c.leadTier === "hot");
        break;
      case "leads-form":
        list = list.filter((c) => c.type === "lead");
        break;
      case "has-phone":
        list = list.filter((c) => c.phone);
        break;
    }

    // بحث
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.includes(q),
      );
    }

    return list;
  }, [contacts, filter, search]);

  const selectedWithPhone = useMemo(
    () => filtered.filter((c) => selected.has(c.id) && c.phone),
    [filtered, selected],
  );

  // ليدز أقوياء = خدوا 50%+ من الكورس المجاني
  const strongLeads = useMemo(
    () => contacts.filter((c) => c.leadTier === "warm" || c.leadTier === "hot").length,
    [contacts],
  );

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function copyPhoneList() {
    const phones = selectedWithPhone.map((c) => c.phone).join("\n");
    navigator.clipboard.writeText(phones);
    success(`تم نسخ ${selectedWithPhone.length} رقم`);
  }

  function copyBulkLinks() {
    const links = selectedWithPhone.map((c) => toWhatsAppLink(c.phone!, bulkMessage)).join("\n");
    navigator.clipboard.writeText(links);
    success(`تم نسخ ${selectedWithPhone.length} لينك واتساب`);
  }

  return (
    <div className="space-y-6">
      {/* الإحصائيات */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <StatCard label="إجمالي الناس" value={stats.totalContacts} icon={IconUsers} />
        <StatCard label="مسجّلين" value={stats.totalUsers} icon={IconUserCheck} color="text-brand-600" />
        <StatCard label="من فورم الاهتمام" value={stats.totalLeads} icon={IconSend} color="text-amber-600" />
        <StatCard label="عندهم واتساب" value={stats.usersWithPhone} icon={IconPhone} color="text-green-600" />
        <StatCard label="كورس مجاني" value={stats.freeEnrollments} icon={IconBook} color="text-blue-600" />
        <StatCard label="ليدز أقوياء" value={strongLeads} icon={IconPercentage} color="text-rose-600" />
        <StatCard label="مشترين" value={stats.paidEnrollments} icon={IconCoin} color="text-emerald-600" />
        <StatCard label="نسبة التحويل" value={`${stats.conversionRate}%`} icon={IconPercentage} color="text-brand-600" />
      </div>

      {/* شريط البحث + الفلاتر */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث بالاسم، الإيميل، أو الرقم..."
              className="pr-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/leads/export"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <IconDownload className="h-4 w-4" />
              <span className="hidden sm:inline">تصدير CSV</span>
            </a>
            <Button
              variant={showBulk ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBulk(!showBulk)}
              className="gap-1.5"
            >
              <IconBrandWhatsapp className="h-4 w-4" />
              <span className="hidden sm:inline">رسالة جماعية</span>
            </Button>
          </div>
        </div>

        {/* فلاتر */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <IconFilter className="h-4 w-4 text-muted-foreground shrink-0" />
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key); setSelected(new Set()); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-brand-500 text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <f.icon className="h-3.5 w-3.5" />
              {f.label}
            </button>
          ))}
        </div>
      </Card>

      {/* بانل الرسالة الجماعية */}
      {showBulk && (
        <Card className="p-4 border-green-200 bg-green-50/50 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-green-800">
            <IconBrandWhatsapp className="h-5 w-5" />
            رسالة واتساب جماعية
            {selectedWithPhone.length > 0 && (
              <Badge variant="success" className="text-xs">
                {selectedWithPhone.length} شخص محدد عندهم واتساب
              </Badge>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border border-green-200 bg-white p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            placeholder="اكتب الرسالة اللي عايز تبعتها... (مثلاً: مرحبا! عندنا كورس جديد هيفيدك جداً...)"
            value={bulkMessage}
            onChange={(e) => setBulkMessage(e.target.value)}
            dir="rtl"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
              disabled={selectedWithPhone.length === 0 || !bulkMessage.trim()}
              onClick={copyBulkLinks}
            >
              <IconCopy className="h-3.5 w-3.5" />
              نسخ لينكات واتساب ({selectedWithPhone.length})
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              disabled={selectedWithPhone.length === 0}
              onClick={copyPhoneList}
            >
              <IconCopy className="h-3.5 w-3.5" />
              نسخ الأرقام بس
            </Button>
            <span className="text-xs text-muted-foreground">
              حدد الناس من الجدول تحت، أو اضغط &quot;تحديد الكل&quot;
            </span>
          </div>
        </Card>
      )}

      {/* الجدول */}
      <Card className="overflow-hidden">
        {/* Header row */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground">
          <label className="flex items-center gap-2 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={filtered.length > 0 && selected.size === filtered.length}
              onChange={toggleAll}
              className="rounded border-border accent-brand-500"
            />
            <span className="hidden sm:inline">تحديد الكل</span>
          </label>
          <span className="flex-1">الاسم والتواصل</span>
          <span className="hidden md:block w-32">الحالة</span>
          <span className="hidden lg:block w-40">الكورسات</span>
          <span className="hidden sm:block w-20 text-center">المدفوع</span>
          <span className="w-16 text-center">إجراءات</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            <IconSearch className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
            مفيش نتائج
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                isSelected={selected.has(contact.id)}
                onToggle={() => toggleOne(contact.id)}
                bulkMessage={bulkMessage}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground">
          <span>
            {filtered.length} نتيجة
            {selected.size > 0 && ` — ${selected.size} محدد`}
          </span>
          <span>{contacts.length} إجمالي</span>
        </div>
      </Card>
    </div>
  );
}

// ============ صف واحد في الجدول ============

function ContactRow({
  contact,
  isSelected,
  onToggle,
  bulkMessage,
}: {
  contact: CrmContactSerialized;
  isSelected: boolean;
  onToggle: () => void;
  bulkMessage: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`transition-colors ${isSelected ? "bg-brand-50/50" : "hover:bg-muted/30"}`}>
      <div className="flex items-center gap-3 px-4 py-3 text-sm">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="rounded border-border accent-brand-500 shrink-0"
        />

        {/* الاسم + التواصل */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground">{contact.name}</span>
            <Badge
              variant={contact.type === "lead" ? "outline" : "soft"}
              className="text-[10px]"
            >
              {contact.type === "lead" ? "فورم" : "مسجّل"}
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
            {contact.phone && (
              <span className="flex items-center gap-1" dir="ltr">
                <IconPhone className="h-3 w-3" />
                {contact.phone}
              </span>
            )}
            {contact.email && (
              <span className="flex items-center gap-1 truncate max-w-[180px]" dir="ltr">
                <IconMail className="h-3 w-3" />
                {contact.email}
              </span>
            )}
            <span className="flex items-center gap-1">
              <IconClock className="h-3 w-3" />
              {formatDate(contact.createdAt)}
            </span>
          </div>
        </div>

        {/* الحالة */}
        <div className="hidden md:flex flex-col items-start gap-1 w-32">
          <Badge
            variant={
              contact.hasPaidCourse
                ? "default"
                : contact.hasFreeCourseOnly
                  ? "success"
                  : contact.type === "lead"
                    ? "outline"
                    : "soft"
            }
            className="text-[10px]"
          >
            {contact.source}
          </Badge>
          {(contact.leadTier === "hot" || contact.leadTier === "warm") && (
            <Badge
              variant={contact.leadTier === "hot" ? "default" : "success"}
              className="text-[9px]"
            >
              {TIER_LABEL[contact.leadTier]} ({contact.freeProgress}%)
            </Badge>
          )}
        </div>

        {/* الكورسات */}
        <div className="hidden lg:block w-40">
          {contact.enrolledCourses.length > 0 ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-brand-600 hover:underline"
            >
              <IconBook className="h-3 w-3" />
              {contact.enrolledCourses.length} كورس
              <IconChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>

        {/* المدفوع */}
        <div className="hidden sm:block w-20 text-center">
          <span className={`text-xs font-medium ${contact.totalPaid > 0 ? "text-green-600" : "text-muted-foreground"}`}>
            {formatMoney(contact.totalPaid)}
          </span>
        </div>

        {/* إجراءات */}
        <div className="flex items-center gap-1 w-16 justify-center shrink-0">
          {contact.phone && (
            <a
              href={toWhatsAppLink(contact.phone, bulkMessage || undefined)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
              title="واتساب"
            >
              <IconBrandWhatsapp className="h-4 w-4" />
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              title="إيميل"
            >
              <IconMail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* تفاصيل الكورسات */}
      {expanded && contact.enrolledCourses.length > 0 && (
        <div className="px-12 pb-3">
          <div className="flex flex-wrap gap-2">
            {contact.enrolledCourses.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs bg-muted/50 rounded-lg px-2.5 py-1.5">
                {c.completedAt ? (
                  <IconCheck className="h-3 w-3 text-green-500" />
                ) : (
                  <IconClock className="h-3 w-3 text-amber-500" />
                )}
                <span>{c.title.length > 25 ? c.title.slice(0, 25) + "..." : c.title}</span>
                {c.price > 0 && (
                  <Badge variant="soft" className="text-[9px]">
                    {formatMoney(c.price)}
                  </Badge>
                )}
                {c.price === 0 && (
                  <Badge variant="success" className="text-[9px]">مجاني</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ بطاقة إحصائية ============

function StatCard({
  label,
  value,
  icon: Icon,
  color = "text-foreground",
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <Card className="p-3 text-center">
      <div className={`flex items-center justify-center gap-1.5 ${color}`}>
        <Icon className="h-4 w-4" />
        <span className="text-lg font-bold">{value}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </Card>
  );
}
