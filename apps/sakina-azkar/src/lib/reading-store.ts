'use client';
import { useSyncExternalStore } from 'react';
import { initialState, parseState, readingDay, readingReducer, type ReadingAction } from './progress';
import { migrateCatalogState } from './catalog-migration';

const KEY = 'sakina:reading:v1';
const serverState = initialState('');
let state = serverState;
let loaded = false;
let persistent = true;
const listeners = new Set<() => void>();
let dayTimer: number | undefined;
function emit() { listeners.forEach(listener => listener()); }
function load() {
  if (loaded) return;
  loaded = true;
  try { state = migrateCatalogState(parseState(localStorage.getItem(KEY), readingDay())); }
  catch { state = initialState(); persistent = false; }
}
function getSnapshot() { load(); return state; }
function checkDay() {
  const next = readingReducer(state, { type: 'day', day: readingDay() });
  if (next !== state) { state = next; persist(); emit(); }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); persistent = true; }
  catch { persistent = false; }
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
  load(); checkDay();
  state = readingReducer(state, action);
  persist(); emit();
}
export function useReading() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverState);
  return { state: snapshot, dispatch: dispatchReading, ready: snapshot !== serverState, persistent };
}
