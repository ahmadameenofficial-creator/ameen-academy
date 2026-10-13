import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
const target = '.env.dashboard.generated';
await writeFile(
  target,
  'DASHBOARD_PASSWORD=' +
    randomBytes(24).toString('base64url') +
    '\nDASHBOARD_SESSION_SECRET=' +
    randomBytes(48).toString('base64url') +
    '\n',
  { mode: 0o600, flag: 'wx' },
);
console.log(
  'Admin credentials saved to ' +
    target +
    '. Keep this file private; copy the values into Vercel Environment Variables.',
);
