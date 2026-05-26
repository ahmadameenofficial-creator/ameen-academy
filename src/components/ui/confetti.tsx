"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// كونفتي خفيف بدون مكتبات — CSS particles فقط
const COLORS = ["#A002FF", "#6D01B0", "#DBB8FF", "#FFD700", "#FF6B6B", "#4ECDC4"];
const PARTICLE_COUNT = 40;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function Confetti({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; color: string; delay: number; size: number }>
  >([]);

  useEffect(() => {
    if (!trigger) return;
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: randomBetween(5, 95),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: randomBetween(0, 0.3),
      size: randomBetween(6, 12),
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: "110vh",
                rotate: randomBetween(-360, 360),
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: randomBetween(2, 3.5),
                delay: p.delay,
                ease: "easeIn",
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
