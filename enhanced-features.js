// Enhanced UI Features - Dark Mode, Bookmarks, Social Sharing, Live Chat
// Advanced user experience enhancements

// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'dark';
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
let userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
let chatWidget = null;

// ===== THEME SYSTEM =====
const themes = {
    dark: {
        name: 'Dark Horror',
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #2a0a2a 50%, #1a0a1a 75%, #0a0a0a 100%)',
        cardBg: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 10, 42, 0.8))',
        text: '#e0e0e0'
    },
    light: {
        name: 'Ghostly Light',
        primary: '#8b0000',
        secondary: '#2c5aa0',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 25%, #d0d0d0 50%, #e8e8e8 75%, #f5f5f5 100%)',
        cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 248, 248, 0.8))',
        text: '#333333'
    },
    blood: {
        name: 'Blood Moon',
        primary: '#8b0000',
        secondary: '#4a0e0e',
        background: 'linear-gradient(135deg, #2a0a0a 0%, #3a0a0a 25%, #4a0a0a 50%, #3a0a0a 75%, #2a0a0a 100%)',
        cardBg: 'linear-gradient(145deg, rgba(75, 10, 10, 0.95), rgba(45, 5, 5, 0.8))',
        text: '#ff9999'
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedFeatures();
    initializeThemeSystem();
    initializeBookmarkSystem();
    initializeSocialSharing();
    initializeLiveChat();
    initializeProgressTracking();
    initializePersonalization();
    initializeSoundSystem();
    createFloatingActionButton();
});

function initializeEnhancedFeatures() {
    console.log('🚀 Enhanced UI Features loading...');
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Load user preferences
    loadUserPreferences();
    
    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Initialize auto-save for all forms
    initializeAutoSave();
    
    console.log('✨ Enhanced features loaded successfully!');
}

