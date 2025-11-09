// Service Worker for Push Notifications
// The Serving Church

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...', event);
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...', event);
  event.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);

  let notificationData = {
    title: 'The Serving Church',
    body: 'New announcement available',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: notificationData.badge,
        vibrate: notificationData.vibrate,
        data: {
          url: data.url || notificationData.data.url,
          announcementId: data.announcementId
        },
        tag: data.tag || 'announcement',
        requireInteraction: data.priority === 'urgent',
      };
    } catch (e) {
      console.error('[Service Worker] Error parsing notification data:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received:', event);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle background sync (optional - for offline support)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event);
  if (event.tag === 'sync-announcements') {
    event.waitUntil(syncAnnouncements());
  }
});

async function syncAnnouncements() {
  // Implement offline announcement sync if needed
  console.log('[Service Worker] Syncing announcements...');
}
