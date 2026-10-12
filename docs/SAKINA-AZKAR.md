# سكينة — مشروع الأذكار المستقل

المشروع داخل `apps/sakina-azkar` وله dependencies وlockfile وTypeScript وNext.js خاص به. لا يغيّر صفحات الأكاديمية أو خدماتها أو إعدادات نشرها. يستثنيه TypeScript الرئيسي من فحص تطبيق الأكاديمية؛ يُفحص بشكل مستقل بأوامره أدناه.

## التشغيل والتحقق

من جذر الريبو:

```bash
cd apps/sakina-azkar
npm ci
npm run dev -- --port 3001
```

```bash
npm run test
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

للإنتاج: `npm run build` ثم `npm run start -- --port 3001`. لا يحتاج إلى أسرار أو قاعدة بيانات.

## نشره على Vercel من نفس الريبو

أنشئ مشروع Vercel منفصلًا مربوطًا بهذا الريبو، واضبط:

- **Root Directory:** `apps/sakina-azkar`
- **Framework Preset:** Next.js
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Node.js:** 24.x، أو نسخة LTS مدعومة من Next.js 16
- **Output Directory:** الإعداد الافتراضي لـ Next.js

للمعاينة قبل الدمج استخدم فرع `feat/sakina-azkar`. بعد الدمج يمكن تعيين الفرع الرئيسي للإنتاج. لا تغيّر Root Directory لمشروع الأكاديمية الحالي، ولا إعدادات crons أو أسراره.

## حدود المحتوى

المكتبة تستورد جميع صفوف مصدر `osamayy/azkar-db` المثبت: 345 نصًا، 135 تصنيفًا. إتاحة استخدام المصدر وتفاصيل الإصدار محفوظة مع البيانات. توجد مراجع وأعداد تكرار ناقصة، ولا يوجد تحقيق شرعي مستقل أو ادعاء بمطابقة كل محتوى إسلام بوك. التفاصيل في README وصفحة `/sources` داخل التطبيق.
