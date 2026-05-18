# 🎓 Ameen Academy

منصة تعليمية احترافية للمحتوى العربي عالي الجودة، مبنية بـ Next.js 15 + TypeScript + Prisma.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-6-2D3748) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC)

---

## ✨ المميزات

- 🎨 **تصميم احترافي** بالبراندنج البنفسجي وخط IBM Plex Arabic
- 🔒 **حماية الفيديوهات** عبر Bunny Stream مع signed URLs و watermark
- 💳 **بوابة دفع مصرية** (Paymob) — Visa/Mastercard/فودافون كاش/فوري
- 👥 **مجتمع تفاعلي** للطلاب
- 📊 **لوحة تحكم إدارية** متكاملة
- 🏆 **شهادات إكمال** PDF تلقائية
- 🌙 **Dark Mode** + RTL كامل + Responsive

---

## 🚀 التشغيل المحلي

### 1. المتطلبات

- **Node.js 20+**
- حساب على [Neon](https://neon.tech) (قاعدة بيانات مجانية)
- حساب على [Bunny.net](https://bunny.net) (للفيديوهات)
- حساب على [Resend](https://resend.com) (للإيميلات - مجاناً)
- حساب على [Paymob](https://accept.paymob.com) (للدفع - يحتاج سجل تجاري)

### 2. تثبيت المشروع

```bash
# نسخ ملف البيئة
cp .env.example .env

# تثبيت الـ dependencies
npm install

# تجهيز قاعدة البيانات
npx prisma db push

# (اختياري) إضافة بيانات تجريبية
npm run db:seed

# تشغيل المشروع
npm run dev
```

افتح المتصفح على [http://localhost:3000](http://localhost:3000)

---

## 📁 هيكل المشروع

```
ameen-academy/
├── prisma/
│   └── schema.prisma          # سكيمة قاعدة البيانات
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # صفحات تسجيل الدخول/التسجيل
│   │   ├── (marketing)/       # الصفحة الرئيسية
│   │   ├── dashboard/         # لوحة تحكم الطالب
│   │   ├── admin/             # لوحة تحكم الأدمن
│   │   ├── api/               # API Routes
│   │   ├── globals.css        # الـ CSS الأساسي
│   │   ├── layout.tsx         # الـ Root Layout
│   │   └── page.tsx           # الصفحة الرئيسية
│   ├── components/
│   │   ├── ui/                # المكونات الأساسية
│   │   ├── layout/            # Navbar, Footer
│   │   ├── shared/            # Logo, etc.
│   │   ├── landing/           # أقسام الصفحة الرئيسية
│   │   ├── dashboard/         # مكونات الـ Dashboard
│   │   └── admin/             # مكونات الأدمن
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       ├── utils.ts           # helpers (formatPrice, etc.)
│       └── constants.ts       # ثوابت المشروع
├── tailwind.config.ts         # إعداد Tailwind
└── package.json
```

---

## 🎨 نظام التصميم

### الألوان

| الاستخدام | القيمة |
|---|---|
| **اللون الأساسي** | `#A002FF` (brand-500) |
| **التدرج** | `#A002FF → #6D01B0` |
| **الفاتح جداً** | `#F5E6FF` (brand-50) |
| **الداكن** | `#3F0066` (brand-900) |

### الخط

**IBM Plex Sans Arabic** بكل الأوزان (100 → 700) - يتم تحميله تلقائياً من Google Fonts.

### الأيقونات

[Tabler Icons](https://tabler.io/icons) - outline style فقط، بلون بنفسجي موحّد.

---

## 🗄️ قاعدة البيانات

```bash
# تعديل السكيمة
npx prisma db push

# عرض البيانات
npx prisma studio

# إنشاء migration
npx prisma migrate dev --name init
```

### الجداول الرئيسية

- `User` - المستخدمين
- `Course` - الكورسات
- `Lesson` - الدروس
- `Enrollment` - تسجيل الطلاب
- `Payment` - المدفوعات
- `LessonProgress` - تتبع التقدم
- `VideoToken` - توكنات الفيديو (للحماية)
- `Post`, `Comment`, `Like` - المجتمع
- `Certificate` - الشهادات

---

## 🔒 الأمان

- ✅ كلمات مرور مشفرة بـ **Bcrypt**
- ✅ **JWT tokens** آمنة عبر NextAuth
- ✅ **Rate limiting** على محاولات الدخول
- ✅ **Signed URLs** للفيديوهات (15 دقيقة صلاحية)
- ✅ **Watermark ديناميكي** على الفيديوهات بإيميل الطالب
- ✅ **CSRF protection** افتراضي من Next.js
- ✅ تتبع كل محاولات الدخول

---

## 📦 النشر على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر المشروع
vercel
```

**متغيرات البيئة المطلوبة على Vercel:**

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `BUNNY_STREAM_*`
- `PAYMOB_*`
- `RESEND_API_KEY`

---

## 📝 الـ Scripts

| الأمر | الوصف |
|---|---|
| `npm run dev` | تشغيل بيئة التطوير |
| `npm run build` | بناء المشروع للإنتاج |
| `npm run start` | تشغيل بيئة الإنتاج |
| `npm run db:push` | تحديث قاعدة البيانات |
| `npm run db:studio` | فتح Prisma Studio |

---

## 🛣️ الـ Roadmap

- [x] الصفحة الرئيسية (Landing Page)
- [x] قاعدة البيانات الكاملة (Schema)
- [x] نظام التصميم (Design System)
- [ ] صفحات Auth (تسجيل/دخول/استعادة)
- [ ] صفحة الكورس + الدفع عبر Paymob
- [ ] مشغل الفيديو المحمي + Watermark
- [ ] Dashboard الطالب
- [ ] Dashboard الأدمن
- [ ] المجتمع (Posts + Comments)
- [ ] نظام الإشعارات
- [ ] الشهادات (PDF)

---

## 📞 الدعم

لأي استفسارات تواصل عبر [info@ameen.academy](mailto:info@ameen.academy)

---

**صُنع بـ ❤️ في مصر**
