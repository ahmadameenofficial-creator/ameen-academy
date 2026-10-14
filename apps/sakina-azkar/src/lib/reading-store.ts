'use client';
import { useSyncExternalStore } from 'react';
import {
  initialState,
  parseState,
  readingDay,
  readingReducer,
  type ReadingAction,
} from './progress';
import { migrateCatalogState } from './catalog-migration';
import { recordPartial, historySnapshot } from './history-store';
import { partialProgress, wardEntries, wardCounts } from './daily-progress';

let KEY = 'sakina:reading:v1';
const serverState = initialState('');
let state = serverState;
let loaded = false;
let persistent = true;
const listeners = new Set<() => void>();
let dayTimer: number | undefined;
function emit() {
  listeners.forEach((listener) => listener());
}
function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    const oldDay = raw ? JSON.parse(raw)?.day : undefined;
    if (typeof oldDay === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(oldDay) && oldDay < readingDay()) {
      recordWards(migrateCatalogState(parseState(raw, oldDay)), true);
    }
    state = migrateCatalogState(parseState(raw, readingDay()));
    recordWards(state, true);
  } catch {
    state = initialState();
    persistent = false;
  }
}
function recordWards(value: typeof state, initialize = false) {
  if (!value.day) return;
  for (const ward of ['morning', 'evening']) {
    if (initialize && historySnapshot().some(row => row.day === value.day && row.categoryId === ward)) continue;
    const counts = wardCounts(ward, value.counts);
    const progress = partialProgress(wardEntries(ward), counts);
    if (progress > 0 || historySnapshot().some(row => row.day === value.day && row.categoryId === ward))
      recordPartial({ day: value.day, categoryId: ward, progress, counts });
  }
}
export function switchReadingOwner(owner: string | null) {
  KEY = owner ? `sakina:account:${owner}:reading:v1` : 'sakina:reading:v1';
  loaded = false;
  load();
  emit();
}
export function restoreWardCounters() {
  load();
  const counts = { ...state.counts };
  for (const row of historySnapshot()) {
    if (row.day !== readingDay() || !['morning', 'evening'].includes(row.categoryId) || !row.counts) continue;
    Object.assign(counts, wardCounts(row.categoryId, row.counts));
  }
  if (JSON.stringify(counts) === JSON.stringify(state.counts)) return;
  state = { ...state, counts };
  persist();
  emit();
}
function getSnapshot() {
  load();
  return state;
}
function checkDay() {
  const next = readingReducer(state, { type: 'day', day: readingDay() });
  if (next !== state) {
    recordWards(state);
    state = next;
    persist();
    emit();
  }
}
function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    persistent = true;
  } catch {
    persistent = false;
  }
}
function onStorage(event: StorageEvent) {
  if (event.key !== KEY && event.key !== null) return;
  state = migrateCatalogState(parseState(event.newValue, readingDay()));
  emit();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', checkDay);
    dayTimer = window.setInterval(checkDay, 60000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', checkDay);
      window.clearInterval(dayTimer);
      dayTimer = undefined;
    }
  };
}
export function dispatchReading(action: ReadingAction) {
  load();
  checkDay();
  const previous = state;
  state = readingReducer(state, action);
  if (['increment', 'decrement', 'reset'].includes(action.type)) recordWards(state);
  persist();
  emit();
  return { previous, current: state };
}
export function useReading() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverState);
  return {
    state: snapshot,
    dispatch: dispatchReading,
    ready: snapshot !== serverState,
    persistent,
  };
}
