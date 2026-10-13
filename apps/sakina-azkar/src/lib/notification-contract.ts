import type { WardStatus } from './notification-messages';

export const reminderCities = [
  {
    id: 'cairo',
    title: 'القاهرة',
    zone: 'Africa/Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    method: 'Egyptian',
  },
  {
    id: 'alexandria',
    title: 'الإسكندرية',
    zone: 'Africa/Cairo',
    latitude: 31.2001,
    longitude: 29.9187,
    method: 'Egyptian',
  },
  {
    id: 'riyadh',
    title: 'الرياض',
    zone: 'Asia/Riyadh',
    latitude: 24.7136,
    longitude: 46.6753,
    method: 'UmmAlQura',
  },
  {
    id: 'makkah',
    title: 'مكة المكرمة',
    zone: 'Asia/Riyadh',
    latitude: 21.3891,
    longitude: 39.8579,
    method: 'UmmAlQura',
  },
  {
    id: 'madinah',
    title: 'المدينة المنورة',
    zone: 'Asia/Riyadh',
    latitude: 24.5247,
    longitude: 39.5692,
    method: 'UmmAlQura',
  },
  {
    id: 'jeddah',
    title: 'جدة',
    zone: 'Asia/Riyadh',
    latitude: 21.4858,
    longitude: 39.1925,
    method: 'UmmAlQura',
  },
  {
    id: 'dubai',
    title: 'دبي',
    zone: 'Asia/Dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    method: 'Dubai',
  },
  {
    id: 'doha',
    title: 'الدوحة',
    zone: 'Asia/Qatar',
    latitude: 25.2854,
    longitude: 51.531,
    method: 'Qatar',
  },
  {
    id: 'kuwait',
    title: 'الكويت',
    zone: 'Asia/Kuwait',
    latitude: 29.3759,
    longitude: 47.9774,
    method: 'Kuwait',
  },
  {
    id: 'amman',
    title: 'عمّان',
    zone: 'Asia/Amman',
    latitude: 31.9454,
    longitude: 35.9284,
    method: 'MuslimWorldLeague',
  },
  {
    id: 'casablanca',
    title: 'الدار البيضاء',
    zone: 'Africa/Casablanca',
    latitude: 33.5731,
    longitude: -7.5898,
    method: 'MuslimWorldLeague',
  },
] as const;
export interface ReminderPreferences {
  city: string;
  morning: boolean;
  evening: boolean;
  followup: boolean;
}
export const defaultReminderPreferences: ReminderPreferences = {
  city: 'cairo',
  morning: true,
  evening: true,
  followup: true,
};
export interface WardProgress {
  day: string;
  morning: WardStatus;
  evening: WardStatus;
}
export interface PushDetails {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}
export const deviceIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const deviceTokenPattern = /^[a-f0-9]{64}$/;
const object = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));
export function parseReminderPreferences(value: unknown): ReminderPreferences | null {
  if (
    !object(value) ||
    !reminderCities.some((city) => city.id === value.city) ||
    typeof value.morning !== 'boolean' ||
    typeof value.evening !== 'boolean' ||
    typeof value.followup !== 'boolean'
  )
    return null;
  return {
    city: value.city as string,
    morning: value.morning,
    evening: value.evening,
    followup: value.followup,
  };
}
export function parseWardProgress(value: unknown): WardProgress | null {
  const statuses = ['not-started', 'started', 'completed'];
  if (
    !object(value) ||
    typeof value.day !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value.day) ||
    !statuses.includes(value.morning as string) ||
    !statuses.includes(value.evening as string)
  )
    return null;
  const date = new Date(value.day + 'T12:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value.day)
    return null;
  return {
    day: value.day,
    morning: value.morning as WardStatus,
    evening: value.evening as WardStatus,
  };
}
export function parsePushDetails(value: unknown): PushDetails | null {
  if (
    !object(value) ||
    typeof value.endpoint !== 'string' ||
    value.endpoint.length > 2048 ||
    !object(value.keys)
  )
    return null;
  try {
    const url = new URL(value.endpoint);
    const provider =
      ['fcm.googleapis.com', 'updates.push.services.mozilla.com', 'web.push.apple.com'].includes(
        url.hostname,
      ) || /^[a-z0-9-]+\.notify\.windows\.com$/.test(url.hostname);
    if (
      !provider ||
      url.protocol !== 'https:' ||
      url.port ||
      url.username ||
      url.password ||
      url.hash ||
      url.pathname === '/'
    )
      return null;
    const { p256dh, auth } = value.keys;
    if (
      typeof p256dh !== 'string' ||
      !/^[A-Za-z0-9_-]{87}$/.test(p256dh) ||
      typeof auth !== 'string' ||
      !/^[A-Za-z0-9_-]{22}$/.test(auth)
    )
      return null;
    return { endpoint: url.href, keys: { p256dh, auth } };
  } catch {
    return null;
  }
}
