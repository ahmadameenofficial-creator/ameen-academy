import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import webPush from 'web-push';
const keys = webPush.generateVAPIDKeys();
const file = process.argv[2] ?? '.env.notifications.generated';
await writeFile(file, 'WEB_PUSH_PUBLIC_KEY=' + keys.publicKey + '\nWEB_PUSH_PRIVATE_KEY=' + keys.privateKey + '\nWEB_PUSH_STORAGE_SECRET=' + randomBytes(48).toString('base64url') + '\nCRON_SECRET=' + randomBytes(48).toString('base64url') + '\nWEB_PUSH_SUBJECT=https://azkar.ameen.academy\n', { mode: 0o600, flag: 'wx' });
console.log('Push configuration saved privately to ' + file + '. Values are not printed or committed.');
