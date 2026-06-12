"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconGift } from "@tabler/icons-react";

// ============ StickyCta — شريط CTA لاصق تحت الشاشة (موبايل بس) ============
// بيظهر بعد ما المستخدم يعدّي الهيرو — الزرار قدامه دايماً من غير ما يرجع لفوق.
// مخفي تماماً على الديسكتوب (lg فما فوق).

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 550);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/free"
        tabIndex={visible ? 0 : -1}
        className="btn-shine gradient-brand flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold text-white shadow-lg shadow-brand-500/30 active:scale-[0.98] transition-transform"
      >
        <IconGift className="size-5" />
        ابدأ بالكورس المجاني — ببلاش
      </Link>
    </div>
  );
}
