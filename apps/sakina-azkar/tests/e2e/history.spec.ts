import { test, expect } from '@playwright/test';
import catalog from '../../src/data/azkar.json';
test('private weekly history records a completed prayer once and is independent of analytics consent', async ({
  page,
}) => {
  await page.addInitScript(
    (entries) => {
      const date = new Date();
      const day = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-');
      if (!localStorage.getItem('sakina:reading:v1'))
        localStorage.setItem(
          'sakina:reading:v1',
          JSON.stringify({
            version: 1,
            day,
            counts: Object.fromEntries(
              entries
                .filter((entry) => entry.repeat !== null)
                .map((entry) => [entry.id + ':fajr', entry.repeat]),
            ),
            saved: [],
            fontSize: 26,
            diacritics: true,
            theme: 'dark',
          }),
        );
      localStorage.setItem('sakina:analytics:consent', 'no');
    },
    catalog.entries.filter((entry) => entry.categoryId === 'after-prayer-fajr-maghrib'),
  );
  await page.goto('/azkar/after-prayer-fajr-maghrib');
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem('sakina:history:v1') ?? '{}').records?.length,
      ),
    )
    .toBe(1);
  await page.reload();
  await page.goto('/progress');
  await expect(page.locator('.personal-metrics strong').first()).toHaveText('1');
  await expect(page.locator('.history-list li')).toHaveCount(1);
  await expect(page.locator('.history-list li')).toContainText('الفجر');
  await page.setViewportSize({ width: 360, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'مسح سجل المتابعة', exact: true }).click();
  await page.getByRole('button', { name: 'نعم، مسح السجل' }).click();
  await expect(page.locator('.personal-metrics strong').first()).toHaveText('0');
  expect(
    await page.evaluate(
      () => Object.keys(JSON.parse(localStorage.getItem('sakina:reading:v1')!).counts).length,
    ),
  ).toBeGreaterThan(0);
});
