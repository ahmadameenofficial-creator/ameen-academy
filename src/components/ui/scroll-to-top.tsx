"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowUp } from "@tabler/icons-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 flex size-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-600 active:scale-95"
          aria-label="الرجوع للأعلى"
        >
          <IconArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
