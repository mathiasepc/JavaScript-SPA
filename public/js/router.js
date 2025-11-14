const LEADING_SLASH = "/"

// SPA Router - Handles navigation and rendering
export class Router {
    // This constructor configures the router behavior and sets up event listeners
    constructor({mode = "history", root = LEADING_SLASH} = {}) {
        // Stores route-to-handler mapping
        this.routes = {};
        // "hash" or "history"
        this.mode = mode;
        // Set the root path, which is used to determine the current route
        // Should always end with a slash
        this.root = root.endsWith(LEADING_SLASH) ? root : root + LEADING_SLASH;
        // Simpel token to prevent different requests from overwriting each other
        this.navToken = 0;

        // Bind link clicks (event delegation)
        document.addEventListener("click", event => {
            // Fetch the a-tag that was clicked with the data-link attribute
            const link = event.target.closest("[data-link]");
            if (!link) return;

            // Not allow middle-click, right-click, or cmd/ctrl clicks
            if (event.metaKey || event.ctrlKey || event.button === 1) return;


            const url = new URL(link.href, location.href);
            if (url.origin !== location.origin) return;

            event.preventDefault();
            this.navigate(url.pathname);
        });

        // "popstate" handles back/forward buttons in the browser
        window.addEventListener("popstate", () => this.resolveRoute());
    }

    // Define a new route
    // route is the path(/ or about or contact), handler is a function that returns the HTML content
    add(route, handler) {
        // Normalize the route path
        const r = this.normalizePath(route);
        // Add the route to the route map
        this.routes[r] = handler;
    }

    // Moved this from constructor. Created issues on first load
    start(){
        // Initial route handling
        this.resolveRoute();
    }

    // The only href-link that starts with a leading slash is the root path
    // This function handles navigation and updates the URL
    // Makes sure we don't have double slashes in the URL
    navigate(path) {
        if (this.mode === "history") {
            // Ensure the path starts with a leading slash
            const rel = path.startsWith(LEADING_SLASH)
                ? path
                : LEADING_SLASH + path;

            // Make the full path by combining the root path and the relative path
            const full = this.root === LEADING_SLASH
                ? rel
                : this.root.replace(/\/$/, "") + rel;
            // You will always push the full path to the history stack
            history.pushState(null, "", full);
        } else
            location.hash.replace("#", path);

        // If the DOM is not loaded yet, wait for it
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded",
                async () => await this.resolveRoute());
        } else this.resolveRoute();

    }

    // Determine the current route and load content
    async resolveRoute() {
        // Sets the token to prevent requests from overwriting each other
        const myToken = ++this.navToken;

        // set the path to the current location
        const path = this.mode === "history"
            ? this.normalizePath(location.pathname)
            : location.hash.replace("#", "") || this.root;

        // Set the current route or error page.
        const handler = this.routes[path] || this.routes["/404"];

        // Get the app element and render the handler
        const app = document.getElementById("app");

        // this.currentCleanup will run if the method exists
        // This attribute is set when we have the module attribute late in this script.
        this.currentCleanup?.();

        // Just a fun loading tekst
        app.innerHTML = `<p>Loading…</p>`;

        try {
            // If the handler is a function, call it to get the HTML content
            // This check is needed because the handler can be a Promise
            const {html, module} = (typeof handler === "function")
                ? await handler()
                : handler;

            // Ensure the token hasn't changed since the request started
            if (myToken === this.navToken) app.innerHTML = html ?? "";

            // Call the init method if it exists, from the specific page script.
            module.init?.();
            // Declare the cleanup function for the current page if exist.
            // This will be called when the user navigates to a different page. 
            // on line 98
            this.currentCleanup = module.cleanup || (() => {});
        } catch (err) {
            if (myToken === this.navToken)
                app.innerHTML = `<h1>❌ Fejl</h1><p>${err.message}</p>`;
        }
    }

    normalizePath(pathname) {
        // Always start with a leading slash
        let p = pathname.startsWith(LEADING_SLASH)
            ? pathname
            : LEADING_SLASH + pathname;

        // If the path is empty, return the root path
        return p === ""
            ? LEADING_SLASH
            : p;
    }
}
