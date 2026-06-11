"use client";

import { useEffect, useRef, type ReactNode } from "react";

// ============ Tilt3D — عمق ثلاثي الأبعاد تفاعلي ============
// ديسكتوب: العنصر بيميل مع حركة الماوس + لمعة ضوئية بتتبع المؤشر.
// موبايل: بيميل مع حركة الجهاز نفسه (جيروسكوب) — إحساس إنه في إيدك.
// CSS transforms خالص: صفر مكتبات، صفر تأثير على سرعة التحميل،
// وبيحترم prefers-reduced-motion تلقائياً.

interface Tilt3DProps {
  children: ReactNode;
  /** أقصى زاوية ميل بالدرجات */
  max?: number;
  className?: string;
}

export function Tilt3D({ children, max = 9, className }: Tilt3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!wrap || !card || !glare) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // rx/ry نسب من -1 لـ 1 — بتتحول لزوايا وموضع اللمعة
    const apply = (rx: number, ry: number, instant = false) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        card.style.transition = instant ? "" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        card.style.transform = `perspective(900px) rotateX(${-ry * max}deg) rotateY(${rx * max}deg)`;
        glare.style.opacity = rx || ry ? "1" : "0";
        glare.style.background = `radial-gradient(circle at ${50 + rx * 45}% ${50 + ry * 45}%, rgba(255,255,255,0.25), transparent 55%)`;
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      apply(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1, true);
    };
    const onPointerLeave = () => apply(0, 0);

    // الجيروسكوب — للموبايل بس (مفيش ماوس دقيق)
    let onOrientation: ((e: DeviceOrientationEvent) => void) | null = null;
    if (window.matchMedia("(pointer: coarse)").matches && "DeviceOrientationEvent" in window) {
      let base: { beta: number; gamma: number } | null = null;
      onOrientation = (e) => {
        if (e.beta === null || e.gamma === null) return;
        // أول قراءة = الوضع الطبيعي للجهاز — بنميل نسبةً ليها
        if (!base) base = { beta: e.beta, gamma: e.gamma };
        const ry = Math.max(-1, Math.min(1, (e.beta - base.beta) / 30));
        const rx = Math.max(-1, Math.min(1, (e.gamma - base.gamma) / 30));
        apply(rx, ry, true);
      };
      window.addEventListener("deviceorientation", onOrientation);
    }

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      if (onOrientation) window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [max]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "900px" }}>
      <div ref={cardRef} className="relative will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
        {/* اللمعة الضوئية — فوق المحتوى ومش بتمنع التفاعل */}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
