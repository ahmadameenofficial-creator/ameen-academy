"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import { IconBooks, IconArrowDown, IconSparkles } from "@tabler/icons-react";
import { BookCover } from "./book-cover";
import { LIBRARY_BOOKS, LIBRARY_STATS } from "@/lib/data/library-books";

// كتب مختارة تعوم في الهيرو
const FLOATING_IDS = [
  "vignelli-canon",
  "thinking-with-type",
  "designing-brand-identity",
  "interaction-of-color",
  "the-creative-act",
];
const floatingBooks = FLOATING_IDS.map(
  (id) => LIBRARY_BOOKS.find((b) => b.id === id)!
).filter(Boolean);

// عدّاد أرقام
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion();
  // نبدأ بالقيمة الصحيحة عشان تظهر حتى لو الأنيميشن ما اشتغلش (مفيش «0»)
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    setVal(0);
    const controls = animate(0, to, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, reduce]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function LibraryHero() {
  const reduce = useReducedMotion();

  // مواضع وحركة كل كتاب عايم
  const floatConfigs = [
    { top: "6%", left: "10%", rotate: -8, delay: 0, z: 20, w: "w-28 sm:w-32" },
    { top: "0%", left: "52%", rotate: 6, delay: 0.6, z: 30, w: "w-32 sm:w-40" },
    { top: "42%", left: "0%", rotate: 5, delay: 1.1, z: 10, w: "w-24 sm:w-28" },
    { top: "50%", left: "60%", rotate: -6, delay: 0.3, z: 20, w: "w-28 sm:w-32" },
    { top: "30%", left: "30%", rotate: -2, delay: 0.9, z: 40, w: "w-32 sm:w-36" },
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* خلفيات حيّة */}
      <div className="absolute inset-0 mesh-bg" aria-hidden />
      <div className="aurora-bg" aria-hidden />
      <div className="absolute inset-0 grid-pattern" aria-hidden />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* النص */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 text-center lg:order-1 lg:text-right"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700"
            >
              <IconSparkles className="size-4" />
              <span>مكتبة مختارة بعناية</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-3xl font-bold leading-[1.3] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              مكتبة كتب{" "}
              <span className="text-gradient-brand inline-block pb-1">التصميم</span>
              <br className="hidden sm:block" /> اللي بتبني مصمم محترف
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground lg:mx-0"
            >
              أقوى كتب الجرافيك ديزاين والإبداع — مختارة، مع ملخص عربي و«ليه
              تقراه» لكل كتاب. في منها مجاني تقراه دلوقتي، وفي منها ترشيحات
              تستاهل مكتبتك.
            </motion.p>

            {/* الأرقام */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              <Stat value={LIBRARY_STATS.total} label="كتاب مختار" />
              <span className="h-8 w-px bg-border" aria-hidden />
              <Stat value={LIBRARY_STATS.free} label="متاح مجاناً" />
              <span className="h-8 w-px bg-border" aria-hidden />
              <Stat value={LIBRARY_STATS.categories} label="تصنيفات" />
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
            >
              <IconBooks className="size-5 text-brand-500" />
              <span>انزل تحت اختار تصنيفك وابدأ</span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconArrowDown className="size-4 text-brand-500" />
              </motion.span>
            </motion.div>
          </motion.div>

          {/* الأغلفة العايمة */}
          <div className="relative order-1 mx-auto h-[320px] w-full max-w-md sm:h-[380px] lg:order-2">
            {floatingBooks.map((book, i) => {
              const c = floatConfigs[i];
              return (
                <motion.div
                  key={book.id}
                  className={`absolute ${c.w}`}
                  style={{ top: c.top, left: c.left, zIndex: c.z }}
                  initial={{ opacity: 0, scale: 0.7, rotate: c.rotate }}
                  animate={
                    reduce
                      ? { opacity: 1, scale: 1, rotate: c.rotate }
                      : {
                          opacity: 1,
                          scale: 1,
                          rotate: c.rotate,
                          y: [0, -14, 0],
                        }
                  }
                  transition={
                    reduce
                      ? { duration: 0.5 }
                      : {
                          opacity: { duration: 0.6, delay: c.delay * 0.5 },
                          scale: { duration: 0.6, delay: c.delay * 0.5 },
                          y: {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: c.delay,
                          },
                        }
                  }
                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
                >
                  <BookCover book={book} />
                </motion.div>
              );
            })}
            {/* هالة ورا الأغلفة */}
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center lg:text-right">
      <div className="text-3xl font-bold text-gradient-brand">
        <CountUp to={value} />
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
