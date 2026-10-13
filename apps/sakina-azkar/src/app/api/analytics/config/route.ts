import { configured } from '@/lib/dashboard-auth';
export function GET() {
  return Response.json({ enabled: configured() }, { headers: { 'Cache-Control': 'no-store' } });
}
