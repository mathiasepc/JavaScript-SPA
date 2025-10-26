import {Router} from "./router.js";

const SLASH = "/";
// Cache the HTML responses for faster loading
const cache = new Map();

// Create a new router instance to store routes and handle navigation
const router = new Router({mode: "history", root: SLASH});

const load = (src) => async () => {
    // Check if the response is already cached
    if (cache.has(src)) return cache.get(src);

    // Cache: "no-store" the browser will not cache the response
    return await fetch(src, {cache: "no-cache"})
        .then(async response => {
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}. Response: ${response.statusText}`);

            // Get the HTML content from the response
            const html = await response.text();

            // Cache the response for faster loading
            cache.set(src, html);

            // Return the HTML content
            return html;
        })
        .catch(err => {
            console.error(err);
            return `<h1>Could not load the page</h1><p>${err.message}</p>`;
        });
};

// !!! NOTE TO SELF !!!
/*
explain: await load("/app/html/fragments/home.html")();
load returns a function that returns a promise.
await returns the value of the promise, which is the HTML content.

Calls the add method from the router script and add new routes
* */


router.add(SLASH, async () => {
    const html = await load("JavaScript-SPA/app/html/fragments/home.html")();
    const module= await import("./pages/home.js")
    return {html, module};
});
router.add("/arbejde" || "/arbejde/", async () => {
    const html = await load("JavaScript-SPA/app/html/fragments/arbejde.html")();
    const module= await import("./pages/arbejde.js")
    return {html, module};
});
router.add("/404", async () => {
    const html = await load("JavaScript-SPA/app/html/fragments/404.html")();
    // If the html page got no JavaScript, we can return an empty object
    return {html, module: {init: () =>{}, cleanup: () => {}}};
});

