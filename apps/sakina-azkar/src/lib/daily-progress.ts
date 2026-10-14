import catalog from '../data/azkar.json';
import type { Dhikr, PrayerId } from './types';
import { counterKey } from './progress';

export function progressPercent(fraction: number) {
  if (fraction <= 0) return 0;
  if (fraction >= 1) return 100;
  return Math.max(.01, Math.min(99.99, Math.round(fraction * 10000) / 100));
}

export function partialProgress(entries: Dhikr[], counts: Record<string, number>, scope?: PrayerId) {
  const fixed = entries.filter(e => e.repeat !== null && e.repeat > 0 && (!e.appliesTo?.length || !scope || e.appliesTo.includes(scope)));
  if (!fixed.length) return 0;
  return fixed.reduce((sum, e) => sum + Math.min(1, Math.max(0, counts[counterKey(e.id, scope)] ?? 0) / e.repeat!), 0) / fixed.length;
}
export function wardEntries(ward: string) {
  return (catalog.entries as Dhikr[]).filter(e => e.categoryId === ward);
}
export function wardCounts(ward: string, counts: Record<string, number>) {
  return Object.fromEntries(wardEntries(ward).filter(e => e.repeat !== null).map(e => [e.id, Math.min(e.repeat!, Math.max(0, counts[e.id] ?? 0))]));
}
