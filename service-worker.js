const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const LIMIT_CACHE = 100;

const APP_SHELL = [
    'src/index.css',
];

const APP_SHELL_INMUTABLE = [
    'src/reset.css',
];


function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {

                    if (keys.length > numeroItems) {
                        cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItems))
                    }
                });
        });
}

self.addEventListener('install', (e) => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', (e) => {
    const respuesta = caches.keys().then((keys) => {
        keys.forEach((key) => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(respuesta);
});


self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('/image/')) {
        const respuesta = caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }
            return fetch(e.request).then((newResp) => {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(e.request, newResp);
                    limpiarCache(DYNAMIC_CACHE, LIMIT_CACHE)
                });
                return newResp.clone();
            });
        });
        e.respondWith(respuesta);
    }
});