// ===== THEME SYSTEM =====
function initializeThemeSystem() {
    // Create theme switcher if it doesn't exist
    if (!document.getElementById('theme-switcher')) {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.id = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <div class="theme-toggle">
                <button class="theme-btn" onclick="toggleTheme()" title="Switch Theme">
                    <span class="theme-icon">🌙</span>
                </button>
                <div class="theme-dropdown" id="theme-dropdown">
                    <div class="theme-option" onclick="setTheme('dark')">🌙 Dark Horror</div>
                    <div class="theme-option" onclick="setTheme('light')">☀️ Ghostly Light</div>
                    <div class="theme-option" onclick="setTheme('blood')">🩸 Blood Moon</div>
                </div>
            </div>
        `;
        
        // Add styles
        const themeStyles = document.createElement('style');
        themeStyles.textContent = `
            .theme-toggle {
                position: fixed;
                top: 20px;
                right: 80px;
                z-index: 10000;
            }
            
            .theme-btn {
                background: rgba(0, 0, 0, 0.7);
                border: 2px solid var(--horror-red);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                color: white;
                cursor: pointer;
                font-size: 1.5rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .theme-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px var(--horror-red);
            }
            
            .theme-dropdown {
                position: absolute;
                top: 60px;
                right: 0;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid var(--horror-red);
                border-radius: 10px;
                padding: 10px;
                min-width: 150px;
                display: none;
                backdrop-filter: blur(15px);
            }
            
            .theme-option {
                padding: 10px;
                cursor: pointer;
                border-radius: 5px;
                transition: all 0.3s ease;
                color: white;
            }
            
            .theme-option:hover {
                background: var(--horror-red);
                transform: translateX(5px);
            }
        `;
        document.head.appendChild(themeStyles);
        document.body.appendChild(themeSwitcher);
    }
}

function toggleTheme() {
    const dropdown = document.getElementById('theme-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.theme-toggle')) {
            dropdown.style.display = 'none';
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function setTheme(themeName) {
    currentTheme = themeName;
    applyTheme(themeName);
    localStorage.setItem('theme', themeName);
    document.getElementById('theme-dropdown').style.display = 'none';
    
    showNotification(`Theme changed to ${themes[themeName].name}! 🎨`, 'success');
    
    // Update theme icon
    const icons = { dark: '🌙', light: '☀️', blood: '🩸' };
    document.querySelector('.theme-icon').textContent = icons[themeName];
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    document.documentElement.style.setProperty('--horror-red', theme.primary);
    document.documentElement.style.setProperty('--ghost-teal', theme.secondary);
    document.documentElement.style.setProperty('--bone-white', theme.text);
    
    // Apply background
    document.body.style.background = theme.background;
    
    // Update all cards
    document.querySelectorAll('.enhanced-card, .product-card').forEach(card => {
        card.style.background = theme.cardBg;
    });
}

// ===== BOOKMARK SYSTEM =====
function initializeBookmarkSystem() {
    // Add bookmark buttons to products and courses
    document.querySelectorAll('.product-card, .course-card').forEach((card, index) => {
        if (!card.querySelector('.bookmark-btn')) {
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.innerHTML = isBookmarked(index) ? '💾' : '🔖';
            bookmarkBtn.onclick = () => toggleBookmark(index, card);
            bookmarkBtn.title = 'Bookmark this item';
            
            // Style the bookmark button
            bookmarkBtn.style.cssText = `
                position: absolute;
                top: 15px;
                left: 15px;
                background: rgba(0, 0, 0, 0.7);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
            `;
            
            card.style.position = 'relative';
            card.appendChild(bookmarkBtn);
        }
    });
    
    // Create bookmarks panel
    createBookmarksPanel();
}

function toggleBookmark(id, element) {
    const bookmarkBtn = element.querySelector('.bookmark-btn');
    const title = element.querySelector('.product-title, .course-title, h3')?.textContent || 'Unknown Item';
    
    if (isBookmarked(id)) {
        // Remove bookmark
        bookmarks = bookmarks.filter(b => b.id !== id);
        bookmarkBtn.innerHTML = '🔖';
        showNotification('Bookmark removed 📌', 'info');
    } else {
        // Add bookmark
        bookmarks.push({
            id,
            title,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        bookmarkBtn.innerHTML = '💾';
        showNotification('Bookmarked! 💾', 'success');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarksPanel();
}

function isBookmarked(id) {
    return bookmarks.some(b => b.id === id);
}

function createBookmarksPanel() {
    const panel = document.createElement('div');
    panel.id = 'bookmarks-panel';
    panel.innerHTML = `
        <div class="bookmarks-header">
            <h3>📚 Your Bookmarks</h3>
            <button onclick="toggleBookmarksPanel()">✖️</button>
        </div>
        <div class="bookmarks-list" id="bookmarks-list">
            ${bookmarks.length === 0 ? '<p>No bookmarks yet</p>' : ''}
        </div>
    `;
    
    // Style the panel
    panel.style.cssText = `
        position: fixed;
        top: 0;
        right: -400px;
        width: 350px;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        border-left: 2px solid var(--horror-red);
        padding: 20px;
        transition: right 0.3s ease;
        z-index: 10001;
        overflow-y: auto;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(panel);
    updateBookmarksPanel();
}

function updateBookmarksPanel() {
    const list = document.getElementById('bookmarks-list');
    if (!list) return;
    
    if (bookmarks.length === 0) {
        list.innerHTML = '<p style="color: var(--bone-white); text-align: center;">No bookmarks yet</p>';
        return;
    }
    
    list.innerHTML = bookmarks.map(bookmark => `
        <div class="bookmark-item" style="
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            border-left: 3px solid var(--horror-red);
        ">
            <h4 style="color: var(--horror-red); margin-bottom: 5px;">${bookmark.title}</h4>
            <p style="color: var(--bone-white); font-size: 0.9rem;">
                Saved ${new Date(bookmark.timestamp).toLocaleDateString()}
            </p>
            <button onclick="removeBookmark(${bookmark.id})" style="
                background: var(--horror-red);
                border: none;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Remove</button>
        </div>
    `).join('');
}

function toggleBookmarksPanel() {
    const panel = document.getElementById('bookmarks-panel');
    const isOpen = panel.style.right === '0px';
    panel.style.right = isOpen ? '-400px' : '0px';
}

function removeBookmark(id) {
    bookmarks = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarksPanel();
    
    // Update bookmark button if visible
    const bookmarkBtn = document.querySelector(`[onclick*="${id}"] .bookmark-btn`);
    if (bookmarkBtn) {
        bookmarkBtn.innerHTML = '🔖';
    }
    
    showNotification('Bookmark removed 🗑️', 'info');
}

// ===== SOCIAL SHARING =====
function initializeSocialSharing() {
    // Add social sharing to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        if (!card.querySelector('.share-btn')) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '📤';
            shareBtn.onclick = () => openShareModal(card);
            shareBtn.title = 'Share this item';
            
            shareBtn.style.cssText = `
                position: absolute;
                top: 15px;
                right: 60px;
                background: rgba(76, 205, 196, 0.8);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
            `;
            
            card.appendChild(shareBtn);
        }
    });
}

