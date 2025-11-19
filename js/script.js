// Add interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
        feature.classList.add('float-animation');
    });

    const overlay = document.getElementById('gameOverlay');
    const phoneContainer = document.querySelector('.phone-simulator');

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            
            if (window.innerWidth < 768) {
                window.location.href='./fullscreen.html';

                return;
            }

            e.stopPropagation(); 
            this.classList.add('is-playing');
        });

        document.addEventListener('click', function(e) {
            if (overlay.classList.contains('is-playing')) {
                if (phoneContainer && !phoneContainer.contains(e.target)) {
                    overlay.classList.remove('is-playing');
                }
            }
        });
    }

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle navigation for CTA button
            if (this.classList.contains('cta-button')) {
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300);
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .character, .story-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add medieval sound effects (optional)
    const playMedievalSound = () => {
        // In a real application, you would play actual sound files
        console.log('⚔️ Medieval sound effect would play here!');
    };

    // Add sound to certain interactions
    const interactiveElements = document.querySelectorAll('.feature, .character, .cta-button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', playMedievalSound);
    });

    // Phone simulator interaction
    const phoneFrame = document.querySelector('.phone-frame');
    
    // ONLY add rotation click event if we are on a desktop (width > 768px)
    if (phoneFrame && window.innerWidth > 768) {
        phoneFrame.addEventListener('click', function() {
            this.style.transform = this.style.transform === 'rotateY(0deg)' ? 'rotateY(-5deg)' : 'rotateY(0deg)';
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .float-animation {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);