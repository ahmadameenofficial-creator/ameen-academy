import type { PrayerId } from './types';
export type Theme = 'light' | 'dark' | 'system';
export const prayers: { id: PrayerId; title: string }[] = [
  { id: 'fajr', title: 'الفجر' }, { id: 'maghrib', title: 'المغرب' },
  { id: 'dhuhr', title: 'الظهر' }, { id: 'asr', title: 'العصر' }, { id: 'isha', title: 'العشاء' },
];
export function counterKey(id: string, prayer?: PrayerId): string { return prayer ? `${id}:${prayer}` : id; }
export interface ReadingState {
  version: 1;
  day: string;
  counts: Record<string, number>;
  saved: string[];
  fontSize: number;
  diacritics: boolean;
  theme: Theme;
  savedScopes: Partial<Record<string, PrayerId>>;
}
export type ReadingAction =
  | { type: 'increment'; id: string; limit: number | null }
  | { type: 'decrement'; id: string; limit?: number | null }
  | { type: 'reset'; ids: string[] }
  | { type: 'save'; id: string; scope?: PrayerId }
  | { type: 'theme'; theme: Theme }
  | { type: 'font'; size: number }
  | { type: 'diacritics' }
  | { type: 'day'; day: string };

export function readingDay(date = new Date()): string {
  // Use the visitor's local calendar day, not UTC midnight.
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
export function initialState(day = readingDay()): ReadingState {
  return { version: 1, day, counts: {}, saved: [], savedScopes: {}, fontSize: 26, diacritics: true, theme: 'system' };
}
export function parseState(value: string | null, day: string): ReadingState {
  const base = initialState(day);
  if (!value) return base;
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== 'object') return base;
    const candidate = data as Record<string, unknown>;
    if (candidate.version !== 1) return base;
    const counts: Record<string, number> = {};
    if (candidate.day === day && candidate.counts && typeof candidate.counts === 'object' && !Array.isArray(candidate.counts)) {
      for (const [id, count] of Object.entries(candidate.counts)) {
        if (/^z-[a-f0-9]{16}(?::(?:fajr|maghrib|dhuhr|asr|isha))?$/.test(id) && typeof count === 'number' && Number.isSafeInteger(count) && count >= 0) counts[id] = count;
      }
    }
    const saved = Array.isArray(candidate.saved) ? [...new Set(candidate.saved.filter((id): id is string => typeof id === 'string' && /^z-[a-f0-9]{16}$/.test(id)))] : [];
    const fontSize = typeof candidate.fontSize === 'number' && Number.isFinite(candidate.fontSize) ? Math.max(20, Math.min(36, candidate.fontSize)) : base.fontSize;
    const savedScopes: ReadingState['savedScopes'] = {};
    if (candidate.savedScopes && typeof candidate.savedScopes === 'object') {
      for (const [id, scope] of Object.entries(candidate.savedScopes)) {
        if (saved.includes(id) && prayers.some(p => p.id === scope)) savedScopes[id] = scope as PrayerId;
      }
    }
    const theme = candidate.theme === 'light' || candidate.theme === 'dark' ? candidate.theme : 'system';
    return { ...base, counts, saved, savedScopes, theme, fontSize, diacritics: typeof candidate.diacritics === 'boolean' ? candidate.diacritics : true };
  } catch { return base; }
}
export function readingReducer(state: ReadingState, action: ReadingAction): ReadingState {
  switch (action.type) {
    case 'increment': {
      const count = state.counts[action.id] ?? 0;
      const limit = action.limit ?? Number.MAX_SAFE_INTEGER;
      if (count >= limit) return state;
      return { ...state, counts: { ...state.counts, [action.id]: count + 1 } };
    }
    case 'decrement': return { ...state, counts: { ...state.counts, [action.id]: Math.max(0, Math.min(state.counts[action.id] ?? 0, action.limit ?? Number.MAX_SAFE_INTEGER) - 1) } };
    case 'reset': {
      const counts = { ...state.counts };
      action.ids.forEach(id => delete counts[id]);
      return { ...state, counts };
    }
    case 'save': {
      const savedScopes = { ...state.savedScopes };
      if (state.saved.includes(action.id)) {
        delete savedScopes[action.id];
        return { ...state, saved: state.saved.filter(id => id !== action.id), savedScopes };
      }
      if (action.scope) savedScopes[action.id] = action.scope;
      return { ...state, saved: [...state.saved, action.id], savedScopes };
    }
    case 'theme': return { ...state, theme: action.theme };
    case 'font': return { ...state, fontSize: Math.max(20, Math.min(36, action.size)) };
    case 'diacritics': return { ...state, diacritics: !state.diacritics };
    case 'day': return action.day === state.day ? state : { ...state, day: action.day, counts: {} };
  }
}
