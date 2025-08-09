// Admin Button Fix - Clean Implementation
// Prevents duplicate admin buttons and provides proper authentication

(function() {
    'use strict';
    
    // Admin credentials (for development - should be server-side in production)
    const ADMIN_CREDENTIALS = {
        username: 'PhantomDp',
        password: 'Sarastine50!',
        adminKey: 'TMT27'
    };
    
    console.log('🔧 Admin Button Fix: Initializing clean admin system');
    console.log('Admin credentials available in console for development');
    
    // Clean up any existing admin buttons
    function cleanupAndCreateAdminButton() {
        // Remove any existing admin widgets
        const existingWidgets = document.querySelectorAll('#admin-access-widget, .admin-access-widget, [id*="admin"], [class*="admin-widget"]');
        existingWidgets.forEach(widget => {
            if (widget.id === 'admin-access-widget' || widget.classList.contains('admin-access-widget')) {
                console.log('🧹 Removing duplicate admin widget:', widget.id || widget.className);
                widget.remove();
            }
        });
        
        // Create single admin button
        createAdminButton();
    }
    
    function createAdminButton() {
        // Check if admin button already exists
        if (document.getElementById('admin-access-widget')) {
            console.log('⚠️ Admin button already exists, skipping creation');
            return;
        }
        
        const adminWidget = document.createElement('div');
        adminWidget.id = 'admin-access-widget';
        adminWidget.className = 'admin-access-widget';
        adminWidget.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b6b, #8b5a3c);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            z-index: 10000;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        adminWidget.innerHTML = '🔐 Admin Access';
        
        // Add hover effects
        adminWidget.addEventListener('mouseenter', () => {
            adminWidget.style.transform = 'scale(1.05)';
            adminWidget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
        });
        
        adminWidget.addEventListener('mouseleave', () => {
            adminWidget.style.transform = 'scale(1)';
            adminWidget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
        });
        
        adminWidget.addEventListener('click', showAdminLoginPrompt);
        
        document.body.appendChild(adminWidget);
        console.log('✅ Admin button created successfully');
    }
    
    function showAdminLoginPrompt() {
        // Create login modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 20000;
        `;
        
        const loginForm = document.createElement('div');
        loginForm.style.cssText = `
            background: linear-gradient(135deg, #2c1810, #8b5a3c);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            color: white;
            font-family: 'Segoe UI', Arial, sans-serif;
            min-width: 350px;
            border: 2px solid rgba(255, 107, 107, 0.3);
        `;
        
        loginForm.innerHTML = `
            <h3 style="margin: 0 0 20px 0; text-align: center; color: #ff6b6b;">🔐 Admin Login</h3>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Username:</label>
                <input type="text" id="admin-username" style="width: 100%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.1); color: white;" placeholder="Enter username">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Password:</label>
                <input type="password" id="admin-password" style="width: 100%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.1); color: white;" placeholder="Enter password">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px;">Admin Key:</label>
                <input type="password" id="admin-key" style="width: 100%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.1); color: white;" placeholder="Enter admin key">
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="admin-login-btn" style="flex: 1; padding: 12px; background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Login</button>
                <button id="admin-cancel-btn" style="flex: 1; padding: 12px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: rgba(255,255,255,0.7); text-align: center;">
                Hint: Check browser console for development credentials
            </div>
        `;
        
        modal.appendChild(loginForm);
        document.body.appendChild(modal);
        
        // Show credentials in console for development
        console.log('🔑 Development Admin Credentials:');
        console.log('Username:', ADMIN_CREDENTIALS.username);
        console.log('Password:', ADMIN_CREDENTIALS.password);
        console.log('Admin Key:', ADMIN_CREDENTIALS.adminKey);
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('admin-username').focus();
        }, 100);
        
        // Handle login
        document.getElementById('admin-login-btn').addEventListener('click', () => {
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            const adminKey = document.getElementById('admin-key').value;
            
            if (validateAdminCredentials(username, password, adminKey)) {
                showAdminSuccess();
                modal.remove();
            } else {
                showLoginError();
            }
        });
        
        // Handle cancel
        document.getElementById('admin-cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function validateAdminCredentials(username, password, adminKey) {
        return username === ADMIN_CREDENTIALS.username && 
               password === ADMIN_CREDENTIALS.password && 
               adminKey === ADMIN_CREDENTIALS.adminKey;
    }
    
    function showAdminSuccess() {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 25000;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-weight: 600;
            box-shadow: 0 5px 20px rgba(40, 167, 69, 0.4);
        `;
        
        successMsg.innerHTML = '✅ Admin Access Granted!<br><small>Redirecting to admin dashboard...</small>';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        }, 2000);
        
        console.log('✅ Admin login successful');
    }
    
    function showLoginError() {
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc3545;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 25000;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        errorMsg.innerHTML = '❌ Invalid credentials. Check console for hints.';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
        
        console.log('❌ Admin login failed - check credentials');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanupAndCreateAdminButton);
    } else {
        cleanupAndCreateAdminButton();
    }
    
    // Also run after a short delay to catch any late-loading elements
    setTimeout(cleanupAndCreateAdminButton, 1000);
    
})();
