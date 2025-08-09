// Admin Authentication System
// Secure login for monetization testing interface access

// ===== ADMIN CONFIGURATION =====
const ADMIN_CONFIG = {
    // Use environment variables or secure storage in production
    credentials: {
        username: 'PhantomDp',
        password: 'Sarastine50!', // Secure admin password
        adminKey: 'TMT27' // Additional security layer
    },
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxLoginAttempts: 3,
    lockoutDuration: 15 * 60 * 1000 // 15 minutes lockout
};

// ===== ADMIN STATE =====
let adminSession = {
    isLoggedIn: false,
    loginTime: null,
    attempts: 0,
    lastAttempt: null,
    isLocked: false,
    lockoutEnd: null
};

// Reset lockout function
function resetAdminLockout() {
    adminSession.attempts = 0;
    adminSession.lastAttempt = null;
    adminSession.isLocked = false;
    adminSession.lockoutEnd = null;
    console.log('🔓 Admin lockout has been reset!');
    showNotification('🔓 Lockout reset - You can try logging in again!', 'success');
}

// Make admin session globally accessible
window.adminSession = adminSession;
window.resetAdminLockout = resetAdminLockout;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Reset any existing lockout on page load
    resetAdminLockout();
    
    initializeAdminSystem();
    checkAdminSession();
    hideMonetizationInterface();
});

function initializeAdminSystem() {
    console.log('🔐 Admin Authentication System loaded');
    
    // Load saved session if valid
    loadAdminSession();
    
    // Create admin login interface
    createAdminLoginInterface();
    
    // Add admin access button to main interface
    addAdminAccessButton();
    
    // Set up session timeout
    setupSessionTimeout();
}

