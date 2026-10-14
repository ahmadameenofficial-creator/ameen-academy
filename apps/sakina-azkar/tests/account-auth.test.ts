import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { NextRequest } from 'next/server';
import { accountId, googleFlow, signAccountToken, readAccountToken, sessionUser, accountSameOrigin } from '../src/lib/account-auth';
import { GET, POST } from '../src/app/api/account/[action]/route';
const saved = { ...Object.fromEntries(['SAKINA_ACCOUNT_SECRET','SAKINA_DATABASE_URL','SAKINA_GOOGLE_CLIENT_ID','SAKINA_GOOGLE_CLIENT_SECRET','SAKINA_APP_URL'].map(k => [k, process.env[k]])) };
test('Google linking verifies state, PKCE, cookie purpose/expiry and never exposes provider tokens', async () => {
  process.env.SAKINA_ACCOUNT_SECRET = randomBytes(32).toString('hex');
  process.env.SAKINA_DATABASE_URL = 'postgresql://localhost/test';
  process.env.SAKINA_GOOGLE_CLIENT_ID = 'test-client';
  process.env.SAKINA_GOOGLE_CLIENT_SECRET = 'test-only';
  process.env.SAKINA_APP_URL = 'http://localhost:3100';
  const realFetch = globalThis.fetch;
  try {
    const userId = accountId('google-subject');
    const token = signAccountToken({ userId }, 'session', 60, 100000);
    assert.equal(sessionUser(signAccountToken({ userId }, 'session', 60)), userId);
    assert.equal(readAccountToken(token, 'flow', 100000), null);
    assert.equal(readAccountToken(token + 'x', 'session', 100000), null);
    assert.equal(readAccountToken(token, 'session', 160000), null);
    assert.equal(accountSameOrigin(new Request('http://localhost:3100/api/account/logout', { headers: { origin: 'https://evil.example' } })), false);
    const login = await GET(new NextRequest('http://localhost:3100/api/account/login'), { params: Promise.resolve({ action: 'login' }) });
    const location = new URL(login.headers.get('location')!);
    assert.equal(location.searchParams.get('code_challenge_method'), 'S256');
    assert.equal(location.searchParams.get('scope'), 'openid email');
    assert.ok(login.cookies.get('sakina_google_flow'));
    let calls = 0;
    const flow = googleFlow();
    globalThis.fetch = async (url, options) => {
      calls++;
      if (String(url).includes('/token')) {
        assert.equal(new URLSearchParams(String(options?.body)).get('code_verifier'), flow.verifier);
        return Response.json({ access_token: 'never-exposed-provider-token' });
      }
      return Response.json({ sub: 'google-subject', email: 'reader@example.test', email_verified: true });
    };
    const cookie = signAccountToken({ state: flow.state, verifier: flow.verifier }, 'flow', 600);
    const invalid = await GET(new NextRequest('http://localhost:3100/api/account/callback?state=wrong&code=code', { headers: { cookie: 'sakina_google_flow=' + cookie } }), { params: Promise.resolve({ action: 'callback' }) });
    assert.ok(invalid.headers.get('location')?.includes('account=error'));
    assert.equal(calls, 0);
    const success = await GET(new NextRequest('http://localhost:3100/api/account/callback?state=' + flow.state + '&code=code', { headers: { cookie: 'sakina_google_flow=' + cookie } }), { params: Promise.resolve({ action: 'callback' }) });
    assert.equal(sessionUser(success.cookies.get('sakina_account_session')?.value), userId);
    assert.ok(success.headers.get('set-cookie')?.includes('HttpOnly'));
    assert.ok(!success.headers.get('set-cookie')?.includes('never-exposed'));
    assert.equal(calls, 2);
    const csrf = await POST(new NextRequest('http://localhost:3100/api/account/logout', { method: 'POST', headers: { origin: 'https://evil.example' } }), { params: Promise.resolve({ action: 'logout' }) });
    assert.equal(csrf.status, 403);
  } finally {
    globalThis.fetch = realFetch;
    for (const [name, value] of Object.entries(saved)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
  }
});
