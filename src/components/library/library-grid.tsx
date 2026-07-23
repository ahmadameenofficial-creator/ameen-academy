"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  IconDownload,
  IconEye,
  IconShoppingCart,
  IconCheck,
  IconArrowLeft,
  IconStarFilled,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookCover } from "./book-cover";
import {
  LIBRARY_BOOKS,
  BOOK_CATEGORIES,
  getBuyUrl,
  type LibraryBook,
} from "@/lib/data/library-books";

// ============ إعدادات الأكشن حسب نوع الإتاحة ============
function accessCTA(book: LibraryBook) {
  switch (book.access) {
    case "download":
      return {
        label: "تحميل مجاني (PDF)",
        icon: IconDownload,
        href: book.url ?? "#",
        free: true,
      };
    case "read":
      return {
        label: "اقرأ مجاناً أونلاين",
        icon: IconEye,
        href: book.url ?? "#",
        free: true,
      };
    default:
      return {
        label: "النسخة الأصلية",
        icon: IconShoppingCart,
        href: getBuyUrl(book),
        free: false,
      };
  }
}

export function LibraryGrid() {
  const reduce = useReducedMotion();
  const [activeCat, setActiveCat] = useState<string>("الكل");
  const [selected, setSelected] = useState<LibraryBook | null>(null);

  const books = useMemo(
    () =>
      activeCat === "الكل"
        ? LIBRARY_BOOKS
        : LIBRARY_BOOKS.filter((b) => b.category === activeCat),
    [activeCat]
  );

  return (
    <section className="container relative pb-24">
      {/* ===== فلتر التصنيفات ===== */}
      <div className="sticky top-16 z-20 -mx-4 mb-10 bg-background/80 px-4 py-4 backdrop-blur-md">
        <div className="flex flex-wrap justify-center gap-2">
          {BOOK_CATEGORIES.map((cat) => {
            const isActive = cat === activeCat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="lib-active-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #A002FF, #6D01B0)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== الجريد ===== */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {books.map((book, i) => (
            <motion.button
              key={book.id}
              layout
              onClick={() => setSelected(book)}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : Math.min(i * 0.04, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduce ? undefined : { y: -8 }}
              className="group flex flex-col text-right focus:outline-none"
            >
              {/* الغلاف بـ tilt 3D */}
              <motion.div
                style={{ transformPerspective: 900 }}
                whileHover={reduce ? undefined : { rotateY: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <BookCover book={book} />
                {/* شارة الإتاحة */}
                <div className="absolute -top-2 right-2">
                  {book.access === "buy" ? (
                    <Badge variant="soft" className="shadow-sm">
                      ترشيح
                    </Badge>
                  ) : (
                    <Badge variant="success" className="shadow-sm">
                      مجاني
                    </Badge>
                  )}
                </div>
              </motion.div>

              {/* بيانات مختصرة */}
              <div className="mt-3 flex flex-1 flex-col">
                <h3 className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-brand-600">
                  {book.arabicTitle}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {book.author}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground/90">
                  {book.tagline}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ===== صفحة تفاصيل الكتاب ===== */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto p-0">
          {selected && <BookDetail book={selected} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ============ محتوى التفاصيل ============
function BookDetail({ book }: { book: LibraryBook }) {
  const cta = accessCTA(book);
  const CtaIcon = cta.icon;

  return (
    <div>
      {/* رأس بخلفية تدرّج الغلاف */}
      <div
        className="relative px-6 pb-6 pt-8"
        style={{
          backgroundImage: `linear-gradient(160deg, ${book.cover.from}, ${book.cover.to})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden />
        <div className="relative flex gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="w-24 shrink-0 sm:w-28"
          >
            <BookCover book={book} />
          </motion.div>
          <div className="min-w-0 flex-1 pt-1 text-white">
            <DialogTitle className="text-xl font-bold leading-tight drop-shadow-sm">
              {book.arabicTitle}
            </DialogTitle>
            <p dir="ltr" className="mt-1 text-left text-sm text-white/80">
              {book.title}
            </p>
            <p className="mt-1 text-sm text-white/85">{book.author}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="solid" className="bg-white/20 text-white">
                {book.category}
              </Badge>
              <Badge variant="solid" className="bg-white/20 text-white">
                {book.level}
              </Badge>
              <Badge variant="solid" className="bg-white/20 text-white">
                {book.year}
              </Badge>
              {book.pages > 0 && (
                <Badge variant="solid" className="bg-white/20 text-white">
                  {book.pages} صفحة
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* الجسم */}
      <div className="space-y-6 p-6">
        <p className="text-[15px] leading-relaxed text-foreground">
          {book.summary}
        </p>

        {/* ليه تقراه */}
        <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-brand-700">
            <IconStarFilled className="size-4" />
            ليه تقراه؟
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {book.whyRead}
          </p>
        </div>

        {/* أهم الأفكار */}
        <div>
          <h4 className="mb-3 text-sm font-bold text-foreground">
            أهم الأفكار اللي هتطلع بيها
          </h4>
          <ul className="space-y-2.5">
            {book.takeaways.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <IconCheck className="size-3.5" />
                </span>
                <span className="leading-relaxed">{t}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button
          asChild
          variant={cta.free ? "gradient" : "outline"}
          size="lg"
          className="w-full"
        >
          <a href={cta.href} target="_blank" rel="noopener noreferrer">
            <CtaIcon className="size-5" />
            {cta.label}
            <IconArrowLeft className="size-4" />
          </a>
        </Button>

        {/* شفافية المصدر/الرخصة */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
          {book.sourceNote}
        </p>
      </div>
    </div>
  );
}
