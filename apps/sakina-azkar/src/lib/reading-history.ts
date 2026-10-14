import type { PrayerId } from './types';
export interface Completion {
  day: string;
  categoryId: string;
  scope?: PrayerId;
  progress?: number;
  updatedAt?: number;
  counts?: Record<string, number>;
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
        ...(typeof row.progress === 'number' && Number.isFinite(row.progress) ? { progress: Math.max(0, Math.min(1, row.progress)) } : {}),
        ...(Number.isSafeInteger(row.updatedAt) && row.updatedAt >= 0 ? { updatedAt: row.updatedAt } : {}),
        ...(row.counts && typeof row.counts === 'object' && !Array.isArray(row.counts) ? { counts: Object.fromEntries(Object.entries(row.counts).filter(([id, count]) => /^z-[a-f0-9]{16}$/.test(id) && typeof count === 'number' && Number.isSafeInteger(count) && count >= 0)) as Record<string, number> } : {}),
      };
      unique.set(row.day + ':' + row.categoryId + ':' + (row.scope ?? ''), record);
    }
    return [...unique.values()].sort((a, b) => a.day.localeCompare(b.day));
  } catch {
    return [];
  }
}
export function historyStreak(records: Completion[], today: string) {
  const days = new Set(records.filter(row => (row.progress ?? 1) >= 1).map((row) => row.day));
  let cursor = days.has(today) ? today : shiftDay(today, -1),
    result = 0;
  while (days.has(cursor)) {
    result++;
    cursor = shiftDay(cursor, -1);
  }
  return result;
}

export function mergeHistory(local: Completion[], remote: Completion[], today: string): Completion[] {
  const merged = new Map<string, Completion>();
  for (const record of [...remote, ...local]) {
    const key = record.day + ':' + record.categoryId + ':' + (record.scope ?? '');
    const previous = merged.get(key);
    if (!previous || (record.updatedAt ?? 0) >= (previous.updatedAt ?? 0)) merged.set(key, record);
  }
  return parseHistory(JSON.stringify({ version: 1, records: [...merged.values()] }), today);
}
