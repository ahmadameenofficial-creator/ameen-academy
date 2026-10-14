import { NextRequest, NextResponse } from 'next/server';
import { accountCookie, accountSameOrigin, sessionUser } from '@/lib/account-auth';
import { getAccountProgress, saveAccountProgress, sanitizeAccountRecords } from '@/lib/account-db';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function json(value: object, status = 200) { return NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store' } }); }
export async function GET(request: NextRequest) {
  const user = sessionUser(request.cookies.get(accountCookie)?.value);
  if (!user) return json({ error: 'Unauthorized' }, 401);
  try { return json(await getAccountProgress(user)); } catch { return json({ error: 'المزامنة غير متاحة الآن؛ تقدمك محفوظ محليًا.' }, 503); }
}
export async function PUT(request: NextRequest) {
  if (!accountSameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const user = sessionUser(request.cookies.get(accountCookie)?.value);
  if (!user) return json({ error: 'Unauthorized' }, 401);
  if (Number(request.headers.get('content-length')) > 2000000) return json({ error: 'Payload too large' }, 413);
  try {
    const raw = await request.text();
    if (raw.length > 2000000) return json({ error: 'Payload too large' }, 413);
    const data = JSON.parse(raw);
    if (!Number.isSafeInteger(data.revision) || data.revision < 0 || !Array.isArray(data.records) || data.records.length > 5000 || !/^\d{4}-\d{2}-\d{2}$/.test(data.today)) return json({ error: 'Invalid progress' }, 400);
    const date = new Date(data.today + 'T00:00:00Z');
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.today || Math.abs(date.getTime() - Date.now()) > 2 * 86400000) return json({ error: 'Invalid day' }, 400);
    const revision = await saveAccountProgress(user, data.revision, sanitizeAccountRecords(data.records, data.today));
    return revision === null ? json({ error: 'Conflict' }, 409) : json({ revision });
  } catch { return json({ error: 'تعذرت المزامنة؛ حاول مرة أخرى.' }, 503); }
}
