import type { NextConfig } from 'next';
import { resolve } from 'node:path';
const config: NextConfig = {
  poweredByHeader: false,
  // Vercel packages traced files from the repository root. Preserve the
  // relative app path instead of making it look like a root-level app.
  outputFileTracingRoot: resolve(__dirname, '../..'),
  async headers() {
    return [{ source: '/dashboard/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }, { source: '/api/dashboard/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }] }, { source: '/sw.js', headers: [
      { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
      { key: 'Service-Worker-Allowed', value: '/' },
    ] }];
  },
};
export default config;
