const listeners = [];

export function init() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const btn = document.createElement('button');
        btn.type = "button";
        btn.textContent = "Show more";
        btn.className = 'mt-2 text-sm font-medium text-blue-700 hover:underline focus:outline-none';
        card.append(btn);

        const aEl = card.querySelector('a');
        const setLinkVisible = (visible) => {
            aEl.classList.toggle('inline-flex', visible === true);
            aEl.classList.toggle('hidden', visible === false);
        }
        setLinkVisible(false);

        const clampEl = card.querySelector('.line-clamp-5');
        const toggleClamp = (visible) => {
                clampEl.classList.toggle('line-clamp-5', visible === true);
                clampEl.classList.toggle('line-clamp-none', visible === false);
        }

        const handler = () => {
            const isClamp = clampEl.classList.contains('line-clamp-5');
            if (isClamp) {
                btn.textContent = "Show less";
                setLinkVisible(true);
                toggleClamp(false);
            } else {
                btn.textContent = "Show more";
                setLinkVisible(false);
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