function openShareModal(element) {
    const title = element.querySelector('.product-title, h3')?.textContent || 'Check this out!';
    const description = element.querySelector('.product-description, p')?.textContent || 'Amazing horror writing content';
    const url = window.location.href;
    
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-content">
            <h3>📤 Share This Content</h3>
            <div class="share-options">
                <button onclick="shareToTwitter('${title}', '${url}')" class="share-option twitter">
                    🐦 Twitter
                </button>
                <button onclick="shareToFacebook('${url}')" class="share-option facebook">
                    📘 Facebook
                </button>
                <button onclick="shareToLinkedIn('${title}', '${description}', '${url}')" class="share-option linkedin">
                    💼 LinkedIn
                </button>
                <button onclick="copyToClipboard('${url}')" class="share-option copy">
                    📋 Copy Link
                </button>
                <button onclick="generateSocialCard('${title}', '${description}')" class="share-option custom">
                    🎨 Create Social Card
                </button>
            </div>
            <button onclick="closeShareModal()" class="close-btn">✖️</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
    `;
    
    document.body.appendChild(modal);
}

function shareToTwitter(title, url) {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareToFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareToLinkedIn(title, description, url) {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard! 📋', 'success');
        closeShareModal();
    });
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.remove();
    }
}

// ===== LIVE CHAT WIDGET =====
function initializeLiveChat() {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'live-chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-toggle" onclick="toggleChat()">
            💬
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <h4>💀 Haunted Support</h4>
                <button onclick="toggleChat()">−</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="bot-message">
                    👻 Hello! I'm your ghostly assistant. How can I help you with your horror writing journey?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chat-input" placeholder="Type your message..." onkeypress="handleChatEnter(event)">
                <button onclick="sendChatMessage()">📤</button>
            </div>
        </div>
    `;
    
    // Style the chat widget
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
        #live-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10003;
        }
        
        .chat-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--horror-red), #8b0000);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
            transition: all 0.3s ease;
            animation: chatPulse 2s infinite;
        }
        
        .chat-toggle:hover {
            transform: scale(1.1);
        }
        
        @keyframes chatPulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4); }
            50% { box-shadow: 0 4px 30px rgba(255, 107, 107, 0.8); }
        }
        
        .chat-window {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 300px;
            height: 400px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid var(--horror-red);
            border-radius: 15px;
            display: none;
            flex-direction: column;
            backdrop-filter: blur(10px);
        }
        
        .chat-header {
            background: var(--horror-red);
            color: white;
            padding: 15px;
            border-radius: 13px 13px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            color: var(--bone-white);
        }
        
        .bot-message, .user-message {
            margin: 10px 0;
            padding: 10px;
            border-radius: 10px;
            max-width: 80%;
        }
        
        .bot-message {
            background: rgba(255, 107, 107, 0.2);
            align-self: flex-start;
        }
        
        .user-message {
            background: rgba(76, 205, 196, 0.2);
            align-self: flex-end;
            margin-left: auto;
        }
        
        .chat-input {
            display: flex;
            padding: 15px;
            gap: 10px;
        }
        
        .chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid var(--horror-red);
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
        }
        
        .chat-input button {
            background: var(--horror-red);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(chatStyles);
    document.body.appendChild(chatWidget);
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    
    if (!isVisible) {
        // Focus on input when opening
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 100);
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = {
        'help': "🎃 I can help you with: Writing tools, Course info, Payment issues, Technical support, or Creative inspiration!",
        'writing': "✍️ Try our AI Writing Assistant! It provides real-time suggestions based on your horror genre preferences.",
        'payment': "💳 For payment issues, please check your Stripe dashboard or contact our support team. All transactions are secure!",
        'course': "📚 Our courses cover: Horror Writing Masterclass, Character Development, Plot Twists, and Atmosphere Building!",
        'tools': "🔧 Available tools: AI Assistant, Voice-to-Text, Character Generator, Plot Twist Generator, Writing Timer!",
        'default': "👻 That's spookily interesting! Could you be more specific? I can help with writing, courses, payments, or tools!"
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

// ===== FLOATING ACTION BUTTON =====
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.id = 'floating-action-btn';
    fab.innerHTML = `
        <div class="fab-main" onclick="toggleFabMenu()">⚡</div>
        <div class="fab-menu" id="fab-menu">
            <button onclick="scrollToTop()" title="Scroll to Top">⬆️</button>
            <button onclick="toggleBookmarksPanel()" title="Bookmarks">📚</button>
            <button onclick="toggleSoundSystem()" title="Toggle Sound">🔊</button>
            <button onclick="showProgressDashboard()" title="Progress">📊</button>
            <button onclick="generateQuickIdea()" title="Quick Idea">💡</button>
        </div>
    `;
    
    // Style the FAB
    const fabStyles = document.createElement('style');
    fabStyles.textContent = `
        #floating-action-btn {
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 9999;
        }
        
        .fab-main {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--horror-red), var(--ghost-teal));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .fab-main:hover {
            transform: scale(1.1) rotate(90deg);
        }
        
        .fab-menu {
            position: absolute;
            bottom: 65px;
            right: 0;
            display: none;
            flex-direction: column;
            gap: 10px;
        }
        
        .fab-menu button {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        }
        
        .fab-menu button:hover {
            transform: scale(1.2);
            background: var(--horror-red);
        }
    `;
    document.head.appendChild(fabStyles);
    document.body.appendChild(fab);
}

function toggleFabMenu() {
    const menu = document.getElementById('fab-menu');
    const isVisible = menu.style.display === 'flex';
    menu.style.display = isVisible ? 'none' : 'flex';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Scrolled to top! ⬆️', 'info');
}

function generateQuickIdea() {
    const ideas = [
        "A mirror that shows how you'll die",
        "Your shadow starts acting independently", 
        "The last person on Earth realizes they're not alone",
        "A music box that plays your death song",
        "Your reflection ages while you don't"
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    showNotification(`💡 Quick Idea: ${randomIdea}`, 'info', 8000);
}

// ===== UTILITY FUNCTIONS =====
function loadUserPreferences() {
    if (userPreferences.soundEnabled !== undefined) {
        soundEnabled = userPreferences.soundEnabled;
    }
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 's':
                    e.preventDefault();
                    autoSaveAll();
                    showNotification('Content saved! 💾', 'success');
                    break;
                case 'b':
                    e.preventDefault();
                    toggleBookmarksPanel();
                    break;
                case '/':
                    e.preventDefault();
                    document.getElementById('chat-input')?.focus();
                    break;
            }
        }
    });
}

function initializeAutoSave() {
    // Auto-save all form inputs every 30 seconds
    setInterval(() => {
        const inputs = document.querySelectorAll('input, textarea, select');
        const data = {};
        
        inputs.forEach(input => {
            if (input.id && input.value) {
                data[input.id] = input.value;
            }
        });
        
        if (Object.keys(data).length > 0) {
            localStorage.setItem('autoSaveData', JSON.stringify({
                data,
                timestamp: new Date().toISOString()
            }));
        }
    }, 30000);
}

function autoSaveAll() {
    // Manual save trigger
    const event = new Event('save');
    document.dispatchEvent(event);
}

console.log('🚀 Enhanced UI Features fully loaded!');
