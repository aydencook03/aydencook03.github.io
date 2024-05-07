self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open('my-game-cache-v1').then(function (cache) {
            return cache.addAll([
                './',
                './index.html',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
