
    var CACHE_NAME = 'smite-practice';
    var urlsToCache = [
    	"./1076401.json",
	"./__game-scripts.js",
	"./__loading__.js",
	"./__modules__.js",
	"./__settings__.js",
	"./__start__.js",
	"./config.json",
	"./files/assets/41518102/1/hp.png",
	"./files/assets/41518103/1/hp-bar.png",
	"./files/assets/41518126/1/MPLUS1p_700Bold.png",
	"./files/assets/41518127/1/MPLUS1p_300Light.png",
	"./files/assets/41518129/1/MPLUS1p_400Regular.png",
	"./files/assets/41518263/1/smite.png",
	"./files/assets/41518266/1/smitebar.png",
	"./files/assets/41518267/1/Keyboard.png",
	"./files/assets/41518271/1/f.png",
	"./files/assets/41518272/1/d.png",
	"./files/assets/41518296/1/smite.mp3",
	"./files/assets/41518298/1/attack.mp3",
	"./files/assets/41518301/1/Power_Game.mp3",
	"./files/assets/41518387/1/se_maoudamashii_battle11.mp3",
	"./files/assets/41518388/1/se_maoudamashii_battle_gun03.mp3",
	"./files/assets/41519002/1/se_maoudamashii_battle01.mp3",
	"./index.html",
	"./logo-d.png",
	"./logo.png",
	"./manifest.json",
	"./playcanvas-stable.min.js",
	"./serviceWorker.js",
	"./styles.css"
    ];
    
    self.addEventListener("install", function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });
    
    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(keys) {
              var promises = [];
              keys.forEach(function(cacheName) {
                if (cacheName != CACHE_NAME)
                  promises.push(caches.delete(cacheName));
              });
              return Promise.all(promises);
            }));
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then((response) => {
          if (response) {
            return response;
          }
          let fetchRequest = event.request.clone();
          return fetch(fetchRequest)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              let responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
      );
    });

    