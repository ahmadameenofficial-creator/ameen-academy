import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, getCategory, getCategoryEntries } from '@/lib/catalog';
import { Reader } from '@/components/reader';
import { PrayerHub } from '@/components/prayer-hub';
import { categorySeo, categoryStructuredData, jsonLd, pageMetadata } from '@/lib/seo';
import { CategoryContext } from '@/components/category-context';
export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return { title: 'القسم غير موجود', robots: { index: false, follow: false } };
  const seo = categorySeo(category);
  return pageMetadata('/azkar/' + id, seo.title, seo.description);
}
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  const data = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(categoryStructuredData(category)) }}
    />
  );
  if (category.children)
    return (
      <>
        {data}
        <PrayerHub>{category.children.map(getCategory).filter((c) => c !== undefined)}</PrayerHub>
      </>
    );
  return (
    <>
      {data}
      <Reader
        category={category}
        entries={getCategoryEntries(id)}
        context={<CategoryContext category={category} />}
      />
    </>
  );
}
