export default function LessonLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* هيكل الفيديو */}
      <div className="bg-zinc-900">
        <div className="aspect-video bg-zinc-800" />
        <div className="px-4 py-3">
          <div className="h-4 w-40 bg-zinc-700 rounded" />
        </div>
      </div>

      {/* هيكل المعلومات */}
      <div className="p-4 md:p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 h-16 bg-muted rounded-xl" />
          <div className="flex-1 h-16 bg-brand-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
