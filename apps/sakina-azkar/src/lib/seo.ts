import type { Metadata } from 'next';
import type { Category } from './types';
import { source } from './catalog';
export const siteUrl = 'https://azkar.ameen.academy';
const focused: Record<string, { title: string; description: string }> = {
  morning: {
    title: 'أذكار الصباح مكتوبة بالتشكيل مع عدّاد',
    description:
      'اقرأ أذكار الصباح مكتوبة بالتشكيل في سكينة، مع عدّاد لكل ذكر، وحفظ تقدمك وحجم الخط على جهازك. تظهر المراجع المتاحة وحدود مراجعة النصوص بوضوح.',
  },
  evening: {
    title: 'أذكار المساء مكتوبة بالتشكيل مع عدّاد',
    description:
      'أذكار المساء مكتوبة بالتشكيل، مع عدّادات مستقلة وتراجع عن الضغطات وحفظ التقدم على جهازك. اقرأ النصوص واطّلع على المراجع المتاحة في سكينة.',
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
