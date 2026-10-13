import { cookies } from 'next/headers';
import { adminCookie, validSession } from '@/lib/dashboard-auth';
import { dashboardData } from '@/lib/analytics-db';
import { dateRange } from '@/lib/analytics-contract';
export async function GET(request: Request) {
  if (!validSession((await cookies()).get(adminCookie)?.value))
    return new Response(null, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  try {
    const url = new URL(request.url);
    const data = await dashboardData(
      dateRange(url.searchParams.get('from') ?? undefined, url.searchParams.get('to') ?? undefined),
    );
    const rows: (string | number)[][] = [
      ['من', data.range.from],
      ['إلى', data.range.to],
      ['التوقيت', 'Africa/Cairo'],
      ['المؤشر', 'الفترة الحالية', 'الفترة السابقة'],
      ...Object.keys(data.current).map((key) => [
        key,
        data.current[key as keyof typeof data.current],
        data.previous[key as keyof typeof data.previous],
      ]),
      [],
      ['التاريخ', 'مشاهدات الصفحات', 'الجلسات'],
      ...data.daily.map((row) => [row.day, row.views, row.sessions]),
      [],
      ['الأقسام الأكثر استخدامًا', 'ضغطات العدّ'],
      ...data.categories.map((row) => [row.label, row.value]),
    ];
    const cell = (value: string | number) =>
      '"' +
      String(typeof value === 'string' && /^[=+@-]/.test(value) ? "'" + value : value).replaceAll(
        '"',
        '""',
      ) +
      '"';
    return new Response('\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="sakina-analytics-' + data.range.from + '.csv"',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return new Response('Database unavailable', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
