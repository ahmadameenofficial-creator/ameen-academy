"use client";

import { useEffect, useState } from "react";
import { IconBell, IconX } from "@tabler/icons-react";

/**
 * بانر تفعيل الإشعارات — بيظهر بأدب بعد ثواني من التصفح، مش بيستأذن
 * المتصفح غير لما المستخدم يدوس بنفسه (عشان منتحظرش للأبد).
 * لو قال "لاحقاً" بنسكت أسبوع كامل قبل ما نسأل تاني.
 */

const DISMISS_KEY = "push.prompt.dismissedAt";
const SNOOZE_DAYS = 7;

// مفتاح VAPID العام — المتصفح بيستخدمه يتأكد إن الإشعارات جاية مننا إحنا بس
function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function PushPrompt() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supported =
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!supported) return;
    if (Notification.permission === "denied") return;

    // متسألش تاني قبل ما فترة السكوت تخلص
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - dismissedAt < SNOOZE_DAYS * 24 * 60 * 60 * 1000) return;

    let cancelled = false;
    (async () => {
      // لو مشترك بالفعل من الجهاز ده — مفيش داعي نظهر
      const reg = await navigator.serviceWorker.getRegistration();
      const existing = await reg?.pushManager.getSubscription();
      if (existing || cancelled) return;
      // ظهور هادي بعد 8 ثواني تصفح — مش مطبّ في وش المستخدم
      setTimeout(() => !cancelled && setVisible(true), 8000);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const enable = async () => {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        dismiss();
        return;
      }

      // في الإنتاج الـ SW متسجّل من PwaRegister — لو لسه، بنسجّله بنفسنا
      const reg =
        (await navigator.serviceWorker.getRegistration()) ||
        (await navigator.serviceWorker.register("/sw.js"));
      await navigator.serviceWorker.ready;

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

      const res = await fetch("/api/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      if (!res.ok) {
        // السيرفر معرفش يسجّل — لازم نشيل اشتراك المتصفح كمان،
        // وإلا هيفضل "مشترك" شكلاً ومفيش إشعار هيوصله أبداً
        await subscription.unsubscribe().catch(() => {});
        throw new Error("subscribe failed");
      }

      setVisible(false);
    } catch {
      // فشل الاشتراك — بنقفل بهدوء وهنسأل تاني بعد أسبوع
      dismiss();
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-fade-up">
      <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-xl shadow-brand-500/10">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
          <IconBell size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900">خليك أول واحد يعرف</p>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
            إشعار فوري لما حد يرد عليك أو ينزل كورس أو بوست جديد
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={enable}
            disabled={loading}
            className="rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? "ثواني…" : "فعّل"}
          </button>
          <button
            onClick={dismiss}
            aria-label="لاحقاً"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100"
          >
            <IconX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
