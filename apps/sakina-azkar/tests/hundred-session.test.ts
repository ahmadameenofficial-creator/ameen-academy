import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCategoryEntries } from '../src/lib/catalog';
import {
  defaultSessionPreferences,
  hundredProgress,
  parseSessionPreferences,
  supportsHundredSession,
} from '../src/lib/hundred-session';

test('the focused session is available only for prescribed hundred-count morning and evening entries', () => {
  assert.equal(getCategoryEntries('morning').filter(supportsHundredSession).length, 3);
  assert.equal(getCategoryEntries('evening').filter(supportsHundredSession).length, 2);
  const entry = getCategoryEntries('morning').find(supportsHundredSession)!;
  assert.equal(supportsHundredSession({ ...entry, categoryId: 'after-prayer' }), false);
  assert.equal(supportsHundredSession({ ...entry, repeat: null, counterKind: 'free' }), false);
  assert.equal(supportsHundredSession({ ...entry, repeat: 33 }), false);
});

test('stage boundaries, remainder and completion remain consistent and sanitize invalid counts', () => {
  for (const invalid of [-1, 0.5, NaN, Infinity]) assert.equal(hundredProgress(invalid).count, 0);
  assert.equal(hundredProgress(500).count, 100);
  assert.deepEqual(hundredProgress(43), {
    count: 43,
    remaining: 57,
    completed: false,
    completedStages: 4,
    stage: 5,
    withinStage: 3,
  });
  assert.equal(hundredProgress(10).stage, 2);
  assert.equal(hundredProgress(99).withinStage, 9);
  assert.deepEqual(hundredProgress(100), {
    count: 100,
    remaining: 0,
    completed: true,
    completedStages: 10,
    stage: 10,
    withinStage: 10,
  });
});

test('optional hardware preferences are off by default and untrusted stored values cannot enable them', () => {
  for (const raw of [null, '{invalid', '[]', 'null', '{"version":2,"haptics":true}'])
    assert.deepEqual(parseSessionPreferences(raw), defaultSessionPreferences);
  assert.deepEqual(
    parseSessionPreferences('{"version":1,"hand":"wrong","haptics":"yes","keepAwake":1}'),
    defaultSessionPreferences,
  );
  assert.deepEqual(
    parseSessionPreferences('{"version":1,"hand":"left","haptics":true,"keepAwake":true}'),
    { version: 1, hand: 'left', haptics: true, keepAwake: true },
  );
});
