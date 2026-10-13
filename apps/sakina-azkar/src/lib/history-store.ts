'use client';
import { useSyncExternalStore } from 'react';
import { readingDay } from './progress';
import { parseHistory, type Completion } from './reading-history';
const key = 'sakina:history:v1';
const empty: Completion[] = [];
let records = empty,
  loaded = false;
const listeners = new Set<() => void>();
function snapshot() {
  if (!loaded) {
    loaded = true;
    try {
      records = parseHistory(localStorage.getItem(key), readingDay());
    } catch {
      records = [];
    }
  }
  return records;
}
function emit() {
  listeners.forEach((listener) => listener());
}
function storage(event: StorageEvent) {
  if (event.key === key || event.key === null) {
    records = parseHistory(event.newValue, readingDay());
    emit();
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener('storage', storage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener('storage', storage);
  };
}
function persist() {
  try {
    localStorage.setItem(key, JSON.stringify({ version: 1, records }));
  } catch {}
  emit();
}
export function recordCompletion(record: Completion) {
  snapshot();
  if (
    records.some(
      (row) =>
        row.day === record.day &&
        row.categoryId === record.categoryId &&
        row.scope === record.scope,
    )
  )
    return;
  records = parseHistory(
    JSON.stringify({ version: 1, records: [...records, record] }),
    readingDay(),
  );
  persist();
}
export function clearHistory() {
  snapshot();
  records = [];
  persist();
}
export function useHistory() {
  const value = useSyncExternalStore(subscribe, snapshot, () => empty);
  return { records: value, ready: value !== empty };
}
