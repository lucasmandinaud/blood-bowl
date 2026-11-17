// Cache hors-ligne. Change VERSION à chaque mise à jour du contenu.
const VERSION = "bb-v22";
const FILES = ["./","index.html","app.js","timer.js","data-skills.js","data-rules.js","data-teams.js","manifest.json","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Réseau d'abord (pour les mises à jour), cache si pas de réseau
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch:true}).then(r => r || caches.match("index.html"))));
});
