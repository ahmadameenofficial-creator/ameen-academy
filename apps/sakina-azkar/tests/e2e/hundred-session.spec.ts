import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../../src/data/azkar.json';

const morningEntries = catalog.entries.filter((entry) => entry.categoryId === 'morning');
const hundreds = morningEntries.filter((entry) => entry.repeat === 100);
const firstId = hundreds[0].id;
const storageKey = 'sakina:reading:v1';

async function seed(page: Page, counts: Record<string, number>, theme = 'light') {
  await page.addInitScript(
    ({ counts, theme }) => {
      if (localStorage.getItem('sakina:reading:v1')) return;
      const date = new Date();
      const day = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-');
      localStorage.setItem(
        'sakina:reading:v1',
        JSON.stringify({
          version: 1,
          day,
          counts,
          saved: [],
          fontSize: 26,
          diacritics: true,
          theme,
        }),
      );
    },
    { counts, theme },
  );
}

function session(page: Page) {
  return page.getByRole('dialog', { name: 'جلسة المئة' });
}
async function expectCount(page: Page, count: number) {
  await expect(session(page).getByRole('progressbar', { name: 'تقدم المئة' })).toHaveAttribute(
    'aria-valuenow',
    String(count),
  );
}

test('the session shares card counts, saves every tap, resumes after reload and caps rapid taps at 100', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await seed(page, { [firstId]: 43 });
  await page.goto('/azkar/morning');
  await expect(page.locator('.hundred-card-launch')).toHaveCount(3);
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await expectCount(page, 43);
  const tap = session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true });
  const box = await tap.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(280);
  expect(box!.height).toBeGreaterThanOrEqual(120);
  for (let i = 0; i < 7; i++) await tap.click();
  await expectCount(page, 50);
  await expect(session(page).getByRole('status')).toContainText('أتممت 50');
  await session(page).getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expectCount(page, 49);
  await session(page).getByRole('button', { name: 'إغلاق جلسة المئة' }).click();
  await expect(page.getByRole('button', { name: 'استكمال المئة', exact: true })).toBeFocused();
  const card = page.locator('#' + firstId);
  await expect(card.locator('.animated-count b')).toHaveText('49');
  await card.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await expectCount(page, 50);
  await tap.evaluate((button: HTMLButtonElement) => {
    for (let i = 0; i < 120; i++) button.click();
  });
  await expectCount(page, 100);
  await expect(session(page).getByRole('button', { name: 'اكتملت المئة' })).toBeDisabled();
  await expect(session(page).getByRole('heading', { name: 'أتممت هذا الذكر' })).toBeFocused();
  expect(
    await page.evaluate(
      ({ storageKey, id }) => JSON.parse(localStorage.getItem(storageKey)!).counts[id],
      { storageKey, id: firstId },
    ),
  ).toBe(100);
  await session(page).getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expectCount(page, 99);
  await session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
  await session(page).getByRole('button', { name: 'جلسة المئة التالية' }).click();
  await expectCount(page, 0);
  await expect(session(page).locator('.hundred-text')).toHaveText(hundreds[1].text);
  await page.keyboard.press('Escape');
  await expect(session(page)).toHaveCount(0);
  await page.goto('/azkar/evening');
  await expect(page.locator('.hundred-card-launch')).toHaveCount(2);
  await page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true }).click();
  await expectCount(page, 0);
  expect(errors).toEqual([]);
});

