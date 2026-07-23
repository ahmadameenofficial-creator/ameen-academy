import { cn } from "@/lib/utils";
import type { LibraryBook } from "@/lib/data/library-books";

// ============ غلاف كتاب مصمّم ============
// بنولّد غلاف أنيق من تدرّج لوني + عنوان — بدل ما نرفع صور أغلفة محمية بحقوق.
// spine على اليمين (اتجاه RTL) عشان يبان زي كتاب حقيقي.

export function BookCover({
  book,
  className,
}: {
  book: LibraryBook;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "book-cover relative aspect-[3/4] w-full overflow-hidden rounded-l-md rounded-r-lg shadow-xl",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(145deg, ${book.cover.from}, ${book.cover.to})`,
      }}
    >
      {/* الكعب (spine) على اليمين */}
      <div className="absolute inset-y-0 right-0 w-2.5 bg-black/25" aria-hidden />
      <div className="absolute inset-y-0 right-2.5 w-px bg-white/20" aria-hidden />

      {/* لمعة زجاجية بتكنس على الغلاف */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25"
        aria-hidden
      />
      {/* دائرة ضوء خفيفة فوق */}
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-white/15 blur-2xl"
        aria-hidden
      />

      {/* المحتوى — العنوان إنجليزي فبنخليه LTR */}
      <div
        dir="ltr"
        className="relative flex h-full flex-col p-4 pr-6 text-left text-white"
      >
        <div className="h-1 w-8 rounded-full bg-white/60" aria-hidden />
        <div className="mt-auto">
          <h3 className="text-[15px] font-extrabold leading-tight tracking-tight drop-shadow-sm">
            {book.title}
          </h3>
          <p className="mt-2 text-[11px] font-medium text-white/75">
            {book.author}
          </p>
        </div>
      </div>
    </div>
  );
}
