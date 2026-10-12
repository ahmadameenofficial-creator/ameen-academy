import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { categories, entries, source, searchEntries, searchCategories, normalizeArabic } from '../src/lib/catalog';
import originals from '../src/data/original-entries.json';
import audit from '../data/free-counter-audit.json';

const upstreamBuffer = readFileSync(new URL('../data/upstream/azkar.json', import.meta.url));
const upstream = JSON.parse(upstreamBuffer.toString()) as { rows: [string, string, string, number | null | '', string, string][] };
const clean = (value: string | null) => String(value ?? '').replaceAll('\\r\\n', '\n').replaceAll('\\n', '\n').replaceAll('\\r', '\n').trim();

test('the full original source remains byte-identifiable and every row remains represented', () => {
  assert.equal(originals.length, upstream.rows.length);
  for (const entry of originals) {
    const row = upstream.rows[entry.sourceRow - 1];
    assert.equal(entry.text, clean(row[1]));
    assert.equal(entry.reference, clean(row[4]));
    assert.equal(entry.repeat, typeof row[3] === 'number' && row[3] > 0 ? row[3] : null);
    assert.ok(entries.some(e => e.sourceRow === entry.sourceRow), 'Lost row ' + entry.sourceRow);
  }
  assert.equal(source.sha256, createHash('sha256').update(upstreamBuffer).digest('hex'));
});

test('catalog IDs, category counts and counter contracts are consistent', () => {
  assert.equal(new Set(categories.map(c => c.id)).size, categories.length);
  assert.equal(new Set(entries.map(e => e.id)).size, entries.length);
  const categoryIds = new Set(categories.map(c => c.id));
  for (const entry of entries) {
    assert.ok(categoryIds.has(entry.categoryId));
    assert.ok(entry.text.length > 0);
    assert.ok(/^z-[a-f0-9]{16}$/.test(entry.id));
    if (entry.counterKind === 'fixed' || entry.counterKind === 'reading') {
      assert.ok(Number.isInteger(entry.repeat) && entry.repeat! > 0);
    } else assert.equal(entry.repeat, null);
  }
  for (const category of categories) {
    const children = category.children ?? [category.id];
    assert.equal(category.count, entries.filter(e => children.includes(e.categoryId)).length);
    assert.ok(category.count > 0);
  }
  assert.equal(categories.find(c => c.id === 'morning')?.count, 31);
  assert.equal(categories.find(c => c.id === 'evening')?.count, 30);
});

test('every originally free counter has an explicit review classification', () => {
  const previouslyFree = originals.filter(e => e.repeat === null);
  assert.equal(audit.length, previouslyFree.length);
  assert.equal(new Set(audit.map(a => a.sourceRow)).size, audit.length);
  for (const original of previouslyFree) {
    const record = audit.find(a => a.sourceRow === original.sourceRow);
    assert.ok(record?.reason);
    assert.ok(record!.resultIds.every(id => entries.some(e => e.id === id)));
  }
  for (const entry of entries.filter(e => e.counterKind === 'free')) {
    assert.equal(entry.repeat, null);
    const text = normalizeArabic(entry.text);
    assert.ok(!/(ثلاث|سبع|عشر|مائة|مئة).{0,12}(مرة|مرات|مرار|تسبيحة|تكبير)/.test(text), 'Unresolved explicit count in row ' + entry.sourceRow);
  }
  assert.equal(entries.find(e => e.sourceRow === 203)?.counterKind, 'free');
  assert.equal(entries.find(e => e.sourceRow === 284)?.counterKind, 'free');
  assert.equal(entries.find(e => e.sourceRow === 339)?.counterKind, 'instruction');
});

test('post-prayer formulas are independently counted and have documented references', () => {
  const first = entries.filter(e => e.categoryId === 'after-prayer-fajr-maghrib');
  const other = entries.filter(e => e.categoryId === 'after-prayer-dhuhr-asr-isha');
  assert.equal(first.length, 15);
  assert.equal(other.length, 13);
  for (const group of [first, other]) {
    assert.ok(group.every(e => e.repeat !== null && e.counterKind === 'fixed' && e.reference && e.referenceUrl?.startsWith('https://')));
    assert.equal(group.find(e => e.title === 'الاستغفار')?.repeat, 3);
    assert.deepEqual(group.filter(e => ['التسبيح', 'التحميد', 'التكبير'].includes(e.title!)).map(e => e.repeat), [33, 33, 33]);
    assert.equal(group.find(e => e.title === 'تمام المائة')?.repeat, 1);
  }
  for (const title of ['سورة الإخلاص', 'سورة الفلق', 'سورة الناس']) {
    assert.equal(first.find(e => e.title === title)?.repeat, 3);
    assert.equal(other.find(e => e.title === title)?.repeat, 1);
  }
  assert.equal(first.find(e => e.title === 'التهليل عشر مرات')?.repeat, 10);
  assert.deepEqual(first.find(e => e.title === 'دعاء خاص بالفجر')?.appliesTo, ['fajr']);
  assert.ok(!other.some(e => e.title === 'دعاء خاص بالفجر' || e.title === 'التهليل عشر مرات'));
  assert.ok(!entries.some(e => e.categoryId === 'after-prayer'));
});

test('bedtime, ruqyah and other explicit composite repetitions are not conflated', () => {
  assert.deepEqual(entries.filter(e => e.sourceRow === 143).map(e => e.repeat), [33, 33, 34]);
  for (const row of [280, 318]) assert.deepEqual(entries.filter(e => e.sourceRow === row).map(e => e.repeat), [3, 7]);
  assert.equal(entries.find(e => e.sourceRow === 94)?.repeat, 3);
  assert.equal(entries.find(e => e.sourceRow === 102)?.repeat, 3);
  assert.equal(entries.find(e => e.sourceRow === 207)?.repeat, 3);
  assert.equal(entries.find(e => e.sourceRow === 232)?.repeat, 100);
  assert.ok(entries.filter(e => e.sourceRow === 298).every(e => e.repeat === null));
  assert.equal(entries.filter(e => e.sourceRow === 298).length, 4);
  const travel = entries.filter(e => e.sourceRow === 244);
  assert.deepEqual(travel.map(e => e.repeat), [3, 1]);
  assert.ok(!travel[1].text.includes('وإذا'));
});

test('search ignores tashkeel, tatweel, presentation forms and alef variants', () => {
  assert.equal(normalizeArabic('أَذْكَـارُ الصَّبَاحِ'), 'اذكار الصباح');
  assert.ok(searchCategories('اذكار الصباح').some(c => c.id === 'morning'));
  assert.ok(searchEntries('الحي القيوم').length > 0);
  assert.equal(searchEntries('كلمةغيرموجودةاطلاقا').length, 0);
  assert.equal(searchEntries('   ').length, 0);
});
