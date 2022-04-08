// imports
importScripts('js/sw-acces.js');

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'favicon.ico',
    'js/app.js',
    'js/sw-acces.js',
    'img/no-img.jpg',
    'img/porsche_1.jpg',
    'img/user.svg',
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    'paginas/offline.html',
];


self.addEventListener("install", event => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });
    
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });

    event.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});


self.addEventListener("activate", event => {
    
    const respuesta = caches.keys().then(keys => {
        
        keys.forEach(key => {

            //static cache
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

        });

    });

    event.waitUntil(respuesta);
});


self.addEventListener('fetch', event => {
    
    const respuesta = caches.match(event.request).then(respuesta => {
            if (respuesta) {
                return respuesta;
            } else {
                return fetch(event.request).then( newRes => {
                    return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
                }).catch(err => {
                    if ( event.request.headers.get('accept').includes('text/html') ) {
                        return caches.match('paginas/offline.html');
                    };
                });
            }
        });
    event.respondWith(respuesta);
});