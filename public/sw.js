// Service Worker خفيف — أكاديمية أمين
// استراتيجية: network-first للصفحات (محتوى متجدد)، cache-first للأصول الثابتة.
const CACHE = "ameen-v1";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([OFFLINE_URL])),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // بس GET ونفس الأصل — مفيش تدخّل في الـ API ولا الطلبات الخارجية
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }
  if (request.url.includes("/api/")) return;

  // تنقّل الصفحات: network-first مع fallback للكاش
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match(OFFLINE_URL))),
    );
    return;
  }

  // الأصول الثابتة: cache-first
  if (/\.(?:js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/.test(request.url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
            return res;
          }),
      ),
    );
  }
});
