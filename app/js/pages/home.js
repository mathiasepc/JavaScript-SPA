export function init() {
    console.log("Home page: setup eventlistener")
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        console.log("Button clicked");
    });
}

export function cleanup(){
    console.log("Home page: Clean up eventlistener");
}