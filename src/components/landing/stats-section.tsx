import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl font-bold text-gradient-brand sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
