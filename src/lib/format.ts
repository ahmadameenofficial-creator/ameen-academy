export function formatPrice(priceInPiasters: number): string {
  const pounds = priceInPiasters / 100;
  return `${pounds.toLocaleString("ar-EG")} جنيه`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours} ساعة${minutes > 0 ? ` و ${minutes} دقيقة` : ""}`;
  return `${minutes} دقيقة`;
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    BEGINNER: "مبتدئ",
    INTERMEDIATE: "متوسط",
    ADVANCED: "متقدم",
  };
  return labels[level] || level;
}
