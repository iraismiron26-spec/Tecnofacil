const CACHE_NAME = 'tecnofacil-v1';
const OFFLINE_URL = '/index.html';
const ASSETS = [
  OFFLINE_URL,
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) return response;
      return fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if(event.request.method === 'GET') cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        if(event.request.mode === 'navigate') return caches.match(OFFLINE_URL);
      });
    })
  );
});
