import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {
  // Let crawlers read noindex tags on personal and search pages.
  const disallow = ['/dashboard', '/api/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow },
    ],
    sitemap: siteUrl + '/sitemap.xml',
  };
}
