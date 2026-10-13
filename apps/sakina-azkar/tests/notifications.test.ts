import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { getCategoryEntries } from '../src/lib/catalog';
import targets from '../src/data/daily-ward-targets.json';
import { notificationHadiths, notificationMessage } from '../src/lib/notification-messages';
import {
  defaultReminderPreferences,
  parsePushDetails,
  parseReminderPreferences,
  parseWardProgress,
  reminderCities,
} from '../src/lib/notification-contract';
import { nextReminder, reminderSlots, zonedDay } from '../src/lib/notification-times';

test('every message rotates a cited Bukhari/Muslim passage, preserves its conditions, and fits a bounded native payload', () => {
  const ids = new Set<string>();
  for (let sequence = 0; sequence < notificationHadiths.length; sequence++) {
    const message = notificationMessage('morning', 'not-started', sequence, 'test');
    ids.add(message.hadith);
    assert.match(message.title, /ابدأ أذكار الصباح/);
    assert.ok(message.title.length <= 80 && message.body.length <= 320);
    assert.ok(message.body.includes(notificationHadiths[sequence].source));
    assert.ok(message.body.includes(notificationHadiths[sequence].text));
    assert.match(notificationHadiths[sequence].url, /^https:\/\/sunnah\.com\/(bukhari|muslim):/);
  }
  assert.equal(ids.size, notificationHadiths.length);
  assert.match(notificationMessage('evening', 'started', 0, 'test').title, /كمّل أذكار المساء/);
  assert.equal(
    notificationMessage('evening', 'started', 6, 'test').hadith,
    notificationMessage('morning', 'not-started', 0, 'test').hadith,
  );
  assert.match(notificationHadiths[2].text, /في يوم مائة مرة/);
  assert.match(notificationHadiths[3].text, /حين يصبح وحين يمسي/);
});

test('push registration rejects private or arbitrary URLs, invalid keys, preferences and calendar dates', () => {
  const value = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/test',
    keys: { p256dh: 'A'.repeat(87), auth: 'A'.repeat(22) },
  };
  assert.ok(parsePushDetails(value));
  for (const endpoint of [
    'http://fcm.googleapis.com/send',
    'https://127.0.0.1/private',
    'https://fcm.googleapis.com.evil.com/send',
    'https://user:pass@fcm.googleapis.com/send',
    'https://fcm.googleapis.com:8080/send',
  ])
    assert.equal(parsePushDetails({ ...value, endpoint }), null);
  assert.equal(parsePushDetails({ ...value, keys: { auth: 'bad', p256dh: 'bad' } }), null);
  assert.equal(parseReminderPreferences({ ...defaultReminderPreferences, city: 'unknown' }), null);
  assert.equal(parseReminderPreferences({ ...defaultReminderPreferences, morning: 'yes' }), null);
  assert.equal(
    parseWardProgress({ day: '2026-02-30', morning: 'started', evening: 'completed' }),
    null,
  );
});

test('calculated city reminders stay inside the preferred windows, handle DST, and never create more than two alerts per ward/day', () => {
  for (const city of reminderCities)
    for (const date of ['2026-06-21T00:00:00Z', '2026-10-30T00:00:00Z', '2026-12-21T00:00:00Z']) {
      const now = new Date(date);
      const preferences = { ...defaultReminderPreferences, city: city.id };
      const slots = reminderSlots(preferences, now);
      assert.ok(slots.length >= 6 && slots.length <= 12, city.id);
      for (const slot of slots) {
        assert.ok(slot.at < slot.expires);
        assert.equal(zonedDay(slot.at, city.zone), slot.day);
      }
      assert.ok(nextReminder(preferences, now) > now);
      const first = slots.find((slot) => slot.phase === 'start')!;
      const followup = slots.find(
        (slot) => slot.phase === 'followup' && slot.ward === first.ward && slot.day === first.day,
      )!;
      assert.ok(followup.at.getTime() > first.at.getTime() + 30 * 60000);
    }
  assert.ok(
    reminderSlots({ ...defaultReminderPreferences, followup: false }).every(
      (slot) => slot.phase === 'start',
    ),
  );
  assert.ok(
    reminderSlots({ ...defaultReminderPreferences, morning: false }).every(
      (slot) => slot.ward === 'evening',
    ),
  );
});

test('the lightweight private progress manifest matches every current morning and evening countable card', () => {
  for (const ward of ['morning', 'evening'] as const)
    assert.deepEqual(
      targets[ward],
      getCategoryEntries(ward)
        .filter((entry) => entry.repeat !== null)
        .map((entry) => ({ id: entry.id, repeat: entry.repeat })),
    );
});

test('the actual service worker rejects invalid/expired pushes, displays Arabic branded notifications, and restricts clicks to ward URLs', async () => {
  const handlers: Record<string, (event: unknown) => void> = {};
  const notifications: { title: string; options: Record<string, unknown> }[] = [];
  const urls: string[] = [];
  const worker = readFileSync('scripts/service-worker.js', 'utf8').replace(
    '/* PRECACHE */ {}',
    '{"assets":[],"pages":[],"version":"test"}',
  );
  runInNewContext(worker, {
    URL,
    Date,
    self: {
      location: { origin: 'https://azkar.ameen.academy' },
      addEventListener: (name: string, handler: (event: unknown) => void) => {
        handlers[name] = handler;
      },
      registration: {
        showNotification: async (title: string, options: Record<string, unknown>) => {
          notifications.push({ title, options });
        },
      },
      clients: {
        matchAll: async () => [],
        openWindow: async (url: string) => {
          urls.push(url);
        },
      },
    },
  });
  const id = '12345678-1234-4123-8123-123456789012';
  const payload = {
    ...notificationMessage('evening', 'started', 0, id),
    expires: Date.now() + 10000,
  };
  let version = 0;
  handlers.message({
    data: { type: 'PUSH_CAPABILITIES' },
    ports: [
      {
        postMessage: (message: { notificationVersion: number }) => {
          version = message.notificationVersion;
        },
      },
    ],
  });
  assert.equal(version, 1);
  let pending: Promise<void> = Promise.resolve();
  const waitUntil = (promise: Promise<void>) => {
    pending = promise;
  };
  handlers.push({ data: { json: () => ({ ...payload, expires: 0 }) }, waitUntil });
  await pending;
  handlers.push({ data: { json: () => ({ ...payload, ward: 'https://evil.com' }) }, waitUntil });
  await pending;
  assert.equal(notifications.length, 0);
  handlers.push({ data: { json: () => payload }, waitUntil });
  await pending;
  assert.equal(notifications.length, 1);
  assert.equal(notifications[0].options.dir, 'rtl');
  assert.equal(notifications[0].options.icon, '/icons/icon-192.png');
  handlers.notificationclick({
    notification: { close() {}, data: { ward: 'evening', hadith: 'sadaqa' } },
    waitUntil,
  });
  await pending;
  assert.equal(urls[0], 'https://azkar.ameen.academy/azkar/evening?reminder=evening&hadith=sadaqa');
});
