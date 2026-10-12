import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialState, readingReducer, parseState, readingDay } from '../src/lib/progress';
const id = 'z-0123456789abcdef';
const day = '2026-10-12';

test('finite counters cannot exceed the prescribed repetition and undo cannot go negative', () => {
  let state = initialState(day);
  for (let i = 0; i < 8; i++) state = readingReducer(state, { type: 'increment', id, limit: 3 });
  assert.equal(state.counts[id], 3);
  for (let i = 0; i < 8; i++) state = readingReducer(state, { type: 'decrement', id });
  assert.equal(state.counts[id], 0);
});
test('free counters do not invent a completion target', () => {
  let state = initialState(day);
  for (let i = 0; i < 7; i++) state = readingReducer(state, { type: 'increment', id, limit: null });
  assert.equal(state.counts[id], 7);
});
test('day rollover resets counters and preserves saved texts and preferences', () => {
  let state = readingReducer(initialState(day), { type: 'increment', id, limit: 3 });
  state = readingReducer(state, { type: 'save', id });
  state = readingReducer(state, { type: 'font', size: 30 });
  state = readingReducer(state, { type: 'diacritics' });
  const next = readingReducer(state, { type: 'day', day: '2026-10-13' });
  assert.deepEqual(next.counts, {});
  assert.deepEqual(next.saved, [id]);
  assert.equal(next.fontSize, 30);
  assert.equal(next.diacritics, false);
  assert.deepEqual(parseState(JSON.stringify(state), '2026-10-13'), next);
});
test('corrupted, outdated or tampered storage is safely sanitized', () => {
  assert.deepEqual(parseState('{bad json', day), initialState(day));
  assert.deepEqual(parseState(JSON.stringify({ version: 5 }), day), initialState(day));
  const parsed = parseState(JSON.stringify({ version: 1, day, counts: { [id]: -3, 'bad-id': 88 }, saved: [id, id, 42, 'bad'], fontSize: 100, diacritics: 'no' }), day);
  assert.deepEqual(parsed.counts, {});
  assert.deepEqual(parsed.saved, [id]);
  assert.equal(parsed.fontSize, 36);
  assert.equal(parsed.diacritics, true);
});
test('category reset does not reset unrelated counters or bookmarks', () => {
  const other = 'z-fedcba9876543210';
  let state = initialState(day);
  state = readingReducer(state, { type: 'increment', id, limit: 3 });
  state = readingReducer(state, { type: 'increment', id: other, limit: 3 });
  state = readingReducer(state, { type: 'save', id });
  const result = readingReducer(state, { type: 'reset', ids: [id] });
  assert.equal(result.counts[id], undefined);
  assert.equal(result.counts[other], 1);
  assert.deepEqual(result.saved, [id]);
});
test('reading day uses the local calendar, not an ISO UTC truncation', () => {
  const date = new Date(2026, 9, 12, 0, 15);
  assert.equal(readingDay(date), day);
});
