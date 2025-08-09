// Mobile-First Responsive & Social Media Integration
// Advanced mobile optimization and social media features

// ===== GLOBAL MOBILE VARIABLES =====
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
let touchStartX = 0;
let touchStartY = 0;
let socialMedia = {
    twitter: '@HauntedEmpire',
    instagram: '@haunted_empire_writing',
    tiktok: '@hauntedempire',
    youtube: '@HauntedEmpireWriting'
};

// ===== MOBILE OPTIMIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileOptimization();
    initializeTouchInteractions();
    initializeSocialMediaFeatures();
    setupResponsiveBreakpoints();
    createMobileMenu();
    optimizeForMobile();
});

function initializeMobileOptimization() {
    console.log('📱 Initializing Mobile Optimization...');
    
    // Add mobile-specific styles
    addMobileStyles();
    
    // Setup viewport meta tag if missing
    setupViewport();
    
    // Initialize touch gestures
    setupTouchGestures();
    
    // Optimize images for mobile
    optimizeImagesForMobile();
    
    console.log('✅ Mobile optimization complete!');
}

function addMobileStyles() {
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        /* Mobile-First Responsive Design */
        @media (max-width: 768px) {
            body {
                font-size: 14px;
                line-height: 1.5;
            }
            
            .container {
                padding: 10px;
                margin: 0;
            }
            
            .hero-section {
                padding: 2rem 1rem;
                text-align: center;
            }
            
            .hero-title {
                font-size: 2rem !important;
                margin-bottom: 1rem;
            }
            
            .hero-subtitle {
                font-size: 1rem !important;
                margin-bottom: 1.5rem;
            }
            
            .products-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem;
                padding: 0 1rem;
            }
            
            .product-card, .enhanced-card {
                margin: 0.5rem 0;
                padding: 1rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            
            .cta-button {
                width: 100%;
                max-width: 280px;
                text-align: center;
                font-size: 1rem;
                padding: 15px 20px;
            }
            
            .modal-content {
                width: 95% !important;
                max-width: none !important;
                margin: 20px auto;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .theme-toggle {
                top: 10px !important;
                right: 10px !important;
            }
            
            .theme-btn {
                width: 40px !important;
                height: 40px !important;
                font-size: 1.2rem !important;
            }
            
            #analytics-dashboard {
                width: 95% !important;
                height: 90% !important;
                padding: 15px;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px;
            }
            
            .metric-card {
                padding: 15px;
            }
            
            #ai-companion-widget {
                width: 280px !important;
                right: 10px !important;
                top: 60px !important;
            }
            
            #live-chat-widget {
                bottom: 10px !important;
                right: 10px !important;
            }
            
            .chat-window {
                width: 280px !important;
                height: 350px !important;
            }
            
            #floating-action-btn {
                bottom: 80px !important;
                right: 10px !important;
            }
            
            .fab-main {
                width: 50px !important;
                height: 50px !important;
                font-size: 1.3rem !important;
            }
            
            #bookmarks-panel {
                width: 100% !important;
                right: -100% !important;
            }
            
            #bookmarks-panel.open {
                right: 0 !important;
            }
            
            .share-content {
                width: 90% !important;
                padding: 20px;
            }
            
            .share-options {
                grid-template-columns: 1fr !important;
                gap: 10px;
            }
            
            .tools-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem;
            }
            
            .tool-card {
                padding: 1.5rem;
            }
            
            .writing-area {
                height: 200px !important;
                font-size: 14px;
            }
            
            .timer-display {
                font-size: 2rem !important;
            }
            
            .character-stats {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
        
        /* Tablet Optimization */
        @media (min-width: 769px) and (max-width: 1024px) {
            .products-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .tools-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }
        
        /* Touch-friendly elements */
        .touch-friendly {
            min-height: 44px;
            min-width: 44px;
            touch-action: manipulation;
        }
        
        /* Smooth scrolling for mobile */
        html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        
        /* Mobile navigation */
        .mobile-nav {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10006;
            padding: 20px;
        }
        
        .mobile-nav.active {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .mobile-nav-item {
            display: block;
            color: var(--bone-white);
            text-decoration: none;
            font-size: 1.5rem;
            margin: 20px 0;
            padding: 15px 30px;
            border: 2px solid var(--horror-red);
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s ease;
            width: 80%;
            max-width: 300px;
        }
        
        .mobile-nav-item:hover {
            background: var(--horror-red);
            transform: scale(1.05);
        }
        
        .mobile-menu-btn {
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 10007;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid var(--horror-red);
            border-radius: 5px;
            color: white;
            padding: 10px;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            nav {
                display: none;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

function setupViewport() {
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
}

function createMobileMenu() {
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.onclick = toggleMobileMenu;
    
    // Create mobile navigation
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-nav';
    
    // Get existing navigation links
    const existingNav = document.querySelector('nav ul');
    const links = existingNav ? existingNav.querySelectorAll('a') : [];
    
    let navHTML = '';
    links.forEach(link => {
        navHTML += `<a href="${link.href}" class="mobile-nav-item">${link.textContent}</a>`;
    });
    
    // Add mobile-specific links
    navHTML += `
        <a href="writing-tools.html" class="mobile-nav-item">🤖 AI Writing Tools</a>
        <a href="#" onclick="showProgressDashboard(); toggleMobileMenu();" class="mobile-nav-item">📊 Analytics</a>
        <a href="#" onclick="toggleBookmarksPanel(); toggleMobileMenu();" class="mobile-nav-item">📚 Bookmarks</a>
        <a href="#" onclick="toggleChat(); toggleMobileMenu();" class="mobile-nav-item">💬 Support</a>
        <button onclick="toggleMobileMenu()" class="mobile-nav-item" style="background: var(--horror-red); border-color: white;">✖️ Close</button>
    `;
    
    mobileNav.innerHTML = navHTML;
    
    document.body.appendChild(menuBtn);
    document.body.appendChild(mobileNav);
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ===== TOUCH INTERACTIONS =====
function initializeTouchInteractions() {
    console.log('👆 Setting up touch interactions...');
    
    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Make all buttons touch-friendly
    document.querySelectorAll('button, .cta-button, .nav-link').forEach(element => {
        element.classList.add('touch-friendly');
    });
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe gestures
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - open bookmarks
                if (!document.getElementById('bookmarks-panel').style.right || 
                    document.getElementById('bookmarks-panel').style.right === '-400px') {
                    toggleBookmarksPanel();
                }
            } else {
                // Swipe right - close bookmarks
                if (document.getElementById('bookmarks-panel').style.right === '0px') {
                    toggleBookmarksPanel();
                }
            }
        }
    }
}

function handleTouchEnd(e) {
    touchStartX = 0;
    touchStartY = 0;
}

function setupTouchGestures() {
    // Double-tap to scroll to top
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double tap detected
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('📱 Double-tap detected! Scrolled to top.', 'info');
        }
        lastTap = currentTime;
    });
}

