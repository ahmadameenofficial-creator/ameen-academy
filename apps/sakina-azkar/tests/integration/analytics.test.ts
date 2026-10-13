import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import {
  database,
  ensureSchema,
  recordEvents,
  dashboardData,
  withinLimit,
} from '../../src/lib/analytics-db';
import { dateRange } from '../../src/lib/analytics-contract';

test('PostgreSQL analytics deduplicates, aggregates periods accurately, rate-limits and persists independently of process memory', async () => {
  await ensureSchema();
  const sql = database();
  const key = randomUUID();
  const session = {
    id: key,
    device: 'mobile',
    browser: 'Chrome',
    os: 'Android',
    country: 'EG',
    source: 'google',
    returning: true,
  };
  const before = await dashboardData(dateRange());
  const at = Date.now();
  const events = [
    { id: randomUUID(), name: 'page_view' as const, path: '/azkar/morning', quantity: 1, at },
    { id: randomUUID(), name: 'counter' as const, path: '/azkar/morning', quantity: 3, at },
    { id: randomUUID(), name: 'engaged' as const, path: '/azkar/morning', quantity: 15, at },
    { id: randomUUID(), name: 'completion' as const, path: '/azkar/morning', quantity: 1, at },
  ];
  try {
    await recordEvents(session, events);
    await recordEvents(session, events);
    const after = await dashboardData(dateRange());
    assert.equal(after.current.views - before.current.views, 1);
    assert.equal(after.current.sessions - before.current.sessions, 1);
    assert.equal(after.current.counters - before.current.counters, 3);
    assert.equal(after.current.completions - before.current.completions, 1);
    assert.equal(after.current.seconds - before.current.seconds, 15);
    assert.equal(after.current.engaged - before.current.engaged, 1);
    assert.equal(after.current.returning - before.current.returning, 1);
    assert.equal(await withinLimit('test:' + key, 2, 60), true);
    assert.equal(await withinLimit('test:' + key, 2, 60), true);
    assert.equal(await withinLimit('test:' + key, 2, 60), false);
    const rows =
      await sql`SELECT count(*)::int AS count FROM sakina_analytics.events WHERE session_id=${key}`;
    assert.equal(rows[0].count, 4);
    await assert.rejects(
      recordEvents({ ...session, id: key + '-rollback' }, [{ ...events[0], id: 'not-a-uuid' }]),
    );
    const rollback =
      await sql`SELECT count(*)::int AS count FROM sakina_analytics.sessions WHERE id=${key + '-rollback'}`;
    assert.equal(rollback[0].count, 0);
  } finally {
    await sql`DELETE FROM sakina_analytics.sessions WHERE id=${key}`;
    await sql`DELETE FROM sakina_analytics.rate_limits WHERE key=${'test:' + key}`;
    await sql.end();
  }
});
