import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(appRoot, '../..');
const manifest = JSON.parse(readFileSync(join(appRoot, '.next/required-server-files.json'), 'utf8'));
assert.equal(resolve(manifest.config.outputFileTracingRoot), repoRoot,
  'The tracing root must match the repository root used by Vercel.');
assert.equal(manifest.relativeAppDir, relative(repoRoot, appRoot),
  'Vercel must retain the application subdirectory when packaging server files.');
const packagePath = join(repoRoot, manifest.relativeAppDir, '.next/package.json');
assert.ok(existsSync(packagePath), `Missing traced package: ${packagePath}`);
const middleware = JSON.parse(readFileSync(join(appRoot, '.next/server/middleware-manifest.json'), 'utf8'));
assert.deepEqual(Object.keys(middleware.middleware ?? {}), [],
  'The public azkar app must not inherit the academy authentication middleware.');
const precache = JSON.parse(readFileSync(join(appRoot, 'public/offline-precache.json'), 'utf8'));
assert.ok(precache.pages.includes('/progress') && precache.pages.every(path => !path.startsWith('/dashboard') && !path.startsWith('/api/')),
  'Private dashboard pages and APIs must never be precached with the public reader.');
assert.ok(precache.pages.includes('/library') && precache.pages.includes('/azkar/after-prayer-fajr-maghrib'),
  'The offline package must include the library and split prayer categories.');
const worker = readFileSync(join(appRoot, 'public/sw.js'), 'utf8');
assert.ok(worker.includes(precache.version) && !worker.includes('/* PRECACHE */'),
  'The deployable service worker must contain this build\'s generated cache manifest.');
for (const asset of ['/brand/sakina-logo.png', '/icons/icon-180.png', '/icons/icon-192.png', '/icons/icon-512.png']) {
  assert.ok(existsSync(join(appRoot, 'public', asset)), 'Missing application brand asset: ' + asset);
}
console.log(`Deployment file paths verified: ${manifest.relativeAppDir}/.next/package.json`);
