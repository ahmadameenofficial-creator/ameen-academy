import type { Metadata } from 'next';
import { Explorer } from '@/components/explorer';
export const metadata: Metadata = { title: 'مكتبة الأذكار' };
export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; search?: string | string[] }> }) {
  const { q, search } = await searchParams;
  const query = Array.isArray(q) ? q[0] ?? '' : q ?? '';
  const shouldFocus = (Array.isArray(search) ? search[0] : search) === '1';
  return <div className="container library-page"><Explorer full initialQuery={query} autofocus={shouldFocus} /></div>;
}
