// Service worker mínimo: permite instalar o app e mostrar avisos de pedido; sempre busca a versão mais nova na internet.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs.find(x=>x.url.includes('/pedido'));return c?c.focus():self.clients.openWindow('./pedido/')}))});
