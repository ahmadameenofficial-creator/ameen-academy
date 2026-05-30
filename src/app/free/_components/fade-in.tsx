"use client";

import { motion, type Variants } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  duration?: number;
  className?: string;
  once?: boolean;
}

const directions: Record<string, { initial: { x?: number; y?: number; scale?: number; opacity: number }; animate: { x?: number; y?: number; scale?: number; opacity: number } }> = {
  up: { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  down: { initial: { y: -24, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left: { initial: { x: 24, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: -24, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  scale: { initial: { scale: 0.92, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.55,
  className = "",
  once = true,
}: FadeInProps) {
  const dir = directions[direction];
  return (
    <motion.div
      initial={dir.initial}
      whileInView={dir.animate}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container — لما تيجي تعرض list فيها أكتر من item
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Hover float — للكروت المهمة
export function FloatOnHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
