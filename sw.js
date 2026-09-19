const CACHE='portfolio-lens-pwa-v1';
const APP=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-180.png','https://cdn.jsdelivr.net/npm/chart.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>Promise.all(APP.map(u=>c.add(u).catch(()=>null)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{let copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match('./index.html'))));});
