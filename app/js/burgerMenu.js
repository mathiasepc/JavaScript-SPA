document.addEventListener('DOMContentLoaded', () => {
    // Variable for button and menu
    const btn = document.querySelector('[data-collapse-toggle]');
    if (!btn) return;
    const targetId = btn.getAttribute('aria-controls');
    const menu = document.getElementById(targetId);
    if (!menu) return;

    // Function for showing and hiding the menu
    const hide = () => {
        menu.classList.add('hidden');
        // aria-expanded is used for accessibility
        // It tells screen readers whether the menu is expanded or collapsed
        btn.setAttribute('aria-expanded', 'false');
    };
    const show = () => {
        menu.classList.remove('hidden');
        // aria-expanded is used for accessibility
        // It tells screen readers whether the menu is expanded or collapsed
        btn.setAttribute('aria-expanded', 'true');
    };

    // Function for toggling the menu
    const toggle = () => {
        const isHidden = menu.classList.contains('hidden');
        isHidden ? show() : hide();
    };

    // Starting point: hide the menu initially
    hide();

    // Toogle menu ved klik
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });

    // If you click outside the menu, hide it
    document.addEventListener('click', (e) => {
        const clickOutside = !menu.contains(e.target) && !btn.contains(e.target);
        if (clickOutside && btn.getAttribute('aria-expanded') === 'true') hide();
    });

    // If you press the escape key, hide the menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            hide();
            btn.focus();
        }
    });
});