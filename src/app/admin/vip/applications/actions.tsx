"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconCheck,
  IconX,
  IconLoader2,
  IconCrown,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

interface ApplicationActionsProps {
  applicationId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ENROLLED";
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
}

export function ApplicationActions({
  applicationId,
  status,
  applicantName,
  applicantEmail,
  applicantPhone,
}: ApplicationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  async function callAction(action: string, data?: Record<string, unknown>) {
    setLoading(action);
    try {
      const res = await fetch(`/api/admin/vip/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "حصلت مشكلة");
        return;
      }
      router.refresh();
      setShowRejectForm(false);
      setShowEnrollForm(false);
    } catch {
      alert("حصلت مشكلة في الاتصال");
    }
    setLoading(null);
  }

  // ============ PENDING — اقبل أو ارفض ============
  if (status === "PENDING") {
    if (showRejectForm) {
      return (
        <div className="space-y-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-medium text-red-900">سبب الرفض (هيتبعت في الإيميل):</p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="مثلاً: لسه محتاج تأخذ كورس الأساسيات الأول قبل ما تقدر تستفيد من الـ VIP."
            rows={3}
            className="w-full bg-background border border-red-200 rounded-lg p-3 text-sm outline-none focus:border-red-400 resize-none"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => callAction("reject", { reason: rejectReason })}
              disabled={loading === "reject" || !rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {loading === "reject" ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconX className="h-4 w-4" />}
              ابعت الرفض
            </button>
            <button
              onClick={() => setShowRejectForm(false)}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2"
            >
              إلغاء
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => callAction("approve")}
          disabled={loading !== null}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          {loading === "approve" ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconCheck className="h-4 w-4" />}
          اقبل + ابعت لينك الدفع
        </button>
        <button
          onClick={() => setShowRejectForm(true)}
          disabled={loading !== null}
          className="bg-muted hover:bg-muted/70 text-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <IconX className="h-4 w-4" />
          ارفض
        </button>
        <a
          href={`https://wa.me/${applicantPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
            `أهلاً ${applicantName.split(" ")[0]}، أنا أحمد من أكاديمية أمين بخصوص طلب الـ VIP بتاعك.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 ms-auto"
        >
          <IconBrandWhatsapp className="h-4 w-4" />
          كلّمه واتس
        </a>
      </div>
    );
  }

  // ============ APPROVED — أكّد الدفع وفعّل العضوية ============
  if (status === "APPROVED") {
    if (showEnrollForm) {
      return <EnrollForm
        applicationId={applicationId}
        applicantName={applicantName}
        applicantEmail={applicantEmail}
        onCancel={() => setShowEnrollForm(false)}
        onSuccess={() => router.refresh()}
      />;
    }

    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowEnrollForm(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <IconCrown className="h-4 w-4" />
          أكّد الدفع وفعّل العضوية
        </button>
        <a
          href={`https://wa.me/${applicantPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
            `أهلاً ${applicantName.split(" ")[0]}، بنتأكد من الدفع. ابعتلنا screenshot من العملية لو سمحت.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
        >
          <IconBrandWhatsapp className="h-4 w-4" />
          ذكّره بالدفع
        </a>
        <button
          onClick={() => callAction("reject", { reason: "اتقبلت بس مدفعش في الميعاد" })}
          disabled={loading !== null}
          className="text-sm text-red-600 hover:text-red-700 ms-auto"
        >
          إلغاء القبول
        </button>
      </div>
    );
  }

  // ============ ENROLLED أو REJECTED ============
  return null;
}

// ============ Enrollment Form (Manual) ============

function EnrollForm({
  applicationId,
  applicantEmail,
  onCancel,
  onSuccess,
}: {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [plan, setPlan] = useState<"MONTHLY" | "QUARTERLY" | "ANNUAL">("MONTHLY");
  const [amountPaid, setAmountPaid] = useState("199");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // الأسعار — Early Bird للراوند الأول (199/499/1799)
  const planPrices = { MONTHLY: 199, QUARTERLY: 499, ANNUAL: 1799 };
  const planLabels = { MONTHLY: "شهري", QUARTERLY: "ربع سنوي", ANNUAL: "سنوي" };
  const planMonths = { MONTHLY: 1, QUARTERLY: 3, ANNUAL: 12 };

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/vip/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enroll",
          plan,
          amountPaid: parseInt(amountPaid) * 100, // بالقرش
          notes,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "حصلت مشكلة");
        setLoading(false);
        return;
      }
      onSuccess();
    } catch {
      alert("حصلت مشكلة");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 bg-brand-50 border border-brand-200 rounded-xl p-5">
      <div>
        <p className="font-bold text-brand-900 mb-1">تفعيل عضوية VIP</p>
        <p className="text-xs text-brand-700">
          هتفعّل العضوية لـ {applicantEmail} وهيشوف الـ Dashboard فوراً.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-2">الخطة</label>
        <div className="grid grid-cols-3 gap-2">
          {(["MONTHLY", "QUARTERLY", "ANNUAL"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPlan(p);
                setAmountPaid(String(planPrices[p]));
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                plan === p
                  ? "bg-brand-600 text-white border-2 border-brand-600"
                  : "bg-background text-foreground border-2 border-border hover:border-brand-300"
              }`}
            >
              <div>{planLabels[p]}</div>
              <div className="text-xs opacity-75 mt-0.5">{planPrices[p]} ج</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-2">
          المبلغ المدفوع فعلاً (بالجنيه)
        </label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500"
        />
        <p className="text-xs text-muted-foreground mt-1">
          المدة: {planMonths[plan]} شهر — يتجدد {new Date(Date.now() + planMonths[plan] * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-EG")}
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-2">
          ملاحظات (اختياري — مثلاً: دفع فودافون كاش، رقم العملية: ...)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full bg-background border border-border rounded-lg p-2.5 text-sm outline-none focus:border-brand-500 resize-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !amountPaid}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconCrown className="h-4 w-4" />}
          فعّل العضوية
        </button>
        <button
          onClick={onCancel}
          className="text-sm text-muted-foreground hover:text-foreground px-3 py-2"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
