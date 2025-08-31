const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_ASSETS = [
  '/offline/',
  '/images/logo-complete.png',
  '/manifest.webmanifest',
  '/sw-assets.json'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const res = await fetch('/sw-assets.json');
        let nextAssets = await res.json();

        // Filtrer uniquement les fichiers accessibles
        nextAssets = await Promise.all(
          nextAssets.map(async (url) => {
            try {
              const r = await fetch(url, { method: 'HEAD' });
              return r.ok ? url : null;
            } catch {
              return null;
            }
          })
        );

        nextAssets = nextAssets.filter(Boolean);

        const allAssets = OFFLINE_ASSETS.concat(nextAssets);
        console.log('[SW] Caching all assets...', allAssets);

        await cache.addAll(allAssets);
        console.log('[SW] All files cached!');
      } catch (err) {
        console.error('[SW] Failed to cache files:', err);
      }
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
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          return caches.match('/offline/');
        });
      })
  );
});