test('held keyboard keys do not auto-count, focus stays in the dialog and Escape restores the launcher', async ({
  page,
}) => {
  await page.goto('/azkar/morning');
  const launcher = page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true });
  await launcher.click();
  const tap = session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true });
  await tap.focus();
  await page.keyboard.down('Enter');
  await page.keyboard.down('Enter');
  await page.keyboard.down('Enter');
  await page.keyboard.up('Enter');
  await expectCount(page, 1);
  await page.keyboard.press('Space');
  await expectCount(page, 2);
  await session(page).locator('.hundred-text').click();
  await expectCount(page, 2);
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.closest('dialog') !== null)).toBe(
      true,
    );
  }
  await page.keyboard.press('Escape');
  await expect(session(page)).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'استكمال المئة', exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('shared counters update between tabs and completion records the morning ward only once', async ({
  page,
  context,
}) => {
  await seed(
    page,
    Object.fromEntries(
      morningEntries.map((entry) => [entry.id, entry.id === firstId ? 99 : (entry.repeat ?? 0)]),
    ),
  );
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  const other = await context.newPage();
  await other.goto('/azkar/morning');
  await other.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await session(page).getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expectCount(other, 98);
  await session(other).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
  await expectCount(page, 99);
  await session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
  await expectCount(other, 100);
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem('sakina:history:v1') ?? '{}').records?.length,
      ),
    )
    .toBe(1);
  await session(page).getByRole('button', { name: 'متابعة باقي الورد' }).click();
  await expect(session(page)).toHaveCount(0);
  await page.reload();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('sakina:history:v1')!).records.length,
    ),
  ).toBe(1);
  await page.goto('/azkar/after-prayer-fajr-maghrib');
  await expect(page.locator('.hundred-intro, .hundred-card-launch')).toHaveCount(0);
  await other.close();
});

test('optional haptics and screen wake lock are preference-based, never count, and release on exit', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const events = { vibrations: [] as unknown[], locks: 0, releases: 0 };
    Object.defineProperty(window, '__sessionHardware', { value: events });
    Object.defineProperty(navigator, 'vibrate', {
      configurable: true,
      value: (pattern: unknown) => {
        events.vibrations.push(pattern);
        return true;
      },
    });
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: {
        request: async () => {
          events.locks++;
          const lock = new EventTarget();
          return Object.assign(lock, {
            released: false,
            release: async () => {
              events.releases++;
              lock.dispatchEvent(new Event('release'));
            },
          });
        },
      },
    });
  });
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true }).click();
  await session(page).getByRole('button', { name: 'إعدادات جلسة المئة' }).click();
  await expect(session(page).getByRole('button', { name: 'إعدادات جلسة المئة' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await session(page).getByLabel('اليسرى', { exact: true }).check();
  await session(page).getByLabel('اهتزاز خفيف كل 10 تكرارات').check();
  await session(page).getByLabel('إبقاء الشاشة مفتوحة').check();
  await expect(session(page)).toHaveAttribute('data-hand', 'left');
  await expect(session(page).getByText('مفعّل أثناء جلسة العدّ')).toBeVisible();
  await expectCount(page, 0);
  await session(page).getByRole('button', { name: 'تكبير خط الجلسة' }).click();
  await expect(session(page).locator('.hundred-text')).toHaveCSS('font-size', '28px');
  const tap = session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true });
  for (let i = 0; i < 10; i++) await tap.click();
  const hardware = () =>
    page.evaluate(
      () =>
        (
          window as unknown as {
            __sessionHardware: { vibrations: unknown[]; locks: number; releases: number };
          }
        ).__sessionHardware,
    );
  expect((await hardware()).vibrations).toEqual([20]);
  expect((await hardware()).locks).toBe(1);
  await session(page).getByRole('button', { name: 'توقف الآن، وكمّل لاحقًا' }).click();
  expect((await hardware()).releases).toBe(1);
  await page.reload();
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await expect(session(page)).toHaveAttribute('data-hand', 'left');
  await expectCount(page, 10);
  await expect(session(page).locator('.hundred-text')).toHaveCSS('font-size', '28px');
  await expect.poll(async () => (await hardware()).locks).toBe(1);
});

