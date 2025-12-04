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

// Carousel Functionality
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
const thumbnails = document.querySelectorAll('.thumbnail-btn');
const totalSlides = slides.length;

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    // Update carousel position
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
            indicator.classList.remove('bg-white/50');
            indicator.classList.add('bg-white');
        } else {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
        }
    });

    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
        if (i === currentSlide) {
            thumb.classList.add('border-primary');
            thumb.classList.remove('border-transparent');
        } else {
            thumb.classList.remove('border-primary');
            thumb.classList.add('border-transparent');
        }
    });
}

// Navigation buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Thumbnail clicks
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto-play carousel (optional - every 5 seconds)
let autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Pause autoplay on hover
carousel.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.parentElement.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});

// Form is handled by Formspree - no custom JavaScript needed
