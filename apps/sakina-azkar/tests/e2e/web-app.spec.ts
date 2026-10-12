import { test, expect } from '@playwright/test';
import catalog from '../../src/data/azkar.json';

test('brand, install manifest, icons and browser appearance use the new identity', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('.brand-logo')).toHaveAttribute('src', '/brand/sakina-logo.png');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest');
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest).toMatchObject({ id: '/', scope: '/', start_url: '/', display: 'standalone', lang: 'ar', dir: 'rtl' });
  expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toContain('512x512');
  expect(manifest.icons.some((icon: { purpose: string }) => icon.purpose === 'maskable')).toBe(true);
  for (const icon of manifest.icons) expect((await request.get(icon.src)).status()).toBe(200);
  await page.locator('.theme-control summary').click();
  await page.getByRole('button', { name: 'الوضع الليلي', exact: true }).click();
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute('content', '#081321');
  await page.goto('/azkar/after-prayer-fajr-maghrib');
  const card = page.locator('.dhikr-card').first();
  const colors = await card.evaluate(element => {
    const button = element.querySelector('.count-button')!;
    return { surface: getComputedStyle(element).backgroundColor, text: getComputedStyle(element.querySelector('.dhikr-text')!).color,
      button: getComputedStyle(button).backgroundColor, buttonText: getComputedStyle(button).color,
      header: getComputedStyle(document.querySelector('.site-header')!).backgroundColor,
      blur: getComputedStyle(document.querySelector('.reading-toolbar')!).backdropFilter };
  });
  expect(colors).toEqual({ surface: 'rgb(18, 35, 56)', text: 'rgb(244, 249, 255)', button: 'rgb(183, 223, 255)', buttonText: 'rgb(7, 27, 44)', header: 'rgb(8, 19, 33)', blur: 'none' });
});

test('installation instructions and a browser install prompt are usable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'تثبيت التطبيق', exact: true }).click();
  await expect(page.getByRole('group', { name: 'طريقة تثبيت التطبيق' })).toBeVisible();
  await expect(page.getByText('على iPhone أو iPad:', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'إغلاق تعليمات التثبيت' }).click();
  await expect(page.getByRole('group', { name: 'طريقة تثبيت التطبيق' })).toHaveCount(0);
  await page.evaluate(() => {
    const event = new Event('beforeinstallprompt');
    Object.assign(event, { prompt: async () => {}, userChoice: Promise.resolve({ outcome: 'accepted' }) });
    window.dispatchEvent(event);
  });
  await page.getByRole('button', { name: 'تثبيت التطبيق', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'سكينة على جهازك', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'تثبيت التطبيق', exact: true })).toHaveCount(0);
});

test.describe('real offline application', () => {
  test.use({ serviceWorkers: 'allow' });
  test('the whole library, new categories, prayer counts, bookmarks and route links work without a network', async ({ page, context }) => {
    test.setTimeout(120000);
    await page.goto('/');
    await expect(page.locator('[data-offline-status]')).toHaveAttribute('data-offline-status', 'ready', { timeout: 90000 });
    expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
    const offline = await page.evaluate(async () => {
      const keys = (await caches.keys()).filter(key => key.startsWith('sakina-offline-'));
      const cache = await caches.open(keys[0]);
      return (await cache.keys()).map(request => new URL(request.url).pathname);
    });
    expect(catalog.categories.every(category => offline.includes('/azkar/' + category.id))).toBe(true);
    await context.setOffline(true);
    // This route was never opened in the browser before going offline.
    await page.goto('/azkar/after-prayer-fajr-maghrib');
    await expect(page.locator('.dhikr-card')).toHaveCount(15);
    const first = page.locator('.dhikr-card').first();
    await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
    await first.getByRole('button', { name: 'حفظ الذكر', exact: true }).click();
    await page.reload();
    await expect(first.locator('.animated-count b')).toHaveText('1');
    await page.getByRole('button', { name: 'المغرب', exact: true }).click();
    await expect(first.locator('.animated-count b')).toHaveText('0');
    await expect(page.locator('.dhikr-card')).toHaveCount(14);
    await page.goto('/saved');
    await expect(page.locator('.animated-count b')).toHaveText('1');
    await expect(page.locator('.scope-label')).toContainText('الفجر');
    await page.goto('/library');
    await page.getByRole('searchbox').fill('النوم');
    await page.locator('a.category-card[href="/azkar/sleep"]').click();
    await expect(page).toHaveURL(/\/azkar\/sleep$/);
    await expect(page.locator('.dhikr-card').first()).toBeVisible();
    await expect(page.locator('[data-offline-status]')).toHaveAttribute('data-offline-status', 'ready');
    await context.setOffline(false);
    await page.reload();
    await expect(page.locator('.dhikr-card').first()).toBeVisible();
  });
});
