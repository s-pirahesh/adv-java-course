document.addEventListener('DOMContentLoaded', () => {
    const navHeaders = document.querySelectorAll('.nav-header');

    navHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other open menus at the same level
            const level = header.classList.contains('level-1') ? 'level-1' : 'level-2';
            document.querySelectorAll(`.nav-header.${level}.open`).forEach(openHeader => {
                if (openHeader !== header) {
                    openHeader.classList.remove('open');
                    const openSubmenu = openHeader.nextElementSibling;
                    if (openSubmenu && openSubmenu.classList.contains('submenu')) {
                        openSubmenu.classList.remove('open');
                    }
                }
            });

            // Toggle the clicked menu
            header.classList.toggle('open');
            const submenu = header.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
            }
        });
    });

    // Automatically open the menu for the current active page
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        let parent = activeLink.closest('.submenu');
        while (parent) {
            parent.classList.add('open');
            const prevHeader = parent.previousElementSibling;
            if (prevHeader && prevHeader.classList.contains('nav-header')) {
                prevHeader.classList.add('open');
            }
            parent = prevHeader.closest('.submenu');
        }
    }
});