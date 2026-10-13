import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { randomUUID } from 'node:crypto';
import { database } from '../../src/lib/analytics-db';
import { privateHash } from '../../src/lib/dashboard-auth';
test.describe('configured analytics dashboard', () => {
  test.skip(
    !process.env.SAKINA_DATABASE_URL || !process.env.DASHBOARD_PASSWORD,
    'Requires a disposable analytics PostgreSQL database and test admin credentials',
  );
  test('login, export, mobile layout, accessibility and logout enforce access control', async ({
    page,
    request,
  }) => {
    test.setTimeout(60000);
    await page.setExtraHTTPHeaders({ 'x-vercel-forwarded-for': 'dashboard-test-' + randomUUID() });
    expect((await request.get('/api/dashboard/export')).status()).toBe(401);
    expect(
      (
        await request.post('/api/dashboard/login', {
          form: { password: process.env.DASHBOARD_PASSWORD! },
        })
      ).status(),
    ).toBe(403);
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard\/login$/);
    await page.getByLabel('كلمة مرور الإدارة').fill('wrong-password');
    await page.getByRole('button', { name: 'دخول الداشبورد' }).click();
    await expect(page.locator('p[role="alert"]')).toHaveText('كلمة المرور غير صحيحة.');
    await page.getByLabel('كلمة مرور الإدارة').fill(process.env.DASHBOARD_PASSWORD!);
    await page.getByRole('button', { name: 'دخول الداشبورد' }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole('heading', { name: 'صورة واضحة عن أداء موقعك' })).toBeVisible();
    await expect(page.locator('.metric-card')).toHaveCount(8);
    const cookie = (await page.context().cookies()).find(
      (cookie) => cookie.name === 'sakina_dashboard_session',
    )!;
    expect(cookie.httpOnly).toBe(true);
    expect(cookie.sameSite).toBe('Strict');
    const report = await page.context().request.get('/api/dashboard/export');
    expect(report.status()).toBe(200);
    expect(report.headers()['content-type']).toContain('text/csv');
    expect(await report.text()).toContain('Africa/Cairo');
    for (const mode of ['الوضع الفاتح', 'الوضع الليلي']) {
      await page.locator('.theme-control summary').click();
      await page.getByRole('button', { name: mode, exact: true }).click();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            reason: node.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
    await page.setViewportSize({ width: 360, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.getByRole('button', { name: 'تسجيل الخروج' }).click();
    await expect(page).toHaveURL(/\/dashboard\/login$/);
    expect((await page.context().request.get('/api/dashboard/export')).status()).toBe(401);
  });
  test('consent gates telemetry; real counter events are stored once without text, searches or bookmarks', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setExtraHTTPHeaders({
      'x-vercel-forwarded-for': 'analytics-test-' + randomUUID(),
      'x-vercel-ip-country': 'EG',
    });
    const posts: string[] = [];
    page.on('request', (request) => {
      if (request.url().endsWith('/api/analytics/events')) posts.push(request.postData() ?? '');
    });
    await page.goto('/');
    await expect(page.locator('.analytics-choice')).toBeVisible();
    expect(posts).toHaveLength(0);
    await page.getByRole('button', { name: 'السماح بالإحصائيات' }).click();
    await expect.poll(() => posts.length).toBeGreaterThan(0);
    await page.goto('/azkar/after-prayer-fajr-maghrib');
    const card = page.locator('.dhikr-card').first();
    for (let i = 0; i < 3; i++)
      await card.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
    await card.getByRole('button', { name: 'حفظ الذكر', exact: true }).click();
    const visit = await page.evaluate(() =>
      JSON.parse(sessionStorage.getItem('sakina:analytics:visit')!),
    );
    const id = privateHash('session:' + visit.id);
    await page.goto('/sources');
    const sql = database();
    try {
      await expect
        .poll(async () =>
          Number(
            (
              await sql`SELECT coalesce(sum(quantity),0) AS n FROM sakina_analytics.events WHERE session_id=${id} AND name='counter'`
            )[0].n,
          ),
        )
        .toBe(3);
      const completions =
        await sql`SELECT count(*)::int AS n FROM sakina_analytics.events WHERE session_id=${id} AND name='completion'`;
      expect(completions[0].n).toBe(1);
      const session = await sql`SELECT country FROM sakina_analytics.sessions WHERE id=${id}`;
      expect(session[0].country).toBe('EG');
      expect(
        posts.every(
          (body) =>
            !body.includes('أَسْتَغْفِرُ') && !body.includes('saved') && !body.includes('search'),
        ),
      ).toBe(true);
      await page.locator('.analytics-choice summary').click();
      await page.getByRole('button', { name: 'عدم المشاركة' }).click();
      const count = posts.length;
      await page.goto('/azkar/after-prayer-fajr-maghrib');
      await card.getByRole('button', { name: 'تراجع عن ضغطة' }).click();
      await card.getByRole('button', { name: 'تسجيل قراءة الذكر', exact: true }).click();
      await page.goto('/sources');
      expect(posts).toHaveLength(count);
    } finally {
      await sql`DELETE FROM sakina_analytics.sessions WHERE id=${id}`;
    }
  });
});
