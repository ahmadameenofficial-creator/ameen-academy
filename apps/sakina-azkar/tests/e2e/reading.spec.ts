import { test, expect } from '@playwright/test';

test('home, full library and Arabic search work without horizontal overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ذِكرٌ');
  await expect(page.locator('.featured-card')).toHaveCount(6);
  await page.goto('/library');
  await expect(page.locator('.library-grid .category-card')).toHaveCount(135);
  await page.getByRole('searchbox').fill('اذكار الصباح');
  await expect(page.locator('.library-grid .category-card')).toHaveCount(1);
  await expect(page.locator('.library-grid')).toContainText('أذكار الصباح');
  await page.getByRole('searchbox').fill('الحي القيوم');
  await expect(page.locator('.text-result').first()).toBeVisible();
  await page.getByRole('searchbox').fill('كلمةغيرموجودةاطلاقا');
  await expect(page.getByText('ما لقيناش نتائج مطابقة')).toBeVisible();
  await page.goto('/library?q=اذكار%20الصباح&q=المساء');
  await expect(page.getByRole('searchbox')).toHaveValue('اذكار الصباح');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('repetitions, undo, reload, bookmarks, focus and reset behave correctly', async ({ page }) => {
  await page.goto('/azkar/morning');
  await expect(page.locator('.dhikr-card')).toHaveCount(31);
  const first = page.locator('.dhikr-card').first();
  await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await expect(first.getByRole('button', { name: 'اكتمل الذكر', exact: true })).toBeDisabled();
  await page.reload();
  await expect(first.getByRole('button', { name: 'اكتمل الذكر', exact: true })).toBeDisabled();
  await first.getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expect(first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true })).toBeEnabled();
  await first.getByRole('button', { name: 'حفظ الذكر', exact: true }).click();
  await page.goto('/saved');
  await expect(page.locator('.dhikr-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.dhikr-card')).toHaveCount(1);
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'تكبير الخط' }).click();
  await expect(first.locator('.dhikr-text')).toHaveCSS('font-size', '28px');
  await page.getByRole('button', { name: 'تركيز', exact: true }).click();
  await expect(page.locator('.reader')).toHaveClass(/focus-mode/);
  await page.getByRole('button', { name: 'تركيز', exact: true }).click();
  await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await page.getByRole('button', { name: 'بدء هذا القسم من جديد' }).click();
  await page.getByRole('button', { name: 'نعم، تصفير' }).click();
  await expect(first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true })).toBeEnabled();
  await expect(first.getByRole('button', { name: 'إزالة من المحفوظات' })).toHaveAttribute('aria-pressed', 'true');
});

test('cross-tab storage updates and corrupted storage recover safely', async ({ page, context }) => {
  await page.goto('/azkar/morning');
  const second = await context.newPage();
  await second.goto('/azkar/morning');
  await page.locator('.dhikr-card').first().getByRole('button', { name: 'حفظ الذكر', exact: true }).click();
  await expect(second.locator('.dhikr-card').first().getByRole('button', { name: 'إزالة من المحفوظات' })).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => localStorage.setItem('sakina:reading:v1', '{invalid'));
  await page.reload();
  await expect(page.locator('.dhikr-card').first().getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true })).toBeEnabled();
  await second.close();
});

test('reduced motion and 360px reading remain accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/azkar/morning');
  await expect(page.locator('.dhikr-card').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'تكبير الخط' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/azkar/not-a-real-category');
  await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
});
