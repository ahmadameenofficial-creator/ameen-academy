/* global self */
const precache = /* PRECACHE */ {};
const cachePrefix = 'sakina-offline-';
const cacheName = cachePrefix + precache.version;
const urls = [...precache.assets, ...precache.pages];

async function notify(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(client => client.postMessage(message));
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    let cursor = 0;
    let completed = 0;
    async function download() {
      while (cursor < urls.length) {
        const url = urls[cursor++];
        const response = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }));
        if (!response.ok || response.redirected) throw new Error('Offline download failed: ' + url);
        await cache.put(url, response);
        completed++;
        if (completed % 8 === 0 || completed === urls.length) {
          await notify({ type: 'OFFLINE_PROGRESS', completed, total: urls.length });
        }
      }
    }
    // Finish the entire library before reporting that offline reading is ready.
    await Promise.all(Array.from({ length: 4 }, download));
    if (!self.registration.active) await self.skipWaiting();
  })().catch(async error => {
    await caches.delete(cacheName);
    await notify({ type: 'OFFLINE_FAILED' });
    throw error;
  }));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(cachePrefix) && key !== cacheName) await caches.delete(key);
    }
    await self.clients.claim();
    await notify({ type: 'OFFLINE_READY' });
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'OFFLINE_STATUS') {
    event.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      const stored = await cache.keys();
      event.source?.postMessage({ type: stored.length >= urls.length ? 'OFFLINE_READY' : 'OFFLINE_FAILED' });
    })());
  }
});

async function documentResponse(request, url) {
  const cache = await caches.open(cacheName);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    // Keep each offline snapshot immutable. A newer online document can refer
    // to different JS chunks; it must not overwrite the active version's HTML.
    return await fetch(request, { signal: controller.signal });
  } catch {
    const saved = await cache.match(url.pathname);
    if (saved) return saved;
    return new Response('<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>سكينة</title><body style="background:#081321;color:#f4f9ff;font-family:system-ui;padding:40px;line-height:2"><h1>هذا الرابط غير محفوظ</h1><p>يمكنك فتح مكتبة الأذكار المحفوظة على جهازك.</p><a style="color:#b7dfff" href="/library">مكتبة الأذكار</a></body></html>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } finally {
    clearTimeout(timer);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(documentResponse(request, url));
    return;
  }
  // Router payloads depend on the current route tree. Never substitute HTML
  // or another route's payload; a network failure lets Next use a full navigation.
  if (request.headers.get('RSC') === '1' || url.searchParams.has('_rsc')) return;
  if (precache.assets.includes(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(cacheName);
      return await cache.match(url.pathname) ?? fetch(request);
    })());
  }
});
