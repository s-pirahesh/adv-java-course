document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeaders = document.querySelectorAll('.nav-header');

    // --- NEW: Mobile Menu Functionality ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
    // --- End of Mobile Menu Functionality ---

    // Function to handle section link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname !== window.location.hostname || this.pathname !== window.location.pathname) {
                return; // Let the browser handle links to other pages
            }
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // ... (بقیه کد بدون تغییر باقی می‌ماند)
        });
    });

    // Function to show a specific section and hide others
    function showSection(targetId, updateHistory = true) {
        // Hide all sections
        document.querySelectorAll('#main-content section').forEach(section => {
            section.style.display = 'none';
        });

        // Show the target section
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.style.display = 'block';
            if (updateHistory) {
                // Smooth scroll to the top of the section
                window.scrollTo({ top: targetElement.offsetTop - 20, behavior: 'smooth' });
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        }
    }

    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link points to a different HTML file
            if (this.hostname !== window.location.hostname || this.pathname !== window.location.pathname) {
                // It's a link to another page, let the browser handle it
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            showSection(targetId);

            // Close sidebar on mobile after click
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
            }
        });
    });

    // Handle menu header clicks for expanding/collapsing
    navHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('open');
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
            }
        });
    });

    // --- Initial Page Load Logic ---
    const currentHash = window.location.hash;
    if (currentHash) {
        // If there's a hash in the URL, show that section
        showSection(currentHash, false);
        // Also update the active link in the sidebar
        const activeLink = document.querySelector(`.nav-link[href='${currentHash}']`);
        if (activeLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    } else {
        // If no hash, show the very first section by default
        const firstSection = document.querySelector('#main-content section');
        if (firstSection) {
            showSection('#' + firstSection.id, false);
        }
    }
});


// --- Copy Button Functionality ---
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function() {
        const preElement = this.closest('.code-block-container').querySelector('pre');
        if (preElement) {
            // Create a temporary textarea to hold the text and copy it
            const textarea = document.createElement('textarea');
            textarea.value = preElement.innerText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // Provide user feedback
            const originalText = this.innerText;
            this.innerText = 'کپی شد!';
            this.disabled = true;
            setTimeout(() => {
                this.innerText = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});