const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_ASSETS = [
  '/offline/',
  '/images/logo-complete.png',
  '/manifest.webmanifest',
  '/sw-assets.json'
];

// Installer le SW et mettre en cache les assets sûrs
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (let i = 0; i < OFFLINE_ASSETS.length; i++) {
        const url = OFFLINE_ASSETS[i];
        try {
          await cache.add(url);
          console.log(`[SW] Cached: ${url}`);
        } catch (err) {
          console.warn(`[SW] Failed to cache ${url}:`, err);
        }
      }
      console.log('[SW] All offline assets processed.');
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

// Intercepter les requêtes
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