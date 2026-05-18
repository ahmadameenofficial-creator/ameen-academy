# 🎓 Ameen Academy · سياق المشروع لـ Claude Code

## نظرة عامة

**Ameen Academy** منصة تعليمية احترافية بالعربية للسوق المصري. الكورسات مدفوعة بسعر ~499 جنيه عبر Paymob.

- **الموقع:** مصر
- **اللغة:** عربي (RTL)
- **المالك:** عمرو أمين
- **الجمهور:** الطلاب والمتعلمين المصريين

---

## 🛠 الـ Stack

| الطبقة | التقنية |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + CSS Variables |
| UI Components | Radix UI primitives + custom |
| Icons | **Tabler Icons** (outline فقط) |
| Font | **IBM Plex Sans Arabic** (كل الأوزان 100-700) |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 6 |
| Auth | NextAuth.js v5 (Auth.js) |
| Video | Bunny Stream (signed URLs + watermark) |
| Payment | Paymob (مصر — فيزا/فودافون كاش/فوري) |
| Email | Resend |
| Hosting | Vercel |

---

## 🎨 الـ Design System

### الألوان (مهم جداً)

اللون الأساسي للبراند: **#A002FF** (بنفسجي حيوي)

```css
--brand-50:  #F5E6FF
--brand-100: #EAD0FF
--brand-200: #DBB8FF
--brand-300: #C690FF
--brand-400: #B454FF
--brand-500: #A002FF  ← PRIMARY
--brand-600: #8501DC
--brand-700: #6D01B0
--brand-800: #530085
--brand-900: #3F0066
```

**تدرج البراند الأساسي:** `linear-gradient(135deg, #A002FF, #6D01B0)` — يستخدم في الـ CTAs المهمة فقط، مش في كل حتة.

### الخط

`IBM Plex Sans Arabic` — يتم تحميله من Google Fonts عبر `next/font`. متاح بكل الأوزان.

### الأيقونات

- **مكتبة واحدة فقط:** `@tabler/icons-react`
- **النمط:** outline فقط (مفيش filled)
- **اللون:** بنفسجي موحّد (`#A002FF` أو `text-brand-500`)
- **ممنوع نهائياً:** emojis (🎉🚀✨) أو أيقونات من مكتبات تانية

### الزوايا والمسافات

- Radius: 10-16px للكروت، 12px للأزرار، 50% للأفاتار
- Spacing: نظام 4/8 (gap-2, gap-3, gap-4, gap-6)

### المحتوى والـ Copy

- **لغة الموقع:** عامية مصرية (مش عربي فصحى متكلّف)
- **أسلوب CTA:** مباشر، واضح، بدون لف
- **مثال:** "ادفع 499 وافتح الكورس" بدلاً من "اشترك في الدورة التدريبية"

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── (auth)/         # تسجيل/دخول/استعادة
│   ├── (marketing)/    # الصفحات العامة
│   ├── dashboard/      # لوحة تحكم الطالب
│   ├── admin/          # لوحة تحكم الأدمن
│   ├── api/            # API Routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/             # المكونات الأساسية (Button, Input, Card)
│   ├── layout/         # Navbar, Footer
│   ├── shared/         # Logo
│   ├── landing/        # أقسام Landing
│   ├── dashboard/      # مكونات Dashboard
│   └── admin/          # مكونات Admin
└── lib/
    ├── prisma.ts
    ├── utils.ts
    └── constants.ts

prisma/
└── schema.prisma       # 15 جدول
```

---

## 📋 المراحل المنجزة والقادمة

### ✅ منجز
- [x] إعداد المشروع (Next.js 15 + Tailwind + Prisma)
- [x] Design System كامل
- [x] Schema قاعدة البيانات (15 جدول)
- [x] Landing Page بـ 6 أقسام
- [x] Navbar + Footer
- [x] مكونات UI الأساسية

### 🔄 المرحلة الحالية: Auth + Courses
- [ ] NextAuth v5 setup
- [ ] صفحات Login/Register/Forgot Password
- [ ] صفحة الكورسات
- [ ] صفحة تفاصيل الكورس (بالأسلوب الهرموزي)

### 📅 القادم
- [ ] Paymob integration
- [ ] Bunny Stream + Video Player محمي + Watermark
- [ ] Dashboard الطالب
- [ ] Dashboard الأدمن
- [ ] Community (Posts + Comments)
- [ ] Notifications
- [ ] Certificates (PDF)

---

## ⚠️ قواعد صارمة (مهم جداً)

1. **مفيش Backend منفصل** — كل API في Next.js API Routes
2. **مفيش Redux/Zustand** — استخدم React state + Server Components
3. **مفيش CSS-in-JS** — Tailwind فقط
4. **مفيش Bootstrap/MUI** — التصميم بتاعنا فقط
5. **كل النصوص بالعربية** — مفيش "Login" لازم "تسجيل الدخول"
6. **اتجاه RTL افتراضي** — مفيش `dir="ltr"` إلا للأكواد
7. **Mobile-first** — كل صفحة لازم تشتغل على الموبايل قبل الديسكتوب
8. **حماية الفيديو** — Bunny signed URLs + watermark ديناميكي (مفيش وعود كاذبة زي "منع تسجيل الشاشة")
9. **الأمان أهم من أي feature** — لا تتساهل في validation أو auth

---

## 💰 الجوانب المالية

- **سعر الكورس الأول:** 499 جنيه (السعر العادي 1499)
- **عملة قاعدة البيانات:** بالقرش (49900 = 499 جنيه)
- **بوابة الدفع:** Paymob فقط
- **رسوم Paymob:** ~3.5% من المبلغ
- **هامش الربح المستهدف:** 95%+

---

## 🔗 الروابط المهمة

- **GitHub:** (يضاف لاحقاً)
- **الإنتاج:** ameen.academy
- **Bunny Stream:** (الحساب يُجهَّز)
- **Paymob:** (يحتاج سجل تجاري)

---

## 🤖 ملاحظات لـ Claude Code

- اقرأ هذا الملف **قبل** أي تعديل
- ابدأ بـ `npm install` ثم `npm run db:push` قبل التشغيل
- استخدم `npm run dev` للتطوير المحلي
- استخدم Tabler Icons فقط للأيقونات
- اسأل قبل ما تثبت أي مكتبة جديدة — المشروع لازم يفضل خفيف
- خلّي الكود نظيف ومعلّق بالعربية حيث يفيد
