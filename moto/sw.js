// LTP Motorizados: service worker SOLO de avisos (sin caché, no intercepta páginas). Alcance /moto/.
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('push',function(e){var d={};try{var j=e.data?e.data.json():{};d=j.data||j||{};}catch(x){try{d={b:e.data.text()};}catch(y){}}
 var t=d.t||'\uD83D\uDEF5 Nueva comanda',o={body:d.b||'Hay una comanda disponible. Toca para verla.',icon:'/moto/icon-192.png',badge:'/moto/icon-192.png',tag:d.tag||'ltp-cmd',renotify:true,requireInteraction:true,vibrate:[400,150,400,150,400],data:{u:d.u||'?ir=comandas'}};
 e.waitUntil(self.registration.showNotification(t,o).then(function(){return self.clients.matchAll({type:'window',includeUncontrolled:true});}).then(function(cs){cs.forEach(function(c){c.postMessage({ltpPush:'nueva'});});}));});
self.addEventListener('notificationclick',function(e){e.notification.close();var url=new URL((e.notification.data&&e.notification.data.u)||'?ir=comandas',self.registration.scope).href;
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){for(var i=0;i<cs.length;i++){var c=cs[i];if(c.url.indexOf(self.registration.scope)===0&&'focus' in c){c.postMessage({ltpPush:'abrir'});return c.focus();}}return self.clients.openWindow(url);}));});
