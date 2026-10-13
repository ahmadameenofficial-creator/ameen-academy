'use client';

import { useSyncExternalStore } from 'react';
import {
  defaultSessionPreferences,
  parseSessionPreferences,
  type SessionPreferences,
} from './hundred-session';

const key = 'sakina:session-preferences:v1';
let state = defaultSessionPreferences;
let loaded = false;
const listeners = new Set<() => void>();

function snapshot() {
  if (!loaded) {
    loaded = true;
    try {
      state = parseSessionPreferences(localStorage.getItem(key));
    } catch {
      state = defaultSessionPreferences;
    }
  }
  return state;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function storage(event: StorageEvent) {
  if (event.key !== key && event.key !== null) return;
  state = parseSessionPreferences(event.newValue);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener('storage', storage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener('storage', storage);
  };
}

function update(patch: Partial<Omit<SessionPreferences, 'version'>>) {
  state = parseSessionPreferences(JSON.stringify({ ...snapshot(), ...patch }));
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Preferences remain usable for this visit when browser storage is unavailable.
  }
  emit();
}

export function useSessionPreferences() {
  const preferences = useSyncExternalStore(subscribe, snapshot, () => defaultSessionPreferences);
  return { preferences, update };
}
