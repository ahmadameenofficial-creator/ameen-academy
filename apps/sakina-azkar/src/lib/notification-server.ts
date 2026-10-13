import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from 'node:crypto';
import webPush from 'web-push';
import { database } from './analytics-db';
import { nextReminder, reminderSlots, zonedDay } from './notification-times';
import {
  reminderCities,
  type ReminderPreferences,
  type PushDetails,
  type WardProgress,
} from './notification-contract';
import { notificationMessage, type WardStatus } from './notification-messages';

export function notificationsConfigured() {
  return Boolean(
    process.env.SAKINA_DATABASE_URL &&
    /^[A-Za-z0-9_-]{87}$/.test(process.env.WEB_PUSH_PUBLIC_KEY ?? '') &&
    /^[A-Za-z0-9_-]{43}$/.test(process.env.WEB_PUSH_PRIVATE_KEY ?? '') &&
    (process.env.WEB_PUSH_STORAGE_SECRET?.length ?? 0) >= 32 &&
    (process.env.CRON_SECRET?.length ?? 0) >= 32,
  );
}
export function notificationHash(value: string) {
  const secret = process.env.WEB_PUSH_STORAGE_SECRET;
  if (!secret || secret.length < 32) throw new Error('Notifications unavailable');
  return createHmac('sha256', secret).update(value).digest('hex');
}
export function schedulerAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const actual = request.headers.get('authorization');
  if (!secret || secret.length < 32 || !actual || actual.length > 512) return false;
  return timingSafeEqual(
    createHash('sha256').update(actual).digest(),
    createHash('sha256')
      .update('Bearer ' + secret)
      .digest(),
  );
}
function storageKey() {
  return createHash('sha256')
    .update(process.env.WEB_PUSH_STORAGE_SECRET ?? '')
    .digest();
}
export function sealSubscription(details: PushDetails) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', storageKey(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(details), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString('base64url');
}
export function openSubscription(value: string): PushDetails {
  const raw = Buffer.from(value, 'base64url');
  const cipher = createDecipheriv('aes-256-gcm', storageKey(), raw.subarray(0, 12));
  cipher.setAuthTag(raw.subarray(12, 28));
  return JSON.parse(
    Buffer.concat([cipher.update(raw.subarray(28)), cipher.final()]).toString('utf8'),
  );
}
let schema: Promise<void> | undefined;
export async function ensureNotificationSchema() {
  schema ??= database()
    .begin(async (tx) => {
      await tx`SELECT pg_advisory_xact_lock(73918322)`;
      await tx`CREATE SCHEMA IF NOT EXISTS sakina_notifications`;
      await tx`CREATE TABLE IF NOT EXISTS sakina_notifications.devices (id uuid PRIMARY KEY, token_hash text NOT NULL, endpoint_hash text NOT NULL UNIQUE, sealed text NOT NULL, preferences jsonb NOT NULL, progress jsonb NOT NULL, sequence integer NOT NULL DEFAULT 0, next_due timestamptz NOT NULL, leased_until timestamptz NOT NULL DEFAULT 'epoch', lease_id uuid, updated_at timestamptz NOT NULL DEFAULT now())`;
      await tx`CREATE INDEX IF NOT EXISTS sakina_push_due_idx ON sakina_notifications.devices(next_due,leased_until)`;
      await tx`CREATE TABLE IF NOT EXISTS sakina_notifications.deliveries (id uuid PRIMARY KEY, device_id uuid NOT NULL REFERENCES sakina_notifications.devices(id) ON DELETE CASCADE, day text NOT NULL, ward text NOT NULL, phase text NOT NULL, message jsonb NOT NULL, status text NOT NULL DEFAULT 'pending', attempts integer NOT NULL DEFAULT 0, retry_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, UNIQUE(device_id,day,ward,phase))`;
      await tx`CREATE INDEX IF NOT EXISTS sakina_push_retry_idx ON sakina_notifications.deliveries(device_id,status,retry_at)`;
      await tx`CREATE TABLE IF NOT EXISTS sakina_notifications.scheduler (id integer PRIMARY KEY CHECK(id=1),last_run timestamptz NOT NULL)`;
    })
    .then(() => {})
    .catch((error) => {
      schema = undefined;
      throw error;
    });
  await schema;
}
export async function schedulerActive() {
  await ensureNotificationSchema();
  const rows =
    await database()`SELECT last_run > now()-interval '15 minutes' AS active FROM sakina_notifications.scheduler WHERE id=1`;
  return rows[0]?.active === true;
}
export async function enrollDevice(
  id: string,
  token: string,
  details: PushDetails,
  preferences: ReminderPreferences,
  progress: WardProgress,
) {
  await ensureNotificationSchema();
  const sql = database();
  const tokenHash = notificationHash('device:' + token);
  return sql.begin(async (tx) => {
    const old =
      await tx`SELECT token_hash FROM sakina_notifications.devices WHERE id=${id} FOR UPDATE`;
    if (old.length && old[0].token_hash !== tokenHash) return false;
    const previousEndpoint =
      await tx`SELECT id,sealed FROM sakina_notifications.devices WHERE endpoint_hash=${notificationHash(details.endpoint)} AND id<>${id} FOR UPDATE`;
    if (previousEndpoint.length) {
      const previous = openSubscription(previousEndpoint[0].sealed);
      // A retained browser subscription can recover after local app data was cleared.
      if (previous.keys.auth !== details.keys.auth || previous.keys.p256dh !== details.keys.p256dh)
        return false;
      await tx`DELETE FROM sakina_notifications.devices WHERE id=${previousEndpoint[0].id}`;
    }
    await tx`INSERT INTO sakina_notifications.devices (id,token_hash,endpoint_hash,sealed,preferences,progress,next_due) VALUES (${id},${tokenHash},${notificationHash(details.endpoint)},${sealSubscription(details)},${tx.json({ ...preferences })},${tx.json({ ...progress })},${nextReminder(preferences)}) ON CONFLICT (id) DO UPDATE SET sealed=excluded.sealed, endpoint_hash=excluded.endpoint_hash, preferences=excluded.preferences, next_due=excluded.next_due, leased_until='epoch',lease_id=NULL,updated_at=now()`;
    await tx`UPDATE sakina_notifications.deliveries SET status='skipped' WHERE device_id=${id} AND status='pending'`;
    return true;
  });
}
export async function saveDeviceProgress(id: string, token: string, progress: WardProgress) {
  await ensureNotificationSchema();
  return database().begin(async (tx) => {
    const rows =
      await tx`SELECT progress,preferences FROM sakina_notifications.devices WHERE id=${id} AND token_hash=${notificationHash('device:' + token)} FOR UPDATE`;
    if (!rows.length) return false;
    const old = rows[0].progress as WardProgress;
    const city = reminderCities.find((city) => city.id === rows[0].preferences.city)!;
    const today = zonedDay(new Date(), city.zone);
    if (
      progress.day > today ||
      progress.day < zonedDay(new Date(Date.now() - 24 * 3600000), city.zone)
    )
      return false;
    if (old.day > progress.day) return true;
    const rank = ['not-started', 'started', 'completed'];
    const merged =
      old.day === progress.day
        ? {
            day: progress.day,
            morning: rank[
              Math.max(rank.indexOf(old.morning), rank.indexOf(progress.morning))
            ] as WardStatus,
            evening: rank[
              Math.max(rank.indexOf(old.evening), rank.indexOf(progress.evening))
            ] as WardStatus,
          }
        : progress;
    await tx`UPDATE sakina_notifications.devices SET progress=${tx.json({ ...merged })},updated_at=now() WHERE id=${id}`;
    for (const ward of ['morning', 'evening'] as const)
      if (merged[ward] === 'completed')
        await tx`UPDATE sakina_notifications.deliveries SET status='skipped' WHERE device_id=${id} AND ward=${ward} AND day=${progress.day} AND status='pending'`;
    return true;
  });
}
export async function deleteDevice(id: string, token: string) {
  await ensureNotificationSchema();
  await database()`DELETE FROM sakina_notifications.devices WHERE id=${id} AND token_hash=${notificationHash('device:' + token)}`;
}
type PushMessage = ReturnType<typeof notificationMessage> & { expires: number };
export type PushTransport = (
  details: PushDetails,
  message: PushMessage,
  ttl: number,
) => Promise<unknown>;
const transport: PushTransport = (details, message, ttl) =>
  webPush.sendNotification(details, JSON.stringify(message), {
    TTL: ttl,
    urgency: 'normal',
    timeout: 8000,
    vapidDetails: {
      subject: process.env.WEB_PUSH_SUBJECT ?? 'https://azkar.ameen.academy',
      publicKey: process.env.WEB_PUSH_PUBLIC_KEY!,
      privateKey: process.env.WEB_PUSH_PRIVATE_KEY!,
    },
  });

