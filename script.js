document.addEventListener('DOMContentLoaded', () => {
    // --- Premium Reveal Animations (Optimized for Speed) ---
    const revealOptions = {
        threshold: 0.05, // Trigger sooner
        rootMargin: '0px 0px 100px 0px' // Load ahead of viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // If it's a text reveal, animate the inner span
                const textInner = entry.target.querySelector('.reveal-text span');
                if (textInner) {
                    textInner.style.transform = 'translateY(0)';
                }
                // Unobserve after reveal to save resources
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe various reveal types
    document.querySelectorAll('.reveal-fade, .reveal-text, .reveal-card').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Parallax Effect for Hero & Images ---
    const heroBg = document.querySelector('.hero-bg');
    const propertyImages = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero background parallax
        if (heroBg) {
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }

        // Sub-images parallax
        propertyImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = window.innerHeight - rect.top;
                img.style.transform = `translate3d(0, ${distance * 0.05}px, 0)`;
            }
        });
    });

    // --- Sticky Header Logic ---
    const header = document.querySelector('.header-main');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'var(--glass-bg)';
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'var(--glass-bg)';
            header.style.padding = '24px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.02)';
        }

        // Hide/Show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Slide-over Form Logic ---
    const slideOver = document.getElementById('calc-slide-over');
    const overlay = document.getElementById('calc-overlay');
    const openBtns = document.querySelectorAll('.open-calc-form');
    const closeBtn = document.querySelector('.close-slide');
    const ctaSourceInput = document.getElementById('form-source-cta');

    const toggleForm = (isOpen) => {
        if (isOpen) {
            slideOver.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            slideOver.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const source = btn.dataset.cta || 'Inquiry';
            if (ctaSourceInput) ctaSourceInput.value = source;
            toggleForm(true);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => toggleForm(false));
    if (overlay) overlay.addEventListener('click', () => toggleForm(false));

    // --- 📸 Gallery Carousel Logic ---
    const carousel = () => {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const nextButton = document.querySelector('.nav-next');
        const prevButton = document.querySelector('.nav-prev');
        const dotsNav = document.querySelector('.carousel-dots');

        if (!track || slides.length === 0) return;

        let currentIndex = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.querySelectorAll('.dot'));

        const updateDots = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        const moveToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots(index);
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
        });

        // Auto play
        let autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        }, 5000);

        // Pause auto play on interaction
        const resetAutoPlay = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                moveToSlide(currentIndex);
            }, 5000);
        };

        [nextButton, prevButton, dotsNav].forEach(el => {
            el.addEventListener('click', resetAutoPlay);
        });
    };

    carousel();

    // --- Magnetic Button Effect ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // --- Sticky Hub visibility ---
    const stickyHub = document.querySelector('.sticky-hub');
    const hero = document.querySelector('.hero-premium');

    if (stickyHub && hero) {
        window.addEventListener('scroll', () => {
            const heroHeight = hero.offsetHeight;
            if (window.scrollY > heroHeight - 100) {
                stickyHub.classList.add('visible');
            } else {
                stickyHub.classList.remove('visible');
            }
        });
    }

    // --- Check for Previous Submissions on Page Load ---
    const checkPreviousSubmission = () => {
        const submittedData = localStorage.getItem('waslTowerSubmission');
        if (submittedData) {
            const data = JSON.parse(submittedData);
            // Disable all submit buttons and show "already submitted" message
            allForms.forEach(form => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Already Submitted';
                    submitBtn.style.backgroundColor = '#95a5a6'; // Gray
                    submitBtn.disabled = true;
                    submitBtn.style.cursor = 'not-allowed';
                }
            });

            // Show a friendly notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 20px 30px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.5s ease;
            `;
            notification.innerHTML = `
                <i class="fas fa-info-circle"></i> You've already submitted an enquiry. We'll contact you shortly!
            `;
            document.body.appendChild(notification);

            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        }
    };

    // Check on page load
    checkPreviousSubmission();

    // --- Dynamic Form Handling (All Forms) with Duplicate Prevention ---
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get email or phone from the form
            const emailInput = form.querySelector('input[type="email"]');
            const phoneInput = form.querySelector('input[type="tel"]');

            const userEmail = emailInput ? emailInput.value : null;
            const userPhone = phoneInput ? phoneInput.value : null;

            // --- Custom Phone Validation (UAE Format) ---
            if (phoneInput) {
                const uaePhoneRegex = /^(\+971|0)?5[0-9]{8}$/;
                if (!uaePhoneRegex.test(userPhone)) {
                    phoneInput.setCustomValidity("Please enter a valid UAE mobile number (e.g., +971501234567 or 0501234567).");
                    phoneInput.reportValidity();
                    return;
                } else {
                    phoneInput.setCustomValidity("");
                }
            }

            // Check if user has already submitted
            const submittedData = localStorage.getItem('waslTowerSubmission');
            if (submittedData) {
                const data = JSON.parse(submittedData);

                // Check if email or phone matches
                if ((userEmail && data.email === userEmail) || (userPhone && data.phone === userPhone)) {
                    // Show "already submitted" message
                    const submitBtn = form.querySelector('button[type="submit"]');
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Already Submitted';
                    submitBtn.style.backgroundColor = '#e74c3c'; // Red

                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Already Submitted';
                        submitBtn.style.backgroundColor = '#95a5a6'; // Gray
                    }, 2000);

                    return; // Stop submission
                }
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Premium Loading State
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Store submission in localStorage
                const submissionData = {
                    email: userEmail,
                    phone: userPhone,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('waslTowerSubmission', JSON.stringify(submissionData));

                // Success State
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Received';
                submitBtn.style.backgroundColor = '#2ecc71'; // Success Green

                // Success State
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Received';
                submitBtn.style.backgroundColor = '#2ecc71'; // Success Green

                setTimeout(() => {
                    // Close form and keep button disabled permanently
                    if (slideOver && slideOver.classList.contains('active')) {
                        toggleForm(false);
                    }

                    // Reset form but keep button disabled
                    form.reset();

                    // Change button to "Already Submitted" state
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Already Submitted';
                    submitBtn.style.backgroundColor = '#95a5a6'; // Gray
                    submitBtn.style.cursor = 'not-allowed';
                    // Button remains disabled permanently
                }, 3000);
            }, 1500);
        });
    });

    // --- Smooth Anchor Scrolling Offset ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
