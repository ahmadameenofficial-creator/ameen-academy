import test from 'node:test';
import assert from 'node:assert/strict';
import { historyStreak, parseHistory, shiftDay } from '../src/lib/reading-history';
test('personal completion history deduplicates each prayer/day and rejects corrupted or future records', () => {
  const good = { day: '2026-10-13', categoryId: 'after-prayer-fajr-maghrib', scope: 'fajr' };
  const rows = parseHistory(
    JSON.stringify({
      version: 1,
      records: [
        good,
        good,
        { ...good, scope: 'maghrib' },
        { ...good, day: '2026-10-14' },
        { ...good, scope: 'invalid' },
        { ...good, categoryId: '<script>' },
        { ...good, day: '2026-02-30' },
      ],
    }),
    '2026-10-13',
  );
  assert.equal(rows.length, 2);
  assert.equal(parseHistory('invalid', '2026-10-13').length, 0);
});
test('a streak survives the start of a new day until the visitor completes today, and breaks after missed days', () => {
  const records = ['2026-10-10', '2026-10-11', '2026-10-12'].map((day) => ({
    day,
    categoryId: 'morning',
  }));
  assert.equal(historyStreak(records, '2026-10-13'), 3);
  assert.equal(
    historyStreak([...records, { day: '2026-10-13', categoryId: 'morning' }], '2026-10-13'),
    4,
  );
  assert.equal(historyStreak(records, '2026-10-14'), 0);
  assert.equal(shiftDay('2026-03-01', -1), '2026-02-28');
});