/** Bounded worker, durable delivery keys, device leases and retries; no external call under a DB lock. */
export async function dispatchReminders(now = new Date(), send: PushTransport = transport) {
  await ensureNotificationSchema();
  const sql = database();
  await sql`INSERT INTO sakina_notifications.scheduler (id,last_run) VALUES (1,now()) ON CONFLICT(id) DO UPDATE SET last_run=excluded.last_run`;
  const lease = randomUUID();
  const deadline = Date.now() + 45000;
  const devices =
    await sql`UPDATE sakina_notifications.devices SET lease_id=${lease}, leased_until=${new Date(now.getTime() + 120000)} WHERE id IN (SELECT id FROM sakina_notifications.devices WHERE next_due<=${now} AND leased_until<=${now} ORDER BY next_due LIMIT 100 FOR UPDATE SKIP LOCKED) RETURNING *`;
  let sent = 0,
    failed = 0,
    skipped = 0,
    cursor = 0;
  async function work() {
    while (cursor < devices.length && Date.now() < deadline) {
      const device = devices[cursor++];
      const preferences = device.preferences as ReminderPreferences;
      try {
        for (const slot of reminderSlots(preferences, now).filter(
          (slot) => slot.at <= now && slot.expires > now,
        )) {
          const progress = device.progress as WardProgress;
          const status = progress.day === slot.day ? progress[slot.ward] : 'not-started';
          if (status === 'completed') {
            skipped++;
            continue;
          }
          const id = randomUUID();
          const message = {
            ...notificationMessage(slot.ward, status, device.sequence, id),
            expires: slot.expires.getTime(),
          };
          const created = await sql.begin(async (tx) => {
            const rows =
              await tx`INSERT INTO sakina_notifications.deliveries (id,device_id,day,ward,phase,message,retry_at,expires_at) VALUES (${id},${device.id},${slot.day},${slot.ward},${slot.phase},${tx.json(message)},${now},${slot.expires}) ON CONFLICT (device_id,day,ward,phase) DO NOTHING RETURNING id`;
            if (rows.length)
              await tx`UPDATE sakina_notifications.devices SET sequence=sequence+1 WHERE id=${device.id}`;
            return rows.length;
          });
          device.sequence += created;
        }
        const jobs =
          await sql`SELECT * FROM sakina_notifications.deliveries WHERE device_id=${device.id} AND status='pending' AND retry_at<=${now} AND expires_at>${now} ORDER BY retry_at LIMIT 2`;
        for (const job of jobs) {
          const current =
            await sql`SELECT progress FROM sakina_notifications.devices WHERE id=${device.id} AND lease_id=${lease}`;
          if (
            !current.length ||
            (current[0].progress.day === job.day && current[0].progress[job.ward] === 'completed')
          ) {
            await sql`UPDATE sakina_notifications.deliveries SET status='skipped' WHERE id=${job.id}`;
            skipped++;
            continue;
          }
          try {
            const outgoing = job.message as PushMessage;
            if (
              current[0].progress.day === job.day &&
              current[0].progress[job.ward] === 'started'
            ) {
              outgoing.title =
                'كمّل أذكار ' + (job.ward === 'morning' ? 'الصباح' : 'المساء') + ' على مهل | سكينة';
              outgoing.action = 'استكمال الورد';
            }
            await send(
              openSubscription(device.sealed),
              outgoing,
              Math.max(
                1,
                Math.min(
                  900,
                  Math.floor((new Date(job.expires_at).getTime() - now.getTime()) / 1000),
                ),
              ),
            );
            await sql`UPDATE sakina_notifications.deliveries SET status='sent',attempts=attempts+1 WHERE id=${job.id}`;
            sent++;
          } catch (error) {
            const code =
              error && typeof error === 'object' && 'statusCode' in error
                ? Number(error.statusCode)
                : 0;
            if (code === 404 || code === 410) {
              await sql`DELETE FROM sakina_notifications.devices WHERE id=${device.id}`;
              break;
            }
            const retry = new Date(now.getTime() + 5 * 60000);
            const retryable =
              (code === 0 || code === 429 || code >= 500) &&
              job.attempts < 2 &&
              retry < new Date(job.expires_at);
            await sql`UPDATE sakina_notifications.deliveries SET status=${retryable ? 'pending' : 'failed'},attempts=attempts+1,retry_at=${retry} WHERE id=${job.id} AND status='pending'`;
            failed++;
          }
        }
        await sql`UPDATE sakina_notifications.deliveries SET status='expired' WHERE device_id=${device.id} AND status='pending' AND expires_at<=${now}`;
        const pending =
          await sql`SELECT min(retry_at) AS at FROM sakina_notifications.deliveries WHERE device_id=${device.id} AND status='pending' AND expires_at>${now}`;
        const future = nextReminder(preferences, now);
        const retry = pending[0].at ? new Date(pending[0].at) : future;
        await sql`UPDATE sakina_notifications.devices SET next_due=${retry < future ? retry : future},leased_until='epoch',lease_id=NULL WHERE id=${device.id} AND lease_id=${lease}`;
      } catch {
        failed++; /* A crashed device is retried after its lease expires. */
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(5, devices.length) }, work));
  await sql`UPDATE sakina_notifications.devices SET leased_until='epoch',lease_id=NULL WHERE lease_id=${lease}`;
  await sql`DELETE FROM sakina_notifications.deliveries WHERE expires_at<${new Date(now.getTime() - 14 * 86400000)}`;
  return { processed: devices.length, sent, failed, skipped };
}
