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
console.log(`Deployment file paths verified: ${manifest.relativeAppDir}/.next/package.json`);
