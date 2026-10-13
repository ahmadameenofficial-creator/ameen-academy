import type { PrayerId } from './types';
export interface Completion {
  day: string;
  categoryId: string;
  scope?: PrayerId;
}
export function shiftDay(day: string, amount: number) {
  return new Date(Date.parse(day + 'T00:00:00Z') + amount * 86400000).toISOString().slice(0, 10);
}
export function parseHistory(value: string | null, today: string): Completion[] {
  try {
    const data = JSON.parse(value ?? '{}');
    if (data.version !== 1 || !Array.isArray(data.records)) return [];
    const earliest = shiftDay(today, -365);
    const unique = new Map<string, Completion>();
    for (const row of data.records.slice(-5000)) {
      if (
        !row ||
        typeof row.day !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(row.day) ||
        row.day > today ||
        row.day < earliest ||
        !Number.isFinite(Date.parse(row.day)) ||
        new Date(row.day + 'T00:00:00Z').toISOString().slice(0, 10) !== row.day ||
        typeof row.categoryId !== 'string' ||
        !/^[a-z0-9-]{1,64}$/.test(row.categoryId) ||
        (row.scope !== undefined &&
          !['fajr', 'maghrib', 'dhuhr', 'asr', 'isha'].includes(row.scope))
      )
        continue;
      const record: Completion = {
        day: row.day,
        categoryId: row.categoryId,
        ...(row.scope ? { scope: row.scope } : {}),
      };
      unique.set(row.day + ':' + row.categoryId + ':' + (row.scope ?? ''), record);
    }
    return [...unique.values()].sort((a, b) => a.day.localeCompare(b.day));
  } catch {
    return [];
  }
}
export function historyStreak(records: Completion[], today: string) {
  const days = new Set(records.map((row) => row.day));
  let cursor = days.has(today) ? today : shiftDay(today, -1),
    result = 0;
  while (days.has(cursor)) {
    result++;
    cursor = shiftDay(cursor, -1);
  }
  return result;
}