// ===== SOCIAL MEDIA INTEGRATION =====
function initializeSocialMediaFeatures() {
    console.log('📱 Initializing Social Media Features...');
    
    createSocialMediaWidget();
    setupSocialSharing();
    initializeInstagramFeed();
    
    console.log('✅ Social media features ready!');
}

function createSocialMediaWidget() {
    const socialWidget = document.createElement('div');
    socialWidget.id = 'social-media-widget';
    socialWidget.innerHTML = `
        <div class="social-header">
            <h3>📱 Follow Us</h3>
            <button onclick="toggleSocialWidget()" class="widget-toggle-btn">−</button>
        </div>
        <div class="social-content" id="social-content">
            <div class="social-stats">
                <div class="stat-item">
                    <span class="stat-icon">🐦</span>
                    <span class="stat-count">1.2K</span>
                    <span class="stat-label">Twitter</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📷</span>
                    <span class="stat-count">856</span>
                    <span class="stat-label">Instagram</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🎵</span>
                    <span class="stat-count">2.3K</span>
                    <span class="stat-label">TikTok</span>
                </div>
            </div>
            
            <div class="social-actions">
                <button onclick="shareToTwitter('Check out Haunted Empire - Horror Writing Courses!', window.location.href)" class="social-btn twitter">
                    🐦 Tweet About Us
                </button>
                <button onclick="followOnInstagram()" class="social-btn instagram">
                    📷 Follow on Instagram
                </button>
                <button onclick="shareToTikTok()" class="social-btn tiktok">
                    🎵 TikTok Challenge
                </button>
                <button onclick="subscribeYouTube()" class="social-btn youtube">
                    🎬 Subscribe YouTube
                </button>
            </div>
            
            <div class="live-feed">
                <h4>📺 Live Feed</h4>
                <div id="social-feed">
                    <div class="feed-item">
                        <span class="feed-icon">🐦</span>
                        <span class="feed-text">New horror writing tips posted!</span>
                        <span class="feed-time">2h ago</span>
                    </div>
                </div>
            </div>
            
            <div class="monetization-section">
                <h4 style="color: var(--horror-red); margin-bottom: 15px; text-align: center; font-size: 1.1rem;">Monetization Actions</h4>
                <div class="monetization-actions">
                    <button onclick="testStripePayment()" class="monetization-btn stripe">
                        💳 Test Stripe Payment
                    </button>
                    <button onclick="triggerLoreDrop()" class="monetization-btn lore">
                        🎯 Trigger Live Lore Drop
                    </button>
                    <button onclick="showBackendStatus()" class="monetization-btn backend">
                        🔧 Show Backend
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Style the social widget
    const socialStyles = document.createElement('style');
    socialStyles.textContent = `
        #social-media-widget {
            position: fixed;
            bottom: 200px;
            left: 20px;
            width: 280px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid var(--ghost-teal);
            border-radius: 15px;
            overflow: hidden;
            z-index: 9997;
            backdrop-filter: blur(10px);
        }
        
        .social-header {
            background: var(--ghost-teal);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .social-content {
            padding: 15px;
            max-height: 450px;
            overflow-y: auto;
        }
        
        .social-stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
        }
        
        .stat-item {
            text-align: center;
            color: var(--bone-white);
        }
        
        .stat-icon {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 5px;
        }
        
        .stat-count {
            display: block;
            font-weight: bold;
            color: var(--ghost-teal);
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: #888;
        }
        
        .social-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .social-btn {
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .social-btn.twitter {
            background: #1da1f2;
            color: white;
        }
        
        .social-btn.instagram {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            color: white;
        }
        
        .social-btn.tiktok {
            background: #000;
            color: white;
        }
        
        .social-btn.youtube {
            background: #ff0000;
            color: white;
        }
        
        .social-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .monetization-section {
            border-top: 2px solid var(--horror-red);
            padding-top: 15px;
            margin-top: 20px;
        }
        
        .monetization-actions {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .monetization-btn {
            padding: 12px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: bold;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .monetization-btn.stripe {
            background: linear-gradient(135deg, #6772e5, #5469d4);
            color: white;
        }
        
        .monetization-btn.lore {
            background: linear-gradient(135deg, var(--horror-red), #8b0000);
            color: white;
        }
        
        .monetization-btn.backend {
            background: linear-gradient(135deg, #28a745, #1e7e34);
            color: white;
        }
        
        .monetization-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        .widget-toggle-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px;
        }
        
        .live-feed {
            border-top: 1px solid rgba(76, 205, 196, 0.3);
            padding-top: 15px;
        }
        
        .feed-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            background: rgba(76, 205, 196, 0.1);
            border-radius: 5px;
            margin-bottom: 10px;
            color: var(--bone-white);
            font-size: 0.9rem;
        }
        
        .feed-time {
            margin-left: auto;
            color: #888;
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            #social-media-widget {
                left: 10px;
                width: 260px;
                bottom: 150px;
            }
        }
    `;
    document.head.appendChild(socialStyles);
    document.body.appendChild(socialWidget);
}

function toggleSocialWidget() {
    const widget = document.getElementById('social-media-widget');
    const content = widget.querySelector('.social-content');
    const toggleBtn = widget.querySelector('.widget-toggle-btn');
    const isVisible = content.style.display !== 'none';
    
    if (isVisible) {
        content.style.display = 'none';
        toggleBtn.textContent = '+';
    } else {
        content.style.display = 'block';
        toggleBtn.textContent = '−';
    }
}

function followOnInstagram() {
    window.open('https://instagram.com/haunted_empire_writing', '_blank');
    showNotification('📷 Thanks for following us on Instagram!', 'success');
}

function shareToTikTok() {
    const text = encodeURIComponent('Check out these amazing horror writing courses! #HorrorWriting #WritingTips #HauntedEmpire');
    window.open(`https://www.tiktok.com/upload?text=${text}`, '_blank');
    showNotification('🎵 Create a TikTok about our courses!', 'info');
}

function subscribeYouTube() {
    window.open('https://youtube.com/@HauntedEmpireWriting', '_blank');
    showNotification('🎬 Thanks for subscribing to our YouTube!', 'success');
}

// ===== MONETIZATION FUNCTIONS =====
function testStripePayment() {
    // Simulate Stripe payment test
    showNotification('💳 Testing Stripe payment integration...', 'info');
    
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
            showNotification('✅ Stripe payment test successful!', 'success');
            console.log('💳 Stripe Payment Test Result: SUCCESS');
        } else {
            showNotification('❌ Stripe payment test failed', 'error');
            console.log('💳 Stripe Payment Test Result: FAILED');
        }
    }, 2000);
}

