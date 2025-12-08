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

// 1. Enforce digits-only for phone numbers
document.querySelectorAll('input[name="phone"]').forEach(input => {
    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/\D/g, '');
    });
});

// 2. Prevent Double Submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = 'Sending...';
        }
    });
});

// 3. Clear forms on page load (handles back/forward cache)
window.addEventListener('pageshow', function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != 'undefined' &&
            window.performance.navigation.type === 2);
    if (historyTraversal) {
        // Handle page restore.
        document.querySelectorAll('form').forEach(form => {
            form.reset();
            // Re-enable button if it was disabled
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Submit Inquiry';
            }
        });
    }
});

// Also clear on clean load to be sure
document.addEventListener('DOMContentLoaded', () => {
    // Force reset on load with a small delay to override browser autofill
    setTimeout(() => {
        document.querySelectorAll('form').forEach(form => {
            form.reset();
            form.querySelectorAll('input').forEach(input => input.setAttribute('autocomplete', 'off'));
        });
    }, 100);

    // 1. Enforce digits-only for phone numbers (multiple events for mobile support)
    document.querySelectorAll('input[name="phone"]').forEach(input => {
        ['input', 'keydown', 'keyup', 'change', 'paste'].forEach(eventType => {
            input.addEventListener(eventType, function (e) {
                // Allow navigation keys (backspace, arrows, delete, tab)
                if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(e.key)) return;

                // Replace non-digits immediately
                this.value = this.value.replace(/\D/g, '');
            });
        });
    });

    // 2. Prevent Double Submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Sending...';
                btn.style.opacity = '0.7';
                btn.style.cursor = 'wait';

                // Re-enable after 10 seconds just in case (network timeout)
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = 'Submit Inquiry';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }, 10000);
            }
        });
    });
});

// 3. Clear forms on page show (handles back/forward cache)
window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        // Force reset again on back navigation
        setTimeout(() => {
            document.querySelectorAll('form').forEach(form => {
                form.reset();
                const btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = 'Submit Inquiry';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            });
        }, 50);
    }
});
