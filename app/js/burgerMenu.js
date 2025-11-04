document.addEventListener('DOMContentLoaded', () => {
    // Variable for button and menu
    const burgerBtn = document.querySelector('[data-burgermenu-toggle]');
    const burgerMenuId = burgerBtn.getAttribute('aria-controls');
    const burgerMenu = document.getElementById(burgerMenuId);

    // Variable for profile button and profile menu
    const profileBtn = document.querySelector('[data-profile-toggle]');
    const profileMenuId = profileBtn.getAttribute('aria-controls');
    const profileMenu = document.getElementById(profileMenuId);

    const hideProfileMenu = () => {
        // Tells if the menu is hidden or not
        profileMenu.classList.add('hidden');
        // aria-expanded is used for accessibility for the profile menu
        profileBtn.setAttribute('aria-expanded', 'false');
    }

    const showProfileMenu = () => {
        profileMenu.classList.remove('hidden');
        // aria-expanded is used for accessibility for the profile menu
        // It tells screen readers whether the menu is expanded or collapsed
        profileBtn.setAttribute('aria-expanded', 'true');
    }

    const toggleProfileMenu = () => {
        const isHidden = profileMenu.classList.contains('hidden');
        isHidden ? showProfileMenu() : hideProfileMenu();
    }

    hideProfileMenu();

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProfileMenu();
    })

    // Function for showing and hiding the menu
    const hideBurgerMenu = () => {
        // Tells if the menu is hidden or not
        burgerMenu.classList.add('hidden');
        // aria-expanded is used for accessibility for the burgerBtn
        // It tells screen readers whether the menu is expanded or collapsed
        burgerBtn.setAttribute('aria-expanded', 'false');
    };
    const showBurgerMenu = () => {
        // Tells if the menu is hidden or not
        burgerMenu.classList.remove('hidden');
        // aria-expanded is used for accessibility for the burgerBtn
        // It tells screen readers whether the menu is expanded or collapsed
        burgerBtn.setAttribute('aria-expanded', 'true');
    };

    // Function for toggling the menu
    const toggleBurgerMenu = () => {
        const isHidden = burgerMenu.classList.contains('hidden');
        isHidden ? showBurgerMenu() : hideBurgerMenu();
    };

    // Starting point: hide the menu initially
    hideBurgerMenu();

    // Toogle menu when clicked
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBurgerMenu();
    });

    // If you click outside the menu, hide it
    document.addEventListener('click', (e) => {
        // If the target is not inside the burgerBtn or burgerMenu
        const outsideBurger = !burgerMenu.contains(e.target) && !burgerBtn.contains(e.target);
        const outsideProfile = !profileMenu.contains(e.target) && !profileBtn.contains(e.target);

        // hide the menu if you click outside the burgerBtn or burgerMenu / profileBtn or profileMenu
        if (outsideBurger && burgerBtn.getAttribute('aria-expanded') === 'true') hideBurgerMenu();
        if (outsideProfile && profileBtn.getAttribute('aria-expanded') === 'true') hideProfileMenu();
    });

    // If you press the escape key, hide the menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerBtn.getAttribute('aria-expanded') === 'true') {
            hideBurgerMenu();
            burgerBtn.focus();
        }
    });
});