"use client";

import { useEffect, useRef, type ReactNode } from "react";

// ============ Reveal — العناصر بتطلع وهي داخلة الشاشة ============
// IntersectionObserver خفيف: بيضيف كلاس مرة واحدة ويفصل.
// reduced-motion بيتعامل معاه الـ CSS نفسه (.reveal بترجع ظاهرة).

interface RevealProps {
  children: ReactNode;
  /** تأخير بالمللي ثانية — للستاجر بين الكروت */
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
