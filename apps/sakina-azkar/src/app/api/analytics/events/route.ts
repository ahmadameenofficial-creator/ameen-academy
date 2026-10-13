import { configured, privateHash, sameOrigin } from '@/lib/dashboard-auth';
import { parseEvents, uuidPattern, deviceDimensions, sourceNames } from '@/lib/analytics-contract';
import { recordEvents, withinLimit } from '@/lib/analytics-db';
import { categories } from '@/lib/catalog';
const paths = new Set([
  '/',
  '/library',
  '/saved',
  '/sources',
  '/progress',
  '/notifications',
  ...categories.map((category) => '/azkar/' + category.id),
]);
export async function POST(request: Request) {
  if (!configured()) return new Response(null, { status: 503 });
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  if (
    request.headers.get('dnt') === '1' ||
    /bot|spider|crawler|headless/i.test(request.headers.get('user-agent') ?? '')
  )
    return new Response(null, { status: 204 });
  try {
    const ip =
      request.headers.get('x-vercel-forwarded-for') ??
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      'unknown';
    if (!(await withinLimit(privateHash('events:' + ip), 120, 60)))
      return new Response(null, { status: 429 });
    const text = await request.text();
    if (Buffer.byteLength(text, 'utf8') > 16000) return new Response(null, { status: 413 });
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(null, { status: 400 });
    }
    if (!data || typeof data !== 'object' || Array.isArray(data))
      return new Response(null, { status: 400 });
    const events = parseEvents(data.events, paths);
    if (
      data.consent !== true ||
      typeof data.session !== 'string' ||
      !uuidPattern.test(data.session) ||
      !events ||
      !sourceNames.includes(data.source) ||
      typeof data.returning !== 'boolean'
    )
      return new Response(null, { status: 400 });
    const country = request.headers.get('x-vercel-ip-country') ?? 'ZZ';
    await recordEvents(
      {
        id: privateHash('session:' + data.session),
        ...deviceDimensions(request.headers.get('user-agent') ?? ''),
        country: /^[A-Z]{2}$/.test(country) ? country : 'ZZ',
        source: data.source,
        returning: data.returning,
      },
      events,
    );
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return new Response(null, { status: 503 });
  }
}
