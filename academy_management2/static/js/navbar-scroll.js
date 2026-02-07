// Navbar Auto-hide on Scroll
(function() {
    let lastScrollTop = 0;
    let scrollThreshold = 5; // Minimum scroll distance to trigger
    let isScrolling;
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return; // Exit if navbar doesn't exist (login page)
    
    window.addEventListener('scroll', function() {
        // Clear timeout if it exists
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Don't do anything if at the top of the page
            if (scrollTop < 10) {
                navbar.classList.remove('navbar-minimal');
                navbar.classList.remove('navbar-hidden');
                lastScrollTop = scrollTop;
                return;
            }
            
            // Determine scroll direction
            if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    navbar.classList.add('navbar-minimal');
                    
                    // Optionally hide completely on mobile
                    if (window.innerWidth <= 768 && scrollTop > 200) {
                        navbar.classList.add('navbar-hidden');
                    }
                } else {
                    // Scrolling up
                    navbar.classList.remove('navbar-minimal');
                    navbar.classList.remove('navbar-hidden');
                }
                
                lastScrollTop = scrollTop;
            }
        }, 50); // Wait 50ms after scrolling stops
    }, false);
    
    // Optional: Show navbar on mouse move near top
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 100) {
            navbar.classList.remove('navbar-hidden');
        }
    });
    
    // Touch devices - show navbar when touching near top
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        let touchY = e.touches[0].clientY;
        
        // If swiping down from top area, show navbar
        if (touchStartY < 100 && touchY > touchStartY) {
            navbar.classList.remove('navbar-hidden');
        }
    });
})();