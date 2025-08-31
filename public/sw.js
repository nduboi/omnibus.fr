const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_ASSETS = [
  '/offline.html',
  '/images/logo-complete.png',
  '/manifest.webmanifest',
  '/sw-assets.json'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (let i = 0; i < OFFLINE_ASSETS.length; i++) {
        const url = OFFLINE_ASSETS[i];
        try {
          await cache.add(url);
          console.log(`[SW] Cached offline asset: ${url}`);
        } catch (err) {
          console.warn(`[SW] Failed to cache offline asset ${url}:`, err);
        }
      }

      // 2️⃣ Cacher les assets dynamiques listés dans sw-assets.json
      try {
        const res = await fetch('/sw-assets.json');
        const dynamicAssets = await res.json();

        for (let i = 0; i < dynamicAssets.length; i++) {
          const url = dynamicAssets[i];
          try {
            await cache.add(url);
            console.log(`[SW] Cached dynamic asset: ${url}`);
          } catch (err) {
            console.warn(`[SW] Failed to cache dynamic asset ${url}:`, err);
          }
        }
      } catch (err) {
        console.error('[SW] Failed to load sw-assets.json:', err);
      }

      console.log('[SW] All assets processed.');
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new service worker...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        return caches.match('/offline/');
      })
  );
});
