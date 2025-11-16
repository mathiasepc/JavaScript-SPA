const listeners = [];

export function init() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const btn = document.createElement('button');
        btn.type = "button";
        btn.textContent = "Show more";
        btn.className = 'mt-2 block mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
        //btn.className = 'mt-2 block mx-auto text-sm font-medium text-blue-700 hover:text-blue-900';
        card.append(btn);

        const clampEl = card.querySelector('.line-clamp-5');
        const toggleClamp = (visible) => {
            clampEl.classList.toggle('line-clamp-5', visible === true);
            clampEl.classList.toggle('line-clamp-none', visible === false);
        }

        const handler = () => {
            const isClamp = clampEl.classList.contains('line-clamp-5');
            if (isClamp) {
                btn.textContent = "Show less";
                toggleClamp(false);
            } else {
                btn.textContent = "Show more";
                toggleClamp(true);
            }
        }

        btn.addEventListener('click', handler);
        listeners.push({ el: btn, handler, type: 'click' });

    });
}

export function cleanup() {
    document.addEventListener
    listeners.forEach(({ el, handler, type }) => {
        el.removeEventListener(type, handler);
    });
    listeners.length = 0;
}