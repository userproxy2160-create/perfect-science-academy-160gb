// Add click sound to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add sound to all buttons, links, and interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .btn, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', (e) => {
            // Don't play sound for logout or if sound is being toggled
            if (!element.classList.contains('logout') && element.id !== 'soundToggle') {
                playSound('click');
            }
        });
    });
    
    // Add hover effects
    const cards = document.querySelectorAll('.stat-card, .card-enter');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Modal close on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        playSound('click');
    }
});

// Escape key closes modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            playSound('click');
        });
    }
});