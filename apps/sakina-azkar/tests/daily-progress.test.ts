import test from 'node:test';
import assert from 'node:assert/strict';
import { partialProgress, wardEntries, progressPercent } from '../src/lib/daily-progress';
import { mergeHistory, parseHistory, historyStreak } from '../src/lib/reading-history';
import { initialState, readingReducer, parseState } from '../src/lib/progress';
test('each fixed counter contributes its fraction; free counters do not affect the ward', () => {
  const entries = wardEntries('morning');
  const fixed = entries.filter(e => e.repeat !== null && e.repeat > 0);
  const hundred = fixed.find(e => e.repeat === 100)!;
  const counts = { [hundred.id]: 43 };
  assert.ok(Math.abs(partialProgress(entries, counts) - .43 / fixed.length) < 1e-10);
  assert.equal(partialProgress(entries, Object.fromEntries(fixed.map(e => [e.id, e.repeat! * 2]))), 1);
  assert.equal(partialProgress(entries, {}), 0);
  assert.equal(partialProgress(entries.filter(e => e.repeat === null), counts), 0);
});
test('partial progress persists, decreases on undo/reset, and archives separately from the next day', () => {
  const entries = wardEntries('morning');
  const entry = entries.find(e => e.repeat === 100)!;
  let state = initialState('2026-10-14');
  state = readingReducer(state, { type: 'increment', id: entry.id, limit: 100 });
  const fraction = partialProgress(entries, state.counts);
  assert.ok(fraction > 0 && fraction < 1);
  const records = [{ day: state.day, categoryId: 'morning', progress: fraction, counts: state.counts, updatedAt: 10 }];
  assert.equal(parseHistory(JSON.stringify({ version: 1, records }), '2026-10-15')[0].progress, fraction);
  assert.equal(parseState(JSON.stringify(state), state.day).counts[entry.id], 1);
  assert.equal(partialProgress(entries, readingReducer(state, { type: 'decrement', id: entry.id }).counts), 0);
  assert.equal(partialProgress(entries, readingReducer(state, { type: 'reset', ids: [entry.id] }).counts), 0);
  const tomorrow = readingReducer(state, { type: 'day', day: '2026-10-15' });
  assert.deepEqual(tomorrow.counts, {});
  assert.equal(records[0].progress, fraction);
  assert.equal(historyStreak(records, '2026-10-14'), 0);
});
test('sync keeps the newer undo or deletion and combines independent wards/days', () => {
  const old = { day: '2026-10-14', categoryId: 'morning', progress: 1, updatedAt: 10 };
  const undo = { ...old, progress: .2, updatedAt: 20 };
  const evening = { ...old, categoryId: 'evening', progress: .3 };
  const merged = mergeHistory([undo], [old, evening], '2026-10-14');
  assert.equal(merged.find(r => r.categoryId === 'morning')!.progress, .2);
  assert.equal(merged.length, 2);
  assert.equal(mergeHistory([{ ...undo, progress: 0, updatedAt: 30 }], merged, '2026-10-14').find(r => r.categoryId === 'morning')!.progress, 0);
});

test('display never labels a partial ward as zero or complete through rounding', () => {
  assert.equal(progressPercent(.00001), .01);
  assert.equal(progressPercent(.99999), 99.99);
  assert.equal(progressPercent(1), 100);
});
