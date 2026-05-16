import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-1">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="rounded-2xl border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="rounded-2xl border border-border p-5 space-y-4">
          <Skeleton className="h-6 w-36" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
        <div className="rounded-2xl border border-border p-5 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
