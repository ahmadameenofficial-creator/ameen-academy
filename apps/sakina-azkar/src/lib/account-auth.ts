import { createHmac, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
export const accountCookie = 'sakina_account_session';
export const flowCookie = 'sakina_google_flow';
export function accountConfigured() {
  return Boolean(process.env.SAKINA_DATABASE_URL && process.env.SAKINA_GOOGLE_CLIENT_ID && process.env.SAKINA_GOOGLE_CLIENT_SECRET && (process.env.SAKINA_ACCOUNT_SECRET?.length ?? 0) >= 32);
}
function secret() {
  const value = process.env.SAKINA_ACCOUNT_SECRET;
  if (!value || value.length < 32) throw new Error('Account secret is not configured');
  return value;
}
export function signAccountToken(data: object, purpose: 'session' | 'flow', lifetime: number, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ ...data, purpose, exp: Math.floor(now / 1000) + lifetime })).toString('base64url');
  return payload + '.' + createHmac('sha256', secret()).update(payload).digest('base64url');
}
export function readAccountToken(token: string | undefined, purpose: 'session' | 'flow', now = Date.now()): Record<string, unknown> | null {
  if (!token || token.length > 4096) return null;
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return null;
    const expected = createHmac('sha256', secret()).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.purpose !== purpose || !Number.isSafeInteger(data.exp) || data.exp <= now / 1000 || data.exp > now / 1000 + (purpose === 'flow' ? 600 : 2592000)) return null;
    return data;
  } catch { return null; }
}
export function accountId(sub: string) { return createHmac('sha256', secret()).update('google:' + sub).digest('hex'); }
export function googleFlow() {
  const state = randomBytes(32).toString('base64url');
  const verifier = randomBytes(48).toString('base64url');
  return { state, verifier, challenge: createHash('sha256').update(verifier).digest('base64url') };
}
export function accountOrigin() {
  const url = new URL(process.env.SAKINA_APP_URL || 'https://azkar.ameen.academy');
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) throw new Error('Invalid account origin');
  return url.origin;
}
export function accountSameOrigin(request: Request) { return request.headers.get('origin') === accountOrigin(); }
export function cookieOptions(maxAge: number) {
  return { httpOnly: true, secure: accountOrigin().startsWith('https:'), sameSite: 'lax' as const, path: '/', maxAge };
}
export function sessionUser(token: string | undefined) {
  const session = readAccountToken(token, 'session');
  return typeof session?.userId === 'string' && /^[a-f0-9]{64}$/.test(session.userId) ? session.userId : null;
}
