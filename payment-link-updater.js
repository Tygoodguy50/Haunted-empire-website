// Update Payment Links Script
// This script updates all payment functions with real Stripe links

function updatePaymentLinks() {
    // Import the stripe links configuration
    // You'll need to update stripe-payment-links.js with your actual URLs first
    
    // Updated purchase function for shop items
    window.purchaseProduct = function(productId) {
        const links = {
            'beginners': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g',
            'masterclass': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC',
            'templates': 'https://buy.stripe.com/7sYdRb9Rh8mC0fhcf88EM05',
            'editing': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04',
            'generator': 'https://buy.stripe.com/dRm6oJ6F5gT8aTVeng8EM03',
            'toolkit': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01'
        };
        
        const stripeUrl = links[productId];
        if (stripeUrl && stripeUrl.startsWith('https://buy.stripe.com/')) {
            window.open(stripeUrl, '_blank');
        } else {
            alert('Product not found. Please try browsing our available products.');
            window.open('shop.html', '_blank');
        }
    };
    
    // Updated course enrollment function
    window.enrollInCourse = function(courseId) {
        console.log('EXTERNAL enrollInCourse called with:', courseId); // Debug log
        const links = {
            'beginners': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g',
            'advanced': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01', 
            'masterclass': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC',
            'mentorship': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04'
        };
        
        const stripeUrl = links[courseId];
        console.log('EXTERNAL Payment URL found:', stripeUrl); // Debug log
        if (stripeUrl && stripeUrl !== 'REPLACE_WITH_STRIPE_LINK_FOR_' + courseId.toUpperCase() + '_COURSE') {
            console.log('EXTERNAL Redirecting to:', stripeUrl); // Debug log
            window.location.href = stripeUrl;  // Use same tab redirect like courses.html
        } else {
            console.log('EXTERNAL No payment URL found for course:', courseId); // Debug log
            alert('Course not found. Please check our available courses.');
            window.location.href = 'courses.html';
        }
    };
    
    // Patreon integration function
    window.joinPatreon = function() {
        // Track Patreon click analytics
        if (window.analyticsTrack) {
            window.analyticsTrack('patreon_clicked', {
                source: 'website',
                timestamp: new Date().toISOString()
            });
        }
        
        // Redirect to Patreon page
        window.open('https://www.patreon.com/hauntedempire', '_blank');
    };
    
    // Social media integration
    window.openSocialLink = function(platform) {
        const socialLinks = {
            'patreon': 'https://www.patreon.com/hauntedempire',
            'facebook': 'https://facebook.com/hauntedempire',
            'twitter': 'https://twitter.com/hauntedempire',
            'instagram': 'https://instagram.com/hauntedempire',
            'linkedin': 'https://linkedin.com/company/haunted-empire',
            'youtube': 'https://youtube.com/@hauntedempire'
        };
        
        const url = socialLinks[platform];
        if (url) {
            if (window.analyticsTrack) {
                window.analyticsTrack('social_clicked', {
                    platform: platform,
                    timestamp: new Date().toISOString()
                });
            }
            window.open(url, '_blank');
        }
    };
    
    // Updated subscription function
    window.subscribe = function(planId) {
        const links = {
            'writer': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g', // Writer Plan - use beginners course
            'author': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC', // Author Plan - use masterclass
            'elite': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01' // Elite Plan - use complete toolkit
        };
        
        const stripeUrl = links[planId];
        if (stripeUrl && stripeUrl.startsWith('https://buy.stripe.com/')) {
            window.open(stripeUrl, '_blank');
        } else {
            alert('Subscription plan not available. Please check our courses and products instead.');
            window.open('courses.html', '_blank');
        }
    };
    
    // Updated book purchase function
    window.buyBook = function(bookId, format) {
        const links = {
            'shadows-between-ebook': 'https://buy.stripe.com/5kQ5kF4wX0Uafabeng8EM0c', // The Shadows Between ebook
            'haunted-origins-ebook': 'https://buy.stripe.com/eVqdRb7J99qG3rtfrk8EM0b', // Haunted Empire: Origins ebook
            'midnight-whispers-ebook': 'https://buy.stripe.com/5kQ5kF3sT32i0fh4MG8EM0a', // Midnight Whispers ebook
            'candle-curse-ebook': 'https://buy.stripe.com/7sY4gBaVl7iybXZ0wq8EM09', // The Candle Maker's Curse ebook
            'watches-within-ebook': 'https://buy.stripe.com/4gMfZjd3tgT89PRfrk8EM08', // What Watches From Within ebook
            'writers-handbook-ebook': 'https://buy.stripe.com/6oUaEZ1kL5aq0fh6UO8EM07' // Horror Writer's Handbook ebook
        };
        
        const key = format ? `${bookId}-${format}` : bookId;
        const stripeUrl = links[key];
        
        if (stripeUrl && stripeUrl.startsWith('https://buy.stripe.com/')) {
            window.open(stripeUrl, '_blank');
        } else {
            alert('Book not available for purchase yet. Please check our courses instead.');
            window.open('courses.html', '_blank');
        }
    };
    
    // Updated premium service booking function
    window.bookService = function(serviceId) {
        const links = {
            'editing': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04', // Professional editing
            'ghostwriting': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01', // Toolkit for ghostwriting
            'publishing': 'https://buy.stripe.com/28E28t3sT8mCfab1Au', // Publishing course
            'mentorship': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC', // Masterclass
            'vip': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01', // Complete toolkit
            'emergency': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04' // Emergency editing
        };
        
        const stripeUrl = links[serviceId];
        if (stripeUrl && stripeUrl.startsWith('https://buy.stripe.com/')) {
            window.open(stripeUrl, '_blank');
        } else {
            alert('Service not available. Please contact us for custom services.');
            window.open('contact.html', '_blank');
        }
    };
}

// Initialize updated payment functions when page loads
document.addEventListener('DOMContentLoaded', updatePaymentLinks);

console.log('🔗 Payment link updater loaded. Update stripe-payment-links.js with your real Stripe URLs to activate payments.');
