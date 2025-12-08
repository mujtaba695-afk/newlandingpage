// Initialize Lucide Icons
lucide.createIcons();

// Sticky Header Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled', 'bg-white/95', 'backdrop-blur-sm');
        header.classList.remove('bg-white');
    } else {
        header.classList.remove('scrolled', 'bg-white/95', 'backdrop-blur-sm');
        header.classList.add('bg-white');
    }
});

// Form is now handled by Formspree - no custom JavaScript needed
