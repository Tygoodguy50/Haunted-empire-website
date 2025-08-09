// Stripe Payment Links Configuration
// Replace the URLs below with your actual Stripe Payment Links

const STRIPE_PAYMENT_LINKS = {
    // Shop Products
    shop: {
        'masterclass': 'https://buy.stripe.com/3cIdRbbZp5aqe674MG8EM06', // Horror Writing Masterclass - $89
        'templates': 'https://buy.stripe.com/7sYdRb9Rh8mC0fhcf88EM05',   // Horror Templates Bundle - $47
        'editing': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04',     // Professional Editing - $150
        'generator': 'https://buy.stripe.com/dRm6oJ6F5gT8aTVeng8EM03',   // Horror Plot Generator - $29
        'publishing': 'https://buy.stripe.com/aFadRb0gH32ifab2Ey8EM02',  // From Draft to Published - $197
        'toolkit': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01'      // Complete Horror Toolkit - $297
    },
    
    // Course Enrollments
    courses: {
        'beginners': 'https://buy.stripe.com/3cIdRbbZp5aqe674MG8EM06',   // Beginner Horror Writing (same as masterclass)
        'advanced': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01',    // Advanced Techniques (toolkit)
        'masterclass': 'https://buy.stripe.com/3cIdRbbZp5aqe674MG8EM06', // Same as shop masterclass
        'mentorship': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04'   // 1-on-1 Mentorship (editing service)
    },
    
    // Subscription Plans
    subscriptions: {
        'writer': 'REPLACE_WITH_YOUR_STRIPE_LINK',      // Writer Plan - $9/month
        'author': 'REPLACE_WITH_YOUR_STRIPE_LINK',      // Author Plan - $29/month
        'elite': 'REPLACE_WITH_YOUR_STRIPE_LINK'        // Elite Plan - $99/month
    },
    
    // Books (different formats)
    books: {
        'whispers-dark-ebook': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'whispers-dark-paperback': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'whispers-dark-hardcover': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'midnight-terrors-ebook': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'midnight-terrors-paperback': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'midnight-terrors-hardcover': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'phantom-embrace-ebook': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'phantom-embrace-paperback': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'phantom-embrace-hardcover': 'REPLACE_WITH_YOUR_STRIPE_LINK',
        'bundle': 'REPLACE_WITH_YOUR_STRIPE_LINK'       // Complete book collection
    },
    
    // Premium Services
    premium: {
        'editing': 'REPLACE_WITH_YOUR_STRIPE_LINK',     // Professional editing $500
        'ghostwriting': 'REPLACE_WITH_YOUR_STRIPE_LINK', // Ghostwriting $2000
        'publishing': 'REPLACE_WITH_YOUR_STRIPE_LINK',  // Publishing package $1500
        'mentorship': 'REPLACE_WITH_YOUR_STRIPE_LINK',  // 1-on-1 mentorship $300/hour
        'vip': 'REPLACE_WITH_YOUR_STRIPE_LINK'          // VIP author program $5000
    }
};

// Export for use in payment functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STRIPE_PAYMENT_LINKS;
}
