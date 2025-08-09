// Haunted Empire - Enhanced Main JavaScript
// Modern UI/UX interactions and animations

// ===== ENHANCED UI INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedUI();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeParticleEffects();
    initializeTypewriterEffect();
    initializeCountdown();
    initializeParallax();
});

// ===== ENHANCED UI COMPONENTS =====

function initializeEnhancedUI() {
    // Add loading spinner to buttons on click
    document.querySelectorAll('.horror-btn, .ghost-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                this.innerHTML = '<div class="loading-spinner"></div>';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // Enhanced hover effects for cards
    document.querySelectorAll('.enhanced-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriterEffect() {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #ff6b6b';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Counter animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.enhanced-card, .stat-item, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, 16);
}

// ===== PARTICLE EFFECTS =====
function initializeParticleEffects() {
    // Create floating particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particleContainer);

    // Generate particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const symbols = ['👻', '🦇', '🕷️', '⚡', '💀', '🔮'];
    
    particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.1};
        animation: floatParticle ${Math.random() * 10 + 5}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, (Math.random() * 10 + 5) * 1000);
}

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target date (24 hours from now)
    const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

// ===== PARALLAX SCROLLING =====
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== ENHANCED MODAL SYSTEM =====
function showModal(title, content, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'enhanced-modal-overlay';
    modal.innerHTML = `
        <div class="enhanced-modal ${type}">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.enhanced-modal').style.transform = 'scale(1) translateY(0)';
    }, 10);
}

function closeModal(button) {
    const modal = button.closest('.enhanced-modal-overlay');
    modal.style.opacity = '0';
    modal.querySelector('.enhanced-modal').style.transform = 'scale(0.8) translateY(-50px)';
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentNode.parentNode.remove()">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
    }
}

// Backend integration
// Use API_BASE_URL from config.js - no duplicate declaration needed

// Stripe payment trigger
async function triggerStripePayment() {
    try {
        const response = await fetch(`${API_BASE_URL}/stripe/test-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('API returned non-JSON response');
        }
        
        const data = await response.json();
        if (data.clientSecret) {
            showAlert('Stripe payment intent created!');
        } else {
            showAlert('Stripe payment failed.');
        }
    } catch (err) {
        console.warn('Stripe payment error:', err.message);
        showAlert('Stripe payment service temporarily unavailable');
    }
}

// Lore drop trigger
async function triggerLoreDrop() {
    try {
        const response = await fetch(`${API_BASE_URL}/lore/drop-live`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('API returned non-JSON response');
        }
        
        const data = await response.json();
        if (data.status === 'lore drop triggered') {
            showAlert('Live lore drop triggered!');
        } else {
            showAlert('Lore drop failed.');
        }
    } catch (err) {
        console.warn('Lore drop error:', err.message);
        showAlert('Lore drop service temporarily unavailable');
    }
}

// Real-time feedback (example: fetch stats)
async function fetchStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/test-connect`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('API returned non-JSON response');
        }
        
        const data = await response.json();
        if (data.status === 'ok') {
            updateStats('Backend: ' + data.env);
        } else {
            updateStats('Backend unavailable');
        }
    } catch (err) {
        console.warn('Backend connection error:', err.message);
        updateStats('Backend: Offline (Demo Mode)');
    }
}

// UI helpers
function showAlert(message) {
    let alertBox = document.getElementById('alert-box');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'alert-box';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.right = '20px';
        alertBox.style.background = '#222';
        alertBox.style.color = '#fff';
        alertBox.style.padding = '1rem 2rem';
        alertBox.style.borderRadius = '8px';
        alertBox.style.zIndex = '9999';
        document.body.appendChild(alertBox);
    }
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => { alertBox.style.display = 'none'; }, 3500);
}

function updateStats(message) {
    let statsBox = document.getElementById('stats-box');
    if (!statsBox) {
        statsBox = document.createElement('div');
        statsBox.id = 'stats-box';
        statsBox.style.position = 'fixed';
        statsBox.style.bottom = '20px';
        statsBox.style.right = '20px';
        statsBox.style.background = '#333';
        statsBox.style.color = '#fff';
        statsBox.style.padding = '0.5rem 1.5rem';
        statsBox.style.borderRadius = '8px';
        statsBox.style.zIndex = '9999';
        document.body.appendChild(statsBox);
    }
    statsBox.textContent = message;
    statsBox.style.display = 'block';
}

// Example: call fetchStats on page load
document.addEventListener('DOMContentLoaded', fetchStats);
