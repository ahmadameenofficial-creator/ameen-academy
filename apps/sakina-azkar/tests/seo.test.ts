import test from 'node:test';
import assert from 'node:assert/strict';
import { categories } from '../src/lib/catalog';
import { categorySeo, categoryStructuredData, jsonLd, pageMetadata, siteUrl } from '../src/lib/seo';
import sitemap from '../src/app/sitemap';
import robots from '../src/app/robots';
test('every category has specific metadata, a canonical URL, and honest structured data', () => {
  const descriptions = categories.map((category) => categorySeo(category).description);
  assert.equal(new Set(descriptions).size, categories.length);
  for (const category of categories) {
    const seo = categorySeo(category);
    const metadata = pageMetadata('/azkar/' + category.id, seo.title, seo.description);
    assert.equal(metadata.alternates?.canonical, siteUrl + '/azkar/' + category.id);
    const structured = categoryStructuredData(category);
    assert.equal(structured['@graph'][0].name, category.title);
    assert.equal(structured['@graph'][1].itemListElement?.length, 3);
    assert.equal(JSON.stringify(structured).includes('aggregateRating'), false);
  }
  assert.equal(jsonLd({ name: '</script>' }).includes('</script>'), false);
});
test('sitemap lists public canonical content only, without invented freshness dates', () => {
  const rows = sitemap();
  assert.equal(rows.length, categories.length + 3);
  assert.equal(new Set(rows.map((row) => row.url)).size, rows.length);
  assert.ok(
    rows.every(
      (row) =>
        row.url.startsWith(siteUrl) &&
        !row.lastModified &&
        !/dashboard|api\/|saved|progress|\?/.test(row.url),
    ),
  );
  assert.ok(rows.some((row) => row.url.endsWith('/azkar/morning')));
});
test('crawlers can search public content and remain outside the admin APIs', () => {
  const config = robots();
  assert.equal(config.sitemap, siteUrl + '/sitemap.xml');
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  assert.ok(rules.some((rule) => rule.userAgent === 'OAI-SearchBot' && rule.allow === '/'));
  assert.ok(
    rules.every(
      (rule) =>
        Array.isArray(rule.disallow) &&
        rule.disallow.includes('/dashboard') &&
        rule.disallow.includes('/api/'),
    ),
  );
});