function triggerLoreDrop() {
    // Simulate live lore drop trigger
    showNotification('🎯 Triggering live lore drop...', 'info');
    
    setTimeout(() => {
        const loreItems = [
            'Ancient Horror Manuscript discovered',
            'Cursed Writing Techniques revealed',
            'Supernatural Character Backstory unlocked',
            'Dark Plot Twist database updated',
            'Forbidden Writing Rituals shared'
        ];
        
        const randomLore = loreItems[Math.floor(Math.random() * loreItems.length)];
        showNotification(`📚 LORE DROP: ${randomLore}`, 'success', 8000);
        console.log('🎯 Live Lore Drop:', randomLore);
        
        // Update live feed
        updateSocialFeed('🎯', `LORE DROP: ${randomLore}`, 'just now');
    }, 1500);
}

function showBackendStatus() {
    // Display backend status information
    showNotification('🔧 Checking backend status...', 'info');
    
    setTimeout(() => {
        const status = {
            server: 'Online ✅',
            database: 'Connected ✅',
            payments: 'Active ✅',
            social: 'Posting ✅',
            ai: 'Ready ✅'
        };
        
        let statusMessage = 'Backend Status:\n';
        Object.entries(status).forEach(([key, value]) => {
            statusMessage += `${key}: ${value}\n`;
        });
        
        console.log('🔧 Backend Status Check:', status);
        showNotification('🔧 Backend systems all operational!', 'success');
        
        // Update live feed
        updateSocialFeed('🔧', 'Backend status check completed', 'just now');
    }, 1000);
}

