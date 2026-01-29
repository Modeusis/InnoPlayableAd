document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Handling ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage or default
    const currentTheme = localStorage.getItem('hub-theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('hub-theme', theme);
    });

    // --- 2. Desktop Hover Logic ---
    // Only runs if screen is wide enough to show the side panel
    const items = document.querySelectorAll('.hub-item');
    const details = document.querySelectorAll('.project-details');
    const placeholder = document.querySelector('.preview-placeholder');

    // Helper to switch right panel content
    function showDetails(gameId) {
        // Hide placeholder
        if(placeholder) placeholder.style.display = 'none';

        // Hide all details
        details.forEach(d => d.classList.remove('active'));
        
        // Show specific detail
        const target = document.querySelector(`.project-details[data-target="${gameId}"]`);
        if (target) {
            target.classList.add('active');
        }

        // Highlight active list item
        items.forEach(i => i.classList.remove('active'));
        const activeItem = document.querySelector(`.hub-item[data-game="${gameId}"]`);
        if(activeItem) activeItem.classList.add('active');
    }

    items.forEach(item => {
        // Desktop: Hover to preview
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                const gameId = item.getAttribute('data-game');
                showDetails(gameId);
            }
        });

        // Desktop: Click also sets active state (optional but good for UX)
        item.addEventListener('click', (e) => {
            // If clicking the Play button inside the mobile card, don't trigger this
            if (e.target.classList.contains('play-btn')) return;

            if (window.innerWidth > 768) {
                const gameId = item.getAttribute('data-game');
                showDetails(gameId);
            }
        });
    });

    // Pre-select first item on Desktop load (optional)
    if (window.innerWidth > 768 && items.length > 0) {
        showDetails(items[0].getAttribute('data-game'));
    }
});