import { NextResponse } from 'next/server';
import {
  adminCookie,
  configured,
  checkPassword,
  issueSession,
  privateHash,
  sameOrigin,
  sessionLifetime,
  requestOrigin,
} from '@/lib/dashboard-auth';
import { withinLimit } from '@/lib/analytics-db';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  if (!configured()) return new Response('Dashboard is not configured', { status: 503 });
  const destination = (error: string) =>
    NextResponse.redirect(new URL('/dashboard/login?error=' + error, requestOrigin(request)), 303);
  try {
    const ip =
      request.headers.get('x-vercel-forwarded-for') ??
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      'unknown';
    if (!(await withinLimit(privateHash('login:' + ip), 8, 900))) return destination('limited');
    const data = await request.formData();
    const password = data.get('password');
    if (typeof password !== 'string' || !checkPassword(password)) return destination('invalid');
    const response = NextResponse.redirect(new URL('/dashboard', requestOrigin(request)), 303);
    const local = ['localhost', '127.0.0.1'].includes(new URL(requestOrigin(request)).hostname);
    response.cookies.set(adminCookie, issueSession(), {
      httpOnly: true,
      secure: !local || process.env.SAKINA_TEST_HTTP !== 'true',
      sameSite: 'strict',
      path: '/',
      maxAge: sessionLifetime,
    });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch {
    return destination('unavailable');
  }
}