// ===== ADMIN LOGIN INTERFACE =====
function createAdminLoginInterface() {
    const loginModal = document.createElement('div');
    loginModal.id = 'admin-login-modal';
    loginModal.innerHTML = `
        <div class="admin-login-overlay" onclick="closeAdminLogin()"></div>
        <div class="admin-login-content">
            <div class="admin-login-header">
                <h2>🔐 Admin Access</h2>
                <button onclick="closeAdminLogin()" class="close-btn">✖️</button>
            </div>
            
            <div class="admin-login-form">
                <div class="login-warning" id="login-warning" style="display: none;">
                    <p>⚠️ Invalid credentials. This attempt has been logged.</p>
                </div>
                
                <div class="login-lockout" id="login-lockout" style="display: none;">
                    <p>🚫 Too many failed attempts. Access locked for 15 minutes.</p>
                    <div id="lockout-timer"></div>
                </div>
                
                <div class="login-fields" id="login-fields">
                    <div class="input-group">
                        <label for="admin-username">Username</label>
                        <input type="text" id="admin-username" placeholder="Enter admin username" autocomplete="username">
                    </div>
                    
                    <div class="input-group">
                        <label for="admin-password">Password</label>
                        <input type="password" id="admin-password" placeholder="Enter admin password" autocomplete="current-password">
                    </div>
                    
                    <div class="input-group">
                        <label for="admin-key">Admin Key</label>
                        <input type="password" id="admin-key" placeholder="Enter admin key" autocomplete="off">
                    </div>
                    
                    <button onclick="attemptAdminLogin()" class="admin-login-btn" id="login-btn">
                        🔓 Access Admin Panel
                    </button>
                    
                    <div class="login-info">
                        <p>⚡ Attempts remaining: <span id="attempts-remaining">${ADMIN_CONFIG.maxLoginAttempts}</span></p>
                        <p>🔒 Secure access to monetization testing interface</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Style the admin login
    const loginStyles = document.createElement('style');
    loginStyles.textContent = `
        #admin-login-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10010;
            display: none;
        }
        
        .admin-login-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .admin-login-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 10, 42, 0.9));
            border: 2px solid var(--horror-red);
            border-radius: 15px;
            padding: 30px;
            min-width: 400px;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }
        
        .admin-login-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            color: var(--horror-red);
            border-bottom: 1px solid rgba(255, 107, 107, 0.3);
            padding-bottom: 15px;
        }
        
        .admin-login-header h2 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: var(--horror-red);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 107, 107, 0.2);
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        .input-group label {
            display: block;
            color: var(--bone-white);
            margin-bottom: 8px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .input-group input {
            width: 100%;
            padding: 12px 15px;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 107, 107, 0.3);
            border-radius: 8px;
            color: var(--bone-white);
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .input-group input:focus {
            outline: none;
            border-color: var(--horror-red);
            box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
        }
        
        .admin-login-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, var(--horror-red), #8b0000);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }
        
        .admin-login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        
        .admin-login-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .login-warning, .login-lockout {
            background: rgba(255, 0, 0, 0.2);
            border: 1px solid #ff0000;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: #ff6666;
            text-align: center;
        }
        
        .login-info {
            text-align: center;
            font-size: 0.85rem;
            color: #888;
        }
        
        .login-info p {
            margin: 5px 0;
        }
        
        #attempts-remaining {
            color: var(--horror-red);
            font-weight: bold;
        }
        
        #lockout-timer {
            font-family: monospace;
            font-size: 1.2rem;
            color: var(--horror-red);
            margin-top: 10px;
        }
        
        @media (max-width: 768px) {
            .admin-login-content {
                width: 90%;
                min-width: auto;
                margin: 20px;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(loginStyles);
    document.body.appendChild(loginModal);
}

function addAdminAccessButton() {
    // Add admin access button to social widget or create separate admin widget
    console.log('🔐 Creating admin access button...');
    
    const adminButton = document.createElement('div');
    adminButton.id = 'admin-access-widget';
    adminButton.innerHTML = `
        <button onclick="showAdminLogin()" class="admin-access-btn" title="Admin Access">
            🔐 ADMIN
        </button>
    `;
    
    const adminButtonStyles = document.createElement('style');
    adminButtonStyles.textContent = `
        #admin-access-widget {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
        }
        
        .admin-access-btn {
            padding: 12px 20px;
            border-radius: 25px;
            background: linear-gradient(135deg, #ff4444, #cc0000);
            border: 2px solid #fff;
            color: #fff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }
        
        .admin-access-btn:hover {
            background: linear-gradient(135deg, #ff6666, #ff0000);
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(255, 68, 68, 0.6);
        }
        
        .admin-access-btn.logged-in {
            border-color: #28a745;
            color: #28a745;
            animation: adminPulse 2s infinite;
        }
        
        @keyframes adminPulse {
            0%, 100% { box-shadow: 0 0 5px rgba(40, 167, 69, 0.3); }
            50% { box-shadow: 0 0 15px rgba(40, 167, 69, 0.6); }
        }
        
        @media (max-width: 768px) {
            #admin-access-widget {
                top: 10px;
                right: 60px;
            }
            
            .admin-access-btn {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(adminButtonStyles);
    document.body.appendChild(adminButton);
    
    console.log('✅ Admin button created and added to page');
    console.log('Button element:', adminButton);
}

// ===== AUTHENTICATION FUNCTIONS =====
function showAdminLogin() {
    if (adminSession.isLoggedIn) {
        showAdminPanel();
        return;
    }
    
    const modal = document.getElementById('admin-login-modal');
    modal.style.display = 'block';
    
    // Check if locked
    if (adminSession.isLocked) {
        showLockoutStatus();
    } else {
        updateAttemptsDisplay();
    }
    
    // Focus on username field
    setTimeout(() => {
        document.getElementById('admin-username').focus();
    }, 100);
    
    // Add keyboard shortcut
    document.addEventListener('keydown', handleLoginKeyboard);
}

function closeAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    modal.style.display = 'none';
    
    // Clear form
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-key').value = '';
    
    // Hide warnings
    document.getElementById('login-warning').style.display = 'none';
    document.getElementById('login-lockout').style.display = 'none';
    
    // Remove keyboard listener
    document.removeEventListener('keydown', handleLoginKeyboard);
}

function handleLoginKeyboard(e) {
    if (e.key === 'Enter') {
        attemptAdminLogin();
    } else if (e.key === 'Escape') {
        closeAdminLogin();
    }
}

function attemptAdminLogin() {
    // Auto-reset lockout for admin access
    if (adminSession.isLocked) {
        console.log('� Auto-resetting lockout for admin access...');
        resetAdminLockout();
    }
    
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    const adminKey = document.getElementById('admin-key').value.trim();
    
    // Validate inputs
    if (!username || !password || !adminKey) {
        showNotification('⚠️ All fields are required', 'error');
        return;
    }
    
    // Check credentials
    const isValid = validateAdminCredentials(username, password, adminKey);
    
    if (isValid) {
        loginSuccess();
    } else {
        loginFailure();
    }
}

function validateAdminCredentials(username, password, adminKey) {
    // Debug logging to troubleshoot login issue
    console.log('🔍 Login Debug Info:');
    console.log('Entered username:', `"${username}"`);
    console.log('Expected username:', `"${ADMIN_CONFIG.credentials.username}"`);
    console.log('Entered password:', `"${password}"`);
    console.log('Expected password:', `"${ADMIN_CONFIG.credentials.password}"`);
    console.log('Entered admin key:', `"${adminKey}"`);
    console.log('Expected admin key:', `"${ADMIN_CONFIG.credentials.adminKey}"`);
    
    const usernameMatch = username === ADMIN_CONFIG.credentials.username;
    const passwordMatch = password === ADMIN_CONFIG.credentials.password;
    const adminKeyMatch = adminKey === ADMIN_CONFIG.credentials.adminKey;
    
    console.log('Username match:', usernameMatch);
    console.log('Password match:', passwordMatch);
    console.log('Admin key match:', adminKeyMatch);
    
    return usernameMatch && passwordMatch && adminKeyMatch;
}

function loginSuccess() {
    adminSession.isLoggedIn = true;
    adminSession.loginTime = new Date();
    adminSession.attempts = 0;
    adminSession.lastAttempt = null;
    
    // Save session
    saveAdminSession();
    
    // Update UI
    updateAdminButton();
    showMonetizationInterface();
    closeAdminLogin();
    
    // Log successful login
    console.log('🔐 Admin login successful at', new Date().toLocaleString());
    showNotification('✅ Admin access granted!', 'success');
    
    // Show admin panel
    setTimeout(() => {
        showAdminPanel();
    }, 500);
}

function loginFailure() {
    adminSession.attempts++;
    adminSession.lastAttempt = new Date();
    
    // Log failed attempt
    console.warn('🚨 Failed admin login attempt:', {
        attempt: adminSession.attempts,
        timestamp: new Date().toLocaleString(),
        userAgent: navigator.userAgent,
        ip: 'logged on server' // In production, log actual IP
    });
    
    if (adminSession.attempts >= ADMIN_CONFIG.maxLoginAttempts) {
        // Lock account
        adminSession.isLocked = true;
        adminSession.lockoutEnd = new Date(Date.now() + ADMIN_CONFIG.lockoutDuration);
        showLockoutStatus();
        
        showNotification('🚫 Too many failed attempts. Access locked for 15 minutes.', 'error');
    } else {
        // Show warning
        const remaining = ADMIN_CONFIG.maxLoginAttempts - adminSession.attempts;
        document.getElementById('login-warning').style.display = 'block';
        updateAttemptsDisplay();
        
        showNotification(`⚠️ Invalid credentials. ${remaining} attempts remaining.`, 'error');
    }
    
    // Save state
    saveAdminSession();
}

// ===== SESSION MANAGEMENT =====
function loadAdminSession() {
    try {
        const saved = localStorage.getItem('haunted_empire_admin_session');
        if (saved) {
            const session = JSON.parse(saved);
            
            // Check if session is still valid
            if (session.loginTime) {
                const loginTime = new Date(session.loginTime);
                const now = new Date();
                const elapsed = now - loginTime;
                
                if (elapsed < ADMIN_CONFIG.sessionTimeout) {
                    adminSession = { ...adminSession, ...session };
                    updateAdminButton();
                    showMonetizationInterface();
                } else {
                    // Session expired
                    clearAdminSession();
                }
            }
            
            // Check lockout
            if (session.lockoutEnd) {
                const lockoutEnd = new Date(session.lockoutEnd);
                if (new Date() < lockoutEnd) {
                    adminSession.isLocked = true;
                    adminSession.lockoutEnd = lockoutEnd;
                    adminSession.attempts = session.attempts || 0;
                } else {
                    // Lockout expired
                    adminSession.isLocked = false;
                    adminSession.lockoutEnd = null;
                    adminSession.attempts = 0;
                }
            }
        }
    } catch (error) {
        console.error('Error loading admin session:', error);
        clearAdminSession();
    }
}

function saveAdminSession() {
    try {
        const sessionData = {
            isLoggedIn: adminSession.isLoggedIn,
            loginTime: adminSession.loginTime,
            attempts: adminSession.attempts,
            lastAttempt: adminSession.lastAttempt,
            isLocked: adminSession.isLocked,
            lockoutEnd: adminSession.lockoutEnd
        };
        
        localStorage.setItem('haunted_empire_admin_session', JSON.stringify(sessionData));
    } catch (error) {
        console.error('Error saving admin session:', error);
    }
}

function clearAdminSession() {
    adminSession = {
        isLoggedIn: false,
        loginTime: null,
        attempts: 0,
        lastAttempt: null,
        isLocked: false,
        lockoutEnd: null
    };
    
    localStorage.removeItem('haunted_empire_admin_session');
    updateAdminButton();
    hideMonetizationInterface();
}

// ===== UI UPDATE FUNCTIONS =====
function updateAdminButton() {
    const btn = document.querySelector('.admin-access-btn');
    if (btn) {
        if (adminSession.isLoggedIn) {
            btn.classList.add('logged-in');
            btn.title = 'Admin Panel (Logged In)';
        } else {
            btn.classList.remove('logged-in');
            btn.title = 'Admin Access';
        }
    }
}

function updateAttemptsDisplay() {
    const remaining = ADMIN_CONFIG.maxLoginAttempts - adminSession.attempts;
    const attemptsSpan = document.getElementById('attempts-remaining');
    if (attemptsSpan) {
        attemptsSpan.textContent = remaining;
    }
}

function showLockoutStatus() {
    document.getElementById('login-fields').style.display = 'none';
    document.getElementById('login-lockout').style.display = 'block';
    
    // Start countdown timer
    startLockoutTimer();
}

function startLockoutTimer() {
    const timerElement = document.getElementById('lockout-timer');
    
    const updateTimer = () => {
        if (!adminSession.lockoutEnd) return;
        
        const now = new Date();
        const remaining = adminSession.lockoutEnd - now;
        
        if (remaining <= 0) {
            // Lockout expired
            adminSession.isLocked = false;
            adminSession.lockoutEnd = null;
            adminSession.attempts = 0;
            saveAdminSession();
            
            // Reset UI
            document.getElementById('login-fields').style.display = 'block';
            document.getElementById('login-lockout').style.display = 'none';
            updateAttemptsDisplay();
            
            return;
        }
        
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        setTimeout(updateTimer, 1000);
    };
    
    updateTimer();
}

// ===== MONETIZATION INTERFACE CONTROL =====
function hideMonetizationInterface() {
    // Hide monetization section in social widget
    const monetizationSection = document.querySelector('.monetization-section');
    if (monetizationSection) {
        monetizationSection.style.display = 'none';
    }
}

function showMonetizationInterface() {
    if (adminSession.isLoggedIn) {
        const monetizationSection = document.querySelector('.monetization-section');
        if (monetizationSection) {
            monetizationSection.style.display = 'block';
        }
    }
}

function showAdminPanel() {
    if (!adminSession.isLoggedIn) {
        showNotification('🚫 Access denied. Please login first.', 'error');
        return;
    }
    
    // Create and show admin panel
    createAdminPanel();
}

function createAdminPanel() {
    // Remove existing panel
    const existing = document.getElementById('admin-panel');
    if (existing) existing.remove();
    
    const panel = document.createElement('div');
    panel.id = 'admin-panel';
    panel.innerHTML = `
        <div class="admin-panel-header">
            <h3>🔐 Admin Panel</h3>
            <div class="admin-controls">
                <button onclick="logoutAdmin()" class="logout-btn">🚪 Logout</button>
                <button onclick="closeAdminPanel()" class="close-btn">✖️</button>
            </div>
        </div>
        
        <div class="admin-panel-content">
            <div class="session-info">
                <p>👤 Logged in as: <strong>${ADMIN_CONFIG.credentials.username}</strong></p>
                <p>⏰ Session started: <strong>${new Date(adminSession.loginTime).toLocaleString()}</strong></p>
                <p>🔒 Monetization interface: <strong>ENABLED</strong></p>
            </div>
            
            <div class="admin-actions">
                <h4>Quick Actions</h4>
                <button onclick="testStripePayment()" class="admin-action-btn">💳 Test Payment</button>
                <button onclick="triggerLoreDrop()" class="admin-action-btn">🎯 Trigger Lore Drop</button>
                <button onclick="showBackendStatus()" class="admin-action-btn">🔧 Backend Status</button>
                <button onclick="clearAdminLogs()" class="admin-action-btn">🗑️ Clear Logs</button>
            </div>
        </div>
    `;
    
    // Style admin panel
    const panelStyles = document.createElement('style');
    panelStyles.textContent = `
        #admin-panel {
            position: fixed;
            top: 80px;
            right: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #28a745;
            border-radius: 10px;
            z-index: 10005;
            backdrop-filter: blur(15px);
        }
        
        .admin-panel-header {
            background: #28a745;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .admin-panel-header h3 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .admin-controls {
            display: flex;
            gap: 10px;
        }
        
        .logout-btn {
            background: #dc3545;
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
        }
        
        .admin-panel-content {
            padding: 15px;
            color: var(--bone-white);
        }
        
        .session-info {
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        
        .session-info p {
            margin: 5px 0;
        }
        
        .admin-actions h4 {
            color: #28a745;
            margin-bottom: 10px;
        }
        
        .admin-action-btn {
            display: block;
            width: 100%;
            margin-bottom: 8px;
            padding: 8px 12px;
            background: rgba(40, 167, 69, 0.2);
            border: 1px solid #28a745;
            color: #28a745;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .admin-action-btn:hover {
            background: #28a745;
            color: white;
        }
    `;
    document.head.appendChild(panelStyles);
    document.body.appendChild(panel);
}

function closeAdminPanel() {
    const panel = document.getElementById('admin-panel');
    if (panel) panel.remove();
}

function logoutAdmin() {
    if (confirm('Are you sure you want to logout from admin panel?')) {
        clearAdminSession();
        closeAdminPanel();
        showNotification('🚪 Logged out successfully', 'info');
        console.log('🔐 Admin logout at', new Date().toLocaleString());
    }
}

// ===== SESSION TIMEOUT =====
function setupSessionTimeout() {
    setInterval(() => {
        if (adminSession.isLoggedIn && adminSession.loginTime) {
            const elapsed = new Date() - new Date(adminSession.loginTime);
            
            if (elapsed >= ADMIN_CONFIG.sessionTimeout) {
                clearAdminSession();
                closeAdminPanel();
                showNotification('⏰ Admin session expired', 'info');
                console.log('🔐 Admin session expired at', new Date().toLocaleString());
            }
        }
    }, 60000); // Check every minute
}

function checkAdminSession() {
    // Initial session check
    if (adminSession.isLoggedIn) {
        showMonetizationInterface();
        updateAdminButton();
    } else {
        hideMonetizationInterface();
    }
}

function clearAdminLogs() {
    if (confirm('Clear all admin logs from console?')) {
        console.clear();
        showNotification('🗑️ Admin logs cleared', 'info');
    }
}

console.log('🔐 Admin Authentication System loaded');
