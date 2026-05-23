"use client";

import { useEffect } from "react";

/**
 * بيسجّل الـ Service Worker بهدوء بعد ما الصفحة تحمّل،
 * عشان المنصة تشتغل كـ Web App قابلة للتثبيت على الموبايل وتفتح بسرعة.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // تسجيل فشل — مش حرج، الموقع بيشتغل عادي
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
