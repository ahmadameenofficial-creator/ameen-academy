import changes from '@/data/counter-migration.json';
import type { ReadingState } from './progress';
const migration = changes as Record<string, string[]>;

/** Mixed legacy counters cannot be reused for newly separated formulas. */
export function migrateCatalogState(state: ReadingState): ReadingState {
  const counts = { ...state.counts };
  for (const id of Object.keys(migration)) delete counts[id];
  const saved = [...new Set(state.saved.flatMap(id => migration[id] ?? [id]))];
  return { ...state, counts, saved };
}
