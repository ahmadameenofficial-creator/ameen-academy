import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import {
  dateRange,
  deviceDimensions,
  parseEvents,
  trafficSource,
} from '../src/lib/analytics-contract';
import {
  checkPassword,
  issueSession,
  validSession,
  sameOrigin,
  requestOrigin,
} from '../src/lib/dashboard-auth';

test('event contract accepts only whitelisted, bounded events without searches or arbitrary URLs', () => {
  const event = {
    id: randomUUID(),
    name: 'counter',
    path: '/azkar/morning',
    quantity: 3,
    at: Date.now(),
  };
  const paths = new Set(['/azkar/morning']);
  assert.equal(parseEvents([event], paths)?.length, 1);
  for (const change of [
    { path: '/azkar/morning?q=private' },
    { name: 'saved_text' },
    { quantity: 10000 },
    { quantity: -1 },
    { at: Date.now() - 90000000 },
    { id: 'invalid' },
  ])
    assert.equal(parseEvents([{ ...event, ...change }], paths), null);
  assert.equal(parseEvents(Array(41).fill(event), paths), null);
  assert.equal(parseEvents([{ ...event, name: 'engaged', quantity: 31 }], paths), null);
});
test('date ranges are calendar-valid, bounded, inclusive and compared to equally long prior periods', () => {
  assert.deepEqual(dateRange('2026-10-01', '2026-10-07', '2026-10-13'), {
    from: '2026-10-01',
    to: '2026-10-07',
    until: '2026-10-08',
    days: 7,
    previousFrom: '2026-09-24',
    previousUntil: '2026-10-01',
  });
  assert.equal(dateRange('2026-02-30', '2026-10-13', '2026-10-13').from, '2026-10-07');
  assert.equal(dateRange('2020-01-01', '2026-10-13', '2026-10-13').days, 7);
  assert.equal(dateRange(undefined, '2099-01-01', '2026-10-13').to, '2026-10-13');
});
test('device and referrer dimensions are coarse and query data is not retained', () => {
  assert.deepEqual(deviceDimensions('iPhone Mobile Safari'), {
    os: 'iOS',
    device: 'mobile',
    browser: 'Safari',
  });
  assert.equal(
    trafficSource('https://www.google.com/search?q=private', 'https://azkar.ameen.academy'),
    'google',
  );
  assert.equal(
    trafficSource('https://private-user.example.com/private', 'https://azkar.ameen.academy'),
    'other',
  );
  assert.equal(
    trafficSource('https://azkar.ameen.academy/library?q=private', 'https://azkar.ameen.academy'),
    'direct',
  );
});
test('admin tokens cannot be forged or used after expiry and password checks fail closed', () => {
  const old = {
    db: process.env.SAKINA_DATABASE_URL,
    password: process.env.DASHBOARD_PASSWORD,
    secret: process.env.DASHBOARD_SESSION_SECRET,
  };
  process.env.SAKINA_DATABASE_URL = 'postgres://test';
  process.env.DASHBOARD_PASSWORD = 'unit-test-only-password-32';
  process.env.DASHBOARD_SESSION_SECRET = 'unit-test-only-session-secret-64-characters';
  try {
    const now = Date.now();
    const token = issueSession(now);
    assert.equal(validSession(token, now), true);
    assert.equal(validSession(token + 'x', now), false);
    assert.equal(validSession(token, now + 9 * 3600000), false);
    assert.equal(checkPassword('wrong'), false);
    assert.equal(checkPassword(process.env.DASHBOARD_PASSWORD), true);
    delete process.env.DASHBOARD_SESSION_SECRET;
    assert.equal(validSession(token, now), false);
  } finally {
    for (const [name, value] of Object.entries({
      SAKINA_DATABASE_URL: old.db,
      DASHBOARD_PASSWORD: old.password,
      DASHBOARD_SESSION_SECRET: old.secret,
    })) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
test('origin checks and redirects use the external host behind the Next server proxy', () => {
  const request = new Request('http://0.0.0.0:3100/api/dashboard/login', {
    headers: {
      host: '127.0.0.1:3100',
      'x-forwarded-proto': 'http',
      origin: 'http://127.0.0.1:3100',
    },
  });
  assert.equal(sameOrigin(request), true);
  assert.equal(requestOrigin(request), 'http://127.0.0.1:3100');
  assert.equal(
    sameOrigin(
      new Request(request.url, {
        headers: { host: '127.0.0.1:3100', origin: 'https://evil.example' },
      }),
    ),
    false,
  );
});
