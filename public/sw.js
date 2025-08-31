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
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_ASSETS).then(() => {
        console.log('[SW] Offline assets cached!');
      }).catch((err) => {
        console.warn('[SW] Some assets failed to cache, but continuing...', err);
      });
    })
  );
});

// Activer le SW et supprimer les anciens caches
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
        // Vérifie si la requête est en cache
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Sinon, renvoie offline
        return caches.match('/offline/');
      })
  );
});
