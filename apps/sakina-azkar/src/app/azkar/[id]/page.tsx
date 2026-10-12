import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, getCategory, getCategoryEntries } from '@/lib/catalog';
import { Reader } from '@/components/reader';
export function generateStaticParams() { return categories.map(c => ({ id: c.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getCategory(id)?.title ?? 'القسم غير موجود' };
}
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  return <Reader category={category} entries={getCategoryEntries(id)} />;
}
