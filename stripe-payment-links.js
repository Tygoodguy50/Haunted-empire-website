// Stripe Payment Links Configuration
// Replace the URLs below with your actual Stripe Payment Links

const STRIPE_PAYMENT_LINKS = {
    // Shop Products
    shop: {
        'beginners': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g',   // Beginners Horror Writing - $89
        'masterclass': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC',      // Horror Writing Masterclass - $89
        'templates': 'https://buy.stripe.com/7sYdRb9Rh8mC0fhcf88EM05',   // Horror Templates Bundle - $47
        'editing': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04',     // Professional Editing - $150
        'generator': 'https://buy.stripe.com/dRm6oJ6F5gT8aTVeng8EM03',   // Horror Plot Generator - $29
        'publishing': 'https://buy.stripe.com/28E28t3sT8mCfab1Au',        // From Draft to Published - $197
        'business': 'https://buy.stripe.com/00w7sN2oP6eu8LNa708EM0f',    // Horror That Sells - $147
        'toolkit': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01'      // Complete Horror Toolkit - $297
    },
    
    // Course Enrollments
    courses: {
        'beginners': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g',   // Beginners Horror Writing
        'advanced': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01',    // Advanced Techniques (toolkit)
        'masterclass': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC',      // Horror Writing Masterclass
        'publishing': 'https://buy.stripe.com/28E28t3sT8mCfab1Au',       // From Draft to Published Course
        'business': 'https://buy.stripe.com/00w7sN2oP6eu8LNa708EM0f',   // Horror That Sells
        'mentorship': 'https://buy.stripe.com/28EdRb4wX6eu3rt5QK8EM04'   // 1-on-1 Mentorship (editing service)
    },
    
    // Subscription Plans
    subscriptions: {
        'writer': 'https://buy.stripe.com/7sYcN78Nd8mCd233IC8EM0g',      // Writer Plan - links to beginners course
        'author': 'https://buy.stripe.com/eVqdRbfbB46m6DF3IC',          // Author Plan - links to masterclass
        'elite': 'https://buy.stripe.com/fZucN7e7xgT85zBa708EM01'       // Elite Plan - links to complete toolkit
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
