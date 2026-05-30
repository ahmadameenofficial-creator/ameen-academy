"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBolt, IconClock, IconX } from "@tabler/icons-react";
import { EARLY_BIRD_DEADLINE, EARLY_BIRD_DISCOUNT } from "../_constants";

function getRemaining(deadline: Date) {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function EarlyBirdBanner({ remainingSeats }: { remainingSeats: number }) {
  const [remaining, setRemaining] = useState(() => getRemaining(EARLY_BIRD_DEADLINE));
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(getRemaining(EARLY_BIRD_DEADLINE));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (!remaining || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-[60] bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/20"
      >
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap text-xs md:text-sm">
            <span className="flex items-center gap-1.5 font-bold">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IconBolt className="h-4 w-4 fill-yellow-300 text-yellow-300" />
              </motion.span>
              خصم {EARLY_BIRD_DISCOUNT}% للحجز المبكر
            </span>
            <span className="hidden sm:inline opacity-70">·</span>
            <span className="flex items-center gap-1.5">
              <IconClock className="h-3.5 w-3.5" />
              <span className="font-mono font-bold tabular-nums">
                {remaining.days}
                <span className="opacity-60 mx-0.5">يوم</span>
                {String(remaining.hours).padStart(2, "0")}:{String(remaining.minutes).padStart(2, "0")}:{String(remaining.seconds).padStart(2, "0")}
              </span>
            </span>
            <span className="hidden sm:inline opacity-70">·</span>
            <span className="hidden sm:inline">
              <strong>{remainingSeats}</strong> مكان فاضل من 30
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="bg-white text-brand-700 font-bold text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full hover:bg-brand-50 transition-colors"
            >
              احجز دلوقتي
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white p-1"
              aria-label="إخفاء"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
