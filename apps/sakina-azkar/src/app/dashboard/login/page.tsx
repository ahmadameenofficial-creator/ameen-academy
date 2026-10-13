import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminCookie, configured, validSession } from '@/lib/dashboard-auth';
export const dynamic = 'force-dynamic';
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (validSession((await cookies()).get(adminCookie)?.value)) redirect('/dashboard');
  const { error } = await searchParams;
  const messages: Record<string, string> = {
    invalid: 'كلمة المرور غير صحيحة.',
    limited: 'محاولات كثيرة. جرّب بعد 15 دقيقة.',
    unavailable: 'تعذّر الاتصال بقاعدة البيانات. جرّب مرة أخرى.',
  };
  return (
    <section className="dashboard-login">
      <Image src="/brand/sakina-logo.png" alt="سكينة" width={210} height={70} unoptimized />
      <span className="eyebrow">لوحة إدارة الموقع</span>
      <h1>أهلًا بك في سكينة</h1>
      {configured() ? (
        <>
          <p>سجّل دخولك لمتابعة أداء الموقع.</p>
          <form action="/api/dashboard/login" method="post">
            <label htmlFor="password">كلمة مرور الإدارة</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              maxLength={256}
              required
            />
            <button className="button button-primary" type="submit">
              دخول الداشبورد
            </button>
          </form>
          {error && <p role="alert">{messages[error] ?? 'تعذّر تسجيل الدخول.'}</p>}
        </>
      ) : (
        <>
          <p>الداشبورد جاهزة في الكود، وتحتاج ربط قاعدة بيانات الإدارة قبل الاستخدام.</p>
          <p>
            متغيرات Vercel المطلوبة: <code>SAKINA_DATABASE_URL</code>،{' '}
            <code>DASHBOARD_PASSWORD</code>، <code>DASHBOARD_SESSION_SECRET</code>.
          </p>
          <p>قاعدة البيانات مستقلة عن أمين أكاديمي. لا توجد إحصائيات تجريبية معروضة.</p>
        </>
      )}
      <Link href="/" className="text-link">
        العودة للموقع
      </Link>
    </section>
  );
}
