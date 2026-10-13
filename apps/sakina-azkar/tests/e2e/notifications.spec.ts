import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { randomUUID } from 'node:crypto';
import { database } from '../../src/lib/analytics-db';

test('the bell opens honest notification settings, rotates sourced messages and stays usable on small screens in both themes', async ({
  page,
  request,
}) => {
  await page.goto('/azkar/morning');
  await page
    .locator('.reader-header')
    .getByRole('link', { name: 'تفعيل إشعارات الصباح والمساء' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'إشعارات الصباح والمساء', exact: true }),
  ).toBeVisible();
  const source = page.locator('.notification-hadith a');
  await expect(source).toHaveAttribute('href', 'https://sunnah.com/muslim:1006');
  await page.getByRole('button', { name: 'معاينة حديث آخر' }).click();
  await expect(source).toHaveAttribute('href', 'https://sunnah.com/bukhari:6406');
  await page.getByRole('button', { name: 'المساء', exact: true }).click();
  await expect(page.locator('.notification-preview h3')).toContainText('المساء');
  await page.getByRole('button', { name: 'تفعيل إشعارات هذا الجهاز' }).click();
  await expect(
    page.getByRole('status').filter({ hasText: 'فعّل الموافقة على التذكير أولًا.' }),
  ).toBeVisible();
  await expect(page.getByLabel('أوافق على تذكيرات الصباح والمساء')).not.toBeChecked();
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const mode of ['الوضع الفاتح', 'الوضع الليلي']) {
    await page.locator('.theme-control summary').click();
    await page.getByRole('button', { name: mode, exact: true }).click();
    const report = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      report.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  expect((await request.get('/api/notifications/dispatch')).status()).toBe(401);
  expect((await request.post('/api/notifications/progress', { data: {} })).status()).toBe(403);
  expect((await request.get('/api/notifications/config?city=invalid')).status()).toBe(400);
});

test('iPhone browser without Push APIs explains installation and notification arrival opens the sourced ward safely', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    });
    Reflect.deleteProperty(window, 'Notification');
    Reflect.deleteProperty(window, 'PushManager');
  });
  await page.goto('/notifications');
  await expect(page.getByText('على iPhone وiPad', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'تفعيل إشعارات هذا الجهاز' })).toBeDisabled();
  await page.goto('/azkar/evening?reminder=evening&hadith=hundred');
  const arrived = page.getByRole('complementary', { name: 'الحديث الوارد في التذكير' });
  await expect(arrived).toContainText('في يوم مائة مرة');
  await arrived.getByRole('button', { name: 'استكمال أول ذكر غير مكتمل' }).click();
  await expect(
    page
      .locator('.dhikr-card')
      .first()
      .getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }),
  ).toBeFocused();
  await expect(page.locator('.dhikr-card').first().locator('.animated-count b')).toHaveText('0');
});

test('opt-in enrolls a device, syncs only coarse progress, restores preferences, and revokes the subscription', async ({
  page,
  context,
}) => {
  test.skip(
    !process.env.WEB_PUSH_PRIVATE_KEY || !process.env.SAKINA_DATABASE_URL,
    'Requires disposable push configuration and PostgreSQL',
  );
  await context.grantPermissions(['notifications']);
  await page.goto('/notifications');
  const endpoint = 'https://fcm.googleapis.com/fcm/send/' + randomUUID();
  await page.evaluate((endpoint) => {
    const subscription = {
      toJSON: () => ({ endpoint, keys: { p256dh: 'B'.repeat(87), auth: 'C'.repeat(22) } }),
      unsubscribe: async () => true,
    };
    const registration = {
      pushManager: { getSubscription: async () => subscription },
      active: {
        postMessage(message: { type: string }, ports?: MessagePort[]) {
          if (
            message.type === 'PUSH_CAPABILITIES' &&
            (window as unknown as { __pushReady?: boolean }).__pushReady
          )
            ports?.[0]?.postMessage({ notificationVersion: 1 });
        },
      },
      addEventListener() {},
    };
    Object.defineProperty(navigator.serviceWorker, 'register', {
      configurable: true,
      value: async () => registration,
    });
    Object.defineProperty(navigator.serviceWorker, 'ready', {
      configurable: true,
      value: Promise.resolve(registration),
    });
    Object.defineProperty(navigator.serviceWorker, 'getRegistration', {
      configurable: true,
      value: async () => registration,
    });
  }, endpoint);
  await page.getByLabel('المدينة', { exact: true }).selectOption('alexandria');
  await page.getByLabel('أوافق على تذكيرات الصباح والمساء').check();
  await page.getByRole('button', { name: 'تفعيل إشعارات هذا الجهاز' }).click();
  await expect(
    page.getByRole('status').filter({ hasText: 'انتظر اكتمال تجهيز سكينة' }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sakina:notifications:v1'))).toBeNull();
  await page.evaluate(() => {
    (window as unknown as { __pushReady: boolean }).__pushReady = true;
  });
  await page.getByRole('button', { name: 'تفعيل إشعارات هذا الجهاز' }).click();
  await expect(page.getByRole('button', { name: 'إيقاف الإشعارات', exact: true })).toBeVisible();
  const id = await page.evaluate(
    () => JSON.parse(localStorage.getItem('sakina:notifications:v1')!).id as string,
  );
  const sql = database();
  try {
    let rows =
      await sql`SELECT sealed,preferences FROM sakina_notifications.devices WHERE id=${id}`;
    expect(rows).toHaveLength(1);
    expect(rows[0].sealed).not.toContain(endpoint);
    expect(rows[0].preferences.city).toBe('alexandria');
    await page.goto('/azkar/morning');
    await page
      .locator('.dhikr-card')
      .first()
      .getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true })
      .click();
    await expect
      .poll(async () => {
        const result = await sql`SELECT progress FROM sakina_notifications.devices WHERE id=${id}`;
        return result[0]?.progress.morning;
      })
      .toBe('started');
    await page.goto('/notifications');
    await expect(page.getByLabel('المدينة', { exact: true })).toHaveValue('alexandria');
    await page.evaluate(() => {
      Object.defineProperty(navigator.serviceWorker, 'getRegistration', {
        configurable: true,
        value: async () => ({
          pushManager: { getSubscription: async () => ({ unsubscribe: async () => true }) },
        }),
      });
    });
    await page.getByRole('button', { name: 'إيقاف الإشعارات', exact: true }).click();
    await expect
      .poll(async () => {
        rows = await sql`SELECT id FROM sakina_notifications.devices WHERE id=${id}`;
        return rows.length;
      })
      .toBe(0);
    expect(await page.evaluate(() => localStorage.getItem('sakina:notifications:v1'))).toBeNull();
  } finally {
    await sql`DELETE FROM sakina_notifications.devices WHERE id=${id}`;
  }
});
