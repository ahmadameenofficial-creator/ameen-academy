import Image from 'next/image';
import Link from 'next/link';
import { AccountDirectory } from '@/components/account-directory';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminCookie, validSession } from '@/lib/dashboard-auth';
import { dateRange } from '@/lib/analytics-contract';
import { dashboardData, type Breakdown, type Totals } from '@/lib/analytics-db';
import { getCategory } from '@/lib/catalog';
import { number } from '@/lib/text';
import { ThemeControl } from '@/components/theme';
import { DashboardRefresh } from '@/components/dashboard-controls';
export const dynamic = 'force-dynamic';
const labels: Record<string, string> = {
  '/': 'الرئيسية',
  '/library': 'مكتبة الأذكار',
  '/saved': 'المحفوظات',
  '/sources': 'المصادر',
  mobile: 'موبايل',
  desktop: 'كمبيوتر',
  tablet: 'تابلت',
  direct: 'مباشر / غير معروف',
  google: 'Google',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  tiktok: 'TikTok',
  email: 'بريد إلكتروني',
  other: 'أخرى',
  ZZ: 'غير معروف',
};
function label(value: string) {
  return (
    labels[value] ??
    (/^[A-Z]{2}$/.test(value)
      ? (new Intl.DisplayNames(['ar'], { type: 'region' }).of(value) ?? value)
      : value.startsWith('/azkar/')
        ? (getCategory(value.slice(7))?.title ?? value)
        : value)
  );
}
function BreakdownCard({ title, rows, unit }: { title: string; rows: Breakdown[]; unit: string }) {
  const maximum = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="dashboard-card">
      <h2>{title}</h2>
      <p className="dashboard-card-note">{unit}</p>
      {rows.length ? (
        <ol className="breakdown-list">
          {rows.map((row) => (
            <li key={row.label}>
              <div>
                <span>{label(row.label)}</span>
                <b>{number(row.value)}</b>
              </div>
              <div className="breakdown-bar">
                <span style={{ width: (row.value / maximum) * 100 + '%' }} />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="dashboard-empty-small">لم تصل بيانات في هذه الفترة.</p>
      )}
    </section>
  );
}
export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; accountsPage?: string }>;
}) {
  if (!validSession((await cookies()).get(adminCookie)?.value)) redirect('/dashboard/login');
  const params = await searchParams;
  const range = dateRange(params.from, params.to);
  let data;
  try {
    data = await dashboardData(range);
  } catch {
    return (
      <section className="dashboard-login">
        <h1>تعذّر تحميل الإحصائيات</h1>
        <p>راجع اتصال قاعدة البيانات، ثم أعد المحاولة. هذا لا يؤثر على قراءة الأذكار.</p>
        <Link href="/dashboard" className="button button-primary">
          إعادة المحاولة
        </Link>
      </section>
    );
  }
  const metrics: {
    title: string;
    key?: keyof Totals;
    value: number;
    old: number;
    suffix?: string;
    detail: string;
  }[] = [
    {
      title: 'الجلسات',
      key: 'sessions',
      value: data.current.sessions,
      old: data.previous.sessions,
      detail: 'جلسة مجهولة؛ تبدأ من جديد بعد 30 دقيقة انقطاع',
    },
    {
      title: 'مشاهدات الصفحات',
      key: 'views',
      value: data.current.views,
      old: data.previous.views,
      detail: 'تشمل الرجوع للصفحة وإعادة فتحها',
    },
    {
      title: 'معدل التفاعل',
      value: data.current.sessions
        ? Math.round((data.current.engaged / data.current.sessions) * 100)
        : 0,
      old: data.previous.sessions
        ? Math.round((data.previous.engaged / data.previous.sessions) * 100)
        : 0,
      suffix: '%',
      detail: '10 ثوانٍ ظاهرة أو تفاعل مع ذكر',
    },
    {
      title: 'وقت الاستخدام / جلسة',
      value: data.current.sessions ? Math.round(data.current.seconds / data.current.sessions) : 0,
      old: data.previous.sessions ? Math.round(data.previous.seconds / data.previous.sessions) : 0,
      suffix: ' ثانية',
      detail: 'وقت ظهور الصفحة؛ لا يُعدّ وقت قراءة مؤكدًا',
    },
    {
      title: 'ضغطات العدّ',
      key: 'counters',
      value: data.current.counters,
      old: data.previous.counters,
      detail: 'ضغطات فعلية ناجحة على العدادات',
    },
    {
      title: 'بطاقات مكتملة',
      key: 'completions',
      value: data.current.completions,
      old: data.previous.completions,
      detail: 'الوصول لهدف العدّ؛ قد تتكرر بعد التصفير',
    },
    {
      title: 'تثبيت التطبيق',
      key: 'installs',
      value: data.current.installs,
      old: data.previous.installs,
      detail: 'تثبيت رصده المتصفح؛ تثبيت iPhone اليدوي قد لا يظهر',
    },
    {
      title: 'جلسات عائدة',
      key: 'returning',
      value: data.current.returning,
      old: data.previous.returning,
      detail: 'المتصفح زار سكينة سابقًا؛ ليست أشخاصًا فريدين',
    },
  ];
  const daily = Array.from({ length: range.days }, (_, index) => {
    const day = new Date(Date.parse(range.from + 'T00:00:00Z') + index * 86400000)
      .toISOString()
      .slice(0, 10);
    return data.daily.find((row) => row.day === day) ?? { day, views: 0, sessions: 0 };
  });
  const maximum = Math.max(1, ...daily.map((row) => row.views));
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link href="/" aria-label="سكينة، الموقع">
          <Image src="/brand/sakina-logo.png" width={150} height={50} alt="سكينة" unoptimized />
        </Link>
        <div>
          <ThemeControl />
          <Link href="/" className="button button-secondary">
            فتح الموقع
          </Link>
          <form action="/api/dashboard/logout" method="post">
            <button className="button button-secondary">تسجيل الخروج</button>
          </form>
        </div>
      </header>
      <div className="dashboard-title">
        <div>
          <span className="eyebrow">لوحة إدارة سكينة</span>
          <h1>صورة واضحة عن أداء موقعك</h1>
          <p>
            الفترة من {range.from} إلى {range.to} · بتوقيت القاهرة
          </p>
        </div>
        <div className="live-stat">
          <span /> <b>{number(data.active)}</b> جلسات نشطة خلال آخر 5 دقائق
        </div>
      </div>
      <section className="dashboard-filter" aria-label="فترة التقرير">
        <form>
          <label>
            من
            <input type="date" name="from" defaultValue={range.from} max={range.to} required />
          </label>
          <label>
            إلى
            <input type="date" name="to" defaultValue={range.to} max={dateRange().to} required />
          </label>
          <button className="button button-primary">عرض التقرير</button>
        </form>
        <div>
          {[7, 30, 90].map((days) => (
            <Link
              key={days}
              className="dashboard-preset"
              href={
                '/dashboard?from=' +
                new Date(Date.parse(dateRange().to + 'T00:00:00Z') - (days - 1) * 86400000)
                  .toISOString()
                  .slice(0, 10) +
                '&to=' +
                dateRange().to
              }
            >
              {number(days)} أيام
            </Link>
          ))}
          <a
            className="button button-secondary"
            href={'/api/dashboard/export?from=' + range.from + '&to=' + range.to}
          >
            تصدير CSV
          </a>
        </div>
      </section>
      <DashboardRefresh />
      {!data.firstEvent && (
        <div className="dashboard-empty">
          <h2>الداشبورد جاهزة لاستقبال بيانات حقيقية</h2>
          <p>
            لم تصل أحداث بعد. يبدأ التسجيل عندما يسمح الزائر بإحصائيات الاستخدام؛ لا توجد أرقام
            افتراضية أو زيارات قديمة مُقدّرة.
          </p>
        </div>
      )}
      <div className="metric-grid">
        {metrics.map((metric) => (
          <section className="metric-card" key={metric.title}>
            <h2>{metric.title}</h2>
            <strong>
              {number(metric.value)}
              <small>{metric.suffix}</small>
            </strong>
            <p className="metric-change">
              {metric.old > 0
                ? (metric.value - metric.old >= 0 ? '+' : '') +
                  number(Math.round(((metric.value - metric.old) / metric.old) * 100)) +
                  '% مقابل الفترة السابقة'
                : metric.value > 0
                  ? 'لا يوجد أساس للمقارنة في الفترة السابقة'
                  : 'لا توجد بيانات مقارنة'}
            </p>
            <p>{metric.detail}</p>
          </section>
        ))}
      </div>
      <section className="dashboard-card chart-card">
        <div className="chart-heading">
          <div>
            <h2>الزيارات عبر الأيام</h2>
            <p>مشاهدات الصفحات والجلسات، بتوقيت القاهرة</p>
          </div>
          <span className="chart-legend">
            <i /> مشاهدات الصفحات
          </span>
        </div>
        <div className="analytics-chart" role="img" aria-label="مخطط مشاهدات الصفحات يوميًا">
          <svg viewBox="0 0 900 220" preserveAspectRatio="none" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" x2="900" y1={20 + i * 55} y2={20 + i * 55} />
            ))}
            {daily.map((row, i) => (
              <rect
                key={row.day}
                x={(i * 900) / daily.length + 3}
                y={200 - (row.views / maximum) * 180}
                width={Math.max(2, 900 / daily.length - 6)}
                height={Math.max(1, (row.views / maximum) * 180)}
                rx="3"
              >
                <title>{row.day + ': ' + row.views + ' مشاهدة، ' + row.sessions + ' جلسة'}</title>
              </rect>
            ))}
          </svg>
        </div>
        <details className="daily-table">
          <summary>عرض البيانات التفصيلية للمخطط</summary>
          <table>
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>مشاهدات الصفحات</th>
                <th>الجلسات</th>
              </tr>
            </thead>
            <tbody>
              {daily.map((row) => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td>{number(row.views)}</td>
                  <td>{number(row.sessions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>
      <section className="dashboard-card quality-card">
        <h2>سرعة الموقع وتجربة الاستخدام</h2>
        <p className="dashboard-card-note">
          القيمة عند 75% من القياسات المتاحة، وليست اختبار سرعة مصطنعًا.
        </p>
        <div className="quality-grid">
          <div>
            <span>ظهور المحتوى الرئيسي · LCP</span>
            <b>
              {data.quality.lcp === null
                ? 'لا توجد قياسات'
                : number(Math.round(data.quality.lcp / 100) / 10) + ' ثانية'}
            </b>
          </div>
          <div>
            <span>استجابة التفاعل · INP</span>
            <b>
              {data.quality.inp === null
                ? 'لا توجد قياسات'
                : number(Math.round(data.quality.inp)) + ' ms'}
            </b>
          </div>
          <div>
            <span>ثبات الصفحة · CLS</span>
            <b>{data.quality.cls === null ? 'لا توجد قياسات' : number(data.quality.cls / 1000)}</b>
          </div>
          <div>
            <span>أخطاء واجهة مرصودة</span>
            <b>{number(data.quality.errors)}</b>
          </div>
        </div>
        <p className="dashboard-card-note">
          {number(data.quality.samples)} قياسًا متاحًا. يعتمد التسجيل على دعم المتصفح والموافقة؛ لا
          تُجمع نصوص الأخطاء أو محتويات الصفحة.
        </p>
      </section>
      <div className="dashboard-grid">
        <BreakdownCard
          title="أقسام الأذكار الأكثر استخدامًا"
          rows={data.categories}
          unit="ضغطات العدّ حسب القسم"
        />
        <BreakdownCard title="الصفحات الأكثر زيارة" rows={data.pages} unit="مشاهدات الصفحات" />
        <BreakdownCard
          title="مصادر الزيارات"
          rows={data.sources}
          unit="جلسات؛ المصادر غير المتاحة تُصنّف مباشر / غير معروف"
        />
        <BreakdownCard title="الأجهزة" rows={data.devices} unit="جلسات حسب فئة الجهاز" />
        <BreakdownCard title="المتصفحات" rows={data.browsers} unit="جلسات حسب المتصفح" />
        <BreakdownCard title="أنظمة التشغيل" rows={data.systems} unit="جلسات حسب النظام" />
        <BreakdownCard
          title="الدول"
          rows={data.countries}
          unit="تقدير على مستوى الدولة من Vercel؛ لا يُحفظ عنوان IP"
        />
      </div>
      <AccountDirectory page={Number(params.accountsPage) || 1} from={range.from} to={range.to} />
      <section className="dashboard-card dashboard-health">
        <h2>التفاعل وجودة البيانات</h2>
        <div>
          <p>
            <b>{number(data.current.copies)}</b> عمليات نسخ ناجحة
          </p>
          <p>
            <b>{number(data.current.shares)}</b> مشاركات ناجحة
          </p>
          <p>
            <b>{number(data.current.offline)}</b> عودة اتصال بعد استخدام بدون إنترنت
          </p>
        </div>
        <p>
          هذه الإحصائيات تخص الزوار الذين سمحوا بالتسجيل، وقد تتأثر بحجب التتبع. لا نسترجع زيارات
          قبل التفعيل، ولا نستنتج عدد أشخاص فريدين. تُحذف البيانات الأقدم من 90 يومًا دوريًا عند
          اتصال الخدمة.
        </p>
        <p>
          أول حدث مسجل:{' '}
          {data.firstEvent
            ? new Intl.DateTimeFormat('ar-EG', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Africa/Cairo',
              }).format(new Date(data.firstEvent))
            : 'لم يبدأ التسجيل بعد'}
          .
        </p>
        <p>
          الإشعارات: خدمة الإرسال والجدولة لم تُفعّل بعد؛ لا توجد إحصائيات إرسال أو وصول حتى
          تفعيلها.
        </p>
      </section>
    </div>
  );
}
