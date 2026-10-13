import { createHmac, createHash, randomBytes, timingSafeEqual } from 'node:crypto';
export const adminCookie = 'sakina_dashboard_session';
export const sessionLifetime = 8 * 60 * 60;
export function configured() {
  return Boolean(
    process.env.SAKINA_DATABASE_URL &&
    (process.env.DASHBOARD_PASSWORD?.length ?? 0) >= 16 &&
    (process.env.DASHBOARD_SESSION_SECRET?.length ?? 0) >= 32,
  );
}
function secret() {
  const key = process.env.DASHBOARD_SESSION_SECRET;
  if (!key || key.length < 32) throw new Error('Dashboard authentication is not configured');
  return key;
}
export function privateHash(value: string) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}
export function checkPassword(value: string) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected || expected.length < 16 || value.length > 256) return false;
  return timingSafeEqual(
    createHash('sha256').update(expected).digest(),
    createHash('sha256').update(value).digest(),
  );
}
export function issueSession(now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(now / 1000) + sessionLifetime,
      nonce: randomBytes(24).toString('hex'),
    }),
  ).toString('base64url');
  return payload + '.' + createHmac('sha256', secret()).update(payload).digest('base64url');
}
export function validSession(token: string | undefined, now = Date.now()) {
  if (!token || token.length > 512 || !configured()) return false;
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return false;
    const expected = createHmac('sha256', secret()).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return (
      Number.isSafeInteger(data.exp) &&
      data.exp > now / 1000 &&
      data.exp <= now / 1000 + sessionLifetime &&
      typeof data.nonce === 'string'
    );
  } catch {
    return false;
  }
}
export function requestOrigin(request: Request) {
  const internal = new URL(request.url);
  const host = request.headers.get('host') ?? internal.host;
  const forwarded = request.headers.get('x-forwarded-proto');
  const protocol =
    forwarded === 'https' ? 'https:' : forwarded === 'http' ? 'http:' : internal.protocol;
  const external = new URL(protocol + '//' + host);
  if (external.host.toLowerCase() !== host.toLowerCase()) throw new Error('Invalid host');
  return external.origin;
}
export function sameOrigin(request: Request) {
  try {
    return request.headers.get('origin') === requestOrigin(request);
  } catch {
    return false;
  }
}
