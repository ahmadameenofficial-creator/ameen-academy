import { test, expect } from '@playwright/test';
import catalog from '../../src/data/azkar.json';
test('bots receive meaningful HTML, canonical metadata, public sitemap and robots directives', async ({
  request,
}) => {
  const response = await request.get('/azkar/morning', {
    headers: { 'User-Agent': 'OAI-SearchBot' },
  });
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('أذكار الصباح مكتوبة بالتشكيل مع عدّاد | سكينة');
  expect(html).toContain('rel="canonical" href="https://azkar.ameen.academy/azkar/morning"');
  expect(html).toContain('application/ld+json');
  expect(html).toContain('BreadcrumbList');
  expect(html).toContain(
    catalog.entries
      .find((entry) => entry.categoryId === 'morning')!
      .text.split('\n')[0]
      .replaceAll('&', '&amp;'),
  );
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain('/azkar/morning');
  expect(xml).not.toContain('/dashboard');
  expect(xml).not.toContain('/saved');
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('User-Agent: OAI-SearchBot');
});
test('personal pages and filtered searches are noindex while content titles remain discoverable', async ({
  page,
}) => {
  for (const path of ['/saved', '/progress', '/library?q=الصباح']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  }
  await page.goto('/library');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index/);
  await page.goto('/azkar/morning');
  await expect(page.locator('h1')).toHaveText('أذكار الصباح');
  await expect(page.locator('.category-context a[href="/sources"]')).toBeVisible();
});
