var CACHE="mxsenha-plus-v1";
var ASSETS=["./","./index.html","./manifest.json","./icon.jpg","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS.map(function(u){return new Request(u,{cache:"reload"});})).catch(function(){});}));});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit||fetch(e.request).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});return res;})
      .catch(function(){return caches.match("./index.html");});}));});
