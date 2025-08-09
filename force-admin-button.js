// Force Admin Button Creation - Fallback Script
// This ensures the admin button appears even if there are loading issues

console.log('🚀 Force admin button script loaded');

function forceCreateAdminButton() {
    // Remove any existing admin button first
    const existing = document.getElementById('admin-access-widget');
    if (existing) {
        existing.remove();
    }
    
    // Create the admin button with maximum visibility
    const adminButton = document.createElement('div');
    adminButton.id = 'admin-access-widget';
    adminButton.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        z-index: 999999 !important;
        background: linear-gradient(135deg, #ff4444, #cc0000) !important;
        border: 3px solid #fff !important;
        border-radius: 25px !important;
        padding: 15px 25px !important;
        color: white !important;
        font-weight: bold !important;
        font-size: 16px !important;
        cursor: pointer !important;
        box-shadow: 0 6px 20px rgba(255, 68, 68, 0.8) !important;
        animation: adminPulse 2s infinite !important;
        font-family: Arial, sans-serif !important;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;
        user-select: none !important;
    `;
    
    adminButton.innerHTML = '🔐 ADMIN ACCESS';
    
    // Add click handler
    adminButton.onclick = function() {
        console.log('🔐 Admin button clicked!');
        if (typeof showAdminLogin === 'function') {
            showAdminLogin();
        } else {
            alert('Admin login system loading... Please wait a moment and try again.');
            // Try to load admin auth if it hasn't loaded yet
            if (!window.adminSession) {
                const script = document.createElement('script');
                script.src = './admin-auth.js';
                document.head.appendChild(script);
            }
        }
    };
    
    // Add hover effects
    adminButton.onmouseenter = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 25px rgba(255, 68, 68, 1)';
    };
    
    adminButton.onmouseleave = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.8)';
    };
    
    // Add CSS animation
    if (!document.getElementById('admin-button-animations')) {
        const style = document.createElement('style');
        style.id = 'admin-button-animations';
        style.textContent = `
            @keyframes adminPulse {
                0% { box-shadow: 0 6px 20px rgba(255, 68, 68, 0.8); }
                50% { box-shadow: 0 6px 25px rgba(255, 68, 68, 1); }
                100% { box-shadow: 0 6px 20px rgba(255, 68, 68, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(adminButton);
    
    console.log('✅ Admin button force-created successfully!');
    return adminButton;
}

// Create button immediately when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceCreateAdminButton);
} else {
    forceCreateAdminButton();
}

// Also create after a short delay to ensure it appears
setTimeout(forceCreateAdminButton, 500);
setTimeout(forceCreateAdminButton, 2000);

// Make function globally available
window.forceCreateAdminButton = forceCreateAdminButton;

console.log('🔐 Admin button force creation system ready!');
