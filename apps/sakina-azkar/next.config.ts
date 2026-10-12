import type { NextConfig } from 'next';
import { resolve } from 'node:path';
const config: NextConfig = {
  poweredByHeader: false,
  // Vercel packages traced files from the repository root. Preserve the
  // relative app path instead of making it look like a root-level app.
  outputFileTracingRoot: resolve(__dirname, '../..'),
};
export default config;
