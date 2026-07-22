// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Lightweight client-side session guard for protected demo actions.
    // A production application must validate the session again on the server.
    const authSessionKey = 'schoolhealth.authenticated';
    const requireAuthenticated = (action) => {
        if (sessionStorage.getItem(authSessionKey) === 'true') {
            sessionStorage.setItem('schoolhealth.lastAuthenticatedAction', action);
            return true;
        }

        console.warn(`Authentication is required to ${action}.`);
        alert('Please sign in before continuing.');
        return false;
    };

    window.SchoolHealthAuth = {
        signIn() {
            sessionStorage.setItem(authSessionKey, 'true');
        },
        signOut() {
            sessionStorage.removeItem(authSessionKey);
        },
        requireAuthenticated
    };

    // School Types Slider
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide');
    
    if (prevBtn && nextBtn) {
        let currentSlide = 0;
        
        // Function to change slide
        const changeSlide = (direction) => {
            slides[currentSlide].classList.remove('active');
            
            if (direction === 'next') {
                currentSlide = (currentSlide + 1) % slides.length;
            } else {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }
            
            slides[currentSlide].classList.add('active');
        };
        
        // Event listeners for slider buttons
        nextBtn.addEventListener('click', () => changeSlide('next'));
        prevBtn.addEventListener('click', () => changeSlide('prev'));
    }
    
    // Chatbot Toggle
    const chatbotIcon = document.querySelector('.bot-icon');
    
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', function() {
            alert('Chat support is currently unavailable. Please contact us during business hours.');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // This is a placeholder - in a real implementation, you would add smooth scrolling to sections
            console.log('Navigation link clicked: ' + this.textContent);
        });
    });
    
    // Demo Button Click
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (!requireAuthenticated('schedule a demo')) return;
            alert('Thank you for your interest! A member of our team will contact you shortly to schedule a demo.');
        });
    });
    
    // Mobile Menu Toggle (for responsive design)
    // This is a placeholder for mobile menu functionality
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        
        if (nav) {
            // Create mobile menu toggle button
            const mobileMenuToggle = document.createElement('div');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
            
            // Add it to the DOM only on small screens
            if (window.innerWidth <= 768) {
                nav.querySelector('.container').appendChild(mobileMenuToggle);
                
                // Event listener for toggle
                mobileMenuToggle.addEventListener('click', function() {
                    document.querySelector('.nav-links').classList.toggle('active');
                    this.classList.toggle('active');
                });
            }
        }
    };
    
    // Call mobile menu function
    createMobileMenu();
    
    // Resize event for mobile menu
    window.addEventListener('resize', function() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 768) {
            if (!mobileMenuToggle) {
                createMobileMenu();
            }
        } else {
            if (mobileMenuToggle) {
                mobileMenuToggle.remove();
            }
        }
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 
