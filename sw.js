importScripts("/cache-polyfill.js");

self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("sign").then(cache => {
			return cache.addAll([
				"./",
				"./index.html",
				"./index.html?homescreen=1",
				"./main.js",
				"./launch-icon.png",
				"./launch-icon-512.png",
				"./mainfest.json",
				"./sign.css"
			])
			.then(() => self.skipWaiting());
		})
	)
});

self.addEventListener("activate", event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});

