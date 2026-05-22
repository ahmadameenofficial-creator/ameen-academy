"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variant,
  type Transition,
} from "framer-motion";

// Fallback hook: لو useInView مش اشتغل خلال 1 ثانية، فعّل العنصر
// ده بيحل مشكلة SSR/headless browsers اللي IntersectionObserver مش بيشتغل فيها
function useInViewSafe(
  ref: React.RefObject<HTMLElement | null>,
  options: { once?: boolean; amount?: number } = {}
) {
  const isInView = useInView(ref, options);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (isInView) return;
    const timer = setTimeout(() => setFallback(true), 800);
    return () => clearTimeout(timer);
  }, [isInView]);

  return isInView || fallback;
}

// ============================================================
// الـ Motion System — مكتبة حركة احترافية لأكاديمية أمين
// ============================================================

// --- Easing Presets ---
const EASE = {
  smooth: [0.25, 0.1, 0.25, 1] as const,       // حركة ناعمة عامة
  spring: [0.34, 1.56, 0.64, 1] as const,       // bounce خفيف
  decel: [0, 0.55, 0.45, 1] as const,           // تباطؤ سلس
  accel: [0.55, 0, 1, 0.45] as const,           // تسارع
  expo: [0.16, 1, 0.3, 1] as const,             // exponential
};

// --- Default Transition ---
const defaultTransition: Transition = {
  duration: 0.6,
  ease: EASE.expo,
};

// --- Stagger Delay Calculator ---
function staggerDelay(index: number, base = 0.08): number {
  return index * base;
}

// ============================================================
// 1. FadeIn — ظهور تدريجي مع اتجاه
// ============================================================
type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function FadeIn({
  children,
  direction = "up",
  distance,
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  threshold = 0.2,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once, amount: threshold });

  const dir = directionMap[direction];
  const initial = {
    opacity: 0,
    x: dir.x ? (distance || dir.x) * (dir.x > 0 ? 1 : -1) : 0,
    y: dir.y ? (distance || dir.y) * (dir.y > 0 ? 1 : -1) : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration, delay, ease: EASE.expo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 2. StaggerContainer + StaggerItem — عناصر متتابعة
// ============================================================
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay: delay = 0.08,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: StaggerItemProps) {
  const dir = directionMap[direction];

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: dir.x || 0,
          y: dir.y || 0,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: EASE.expo,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 3. ScaleIn — ظهور مع تكبير
// ============================================================
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  scale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  scale = 0.85,
}: ScaleInProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{ duration, delay, ease: EASE.spring }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 4. SlideReveal — نص يتكشف من تحت mask
// ============================================================
interface SlideRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SlideReveal({
  children,
  delay = 0,
  className,
}: SlideRevealProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.6, delay, ease: EASE.expo }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================
// 5. CountUp — عدّاد أرقام متحرك
// ============================================================
interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CountUpInner
            target={target}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
          />
        </motion.span>
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}

function CountUpInner({
  target,
  duration,
  prefix,
  suffix,
}: {
  target: number;
  duration: number;
  prefix: string;
  suffix: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ "--count": 0 }}
      animate={{ "--count": target }}
      transition={{ duration, ease: EASE.decel }}
      onUpdate={(latest: { "--count"?: number }) => {
        if (nodeRef.current && latest["--count"] !== undefined) {
          nodeRef.current.textContent = `${prefix}${Math.round(
            latest["--count"]
          ).toLocaleString()}${suffix}`;
        }
      }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}

// ============================================================
// 6. Parallax — حركة parallax مع الـ scroll
// ============================================================
interface ParallaxProps {
  children: ReactNode;
  speed?: number; // سالب = عكس الاتجاه
  className?: string;
}

export function Parallax({
  children,
  speed = 0.3,
  className,
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 7. HoverLift — رفع العنصر عند الـ hover
// ============================================================
interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}

export function HoverLift({
  children,
  className,
  lift = -6,
  scale = 1.02,
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: lift, scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 8. TextReveal — كل كلمة تظهر لوحدها
// ============================================================
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  staggerDelay: wordDelay = 0.04,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: wordDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${wordClassName || ""}`}
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: EASE.expo },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

// ============================================================
// 9. DrawLine — خط SVG يترسم تدريجياً
// ============================================================
interface DrawLineProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

export function DrawLine({
  className,
  color = "#A002FF",
  width = 200,
  height = 4,
}: DrawLineProps) {
  const ref = useRef(null);
  const isInView = useInViewSafe(ref, { once: true, amount: 0.5 });

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <motion.line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke={color}
        strokeWidth={height}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.8, ease: EASE.expo, delay: 0.2 }}
      />
    </svg>
  );
}

// ============================================================
// 10. FloatingElement — حركة float مستمرة
// ============================================================
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number; // المسافة بالبكسل
  duration?: number;  // مدة الدورة الكاملة
}

export function FloatingElement({
  children,
  className,
  amplitude = 10,
  duration = 4,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// Export كل حاجة
// ============================================================
export { EASE, staggerDelay };
