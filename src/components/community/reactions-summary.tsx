import { REACTION_TYPES, type ReactionsSummary } from "./types";

interface ReactionsSummaryDisplayProps {
  summary: ReactionsSummary;
}

export function ReactionsSummaryDisplay({ summary }: ReactionsSummaryDisplayProps) {
  if (summary.total === 0) return null;

  const topReactions = Object.entries(summary.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-0.5">
        {topReactions.map(([type]) => {
          const emoji = REACTION_TYPES.find((r) => r.type === type)?.emoji;
          return (
            <span
              key={type}
              className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs border border-background"
            >
              {emoji}
            </span>
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">{summary.total}</span>
    </div>
  );
}
