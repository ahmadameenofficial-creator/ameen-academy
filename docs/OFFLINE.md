# 🏫 موديول الأوفلاين — الكونتكست الكامل

> **اقرأ الملف ده بس** قبل أي تعديل في الأوفلاين — مش محتاج تستكشف حاجة تانية.
> موديول معزول تمامًا: إدارة المجموعات الحضورية (اسم/واتس/دفعات/حضور) يدويًا من الأدمن.

## الملفات (كلها هنا وبس)

| الملف | الدور |
|---|---|
| `prisma/schema.prisma` (آخر السكيما، قسم "الأوفلاين") | 5 موديلز: `OfflineGroup`, `OfflineStudent`, `OfflinePayment`, `OfflineAttendance` + enums |
| `src/lib/offline-utils.ts` | فورمات فلوس/تواريخ، لينكات واتساب `waLink()`، رسالة تذكير القسط، ليبلات عربي |
| `src/lib/services/offline.service.ts` | `getOverview()` للصفحة الرئيسية + `getGroupDetail(id)` لصفحة الجروب |
| `src/app/api/admin/offline/groups/route.ts` | POST/PATCH/DELETE جروبات |
| `src/app/api/admin/offline/students/route.ts` | POST/PATCH/DELETE طلاب |
| `src/app/api/admin/offline/payments/route.ts` | POST دفعة (+ تحديث الدفعة الجاية في transaction واحدة) / DELETE |
| `src/app/api/admin/offline/attendance/route.ts` | POST حفظ حصة كاملة (bulk upsert) / DELETE مسح حصة |
| `src/app/admin/offline/page.tsx` | صفحة النظرة العامة (server، بتنده السيرفيس) |
| `src/app/admin/offline/[groupId]/page.tsx` | صفحة الجروب (server، بتعمل serialize للتواريخ) |
| `src/components/admin/offline/overview.tsx` | client: إحصائيات + مستحقات + إنذار تسريب + كروت الجروبات |
| `src/components/admin/offline/group-detail.tsx` | client: 3 تابات (طلاب/حضور/إحصائيات) + كل الدايالوجات |

| `src/app/offline/join/page.tsx` | **فورم الانضمام العامة** (بدون auth) — Navbar/Footer + هيدر تسويقي |
| `src/components/offline/join-form.tsx` | client: الفورم نفسها — اختيار جروب، فاليديشن، honeypot، شاشة نجاح |
| `src/app/api/offline/join/route.ts` | POST عام: بينشئ طالب `PENDING` — regex للرقم المصري، honeypot، منع تكرار بالواتس |
| `src/app/offline/claim/page.tsx` + `src/components/offline/claim-card.tsx` | صفحة ربط الحساب من لينك الدعوة (لو مش مسجل دخول بتوجهه للتسجيل بـ callbackUrl) |
| `src/app/api/offline/claim/route.ts` | POST (auth): يربط `userId` بالسجل عن طريق `inviteToken` ويمسح التوكن |
| `src/app/api/admin/offline/invite/route.ts` | POST أدمن: يولّد/يرجّع `inviteToken` — الزرار في group-detail بيفتح واتساب باللينك |
| `src/app/api/admin/offline/session-code/route.ts` | POST أدمن: كود حصة 4 أرقام صالح ليوم واحد (بتوقيت مصر) — بيتخزن على الجروب |
| `src/app/api/offline/checkin/route.ts` | POST (auth): الطالب يدخّل الكود — أول مرة حضور `checkInAt`، تاني مرة انصراف `checkOutAt` |
| `src/app/dashboard/offline/page.tsx` + `src/components/offline/my-group.tsx` | صفحة "مجموعتي" للطالب: تسجيل حضور بالكود + حسابه المالي كامل + سجل حضوره |
| `src/app/dashboard/layout.tsx` | لينك "مجموعتي" في الناف — بيظهر بس لو `offlineStudent` مربوط باليوزر |

اللينك في مينيو الأدمن: `src/app/admin/layout.tsx` → `/admin/offline`.
لينك الفورم للمشاركة: `ameen.academy/offline/join` — ولجروب محدد: `?group=<groupId>`.

## القواعد الذهبية

