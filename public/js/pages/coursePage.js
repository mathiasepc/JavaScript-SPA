const listeners = [];

export function init() {
    const cards = document.querySelectorAll('.card');
    const maxWords = 60;

    cards.forEach(card => {
        const textEl = card.querySelector('p');
        const headingEl = card.querySelector('h5');

        const remaningWords = maxWords - headingEl.textContent.trim()
            // Split by spaces
            .split(/\s+/)
            // Remove empty words
            .filter(word => word.length > 0).length;

        const words = textEl.textContent.trim().split(/\s+/);

        const smallText = words.slice(0, remaningWords).join(' ') + '...';

        textEl.dataset.smallText = smallText;
        textEl.dataset.fullText = textEl.textContent;
        textEl.textContent = smallText;

        const btn = document.createElement('button');
        btn.type = "button";
        btn.textContent = "Show more";
        btn.className = 'mt-2 text-sm font-medium text-blue-700 hover:underline focus:outline-none';
        btn.setAttribute('aria-expanded', 'false');

        card.appendChild(btn);

        const aEl = card.querySelector('a');   
        const setLinkVisible = (visible) => {
            aEl.classList.toggle('hidden', !visible);
            aEl.classList.toggle('inline-flex', visible);
        }
        setLinkVisible(false);

        const handler = () => {
            console.log("Button clicked");
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Vi FOLDER SAMMEN → kort tekst, "Show more", skjul link
                textEl.textContent = textEl.dataset.smallText;
                btn.textContent = "Show more";
                btn.setAttribute('aria-expanded', 'false');
                setLinkVisible(false);
                
            } else {
                // Vi FOLDER UD → fuld tekst, "Show less", vis link
                textEl.textContent = textEl.dataset.fullText;
                btn.textContent = "Show less";
                btn.setAttribute('aria-expanded', 'true');
                setLinkVisible(true);
            }
        }

        btn.addEventListener('click', handler);

        listeners.push({ el: btn, handler, type: 'click' });

    });

}
/*
export function cleanup() {
    listeners.forEach(({ el, handler, type }) => {
        el.removeEventListener(type, handler);
    });
    listeners.length = 0;
}*/