
// CasuloClub Service Worker

const CACHE_NAME = 'casuloclub-v1';

// Lista de arquivos para cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalação do service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto');
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação do service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Interceptação dos requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o cache se encontrado
      if (response) {
        return response;
      }
      
      // Clone o request
      const fetchRequest = event.request.clone();
      
      return fetch(fetchRequest).then((response) => {
        // Checar se resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone a resposta
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
