/* ===================================
   Main JavaScript - Advanced Java Course
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Sidebar Toggle (Mobile)
    // ===================================
    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuToggle && sidebar && overlay) {
        // Open sidebar
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });
        
        // Close sidebar when clicking overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
        
        // Close sidebar on window resize (desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    }
    
    // ===================================
    // Submenu Toggle (Collapsible Sections)
    // ===================================
    
    const navHeaders = document.querySelectorAll('.nav-menu > li > header');
    
    navHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            
            if (submenu && submenu.classList.contains('submenu')) {
                // Toggle classes
                this.classList.toggle('open');
                submenu.classList.toggle('open');
            }
        });
        
        // Open by default if it contains active link
        const submenu = header.nextElementSibling;
        if (submenu && submenu.querySelector('.nav-link.active')) {
            header.classList.add('open');
            submenu.classList.add('open');
        }
    });
    
    // ===================================
    // Copy Code Button
    // ===================================
    
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.nextElementSibling.querySelector('code');
            const code = codeBlock.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'کپی شد! ✓';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.textContent = 'خطا!';
                setTimeout(() => {
                    this.textContent = 'کپی';
                }, 2000);
            });
        });
    });
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.getElementById('top-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile sidebar if open
                if (window.innerWidth < 1024) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                }
            }
        });
    });
    
    // ===================================
    // Active Section Highlighting in Sidebar
    // ===================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveSection() {
        const headerHeight = document.getElementById('top-header').offsetHeight;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveSection();
        });
    });
    
    // Initial call
    updateActiveSection();
    
    // ===================================
    // Progress Tracking (LocalStorage)
    // ===================================
    
    function initProgressTracking() {
        // Get current page
        const currentPath = window.location.pathname;
        const pageMatch = currentPath.match(/part(\d+)\.html/);
        
        if (!pageMatch) return;
        
        const partNumber = parseInt(pageMatch[1]);
        
        // Load progress
        let progress = JSON.parse(localStorage.getItem('courseProgress') || '{"completedParts": [], "lastVisited": null}');
        
        // Update last visited
        progress.lastVisited = `part${partNumber.toString().padStart(2, '0')}`;
        progress.timestamp = new Date().toISOString();
        
        // Save progress
        localStorage.setItem('courseProgress', JSON.stringify(progress));
        
        // Add "Mark as Complete" button (optional - can be implemented later)
        console.log('Progress tracking initialized for Part', partNumber);
    }
    
    initProgressTracking();
    
    // ===================================
    // External Links - Open in New Tab
    // ===================================
    
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Skip if it's the same domain
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log('%c🎓 برنامه‌سازی پیشرفته (جاوا)', 'font-size: 20px; font-weight: bold; color: #14B8A6;');
    console.log('%cمدرس: سید سجاد پیراهش', 'font-size: 14px; color: #6B7280;');
    console.log('%cدانشگاه آزاد اسلامی واحد تبریز', 'font-size: 12px; color: #9CA3AF;');
    
});

// ===================================
// Service Worker Registration (Optional - for offline support)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment when ready to implement offline support
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered:', reg))
    //     .catch(err => console.log('Service Worker error:', err));
}
