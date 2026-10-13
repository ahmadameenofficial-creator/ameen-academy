import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { reminderCities, type ReminderPreferences } from './notification-contract';
import type { Ward } from './notification-messages';
export interface ReminderSlot {
  ward: Ward;
  day: string;
  phase: 'start' | 'followup';
  at: Date;
  expires: Date;
}
export function zonedDay(date: Date, zone: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
export function reminderSlots(preferences: ReminderPreferences, now = new Date()): ReminderSlot[] {
  const city = reminderCities.find((city) => city.id === preferences.city);
  if (!city) return [];
  const day = zonedDay(now, city.zone);
  const result: ReminderSlot[] = [];
  for (let offset = 0; offset < 3; offset++) {
    const date = new Date(day + 'T12:00:00Z');
    date.setUTCDate(date.getUTCDate() + offset);
    const dateKey = date.toISOString().slice(0, 10);
    const parameters = CalculationMethod[city.method]();
    const times = new PrayerTimes(
      new Coordinates(city.latitude, city.longitude),
      new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      parameters,
    );
    for (const [ward, begins, ends] of [
      ['morning', times.fajr, times.sunrise],
      ['evening', times.asr, times.maghrib],
    ] as const) {
      if (
        !preferences[ward] ||
        !Number.isFinite(begins.getTime()) ||
        !Number.isFinite(ends.getTime()) ||
        ends <= begins
      )
        continue;
      const start = new Date(
        Math.min(begins.getTime() + 15 * 60000, (begins.getTime() + ends.getTime()) / 2),
      );
      result.push({
        ward,
        day: dateKey,
        phase: 'start',
        at: start,
        expires: new Date(Math.min(start.getTime() + 15 * 60000, ends.getTime())),
      });
      const followup = new Date(ends.getTime() - 20 * 60000);
      if (preferences.followup && followup.getTime() > start.getTime() + 30 * 60000)
        result.push({
          ward,
          day: dateKey,
          phase: 'followup',
          at: followup,
          expires: new Date(ends.getTime()),
        });
    }
  }
  return result.sort((a, b) => a.at.getTime() - b.at.getTime());
}
export function nextReminder(preferences: ReminderPreferences, now = new Date()) {
  return (
    reminderSlots(preferences, now).find((slot) => slot.at > now)?.at ??
    new Date(now.getTime() + 12 * 3600000)
  );
}
