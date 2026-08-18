// Service Worker para recibir notificaciones push en segundo plano
self.addEventListener('push', function(event) {
    let data = { title: 'GnxFlix', body: '¡Nuevo contenido disponible!', icon: 'logo.png' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || 'logo.png',
        badge: 'logo.png'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Evento al hacer clic en la notificación para abrir la web
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://gnxflix.vercel.app/')
    );
});