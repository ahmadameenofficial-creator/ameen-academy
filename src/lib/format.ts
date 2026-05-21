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

export function getTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "دلوقتي";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `من ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `من ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `من ${days} يوم`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `من ${weeks} أسبوع`;
  const months = Math.floor(days / 30);
  if (months < 12) return `من ${months} شهر`;
  return `من ${Math.floor(days / 365)} سنة`;
}
