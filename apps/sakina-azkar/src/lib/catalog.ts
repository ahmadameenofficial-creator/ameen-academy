import raw from '@/data/azkar.json';
import type { Category, Dhikr, GroupId } from './types';
import { normalizeArabic } from './text';
export { normalizeArabic, withoutDiacritics, number } from './text';

export const categories = raw.categories as Category[];
export const entries: Dhikr[] = raw.entries;
export const source = raw.source;
export const groups: { id: GroupId; title: string }[] = [
  { id: 'daily', title: 'الحياة اليومية' },
  { id: 'prayer', title: 'الصلاة والعبادة' },
  { id: 'duas', title: 'الدعاء والذكر' },
  { id: 'travel', title: 'السفر والحج' },
  { id: 'wellbeing', title: 'الرقية والمواساة' },
];

const categoryIndex = new Map(categories.map(c => [c.id, c]));
const entryIndex = new Map(entries.map(e => [e.id, e]));
const byCategory = new Map(categories.map(c => [c.id, entries.filter(e => e.categoryId === c.id)]));
export function getCategory(id: string) { return categoryIndex.get(id); }
export function getEntry(id: string) { return entryIndex.get(id); }
export function getCategoryEntries(id: string): Dhikr[] { return byCategory.get(id) ?? []; }

const searchableEntries = entries.map(entry => ({ entry, text: normalizeArabic(`${entry.text} ${entry.keywords} ${entry.reference}`) }));
export function searchEntries(query: string): Dhikr[] {
  const terms = normalizeArabic(query).split(' ').filter(Boolean);
  return terms.length ? searchableEntries.filter(e => terms.every(t => e.text.includes(t))).map(e => e.entry) : [];
}
export function searchCategories(query: string): Category[] {
  const terms = normalizeArabic(query).split(' ').filter(Boolean);
  return categories.filter(c => terms.every(t => normalizeArabic(c.title).includes(t)));
}
