import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { categories, entries, source, searchEntries, searchCategories, normalizeArabic } from '../src/lib/catalog';

const upstreamBuffer = readFileSync(new URL('../data/upstream/azkar.json', import.meta.url));
const upstream = JSON.parse(upstreamBuffer.toString()) as { rows: [string, string, string, number | null | '', string, string][] };

test('every upstream row is imported without losing or rewriting religious text', () => {
  assert.equal(entries.length, upstream.rows.length);
  for (const entry of entries) {
    const row = upstream.rows[entry.sourceRow - 1];
    assert.equal(entry.text, row[1].replaceAll('\\n', '\n').trim());
    assert.equal(entry.reference, String(row[4] ?? '').replaceAll('\\n', '\n').trim());
    assert.equal(entry.repeat, typeof row[3] === 'number' && row[3] > 0 ? row[3] : null);
  }
  assert.equal(source.sha256, createHash('sha256').update(upstreamBuffer).digest('hex'));
});
test('all categories have unique stable IDs and correct non-empty entry counts', () => {
  assert.equal(new Set(categories.map(c => c.id)).size, categories.length);
  assert.equal(new Set(entries.map(e => e.id)).size, entries.length);
  const categoryIds = new Set(categories.map(c => c.id));
  for (const entry of entries) {
    assert.ok(categoryIds.has(entry.categoryId));
    assert.ok(entry.text.length > 0);
    assert.ok(/^z-[a-f0-9]{16}$/.test(entry.id));
  }
  for (const category of categories) {
    assert.ok(category.count > 0);
    assert.equal(category.count, entries.filter(e => e.categoryId === category.id).length);
  }
  assert.equal(categories.find(c => c.id === 'morning')?.count, 31);
  assert.equal(categories.find(c => c.id === 'evening')?.count, 30);
});
test('search ignores tashkeel, tatweel, presentation forms and alef variants', () => {
  assert.equal(normalizeArabic('أَذْكَـارُ الصَّبَاحِ'), 'اذكار الصباح');
  assert.ok(searchCategories('اذكار الصباح').some(c => c.id === 'morning'));
  assert.ok(searchEntries('الحي القيوم').length > 0);
  assert.ok(searchEntries('حَيُّ قَيُّومُ').length > 0);
  assert.equal(searchEntries('كلمةغيرموجودةاطلاقا').length, 0);
  assert.equal(searchEntries('   ').length, 0);
});
