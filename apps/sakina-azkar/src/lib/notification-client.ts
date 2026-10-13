'use client';
import { useSyncExternalStore } from 'react';
import {
  defaultReminderPreferences,
  deviceIdPattern,
  deviceTokenPattern,
  parseReminderPreferences,
  type ReminderPreferences,
  type WardProgress,
} from './notification-contract';
import targets from '@/data/daily-ward-targets.json';
const key = 'sakina:notifications:v1';
export interface NotificationDevice {
  id: string;
  token: string;
  enabled: boolean;
  removing: boolean;
  preferences: ReminderPreferences;
}
let device: NotificationDevice | null = null;
let loaded = false;
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((listener) => listener());
}
function snapshot() {
  if (!loaded) {
    loaded = true;
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? 'null');
      const preferences = parseReminderPreferences(value?.preferences);
      if (
        value?.version === 1 &&
        preferences &&
        typeof value.id === 'string' &&
        deviceIdPattern.test(value.id) &&
        typeof value.token === 'string' &&
        deviceTokenPattern.test(value.token) &&
        typeof value.enabled === 'boolean'
      )
        device = {
          id: value.id,
          token: value.token,
          enabled: value.enabled,
          removing: value.removing === true,
          preferences,
        };
    } catch {}
  }
  return device;
}
function storage(event: StorageEvent) {
  if (event.key === key || event.key === null) {
    loaded = false;
    device = null;
    snapshot();
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
export function saveNotificationDevice(value: NotificationDevice | null) {
  if (value) localStorage.setItem(key, JSON.stringify({ ...value, version: 1 }));
  else localStorage.removeItem(key);
  device = value;
  loaded = true;
  emit();
}
export function useNotificationDevice() {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}
export function clearNotificationDevice(id: string) {
  if (snapshot()?.id === id) saveNotificationDevice(null);
}
export function newNotificationDevice(
  preferences = defaultReminderPreferences,
): NotificationDevice {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return {
    id: crypto.randomUUID(),
    token: Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join(''),
    enabled: false,
    removing: false,
    preferences,
  };
}
export function wardProgress(day: string, counts: Record<string, number>): WardProgress {
  const status = (ward: 'morning' | 'evening') =>
    targets[ward].every((entry) => (counts[entry.id] ?? 0) >= entry.repeat)
      ? 'completed'
      : targets[ward].some((entry) => (counts[entry.id] ?? 0) > 0)
        ? 'started'
        : 'not-started';
  return { day, morning: status('morning'), evening: status('evening') };
}
export function notificationPermission() {
  if (!window.isSecureContext) return 'unsupported';
  const ios =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (
    ios &&
    !matchMedia('(display-mode: standalone)').matches &&
    !(navigator as Navigator & { standalone?: boolean }).standalone
  )
    return 'install-required';
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window))
    return 'unsupported';
  return Notification.permission;
}
export async function notificationRegistration() {
  await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
  let timer: ReturnType<typeof setTimeout>;
  try {
    const registration = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('worker-not-ready')), 20000);
      }),
    ]);
    await new Promise<void>((resolve, reject) => {
      const channel = new MessageChannel();
      const timeout = setTimeout(() => {
        channel.port1.close();
        channel.port2.close();
        reject(new Error('worker-update-required'));
      }, 2000);
      channel.port1.onmessage = (event) => {
        clearTimeout(timeout);
        channel.port1.close();
        channel.port2.close();
        if (event.data?.notificationVersion === 1) resolve();
        else reject(new Error('worker-update-required'));
      };
      registration.active?.postMessage({ type: 'PUSH_CAPABILITIES' }, [channel.port2]);
    });
    return registration;
  } finally {
    clearTimeout(timer!);
  }
}
export async function notificationRequest(action: string, value: unknown, keepalive = false) {
  const response = await fetch('/api/notifications/' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
    keepalive,
    credentials: 'same-origin',
  });
  if (!response.ok)
    throw Object.assign(new Error('notification-service-unavailable'), { status: response.status });
}
