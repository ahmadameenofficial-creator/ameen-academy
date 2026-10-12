/** Normalization is for search only; source/display text is preserved. */
export function normalizeArabic(text: string): string {
  return text.normalize('NFKC')
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/ـ/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ').trim().toLowerCase();
}
export function withoutDiacritics(text: string): string {
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
}
export const number = (value: number) => new Intl.NumberFormat('ar-EG').format(value);
