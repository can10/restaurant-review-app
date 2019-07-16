console.log('sw.js done!');

let staticCacheName = 'cache-v1';

const cacheFiles = [
    '/',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/sw_register.js',
    '/index.html',
    '/restaurant.html',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', function(event){

    // Add all the cacheFiles into the cache
    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
    // console.log("Install cache done!");
    // console.log(cacheFiles);
});

self.addEventListener('fetch', function(event){

    // Check if the request resource in already in the cache
    // If not, then make a regular fetch request
    // console.log(event.request);
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) {
                return response;
            }
            else {
                return fetch(event.request)
                       .then(function(response){  // Put the request into cache
                           let clonedResponse = response.clone();
                           caches.open(staticCacheName)
                           .then(function(cache) {
                                cache.put(event.request, clonedResponse);
                                // We need to store the response clone
                           })
                           return response;
                       })
                       .catch(function(error) {
                            console.log("Fetch request failed!");
                       });
            }
		})
	);
});