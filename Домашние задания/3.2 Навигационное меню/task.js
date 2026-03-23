const menuLinks = document.querySelectorAll('.menu__link');

function closeAllSubmenus() {
    document.querySelectorAll('.menu_sub.menu_active').forEach(submenu => {
        submenu.classList.remove('menu_active');
    });
}

menuLinks.forEach(link => {
    link.onclick = () => {
        const submenu = link.closest('.menu__item').querySelector('.menu_sub');
        
        if (submenu) {
            closeAllSubmenus();
            submenu.classList.add('menu_active');
            return false;
        }
        
        return true;
    };
});