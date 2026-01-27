// CSS Grid Mastery - Service Worker
// Enables offline support and caching

const CACHE_NAME = 'grid-mastery-v1';
const STATIC_ASSETS = [
    '/css-grid-mastery/',
    '/css-grid-mastery/index.html',
    '/css-grid-mastery/styles.css',
    '/css-grid-mastery/app.js',
    '/css-grid-mastery/lessons.js',
    '/css-grid-mastery/games.js',
    '/css-grid-mastery/game-modes.js',
    '/css-grid-mastery/sounds.js',
    '/css-grid-mastery/tutorial.js',
    '/css-grid-mastery/accessibility.js',
    '/css-grid-mastery/localization.js',
    '/css-grid-mastery/manifest.json'
];

const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets...');
                // Cache static assets
                return cache.addAll(STATIC_ASSETS.map(url => {
                    // Handle both relative and absolute URLs
                    if (url.startsWith('/')) {
                        return new Request(url, { cache: 'reload' });
                    }
                    return url;
                })).catch(err => {
                    console.log('[SW] Some static assets failed to cache:', err);
                });
            })
            .then(() => {
                // Try to cache external assets (don't fail if they can't be cached)
                return caches.open(CACHE_NAME).then(cache => {
                    return Promise.allSettled(
                        EXTERNAL_ASSETS.map(url => 
                            fetch(url).then(response => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            }).catch(() => {
                                console.log('[SW] Failed to cache:', url);
                            })
                        )
                    );
                });
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Skip cross-origin requests that aren't in our allowed list
    const url = new URL(event.request.url);
    const isAllowedExternal = EXTERNAL_ASSETS.some(asset => event.request.url.includes(asset));
    const isSameOrigin = url.origin === location.origin;
    
    if (!isSameOrigin && !isAllowedExternal) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to return offline page
                        if (event.request.destination === 'document') {
                            return caches.match('/css-grid-mastery/index.html');
                        }
                        return new Response('Offline', { status: 503, statusText: 'Offline' });
                    });
            })
    );
});

// Background sync for submitting scores when back online
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-scores') {
        event.waitUntil(syncScores());
    }
});

async function syncScores() {
    // Get pending scores from IndexedDB and submit them
    console.log('[SW] Syncing scores...');
}

// Push notifications (for daily challenge reminders)
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'New daily challenge available!',
        icon: '/css-grid-mastery/icons/icon-192.png',
        badge: '/css-grid-mastery/icons/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/css-grid-mastery/?mode=dailyChallenge'
        },
        actions: [
            { action: 'open', title: 'Play Now' },
            { action: 'dismiss', title: 'Later' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'CSS Grid Mastery', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') return;

    const url = event.notification.data?.url || '/css-grid-mastery/';

    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then((clientList) => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes('css-grid-mastery') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});

console.log('[SW] Service worker script loaded');
