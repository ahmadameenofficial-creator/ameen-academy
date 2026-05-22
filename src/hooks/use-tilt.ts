"use client";

import { useRef, useCallback, type MouseEvent } from "react";

/**
 * 3D tilt effect hook — tracks mouse position on an element
 * and applies CSS perspective rotation for depth.
 */
export function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }, []);

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
