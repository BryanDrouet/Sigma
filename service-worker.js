const CACHE_NAME = 'site-cache-v1';
const IMAGE_CACHE_NAME = 'image-cache-v1';

// Fichiers à mettre en cache (images uniquement)
const IMAGE_URLS = [
  'assets/logoPronote.png',
  'assets/logoEcoleDirecte.png',
  'assets/icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      return Promise.all(
        IMAGE_URLS.map(url =>
          fetch(url)
            .then(response => {
              if (!response.ok) {
                console.warn('ServiceWorker - image non trouvée:', url, response.status);
                return null;
              }
              return cache.put(url, response);
            })
            .catch((err) => {
              console.warn('ServiceWorker - fetch url err:', url, err);
              return null;
            })
        )
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 1. Gérer le cache des images
  if (IMAGE_URLS.some(image => url.includes(image))) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
  // 2. Ne PAS mettre en cache les fichiers CSS
  else if (url.endsWith('.css') && url.includes('/styles/')) {
    event.respondWith(fetch(event.request));
  }
  // 3. Pour tout le reste (HTML, JS, etc.), aller directement au réseau
  else {
    event.respondWith(fetch(event.request));
  }
});
