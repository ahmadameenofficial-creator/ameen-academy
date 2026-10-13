import { NextResponse } from 'next/server';
import { adminCookie, sameOrigin, requestOrigin } from '@/lib/dashboard-auth';
export function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const response = NextResponse.redirect(new URL('/dashboard/login', requestOrigin(request)), 303);
  response.cookies.set(adminCookie, '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
