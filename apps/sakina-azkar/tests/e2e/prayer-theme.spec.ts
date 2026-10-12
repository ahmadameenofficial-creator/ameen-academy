import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../../src/data/azkar.json';
import originals from '../../src/data/original-entries.json';

test('prayer hub and fajr/maghrib have separated formulas, conditional dua and isolated progress', async ({ page }) => {
  await page.goto('/azkar/after-prayer');
  await expect(page.locator('.prayer-group-card')).toHaveCount(2);
  await page.locator('.prayer-group-card').first().click();
  await expect(page.locator('.dhikr-card')).toHaveCount(15);
  const first = page.locator('.dhikr-card').first();
  await expect(first.locator('.dhikr-card-title')).toHaveText('الاستغفار');
  await expect(first.locator('.dhikr-text')).toHaveText('أَسْتَغْفِرُ اللَّهَ.');
  for (let i = 0; i < 3; i++) await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await expect(first.getByRole('button', { name: 'اكتمل الذكر', exact: true })).toBeDisabled();
  await expect(first.locator('.animated-count b')).toHaveText('3');
  await page.getByRole('button', { name: 'المغرب', exact: true }).click();
  await expect(page.locator('.dhikr-card')).toHaveCount(14);
  await expect(page.getByRole('heading', { name: 'دعاء خاص بالفجر' })).toHaveCount(0);
  await expect(first.locator('.animated-count b')).toHaveText('0');
  await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await first.getByRole('button', { name: 'حفظ الذكر', exact: true }).click();
  await page.goto('/saved');
  await expect(page.locator('.scope-label')).toContainText('المغرب');
  await expect(page.locator('.animated-count b')).toHaveText('1');
  await page.goto('/azkar/after-prayer-fajr-maghrib');
  await expect(first.locator('.animated-count b')).toHaveText('3');
  await page.getByRole('button', { name: 'المغرب', exact: true }).click();
  await expect(first.locator('.animated-count b')).toHaveText('1');
});

test('dhuhr/asr/isha are isolated and resets affect only the selected prayer', async ({ page }) => {
  await page.goto('/azkar/after-prayer-dhuhr-asr-isha');
  await expect(page.locator('.dhikr-card')).toHaveCount(13);
  const first = page.locator('.dhikr-card').first();
  await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await page.getByRole('button', { name: 'العصر', exact: true }).click();
  await expect(first.locator('.animated-count b')).toHaveText('0');
  await first.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await page.getByRole('button', { name: 'العشاء', exact: true }).click();
  await expect(first.locator('.animated-count b')).toHaveText('0');
  await page.getByRole('button', { name: 'العصر', exact: true }).click();
  await page.getByRole('button', { name: 'بدء هذا القسم من جديد' }).click();
  await page.getByRole('button', { name: 'نعم، تصفير' }).click();
  await expect(first.locator('.animated-count b')).toHaveText('0');
  await page.getByRole('button', { name: 'الظهر', exact: true }).click();
  await expect(first.locator('.animated-count b')).toHaveText('1');
});

test('free counters remain free, persist and undo; instruction cards have no false counter', async ({ page }) => {
  const entry = catalog.entries.find(e => e.sourceRow === 109)!;
  await page.goto('/azkar/' + entry.categoryId);
  const card = page.locator('#' + entry.id);
  for (let i = 0; i < 40; i++) await card.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await expect(card.locator('.animated-count b')).toHaveText('40');
  await expect(card.locator('.count-limit')).toHaveCount(0);
  await expect(card.locator('.entry-progress')).toHaveCount(0);
  await page.reload();
  await expect(card.locator('.animated-count b')).toHaveText('40');
  await card.getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expect(card.locator('.animated-count b')).toHaveText('39');
  await card.getByRole('button', { name: 'تصفير عداد الذكر' }).click();
  await expect(card.locator('.animated-count b')).toHaveText('0');
  const instruction = catalog.entries.find(e => e.sourceRow === 339)!;
  await page.goto('/azkar/' + instruction.categoryId);
  await expect(page.locator('.count-button')).toHaveCount(0);
  await expect(page.locator('.instruction-caption').first()).toBeVisible();
});

test('large English-digit counters fit 360px and cards never overlap in either theme', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const mode of ['الوضع الفاتح', 'الوضع الليلي']) {
    await page.goto('/azkar/after-prayer-fajr-maghrib');
    await page.locator('.theme-control summary').click();
    await page.getByRole('button', { name: mode, exact: true }).click();
    const card = page.locator('.dhikr-card').first();
    const button = card.locator('.count-button');
    const cardBox = (await card.boundingBox())!;
    const buttonBox = (await button.boundingBox())!;
    const nextBox = (await page.locator('.dhikr-card').nth(1).boundingBox())!;
    expect(buttonBox.height).toBeGreaterThanOrEqual(90);
    expect(buttonBox.width).toBeGreaterThanOrEqual(cardBox.width - 50);
    expect(nextBox.y - (cardBox.y + cardBox.height)).toBeGreaterThanOrEqual(20);
    const digits = await page.locator('.count-button').allTextContents();
    expect(digits.every(text => !/[٠-٩]/.test(text))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('night mode persists, synchronizes and has no detected WCAG A/AA violations', async ({ page, context }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.theme-control summary').click();
  await page.getByRole('button', { name: 'الوضع الليلي', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const path of ['/', '/library', '/azkar/after-prayer-fajr-maghrib']) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(report.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) })), path).toEqual([]);
  }
  const other = await context.newPage();
  await other.goto('/saved');
  await page.locator('.theme-control summary').click();
  await page.getByRole('button', { name: 'الوضع الفاتح', exact: true }).click();
  await expect(other.locator('html')).toHaveAttribute('data-theme', 'light');
  await other.close();
});

test('system appearance follows OS changes and legacy bookmarks survive corrections', async ({ page }) => {
  const old = originals.find(e => e.sourceRow === 127)!;
  await page.addInitScript(({ id }) => {
    const d = new Date();
    const day = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    if (!localStorage.getItem('sakina:reading:v1')) localStorage.setItem('sakina:reading:v1', JSON.stringify({ version: 1, day, counts: { [id]: 22 }, saved: [id], fontSize: 30, diacritics: true }));
  }, { id: old.id });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/saved');
  await expect(page.locator('.dhikr-card')).toHaveCount(2);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.animated-count b').first()).toHaveText('0');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
