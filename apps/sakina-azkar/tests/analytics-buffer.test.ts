import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { AnalyticsBuffer } from '../src/lib/analytics-buffer';
const visit = () => ({ id: randomUUID(), source: 'direct', returning: false });
const event = () => ({
  id: randomUUID(),
  name: 'counter' as const,
  path: '/azkar/morning',
  quantity: 1,
  at: Date.now(),
});
test('reload retains unacknowledged counters, merges unsent counts and never mutates in-flight batches', () => {
  const buffer = new AnalyticsBuffer(),
    session = visit();
  buffer.add(event(), session);
  const first = buffer.take()!;
  buffer.add(event(), session);
  buffer.add(event(), session);
  assert.equal(first.events[0].quantity, 1);
  const restored = new AnalyticsBuffer();
  restored.hydrate(buffer.serialize());
  const retried = restored.take()!;
  assert.equal(
    retried.events.reduce((sum, row) => sum + row.quantity, 0),
    3,
  );
  restored.finish(retried.events.map((row) => row.id));
  assert.equal(restored.size, 0);
});
test('pending events retain their original session, safely retry and respect opt-out and memory limits', () => {
  const buffer = new AnalyticsBuffer(),
    old = visit(),
    next = visit();
  buffer.add(event(), old);
  buffer.add(event(), next);
  const first = buffer.take()!;
  assert.equal(first.visit.id, old.id);
  buffer.finish(
    first.events.map((row) => row.id),
    true,
  );
  assert.equal(buffer.take()!.visit.id, old.id);
  for (let i = 0; i < 100; i++) buffer.add({ ...event(), name: 'page_view' }, next);
  assert.equal(buffer.size, 80);
  buffer.clear();
  assert.equal(buffer.take(), null);
  assert.equal(buffer.serialize(), '[]');
});
test('pending storage rejects corrupt, stale and non-whitelisted content', () => {
  const buffer = new AnalyticsBuffer();
  buffer.hydrate('invalid');
  buffer.hydrate(
    JSON.stringify([
      { event: { ...event(), path: '/library?q=private' }, visit: visit() },
      { event: { ...event(), at: Date.now() - 90000000 }, visit: visit() },
    ]),
  );
  assert.equal(buffer.size, 0);
});
