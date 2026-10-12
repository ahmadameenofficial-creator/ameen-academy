export interface ReadingState {
  version: 1;
  day: string;
  counts: Record<string, number>;
  saved: string[];
  fontSize: number;
  diacritics: boolean;
}
export type ReadingAction =
  | { type: 'increment'; id: string; limit: number | null }
  | { type: 'decrement'; id: string }
  | { type: 'reset'; ids: string[] }
  | { type: 'save'; id: string }
  | { type: 'font'; size: number }
  | { type: 'diacritics' }
  | { type: 'day'; day: string };

export function readingDay(date = new Date()): string {
  // Use the visitor's local calendar day, not UTC midnight.
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
export function initialState(day = readingDay()): ReadingState {
  return { version: 1, day, counts: {}, saved: [], fontSize: 26, diacritics: true };
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
        if (/^z-[a-f0-9]{16}$/.test(id) && typeof count === 'number' && Number.isSafeInteger(count) && count >= 0 && count <= 100000) counts[id] = count;
      }
    }
    const saved = Array.isArray(candidate.saved) ? [...new Set(candidate.saved.filter((id): id is string => typeof id === 'string' && /^z-[a-f0-9]{16}$/.test(id)))] : [];
    const fontSize = typeof candidate.fontSize === 'number' && Number.isFinite(candidate.fontSize) ? Math.max(20, Math.min(36, candidate.fontSize)) : base.fontSize;
    return { ...base, counts, saved, fontSize, diacritics: typeof candidate.diacritics === 'boolean' ? candidate.diacritics : true };
  } catch { return base; }
}
export function readingReducer(state: ReadingState, action: ReadingAction): ReadingState {
  switch (action.type) {
    case 'increment': {
      const count = state.counts[action.id] ?? 0;
      const limit = action.limit ?? 100000;
      if (count >= limit) return state;
      return { ...state, counts: { ...state.counts, [action.id]: count + 1 } };
    }
    case 'decrement': return { ...state, counts: { ...state.counts, [action.id]: Math.max(0, (state.counts[action.id] ?? 0) - 1) } };
    case 'reset': {
      const counts = { ...state.counts };
      action.ids.forEach(id => delete counts[id]);
      return { ...state, counts };
    }
    case 'save': return { ...state, saved: state.saved.includes(action.id) ? state.saved.filter(id => id !== action.id) : [...state.saved, action.id] };
    case 'font': return { ...state, fontSize: Math.max(20, Math.min(36, action.size)) };
    case 'diacritics': return { ...state, diacritics: !state.diacritics };
    case 'day': return action.day === state.day ? state : { ...state, day: action.day, counts: {} };
  }
}
