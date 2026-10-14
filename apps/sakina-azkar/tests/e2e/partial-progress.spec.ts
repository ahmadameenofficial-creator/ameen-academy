import { test, expect, type Page } from '@playwright/test';
import catalog from '../../src/data/azkar.json';
const hundred = catalog.entries.find(e => e.categoryId === 'morning' && e.repeat === 100)!;
const fixed = catalog.entries.filter(e => e.categoryId === 'morning' && e.repeat !== null && e.repeat > 0).length;
async function seed(page: Page, count: number, yesterday = false) {
  await page.addInitScript(({ id, count, yesterday }) => {
    if (localStorage.getItem('sakina:reading:v1')) return;
    const date = new Date();
    if (yesterday) date.setDate(date.getDate() - 1);
    const day = [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
    localStorage.setItem('sakina:reading:v1', JSON.stringify({ version:1, day, counts:{[id]:count}, saved:[], fontSize:26, diacritics:true, theme:'light' }));
  }, { id: hundred.id, count, yesterday });
}
async function percent(page: Page) {
  return Number(await page.getByRole('progressbar', { name: 'تقدم أذكار الصباح' }).getAttribute('aria-valuenow'));
}
test('partial hundred is saved and shown on home/history, undo and reset decrease it, and another tab sees it', async ({ page, context }) => {
  await seed(page, 43);
  await page.goto('/');
  await expect.poll(() => percent(page)).toBe(Math.round(43 / fixed * 100) / 100);
  await page.goto('/progress');
  await expect(page.locator('.history-list li')).toContainText('أذكار الصباح');
  await expect(page.locator('.personal-metrics strong').first()).toHaveText('0');
  await page.reload();
  await expect.poll(() => percent(page)).toBe(Math.round(43 / fixed * 100) / 100);
  const second = await context.newPage();
  await second.goto('/');
  await page.goto('/azkar/morning');
  const card = page.locator('#' + hundred.id);
  await card.getByRole('button', { name: 'تراجع عن ضغطة' }).click();
  await expect.poll(() => percent(second)).toBe(Math.round(42 / fixed * 100) / 100);
  await page.getByRole('button', { name: 'بدء هذا القسم من جديد' }).click();
  await page.getByRole('button', { name: 'نعم، تصفير' }).click();
  await expect.poll(() => percent(second)).toBe(0);
  await page.goto('/progress');
  await expect.poll(() => percent(page)).toBe(0);
  await page.setViewportSize({ width:360, height:800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('opening on a new local day archives the previous partial ward without carrying counters into today', async ({ page }) => {
  await seed(page, 43, true);
  await page.goto('/progress');
  await expect.poll(() => percent(page)).toBe(0);
  await expect(page.locator('.history-list li')).toContainText('أذكار الصباح');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('sakina:history:v1')!).records);
  expect(saved[0].progress).toBeGreaterThan(0);
  await page.goto('/azkar/morning');
  await expect(page.locator('#'+hundred.id+' .animated-count b')).toHaveText('0');
});
test('Google account restores a separate namespace; account changes never import or overwrite guest progress', async ({ page }) => {
  await seed(page, 43);
  let userId: string | null = null;
  const account = 'a'.repeat(64);
  const date = new Date();
  const day = [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  let records = [{ day, categoryId:'morning', progress: .8 / fixed, counts:{[hundred.id]:80}, updatedAt:Date.now() }];
  let revision = 1;
  await page.route('**/api/account/session', route => route.fulfill({ json:{configured:true,userId} }));
  await page.route('**/api/account/logout', route => { userId = null; return route.fulfill({ json:{ok:true} }); });
  await page.route('**/api/account/progress', async route => {
    if (route.request().method() === 'PUT') { const body=route.request().postDataJSON(); records=body.records; revision++; return route.fulfill({ json:{revision} }); }
    return route.fulfill({ json:{records,revision} });
  });
  await page.goto('/progress');
  await expect.poll(() => percent(page)).toBe(Math.round(43 / fixed * 100) / 100);
  userId = account;
  await page.reload();
  await expect(page.getByRole('button', {name:'تسجيل الخروج'})).toBeVisible();
  await expect.poll(() => percent(page)).toBe(Math.round(80 / fixed * 100) / 100);
  await page.goto('/azkar/morning');
  await expect(page.locator('#'+hundred.id+' .animated-count b')).toHaveText('80');
  await page.locator('#'+hundred.id).getByRole('button', {name:'تراجع عن ضغطة'}).click();
  await page.goto('/progress');
  await page.getByRole('button', { name:'مزامنة الآن' }).click();
  await expect.poll(() => records[0].counts[hundred.id]).toBe(79);
  await page.getByRole('button', {name:'تسجيل الخروج'}).click();
  await expect.poll(() => percent(page)).toBe(Math.round(43 / fixed * 100) / 100);
  await page.goto('/azkar/morning');
  await expect(page.locator('#'+hundred.id+' .animated-count b')).toHaveText('43');
});

test('separate devices restore the same account, preserve a later undo, and keep account progress when sync is unavailable', async ({ page, browser }) => {
  const userId = 'b'.repeat(64);
  type RecordRow = { day: string; categoryId: string; counts?: Record<string, number>; progress?: number; updatedAt?: number };
  let records: RecordRow[] = [], revision = 0;
  let offline = false;
  let requests = 0;
  async function routes(target: Page) {
    await target.route('**/api/account/session', route => offline ? route.abort() : route.fulfill({ json: { configured: true, userId } }));
    await target.route('**/api/account/progress', async route => {
      requests++;
      if (offline) return route.abort();
      if (route.request().method() === 'PUT') {
        const data = route.request().postDataJSON();
        if (data.revision !== revision) return route.fulfill({ status:409, json:{error:'Conflict'} });
        records = data.records; revision++;
        return route.fulfill({ json:{revision} });
      }
      return route.fulfill({ json:{records,revision} });
    });
  }
  await routes(page);
  await page.goto('/azkar/morning');
  const card = page.locator('#' + hundred.id);
  await card.getByRole('button', { name:'تسجيل قراءة الذكر', exact:true }).click();
  await card.getByRole('button', { name:'تسجيل قراءة الذكر', exact:true }).click();
  await card.getByRole('button', { name:'تسجيل قراءة الذكر', exact:true }).click();
  await page.goto('/progress');
  await page.getByRole('button', { name:'مزامنة الآن' }).click();
  await expect.poll(() => records.find(r => r.categoryId === 'morning')?.counts?.[hundred.id]).toBe(3);
  const device = await browser.newContext();
  try {
    const second = await device.newPage();
    await routes(second);
    await second.goto('/azkar/morning');
    const secondCard = second.locator('#' + hundred.id);
    await expect(secondCard.locator('.animated-count b')).toHaveText('3');
    await secondCard.getByRole('button', {name:'تراجع عن ضغطة'}).click();
    await second.goto('/progress');
    await second.getByRole('button', {name:'مزامنة الآن'}).click();
    await expect.poll(() => records.find(r => r.categoryId === 'morning')?.counts?.[hundred.id]).toBe(2);
    await page.getByRole('button', {name:'مزامنة الآن'}).click();
    await expect.poll(() => percent(page)).toBe(Math.round(2 / fixed * 100) / 100);
    const before = requests;
    await page.waitForTimeout(1200);
    expect(requests - before).toBeLessThan(8);
    offline = true;
    await page.reload();
    await expect.poll(() => percent(page)).toBe(Math.round(2 / fixed * 100) / 100);
    await expect(page.getByRole('button', {name:'تسجيل الخروج'})).toBeVisible();
  } finally { await device.close(); }
});
