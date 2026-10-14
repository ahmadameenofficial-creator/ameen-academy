import { registerAccount } from '@/lib/account-db';
import { verifiedAccountEmail } from '@/lib/account-profile';
import { NextRequest, NextResponse } from 'next/server';
import { accountConfigured, accountCookie, flowCookie, signAccountToken, readAccountToken, googleFlow, accountId, accountOrigin, accountSameOrigin, cookieOptions, sessionUser } from '@/lib/account-auth';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function json(value: object, status = 200) { return NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store' } }); }
export async function GET(request: NextRequest, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  if (action === 'session') {
    const token = request.cookies.get(accountCookie)?.value;
    const userId = sessionUser(token);
    if (userId) {
      const session = readAccountToken(token, 'session');
      try { await registerAccount(userId, verifiedAccountEmail(session?.email)); } catch { /* Local reading remains available if the database is temporarily down. */ }
    }
    return json({ configured: accountConfigured(), userId });
  }
  if (!accountConfigured()) return json({ error: 'ربط Google غير متاح حاليًا. كل المزايا المحلية متاحة.' }, 503);
  if (action === 'login') {
    const { state, verifier, challenge } = googleFlow();
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.search = new URLSearchParams({ client_id: process.env.SAKINA_GOOGLE_CLIENT_ID!, redirect_uri: accountOrigin() + '/api/account/callback', response_type: 'code', scope: 'openid email', state, code_challenge: challenge, code_challenge_method: 'S256', prompt: 'select_account' }).toString();
    const response = NextResponse.redirect(url);
    response.cookies.set(flowCookie, signAccountToken({ state, verifier }, 'flow', 600), cookieOptions(600));
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
  if (action !== 'callback') return json({ error: 'Not found' }, 404);
  const response = NextResponse.redirect(accountOrigin() + '/progress?account=error');
  response.cookies.set(flowCookie, '', cookieOptions(0));
  response.headers.set('Cache-Control', 'no-store');
  try {
    const flow = readAccountToken(request.cookies.get(flowCookie)?.value, 'flow');
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
    if (!flow || typeof flow.verifier !== 'string' || !state || flow.state !== state || !code || code.length > 4096) return response;
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(15000), headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: process.env.SAKINA_GOOGLE_CLIENT_ID!, client_secret: process.env.SAKINA_GOOGLE_CLIENT_SECRET!, redirect_uri: accountOrigin() + '/api/account/callback', grant_type: 'authorization_code', code, code_verifier: flow.verifier }) });
    if (!tokenResponse.ok) return response;
    const token = await tokenResponse.json();
    if (typeof token.access_token !== 'string') return response;
    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { cache: 'no-store', signal: AbortSignal.timeout(15000), headers: { Authorization: 'Bearer ' + token.access_token } });
    if (!profileResponse.ok) return response;
    const profile = await profileResponse.json();
    if (typeof profile.sub !== 'string' || profile.sub.length > 255 || !profile.sub || profile.email_verified !== true) return response;
    const email = verifiedAccountEmail(profile.email);
    if (!email) return response;
    const success = NextResponse.redirect(accountOrigin() + '/progress');
    success.headers.set('Cache-Control', 'no-store');
    success.cookies.set(flowCookie, '', cookieOptions(0));
    success.cookies.set(accountCookie, signAccountToken({ userId: accountId(profile.sub), email }, 'session', 2592000), cookieOptions(2592000));
    return success;
  } catch { return response; }
}
export async function POST(request: NextRequest, context: { params: Promise<{ action: string }> }) {
  if (!accountSameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  if ((await context.params).action !== 'logout') return json({ error: 'Not found' }, 404);
  const response = json({ ok: true });
  response.cookies.set(accountCookie, '', cookieOptions(0));
  return response;
}
