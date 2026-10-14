import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('two quiet sponsorship banners use WhatsApp, preserve layout, and replace old advertising claims', async ({ page }) => {
  await page.route('**/api/account/session', route => route.fulfill({ json: { configured: true, userId: null } }));
  await page.goto('/');
  await expect(page.locator('.sponsor-banner')).toHaveCount(2);
  await expect(page.locator('.hero-tagline')).toHaveText('أول تطبيق أذكار بيتابع معاك ذكرك وبيفكرك بيه');
  await expect(page.locator('.site-dedication')).toHaveCount(1);
  await expect(page.locator('.dedication-banner')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('بدون إعلانات');
  await expect(page.locator('body')).not.toContainText('أمين علي');
  await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /بدون إعلانات/);
  for (const banner of await page.locator('.sponsor-banner').all()) {
    await expect(banner.getByRole('link')).toHaveAttribute('href', /^https:\/\/wa.me\/201090912747\?/);
    expect(await banner.evaluate(node => getComputedStyle(node).position)).toBe('static');
  }
  for (const width of [320, 390, 850, 1024, 1440]) {
    await page.setViewportSize({ width, height:900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'width '+width).toBe(true);
    await expect(page.locator('.header-account')).toBeVisible();
  }
  await page.setViewportSize({ width:390, height:844 });
  await page.locator('.theme-control summary').click();
  await page.getByRole('button', {name:'الوضع الليلي',exact:true}).click();
  const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(v => ({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  await page.goto('/azkar/morning');
  await expect(page.locator('.sponsor-banner')).toHaveCount(0);
  await expect(page.locator('.dhikr-card').first().getByRole('button',{name:'تسجيل قراءة الذكر',exact:true})).toBeEnabled();
});
test('header account link opens an optional profile, saves with consent and supports removing demographics', async ({page}) => {
  const userId='c'.repeat(64);
  const empty={email:'profile@example.test',age:null as number|null,country:null as string|null,gender:null as string|null,consent:false};
  let profile={...empty};
  let body: Record<string,unknown>={};
  await page.route('**/api/account/session', route=>route.fulfill({json:{configured:true,userId}}));
  await page.route('**/api/account/progress', route=>route.fulfill({json:route.request().method()==='PUT'?{revision:1}:{revision:0,records:[]}}));
  await page.route('**/api/account/profile', async route=>{
    if(route.request().method()==='PUT') {
      body=route.request().postDataJSON();
      profile=body.consent ? {email:empty.email,age:body.age as number,country:body.country as string,gender:body.gender as string,consent:true}:{...empty};
    }
    return route.fulfill({json:profile});
  });
  await page.goto('/');
  await page.getByRole('link',{name:'حسابي وبياناتي'}).click();
  await expect(page.locator('.profile-email')).toContainText('profile@example.test');
  await expect(page.getByLabel('العمر (اختياري)')).toHaveValue('');
  await page.getByLabel('العمر (اختياري)').fill('27');
  await page.getByLabel('بلد الإقامة (اختياري)').selectOption('EG');
  await page.getByLabel('النوع (اختياري)').selectOption('female');
  await page.getByRole('checkbox',{name:/أوافق على حفظ/}).check();
  await page.getByRole('button',{name:'حفظ البيانات',exact:true}).click();
  await expect(page.getByRole('status').filter({hasText:'تم حفظ بياناتك الاختيارية.'})).toBeVisible();
  expect(body).toMatchObject({accountId:userId,age:27,country:'EG',gender:'female',consent:true});
  expect(body).not.toHaveProperty('email');
  await page.reload();
  await expect(page.getByLabel('العمر (اختياري)')).toHaveValue('27');
  await page.getByRole('button',{name:'حذف البيانات الاختيارية'}).click();
  await expect(page.getByLabel('العمر (اختياري)')).toHaveValue('');
  await expect(page.getByRole('checkbox',{name:/أوافق على حفظ/})).not.toBeChecked();
  expect(body.consent).toBe(false);
  await page.setViewportSize({width:320,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
