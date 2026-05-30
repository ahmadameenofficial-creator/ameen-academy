"use client";

import { motion } from "framer-motion";

// 3 orbs خفيفة جداً — بتتحرّك ببطء، CPU/GPU cost قريب من الصفر
export function FloatingOrbs() {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 size-72 md:size-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-32 size-72 md:size-96 rounded-full bg-brand-300/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 left-1/4 size-32 md:size-48 rounded-full bg-brand-400/5 blur-3xl pointer-events-none hidden md:block"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// Pulse dot - بدل ما نكرّر CSS animation في كل مكان
export function PulseDot({ color = "brand" }: { color?: "brand" | "emerald" }) {
  const colors = {
    brand: { ping: "bg-brand-400", solid: "bg-brand-500" },
    emerald: { ping: "bg-emerald-400", solid: "bg-emerald-500" },
  };
  const c = colors[color];
  return (
    <span className="relative flex size-2">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.ping} opacity-75`} />
      <span className={`relative inline-flex size-2 rounded-full ${c.solid}`} />
    </span>
  );
}
