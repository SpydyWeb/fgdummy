// public/service-worker.js

self.addEventListener('install', (event) => {
    // Perform install steps
    console.log('Service Worker installing.');
    event.waitUntil(
      caches.open('my-cache')
        .then((cache) => {
          console.log('Opened cache');
          return cache.addAll([
            '/',
            '/index.html',
            // Add other assets you want to cache
          ]);
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Check if we have a cached response
          if (response) {
            return response;
          }
          
          // Clone the request
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest).then(
            (response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response
              const responseToCache = response.clone();
              
              // Open cache and store the response
              caches.open('my-cache')
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              // Modify headers
              const newHeaders = new Headers(response.headers);
              newHeaders.set('X-Custom-Header', 'my-custom-header-value');
  
              const modifiedResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
              });
  
              return modifiedResponse;
            }
          );
        })
    );
  });
  