1. **الفلوس بالقرش في الداتابيز والـ API** (زي باقي المشروع: 49900 = 499 ج). التحويل من/إلى جنيه بيحصل في الـ client بس عبر `toCents()` و `formatEGP()`.
2. **المتبقي مبيتخزنش** — بيتحسب دايمًا: `agreedPrice - sum(payments)`.
3. **الدفعة الجاية** = حقلين على الطالب (`nextDueDate` + `nextDueAmount`). بيتحدّثوا مع كل دفعة جديدة (نفس الـ transaction). `null` = مفيش مستحق.
4. **التذكير مش أوتوماتيك بالكامل** — فلسفة "الأوتوميشن يجهّز وإنت تدوس": صفحة النظرة العامة بتعرض المستحق خلال 3 أيام (أو المتأخر) + زرار واتساب برسالة جاهزة (`dueReminderMessage`). لو فيه رقم ولي أمر، التذكير بيروح ليه هو.
5. **الحضور**: مفيش جدول حصص — الحصة = (جروب + تاريخ). `@@unique([studentId, date])` والحفظ upsert. التاريخ بيتخزن `T00:00:00.000Z`.
6. **المجاني**: `isFree = true` ⇒ `agreedPrice = 0` ومفيش مواعيد دفع (الـ API بيفرض ده).
7. **إنذار التسريب**: طالب نشط غاب `ABSENT` مرتين+ في آخر 30 يوم.
8. **الربح** = محصّل الجروب − `expenses` (مصاريف اختيارية على الجروب).
9. كل الـ API وراء `requireAdminApi()` + zod + رسائل خطأ عربي — نفس نمط `coupons/route.ts`.
10. الصفحات `revalidate = 0` والـ mutations بتعمل `router.refresh()`.
11. **فلو الفورم العامة:** الطالب يملا `/offline/join` (اسم ثلاثي + إيميل + واتس + سن + منطقة — **مفيش أي حاجة فلوس**) ⇒ يتسجل `status = PENDING` ⇒ يظهر في بوكس "طلبات انضمام جديدة" أعلى `/admin/offline` ⇒ الأدمن يقبل (بياخد سعر الجروب الافتراضي كـ `agreedPrice`) أو يرفض (حذف). الـ PENDING مش بيدخل في أي إحصائيات ولا حضور.
12. تحت 18 ⇒ الفورم بتطلب رقم ولي الأمر إجباري (بيظهر أوتوماتيك لما يكتب سن أقل من 18).

## المراحل

- ✅ **مرحلة 1:** داشبورد الأدمن كامل — جروبات، طلاب، دفعات، حضور، إحصائيات، تذكيرات واتساب + فورم الانضمام العامة.
- ✅ **مرحلة 2 (الحالية):** الإيكوسيستم — ربط الطالب بحساب الموقع (لينك دعوة `inviteToken` ⇒ `userId`)، صفحة "مجموعتي" في الداشبورد (حضوره + فلوسه بشفافية كاملة)، وحضور/انصراف ذاتي بـ**كود الحصة** (4 أرقام، يوم واحد، بيتكتب على السبورة — أول إدخال حضور، تاني إدخال انصراف، `self=true` + `checkInAt/checkOutAt`).
- ⬜ **مرحلة 3:** تاسكات — الأدمن ينشئ تاسك بديدلاين، التسليم **عالواتساب** (مش رفع على الموقع)، الأدمن يسجل الدرجة **من 100** على الموقع، الطالب يشوف درجاته وسكوره (متوسط) والوقت الباقي للتسليم في "مجموعتي". **ملحوظة:** مش هنستخدم نظام Brief الموجود — نسخة أبسط منفصلة.

## فلو الربط (مهم للفهم)

1. الأدمن يدوس أيقونة 🔗 جنب الطالب ⇒ بيتولد `inviteToken` وبيتفتح واتساب برسالة فيها `/offline/claim?t=<token>`.
2. الطالب يفتح اللينك: لو مش مسجل ⇒ زراير تسجيل/دخول بـ `callbackUrl` بترجّعه لنفس الصفحة.
3. يدوس "اربط حسابي" ⇒ `userId` يتسجل والتوكن يتمسح ⇒ يتحول لـ `/dashboard/offline`.
4. حساب واحد = سجل واحد (unique من الطرفين). لو الطالب اتمسح، `onDelete: SetNull` مبيأثرش على اليوزر.

## قرارات متفق عليها مع أحمد

- الحصة مرة واحدة أسبوعيًا لكل جروب، ومفيش مواعيد ساعات — التاريخ بس.
- التقييم من 100. التسليم عالواتساب.
- طرق الدفع: كاش / إنستا باي / فودافون كاش / غير ذلك — كلها يدوي، مفيش Paymob هنا.
- العنوان خانة نصية حرة (منطقة)، والسن اختياري، ورقم ولي الأمر اختياري لتحت 18.
