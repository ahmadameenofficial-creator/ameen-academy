import { NextRequest, NextResponse } from 'next/server';
import { accountCookie, accountSameOrigin, sessionUser } from '@/lib/account-auth';
import { getAccountProfile, saveAccountProfile, registerAccount } from '@/lib/account-db';
import { parseProfile, verifiedAccountEmail } from '@/lib/account-profile';
import { readAccountToken } from '@/lib/account-auth';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function json(value: object, status = 200) { return NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store' } }); }
export async function GET(request: NextRequest) {
  const token = request.cookies.get(accountCookie)?.value;
  const userId = sessionUser(token);
  if (!userId) return json({ error: 'Unauthorized' }, 401);
  try {
    await registerAccount(userId, verifiedAccountEmail(readAccountToken(token, 'session')?.email));
    return json(await getAccountProfile(userId));
  } catch { return json({ error: 'تعذر تحميل بيانات الحساب. يمكنك متابعة القراءة.' }, 503); }
}
export async function PUT(request: NextRequest) {
  if (!accountSameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const userId = sessionUser(request.cookies.get(accountCookie)?.value);
  if (!userId) return json({ error: 'Unauthorized' }, 401);
  if (Number(request.headers.get('content-length')) > 4096) return json({ error: 'Payload too large' }, 413);
  let profile;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return json({ error: 'Payload too large' }, 413);
    const data = JSON.parse(raw);
    if (data.accountId !== userId) return json({ error: 'تغيّر الحساب؛ أعد تحميل الصفحة.' }, 409);
    profile = parseProfile(data);
  } catch { return json({ error: 'راجع البيانات المدخلة.' }, 400); }
  if (!profile) return json({ error: 'راجع العمر والبلد والنوع.' }, 400);
  try { return json(await saveAccountProfile(userId, profile)); }
  catch { return json({ error: 'تعذر حفظ البيانات؛ حاول لاحقًا.' }, 503); }
}
