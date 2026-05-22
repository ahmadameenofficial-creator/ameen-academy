"use client";

import { useEffect } from "react";
import { REFERRAL_CONFIG } from "@/lib/constants";

export const REFERRAL_STORAGE_KEY = "ameen_ref_code";

/**
 * بيلتقط كود الإحالة من الـ URL (?ref=CODE) ويخزّنه في localStorage،
 * عشان يفضل محفوظ لحد ما المستخدم يسجّل حساب (حتى لو لف على صفحات تانية).
 */
export function ReferralCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get(REFERRAL_CONFIG.param);
      if (ref && ref.trim()) {
        localStorage.setItem(REFERRAL_STORAGE_KEY, ref.trim().toUpperCase());
      }
    } catch {
      // localStorage مش متاح (نادر) — نتجاهل بهدوء
    }
  }, []);

  return null;
}