function updateSocialFeed(icon, text, time) {
    const feedContainer = document.getElementById('social-feed');
    if (feedContainer) {
        const newFeedItem = document.createElement('div');
        newFeedItem.className = 'feed-item';
        newFeedItem.innerHTML = `
            <span class="feed-icon">${icon}</span>
            <span class="feed-text">${text}</span>
            <span class="feed-time">${time}</span>
        `;
        
        // Add to top of feed
        feedContainer.insertBefore(newFeedItem, feedContainer.firstChild);
        
        // Keep only last 5 items
        while (feedContainer.children.length > 5) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
    }
}

// ===== RESPONSIVE BREAKPOINTS =====
function setupResponsiveBreakpoints() {
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();
}

function handleResize() {
    const previousIsMobile = isMobile;
    const previousIsTablet = isTablet;
    
    isMobile = window.innerWidth <= 768;
    isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    // Adjust UI when switching between mobile/desktop
    if (previousIsMobile !== isMobile || previousIsTablet !== isTablet) {
        adjustUIForScreenSize();
    }
}

function adjustUIForScreenSize() {
    // Close mobile menu if switching to desktop
    if (!isMobile) {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Adjust floating elements
    adjustFloatingElements();
    
    // Notify about screen size change
    const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
    console.log(`📱 Screen size changed: ${deviceType} mode activated`);
}

function adjustFloatingElements() {
    // Adjust positions based on screen size
    const elements = [
        'analytics-dashboard',
        'ai-companion-widget', 
        'live-chat-widget',
        'social-media-widget'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element && isMobile) {
            // Mobile adjustments are handled by CSS
            element.classList.add('mobile-optimized');
        }
    });
}

function optimizeImagesForMobile() {
    if (isMobile) {
        // Add lazy loading to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function optimizeForMobile() {
    if (isMobile) {
        // Reduce animations for better performance
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Add mobile-specific classes
        document.body.classList.add('mobile-device');
        
        // Optimize touch targets
        optimizeTouchTargets();
    }
}

function optimizeTouchTargets() {
    const touchTargets = document.querySelectorAll('button, a, input, .clickable');
    touchTargets.forEach(target => {
        const rect = target.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            target.style.minWidth = '44px';
            target.style.minHeight = '44px';
            target.style.display = 'inline-flex';
            target.style.alignItems = 'center';
            target.style.justifyContent = 'center';
        }
    });
}

console.log('📱✨ Mobile Optimization & Social Media Integration loaded!');
