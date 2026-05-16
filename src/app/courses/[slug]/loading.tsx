import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-b from-brand-50 to-muted/30 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <div className="rounded-2xl border border-border p-6 space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <Skeleton className="h-8 w-36" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-4 space-y-3">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
