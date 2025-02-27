const CACHE_NAME = 'my-game-cache-v9';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './service-worker.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './privacy-policy.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Serve cached file if it exists, else fetch from network
            return response || fetch(event.request);
        })
    );
});
