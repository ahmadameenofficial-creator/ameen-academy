'use client';

import type { Dhikr, PrayerId } from './types';
import { counterKey } from './progress';
import { dispatchReading } from './reading-store';
import { recordAnalytics } from './analytics-client';

/** Read the actual synchronous store transition, even when several taps precede a render. */
export function countDhikr(entry: Dhikr, scope?: PrayerId) {
  const key = counterKey(entry.id, scope);
  const { previous, current } = dispatchReading({
    type: 'increment',
    id: key,
    limit: entry.repeat,
  });
  const before = previous.counts[key] ?? 0;
  const count = current.counts[key] ?? 0;
  if (count > before) {
    recordAnalytics('counter', '/azkar/' + entry.categoryId);
    if (entry.repeat !== null && count === entry.repeat)
      recordAnalytics('completion', '/azkar/' + entry.categoryId);
  }
  return { count, changed: count > before };
}
