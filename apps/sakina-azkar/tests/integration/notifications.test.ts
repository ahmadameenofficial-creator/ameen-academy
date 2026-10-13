import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { database } from '../../src/lib/analytics-db';
import { defaultReminderPreferences } from '../../src/lib/notification-contract';
import { reminderSlots } from '../../src/lib/notification-times';
import {
  deleteDevice,
  dispatchReminders,
  enrollDevice,
  ensureNotificationSchema,
  openSubscription,
  saveDeviceProgress,
  sealSubscription,
} from '../../src/lib/notification-server';

test('durable push leases deduplicate concurrent workers, authenticate ownership, rotate messages, suppress completion, retry and remove gone subscriptions', async () => {
  await ensureNotificationSchema();
  const sql = database();
  const id = randomUUID(),
    token = 'a'.repeat(64);
  const details = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/' + id,
    keys: { p256dh: 'B'.repeat(87), auth: 'C'.repeat(22) },
  };
  const start = reminderSlots(defaultReminderPreferences).find((slot) => slot.phase === 'start')!;
  const progress = {
    day: start.day,
    morning: 'not-started' as const,
    evening: 'not-started' as const,
  };
  try {
    const sealed = sealSubscription(details);
    assert.ok(!sealed.includes(details.endpoint));
    assert.deepEqual(openSubscription(sealed), details);
    assert.throws(() => openSubscription(sealed.slice(0, -4) + 'AAAA'));
    assert.equal(
      await enrollDevice(id, token, details, defaultReminderPreferences, progress),
      true,
    );
    assert.equal(
      await enrollDevice(id, 'b'.repeat(64), details, defaultReminderPreferences, progress),
      false,
    );
    await sql`UPDATE sakina_notifications.devices SET next_due=${start.at} WHERE id=${id}`;
    const messages: { hadith: string; title: string }[] = [];
    const send = async (_details: unknown, message: { hadith: string; title: string }) => {
      messages.push(message);
    };
    await Promise.all([dispatchReminders(start.at, send), dispatchReminders(start.at, send)]);
    assert.equal(messages.length, 1);
    await sql`UPDATE sakina_notifications.devices SET next_due=${start.at} WHERE id=${id}`;
    await dispatchReminders(start.at, send);
    assert.equal(messages.length, 1);
    const followup = reminderSlots(defaultReminderPreferences, start.at).find(
      (slot) => slot.phase === 'followup' && slot.ward === start.ward && slot.day === start.day,
    )!;
    await sql`UPDATE sakina_notifications.devices SET progress=${sql.json({ ...progress, [start.ward]: 'started' })},next_due=${followup.at} WHERE id=${id}`;
    await dispatchReminders(followup.at, send);
    assert.equal(messages.length, 2);
    assert.notEqual(messages[0].hadith, messages[1].hadith);
    assert.match(messages[1].title, /كمّل/);
    await sql`DELETE FROM sakina_notifications.deliveries WHERE device_id=${id}`;
    await sql`UPDATE sakina_notifications.devices SET progress=${sql.json({ ...progress, [start.ward]: 'completed' })},next_due=${start.at} WHERE id=${id}`;
    await dispatchReminders(start.at, send);
    assert.equal(messages.length, 2);
    const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' });
    assert.equal(await saveDeviceProgress(id, 'b'.repeat(64), { ...progress, day }), false);
    assert.equal(
      await saveDeviceProgress(id, token, { day, morning: 'completed', evening: 'not-started' }),
      true,
    );
    assert.equal(
      await saveDeviceProgress(id, token, { day, morning: 'started', evening: 'not-started' }),
      true,
    );
    const rows = await sql`SELECT progress FROM sakina_notifications.devices WHERE id=${id}`;
    assert.equal(rows[0].progress.morning, 'completed');
    await sql`UPDATE sakina_notifications.devices SET progress=${sql.json(progress)},next_due=${start.at} WHERE id=${id}`;
    await dispatchReminders(start.at, async () => {
      throw { statusCode: 500 };
    });
    const jobs =
      await sql`SELECT status,attempts FROM sakina_notifications.deliveries WHERE device_id=${id}`;
    assert.equal(jobs[0].status, 'pending');
    assert.equal(jobs[0].attempts, 1);
    await dispatchReminders(new Date(start.at.getTime() + 5 * 60000), async () => {
      throw { statusCode: 410 };
    });
    const gone = await sql`SELECT id FROM sakina_notifications.devices WHERE id=${id}`;
    assert.equal(gone.length, 0);
  } finally {
    await deleteDevice(id, token);
    await sql.end();
  }
});
