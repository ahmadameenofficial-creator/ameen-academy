import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../../src/data/azkar.json';

test('main screens have no detected WCAG A/AA violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/', '/library', '/azkar/morning', '/sources', '/saved']) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const violations = report.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) }));
    expect(violations, `Accessibility violations on ${path}`).toEqual([]);
  }
});

test('all catalog categories resolve and invalid categories return a real 404', async ({ request }) => {
  for (let i = 0; i < catalog.categories.length; i += 8) {
    const responses = await Promise.all(catalog.categories.slice(i, i + 8).map(async category => {
      const response = await request.get(`/azkar/${category.id}`);
      return { id: category.id, status: response.status() };
    }));
    for (const response of responses) expect(response.status, response.id).toBe(200);
  }
  expect((await request.get('/azkar/does-not-exist')).status()).toBe(404);
});
