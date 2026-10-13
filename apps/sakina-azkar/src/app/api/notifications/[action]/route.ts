import { sameOrigin } from '@/lib/dashboard-auth';
import { withinLimit } from '@/lib/analytics-db';
import {
  deviceIdPattern,
  deviceTokenPattern,
  parsePushDetails,
  parseReminderPreferences,
  parseWardProgress,
  reminderCities,
} from '@/lib/notification-contract';
import {
  deleteDevice,
  dispatchReminders,
  enrollDevice,
  notificationHash,
  notificationsConfigured,
  saveDeviceProgress,
  schedulerAuthorized,
  schedulerActive,
} from '@/lib/notification-server';
import { reminderSlots } from '@/lib/notification-times';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const headers = { 'Cache-Control': 'no-store' };
type Context = { params: Promise<{ action: string }> };
export async function GET(request: Request, { params }: Context) {
  const { action } = await params;
  if (action === 'dispatch') {
    if (!schedulerAuthorized(request)) return new Response(null, { status: 401, headers });
    if (!notificationsConfigured()) return new Response(null, { status: 503, headers });
    try {
      return Response.json(await dispatchReminders(), { headers });
    } catch {
      return new Response(null, { status: 503, headers });
    }
  }
  if (action !== 'config') return new Response(null, { status: 404, headers });
  const city = new URL(request.url).searchParams.get('city') ?? 'cairo';
  if (!reminderCities.some((item) => item.id === city))
    return new Response(null, { status: 400, headers });
  const enabled = notificationsConfigured();
  let active = false;
  try {
    if (enabled) active = await schedulerActive();
  } catch {
    return new Response(null, { status: 503, headers });
  }
  return Response.json(
    {
      enabled,
      schedulerActive: active,
      publicKey: enabled ? process.env.WEB_PUSH_PUBLIC_KEY : null,
      slots: reminderSlots({ city, morning: true, evening: true, followup: true }).slice(0, 4),
    },
    { headers },
  );
}
async function boundedJson(request: Request) {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 8192) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return null;
  }
}
export async function POST(request: Request, { params }: Context) {
  const { action } = await params;
  if (action === 'dispatch') return GET(request, { params: Promise.resolve({ action }) });
  if (!['subscribe', 'progress', 'unsubscribe'].includes(action))
    return new Response(null, { status: 404, headers });
  if (!sameOrigin(request)) return new Response(null, { status: 403, headers });
  if (!notificationsConfigured()) return new Response(null, { status: 503, headers });
  try {
    const data = await boundedJson(request);
    if (
      !data ||
      typeof data.id !== 'string' ||
      !deviceIdPattern.test(data.id) ||
      typeof data.token !== 'string' ||
      !deviceTokenPattern.test(data.token)
    )
      return new Response(null, { status: 400, headers });
    const ip =
      request.headers.get('x-vercel-forwarded-for') ??
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      'unknown';
    if (!(await withinLimit(notificationHash('push:' + ip), 120, 60)))
      return new Response(null, { status: 429, headers });
    if (action === 'unsubscribe') {
      await deleteDevice(data.id, data.token);
      return new Response(null, { status: 204, headers });
    }
    const progress = parseWardProgress(data.progress);
    if (!progress) return new Response(null, { status: 400, headers });
    if (action === 'progress')
      return new Response(null, {
        status: (await saveDeviceProgress(data.id, data.token, progress)) ? 204 : 403,
        headers,
      });
    const subscription = parsePushDetails(data.subscription);
    const preferences = parseReminderPreferences(data.preferences);
    if (!subscription || !preferences || data.consent !== true)
      return new Response(null, { status: 400, headers });
    if (!(await enrollDevice(data.id, data.token, subscription, preferences, progress)))
      return new Response(null, { status: 403, headers });
    await saveDeviceProgress(data.id, data.token, progress);
    return new Response(null, { status: 204, headers });
  } catch {
    return new Response(null, { status: 503, headers });
  }
}