test('light and dark sessions support WCAG checks, 320px screens, large text and landscape', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['light', 'dark']) {
    await seed(page, { [firstId]: 43 }, theme);
    await page.goto('/azkar/morning');
    await page.evaluate(
      ({ theme, firstId }) => {
        const state = JSON.parse(localStorage.getItem('sakina:reading:v1')!);
        state.theme = theme;
        state.fontSize = 26;
        state.counts[firstId] = 43;
        localStorage.setItem('sakina:reading:v1', JSON.stringify(state));
      },
      { theme, firstId },
    );
    await page.reload();
    await page.setViewportSize({ width: 320, height: 740 });
    await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
    await page.evaluate(() => document.fonts.ready);
    await session(page).locator('summary').click();
    for (let i = 0; i < 5; i++)
      await session(page).getByRole('button', { name: 'تكبير خط الجلسة' }).click();
    await expect(session(page).locator('.hundred-text')).toHaveCSS('font-size', '36px');
    const report = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      report.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, reason: n.failureSummary })),
      })),
      theme,
    ).toEqual([]);
    expect(await session(page).evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(
      true,
    );
    await expect(
      session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }),
    ).toBeInViewport();
    await page.setViewportSize({ width: 740, height: 360 });
    await session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
    await expectCount(page, 44);
    expect(await session(page).evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth)).toBe(
      true,
    );
    await session(page).getByRole('button', { name: 'إغلاق جلسة المئة' }).click();
  }
});

test('blocked storage keeps counting usable and clearly warns that reload cannot preserve the count', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage blocked', 'QuotaExceededError');
    };
  });
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true }).click();
  await session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
  await expectCount(page, 1);
  await expect(
    session(page).getByText('الحفظ غير متاح. احتفظ بهذه الصفحة مفتوحة حتى لا تفقد العدد.'),
  ).toBeVisible();
  await session(page).getByRole('button', { name: 'إغلاق جلسة المئة' }).click();
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await expectCount(page, 1);
});

test('an open session explains the existing daily rollover and starts the new day safely', async ({
  page,
}) => {
  await page.clock.install({ time: new Date(2026, 9, 13, 23, 59, 50) });
  await seed(page, { [firstId]: 43 });
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'استكمال المئة', exact: true }).click();
  await expectCount(page, 43);
  await page.clock.fastForward(70000);
  await expectCount(page, 0);
  await expect(
    session(page).getByText('بدأ يوم جديد حسب توقيت جهازك؛ بدأت عدّادات اليوم من الصفر.'),
  ).toBeVisible();
  await session(page).getByRole('button', { name: 'تسجيل تكرار واحد', exact: true }).click();
  await expectCount(page, 1);
});

test('a delayed wake lock is released after closing, and an active lock is released on completion', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const hardware = { releases: 0, resolve: null as null | (() => void) };
    Object.defineProperty(window, '__delayedWake', { value: hardware });
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: {
        request: () =>
          new Promise((resolve) => {
            const lock = new EventTarget();
            const result = Object.assign(lock, {
              release: async () => {
                hardware.releases++;
                lock.dispatchEvent(new Event('release'));
              },
            });
            hardware.resolve = () => resolve(result);
          }),
      },
    });
    localStorage.setItem(
      'sakina:session-preferences:v1',
      JSON.stringify({ version: 1, keepAwake: true }),
    );
  });
  await page.goto('/azkar/morning');
  await page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true }).click();
  await page.waitForFunction(() =>
    Boolean((window as unknown as { __delayedWake: { resolve: unknown } }).__delayedWake.resolve),
  );
  await session(page).getByRole('button', { name: 'إغلاق جلسة المئة' }).click();
  await page.evaluate(() =>
    (window as unknown as { __delayedWake: { resolve: () => void } }).__delayedWake.resolve(),
  );
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { __delayedWake: { releases: number } }).__delayedWake.releases,
      ),
    )
    .toBe(1);
  await page.getByRole('button', { name: 'ابدأ جلسة المئة', exact: true }).click();
  await page.evaluate(() =>
    (window as unknown as { __delayedWake: { resolve: () => void } }).__delayedWake.resolve(),
  );
  await session(page).locator('summary').click();
  await expect(session(page).getByText('مفعّل أثناء جلسة العدّ')).toBeVisible();
  await session(page)
    .getByRole('button', { name: 'تسجيل تكرار واحد', exact: true })
    .evaluate((button: HTMLButtonElement) => {
      for (let i = 0; i < 100; i++) button.click();
    });
  await expectCount(page, 100);
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { __delayedWake: { releases: number } }).__delayedWake.releases,
      ),
    )
    .toBe(2);
});
