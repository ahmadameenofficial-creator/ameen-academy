import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-b from-brand-50 to-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-9 w-40 mx-auto" />
          <Skeleton className="h-5 w-64 mx-auto mt-3" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-4 space-y-4">
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
