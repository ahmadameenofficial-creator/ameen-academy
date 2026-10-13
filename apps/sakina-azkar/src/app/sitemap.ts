import type { MetadataRoute } from 'next';
import { categories } from '@/lib/catalog';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  // Do not manufacture daily lastmod dates for content that has not changed.
  return [
    '/',
    '/library',
    '/sources',
    ...categories.map((category) => '/azkar/' + category.id),
  ].map((path) => ({ url: siteUrl + path }));
}
