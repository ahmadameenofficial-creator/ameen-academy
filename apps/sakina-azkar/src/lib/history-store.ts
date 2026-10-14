'use client';
import { useSyncExternalStore } from 'react';
import { readingDay } from './progress';
import { mergeHistory, parseHistory, type Completion } from './reading-history';
let key = 'sakina:history:v1';
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
export function historySnapshot() { return snapshot(); }
export function subscribeHistory(listener: () => void) { return subscribe(listener); }
export function switchHistoryOwner(owner: string | null) {
  key = owner ? `sakina:account:${owner}:history:v1` : 'sakina:history:v1';
  loaded = false;
  records = empty;
  snapshot();
  emit();
}
export function restoreHistory(remote: Completion[]) {
  const merged = mergeHistory(snapshot(), remote, readingDay());
  if (JSON.stringify(merged) === JSON.stringify(records)) return;
  records = merged;
  persist();
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
        row.scope === record.scope && (row.progress ?? 1) >= 1,
    )
  )
    return;
  records = parseHistory(
    JSON.stringify({ version: 1, records: [...records, { ...record, updatedAt: Math.max(Date.now(), ...records.filter(row => row.day === record.day && row.categoryId === record.categoryId && row.scope === record.scope).map(row => (row.updatedAt ?? 0) + 1)) }] }),
    readingDay(),
  );
  persist();
}
export function recordPartial(record: Completion) {
  snapshot();
  const previous = records.find(row => row.day === record.day && row.categoryId === record.categoryId && row.scope === record.scope);
  if ((previous?.progress ?? (previous ? 1 : 0)) === record.progress && JSON.stringify(previous?.counts ?? {}) === JSON.stringify(record.counts ?? {})) return;
  // Read latest disk state before writing, so unrelated updates from another tab survive.
  try { records = mergeHistory(records, parseHistory(localStorage.getItem(key), readingDay()), readingDay()); } catch {}
  const latest = records.find(row => row.day === record.day && row.categoryId === record.categoryId && row.scope === record.scope);
  records = records.filter(row => !(row.day === record.day && row.categoryId === record.categoryId && row.scope === record.scope));
  records.push({ ...record, updatedAt: Math.max(Date.now(), (latest?.updatedAt ?? 0) + 1) });
  records = parseHistory(JSON.stringify({ version: 1, records }), readingDay());
  persist();
}
export function clearHistory() {
  snapshot();
  // Keep deletion timestamps so cloud restoration cannot resurrect cleared records.
  records = records.map(row => ({ ...row, progress: 0, counts: {}, updatedAt: Math.max(Date.now(), (row.updatedAt ?? 0) + 1) }));
  persist();
}
export function useHistory() {
  const value = useSyncExternalStore(subscribe, snapshot, () => empty);
  return { records: value, ready: value !== empty };
}
