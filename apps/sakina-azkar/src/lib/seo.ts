import type { Metadata } from 'next';
import type { Category } from './types';
import { source, getCategoryEntries } from './catalog';
export const siteUrl = 'https://azkar.ameen.academy';
const focused: Record<string, { title: string; description: string }> = {
  morning: {
    title: 'أذكار الصباح مكتوبة بالتشكيل مع عدّاد',
    description:
      'أذكار الصباح مكتوبة بالتشكيل مع عدّاد لكل ذكر ومراجع النصوص. احفظ تقدمك اليومي حتى قبل إكمال الأذكار، واربط Google اختياريًا لاستعادة متابعتك بين الأجهزة.',
  },
  evening: {
    title: 'أذكار المساء مكتوبة بالتشكيل مع عدّاد',
    description:
      'أذكار المساء مكتوبة بالتشكيل مع عدّادات ومراجع النصوص. تابع نسبة إنجازك اليومية، وتراجع عن الضغطات، واحفظ متابعتك بين الأجهزة بربط Google اختياريًا.',
  },
  sleep: {
    title: 'أذكار النوم مكتوبة بالتشكيل مع عدّاد',
    description:
      'اقرأ أذكار النوم مكتوبة بالتشكيل، بصيغ منفصلة وعدّادات واضحة، مع حجم خط قابل للتعديل ووضع ليلي. المراجع المتاحة موضحة بجوار النصوص.',
  },
  'after-prayer': {
    title: 'أذكار بعد الصلاة: الفجر والمغرب والظهر والعصر والعشاء',
    description:
      'أذكار بعد الصلاة في مجموعتين: الفجر والمغرب، والظهر والعصر والعشاء، مع فصل الصيغ والعدادات وتوضيح الأعداد والمراجع لكل صلاة.',
  },
};
export function categorySeo(category: Category) {
  return (
    focused[category.id] ?? {
      title: category.title + ' مكتوبة مع عدّاد',
      description:
        category.title +
        ' في سكينة: ' +
        category.description +
        '. نصوص مكتوبة، وحفظ تقدم على جهازك، وعدّادات محددة أو حرة بحسب بيانات المصدر، مع توضيح المراجع المتاحة.',
    }
  );
}
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = siteUrl + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title + ' | سكينة',
      description,
      url,
      type: 'website',
      locale: 'ar_EG',
      siteName: 'سكينة',
      images: [{ url: siteUrl + '/brand/social.png', width: 1200, height: 630, alt: 'شعار سكينة' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title + ' | سكينة',
      description,
      images: [siteUrl + '/brand/social.png'],
    },
  };
}
export function categoryStructuredData(category: Category) {
  const seo = categorySeo(category),
    url = siteUrl + '/azkar/' + category.id;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url + '#page',
        url,
        name: category.title,
        description: seo.description,
        inLanguage: 'ar',
        isAccessibleForFree: true,
        isPartOf: { '@id': siteUrl + '/#website' },
        about: { '@type': 'Thing', name: category.title },
        citation: source.url,
        breadcrumb: { '@id': url + '#breadcrumb' },
        ...(!category.children ? { mainEntity: {
          '@type': 'ItemList',
          numberOfItems: getCategoryEntries(category.id).length,
          itemListElement: getCategoryEntries(category.id).map((entry, index) => ({
            '@type': 'ListItem', position: index + 1,
            url: url + '#' + entry.id,
            name: entry.title || entry.text.split('\n')[0].slice(0, 160),
          })),
        }} : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'سكينة', item: siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: 'مكتبة الأذكار', item: siteUrl + '/library' },
          { '@type': 'ListItem', position: 3, name: category.title, item: url },
        ],
      },
    ],
  };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
