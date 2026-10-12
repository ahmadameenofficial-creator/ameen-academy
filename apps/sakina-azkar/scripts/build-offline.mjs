import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

async function files(directory, prefix = '') {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const relative = join(prefix, item.name);
    if (item.isDirectory()) result.push(...await files(join(directory, item.name), relative));
    else result.push(relative.replaceAll('\\', '/'));
  }
  return result;
}

const catalog = JSON.parse(await readFile('src/data/azkar.json', 'utf8'));
const buildId = (await readFile('.next/BUILD_ID', 'utf8')).trim();
const staticFiles = await files('.next/static');
const publicFiles = await files('public');
const pages = ['/', '/library', '/saved', '/sources', ...catalog.categories.map(category => '/azkar/' + category.id)];
const assets = [
  '/manifest.webmanifest', '/icon.svg',
  ...staticFiles.filter(path => /\.(js|css|woff2?|ttf)$/.test(path)).map(path => '/_next/static/' + path),
  ...publicFiles.filter(path => /\.(png|svg|woff2?|ttf)$/.test(path)).map(path => '/' + path),
];
const version = createHash('sha256').update(buildId).update(JSON.stringify({ pages, assets })).digest('hex').slice(0, 16);
const precache = { version, pages, assets: [...new Set(assets)] };
await writeFile('public/offline-precache.json', JSON.stringify(precache));
const template = await readFile('scripts/service-worker.js', 'utf8');
await writeFile('public/sw.js', template.replace('/* PRECACHE */ {}', JSON.stringify(precache)));
console.log('Offline package generated: ' + pages.length + ' pages, ' + precache.assets.length + ' assets.');
