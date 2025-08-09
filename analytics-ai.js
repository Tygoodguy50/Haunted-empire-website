// Advanced Analytics & AI Writing Companion
// Real-time writing analytics, progress tracking, and intelligent suggestions

// ===== ANALYTICS SYSTEM =====
let writingSession = {
    startTime: null,
    totalWords: 0,
    charactersTyped: 0,
    deletions: 0,
    timeSpent: 0,
    wpm: 0,
    streakDays: parseInt(localStorage.getItem('writingStreak') || '0'),
    totalSessions: parseInt(localStorage.getItem('totalSessions') || '0')
};

let analyticsData = JSON.parse(localStorage.getItem('analyticsData') || '{}');
let aiAssistant = {
    suggestions: [],
    genreAnalysis: {},
    moodDetection: {},
    creativityScore: 0
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnalytics();
    initializeAICompanion();
    initializeWritingTracker();
    createAnalyticsDashboard();
    createAICompanionWidget();
    startRealTimeTracking();
});

// ===== ANALYTICS INITIALIZATION =====
function initializeAdvancedAnalytics() {
    console.log('📊 Initializing Advanced Analytics...');
    
    // Load existing analytics data
    loadAnalyticsData();
    
    // Initialize writing session tracking
    initializeSessionTracking();
    
    // Set up real-time monitoring
    setupRealTimeMonitoring();
    
    console.log('✅ Analytics system ready!');
}

function loadAnalyticsData() {
    const today = new Date().toDateString();
    
    if (!analyticsData[today]) {
        analyticsData[today] = {
            wordsWritten: 0,
            timeSpent: 0,
            sessionsCompleted: 0,
            genresExplored: [],
            creativityMetrics: {
                uniqueWords: 0,
                sentenceVariety: 0,
                emotionalRange: 0
            }
        };
    }
}

function initializeSessionTracking() {
    // Track typing in any text area or input
    document.addEventListener('input', handleTypingEvent);
    document.addEventListener('keydown', handleKeyDownEvent);
    
    // Start session timer
    writingSession.startTime = new Date();
    writingSession.totalSessions++;
    localStorage.setItem('totalSessions', writingSession.totalSessions.toString());
}

function handleTypingEvent(event) {
    if (event.target.matches('textarea, input[type="text"], [contenteditable]')) {
        const currentText = event.target.value || event.target.textContent;
        const wordCount = countWords(currentText);
        
        writingSession.totalWords = wordCount;
        writingSession.charactersTyped++;
        
        // Real-time WPM calculation
        const timeElapsed = (new Date() - writingSession.startTime) / 1000 / 60; // minutes
        writingSession.wpm = timeElapsed > 0 ? Math.round(wordCount / timeElapsed) : 0;
        
        // Update analytics
        updateRealTimeAnalytics(currentText);
        
        // Trigger AI analysis if significant text
        if (currentText.length > 100 && currentText.length % 50 === 0) {
            analyzeTextWithAI(currentText);
        }
    }
}

function handleKeyDownEvent(event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        writingSession.deletions++;
    }
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// ===== REAL-TIME ANALYTICS =====
function updateRealTimeAnalytics(text) {
    const today = new Date().toDateString();
    const currentData = analyticsData[today];
    
    // Update word count
    currentData.wordsWritten = writingSession.totalWords;
    
    // Update time spent
    const timeElapsed = (new Date() - writingSession.startTime) / 1000 / 60; // minutes
    currentData.timeSpent = Math.round(timeElapsed);
    
    // Analyze creativity metrics
    analyzeCreativityMetrics(text, currentData);
    
    // Save to localStorage
    localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
    
    // Update dashboard if visible
    updateAnalyticsDashboard();
}

function analyzeCreativityMetrics(text, data) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Unique words ratio
    const uniqueWords = [...new Set(words)];
    data.creativityMetrics.uniqueWords = words.length > 0 ? 
        Math.round((uniqueWords.length / words.length) * 100) : 0;
    
    // Sentence variety (average sentence length variation)
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length || 0;
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / sentenceLengths.length || 0;
    data.creativityMetrics.sentenceVariety = Math.round(Math.sqrt(variance));
    
    // Emotional range (based on horror/emotion keywords)
    const emotionWords = [
        'fear', 'terror', 'dread', 'horror', 'panic', 'anxious', 'nervous',
        'eerie', 'sinister', 'ominous', 'haunting', 'chilling', 'spine-tingling',
        'joy', 'happiness', 'sadness', 'anger', 'disgust', 'surprise'
    ];
    const emotionCount = words.filter(word => emotionWords.includes(word)).length;
    data.creativityMetrics.emotionalRange = Math.min(100, Math.round((emotionCount / words.length) * 500));
}

// ===== AI COMPANION SYSTEM =====
function initializeAICompanion() {
    console.log('🤖 Initializing AI Writing Companion...');
    
    // Load AI preferences
    const aiPrefs = JSON.parse(localStorage.getItem('aiPreferences') || '{}');
    
    // Initialize suggestion engine
    initializeSuggestionEngine();
    
    // Set up mood detection
    initializeMoodDetection();
    
    console.log('🎯 AI Companion ready!');
}

function analyzeTextWithAI(text) {
    // Simulate AI analysis (in real implementation, this would call an AI API)
    const analysis = performTextAnalysis(text);
    
    // Generate suggestions
    const suggestions = generateWritingSuggestions(analysis);
    aiAssistant.suggestions = suggestions;
    
    // Update AI companion widget
    updateAICompanionWidget(suggestions);
}

function performTextAnalysis(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Genre detection
    const horrorKeywords = ['dark', 'shadow', 'fear', 'blood', 'death', 'ghost', 'haunted', 'evil', 'nightmare'];
    const horrorScore = words.filter(word => horrorKeywords.includes(word)).length;
    
    // Mood analysis
    const positiveWords = ['joy', 'happy', 'bright', 'hope', 'love', 'beautiful'];
    const negativeWords = ['fear', 'dark', 'death', 'sad', 'terrible', 'horrible'];
    const positiveScore = words.filter(word => positiveWords.includes(word)).length;
    const negativeScore = words.filter(word => negativeWords.includes(word)).length;
    
    // Complexity analysis
    const avgWordsPerSentence = words.length / sentences.length || 0;
    const complexWords = words.filter(word => word.length > 6).length;
    
    return {
        genre: {
            horror: Math.min(100, horrorScore * 10),
            general: Math.max(0, 100 - horrorScore * 10)
        },
        mood: {
            positive: positiveScore,
            negative: negativeScore,
            neutral: words.length - positiveScore - negativeScore
        },
        complexity: {
            avgSentenceLength: Math.round(avgWordsPerSentence),
            complexWordRatio: Math.round((complexWords / words.length) * 100)
        },
        wordCount: words.length,
        sentenceCount: sentences.length
    };
}

function generateWritingSuggestions(analysis) {
    const suggestions = [];
    
    // Genre-specific suggestions
    if (analysis.genre.horror > 70) {
        suggestions.push({
            type: 'genre',
            icon: '🎭',
            title: 'Horror Enhancement',
            message: 'Strong horror theme detected! Consider adding more sensory details to heighten the atmosphere.',
            action: 'addSensoryDetails'
        });
    }
    
    // Sentence structure suggestions
    if (analysis.complexity.avgSentenceLength > 20) {
        suggestions.push({
            type: 'structure',
            icon: '✂️',
            title: 'Sentence Length',
            message: 'Consider breaking down some longer sentences for better pacing.',
            action: 'shortenSentences'
        });
    } else if (analysis.complexity.avgSentenceLength < 8) {
        suggestions.push({
            type: 'structure',
            icon: '🔗',
            title: 'Sentence Variety',
            message: 'Try combining some shorter sentences for better flow.',
            action: 'combineSentences'
        });
    }
    
    // Vocabulary suggestions
    if (analysis.complexity.complexWordRatio < 15) {
        suggestions.push({
            type: 'vocabulary',
            icon: '📚',
            title: 'Vocabulary Enhancement',
            message: 'Consider using more varied vocabulary to enrich your writing.',
            action: 'enhanceVocabulary'
        });
    }
    
    // Mood balance suggestions
    const moodRatio = analysis.mood.negative / (analysis.mood.positive + analysis.mood.negative + 1);
    if (moodRatio > 0.8) {
        suggestions.push({
            type: 'mood',
            icon: '⚖️',
            title: 'Emotional Balance',
            message: 'Very dark tone detected. Consider adding moments of relief for contrast.',
            action: 'balanceMood'
        });
    }
    
    return suggestions;
}

// ===== DASHBOARD CREATION =====
function createAnalyticsDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'analytics-dashboard';
    dashboard.innerHTML = `
        <div class="dashboard-header">
            <h2>📊 Writing Analytics Dashboard</h2>
            <button onclick="toggleAnalyticsDashboard()" class="close-btn">✖️</button>
        </div>
        
        <div class="dashboard-content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">⏱️</div>
                    <div class="metric-value" id="session-time">0m</div>
                    <div class="metric-label">Session Time</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon">📝</div>
                    <div class="metric-value" id="word-count">0</div>
                    <div class="metric-label">Words Written</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-value" id="wpm">0</div>
                    <div class="metric-label">Words/Minute</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon">🔥</div>
                    <div class="metric-value" id="streak">${writingSession.streakDays}</div>
                    <div class="metric-label">Day Streak</div>
                </div>
            </div>
            
            <div class="creativity-metrics">
                <h3>🎨 Creativity Analysis</h3>
                <div class="progress-bars">
                    <div class="progress-item">
                        <label>Unique Words</label>
                        <div class="progress-bar">
                            <div class="progress-fill" id="unique-words-progress"></div>
                        </div>
                        <span id="unique-words-percent">0%</span>
                    </div>
                    
                    <div class="progress-item">
                        <label>Sentence Variety</label>
                        <div class="progress-bar">
                            <div class="progress-fill" id="sentence-variety-progress"></div>
                        </div>
                        <span id="sentence-variety-value">0</span>
                    </div>
                    
                    <div class="progress-item">
                        <label>Emotional Range</label>
                        <div class="progress-bar">
                            <div class="progress-fill" id="emotional-range-progress"></div>
                        </div>
                        <span id="emotional-range-percent">0%</span>
                    </div>
                </div>
            </div>
            
            <div class="weekly-chart">
                <h3>📈 Weekly Progress</h3>
                <canvas id="progress-chart" width="400" height="200"></canvas>
            </div>
            
            <div class="achievements-section">
                <h3>🏆 Recent Achievements</h3>
                <div id="achievements-list">
                    <div class="achievement-item">
                        <span class="achievement-icon">🎯</span>
                        <span>First session completed!</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Style the dashboard
    const dashboardStyles = document.createElement('style');
    dashboardStyles.textContent = `
        #analytics-dashboard {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 800px;
            height: 80%;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid var(--horror-red);
            border-radius: 15px;
            padding: 20px;
            display: none;
            flex-direction: column;
            z-index: 10004;
            backdrop-filter: blur(15px);
            overflow-y: auto;
        }
        
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            color: var(--horror-red);
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: linear-gradient(145deg, rgba(255, 107, 107, 0.1), rgba(76, 205, 196, 0.1));
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(255, 107, 107, 0.3);
        }
        
        .metric-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .metric-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--horror-red);
            margin-bottom: 5px;
        }
        
        .metric-label {
            color: var(--bone-white);
            font-size: 0.9rem;
        }
        
        .creativity-metrics, .weekly-chart, .achievements-section {
            background: rgba(255, 107, 107, 0.05);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .progress-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            gap: 15px;
        }
        
        .progress-item label {
            min-width: 120px;
            color: var(--bone-white);
        }
        
        .progress-bar {
            flex: 1;
            height: 10px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--horror-red), var(--ghost-teal));
            transition: width 0.3s ease;
            width: 0%;
        }
        
        .achievement-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 5px;
            margin-bottom: 10px;
            color: var(--bone-white);
        }
        
        .achievement-icon {
            font-size: 1.5rem;
        }
    `;
    document.head.appendChild(dashboardStyles);
    document.body.appendChild(dashboard);
}

function createAICompanionWidget() {
    const widget = document.createElement('div');
    widget.id = 'ai-companion-widget';
    widget.innerHTML = `
        <div class="ai-header" onclick="toggleAICompanion()">
            <span class="ai-icon">🤖</span>
            <span class="ai-title">AI Writing Companion</span>
            <span class="toggle-icon">▼</span>
        </div>
        
        <div class="ai-content" id="ai-content">
            <div class="ai-status">
                <div class="status-indicator active"></div>
                <span>Analyzing your writing...</span>
            </div>
            
            <div class="suggestions-container" id="suggestions-container">
                <p class="no-suggestions">Start writing to receive AI suggestions!</p>
            </div>
            
            <div class="ai-actions">
                <button onclick="generateCreativePrompt()" class="ai-btn">
                    💡 Get Prompt
                </button>
                <button onclick="analyzeCurrentText()" class="ai-btn">
                    🔍 Analyze Text
                </button>
                <button onclick="generateSynonyms()" class="ai-btn">
                    📚 Synonyms
                </button>
            </div>
        </div>
    `;
    
    // Style the AI companion
    const aiStyles = document.createElement('style');
    aiStyles.textContent = `
        #ai-companion-widget {
            position: fixed;
            top: 100px;
            right: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid var(--ghost-teal);
            border-radius: 15px;
            overflow: hidden;
            z-index: 9998;
            backdrop-filter: blur(10px);
        }
        
        .ai-header {
            background: var(--ghost-teal);
            color: white;
            padding: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .ai-icon {
            font-size: 1.5rem;
        }
        
        .ai-title {
            flex: 1;
            font-weight: bold;
        }
        
        .toggle-icon {
            transition: transform 0.3s ease;
        }
        
        .ai-content {
            padding: 15px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .ai-status {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            color: var(--bone-white);
        }
        
        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #666;
        }
        
        .status-indicator.active {
            background: var(--ghost-teal);
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .suggestion-item {
            background: rgba(76, 205, 196, 0.1);
            border: 1px solid rgba(76, 205, 196, 0.3);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
        }
        
        .suggestion-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .suggestion-title {
            font-weight: bold;
            color: var(--ghost-teal);
        }
        
        .suggestion-message {
            color: var(--bone-white);
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .ai-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        
        .ai-btn {
            background: rgba(76, 205, 196, 0.2);
            border: 1px solid var(--ghost-teal);
            color: var(--ghost-teal);
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.3s ease;
        }
        
        .ai-btn:hover {
            background: var(--ghost-teal);
            color: white;
        }
        
        .no-suggestions {
            color: #888;
            text-align: center;
            font-style: italic;
            margin: 20px 0;
        }
    `;
    document.head.appendChild(aiStyles);
    document.body.appendChild(widget);
}

// ===== DASHBOARD FUNCTIONS =====
function toggleAnalyticsDashboard() {
    const dashboard = document.getElementById('analytics-dashboard');
    const isVisible = dashboard.style.display === 'flex';
    dashboard.style.display = isVisible ? 'none' : 'flex';
    
    if (!isVisible) {
        updateAnalyticsDashboard();
        drawProgressChart();
    }
}

function updateAnalyticsDashboard() {
    const now = new Date();
    const sessionTime = Math.round((now - writingSession.startTime) / 1000 / 60);
    
    // Update metric cards
    document.getElementById('session-time').textContent = `${sessionTime}m`;
    document.getElementById('word-count').textContent = writingSession.totalWords;
    document.getElementById('wpm').textContent = writingSession.wpm;
    document.getElementById('streak').textContent = writingSession.streakDays;
    
    // Update creativity metrics
    const today = new Date().toDateString();
    const todayData = analyticsData[today];
    
    if (todayData) {
        updateProgressBar('unique-words-progress', 'unique-words-percent', 
            todayData.creativityMetrics.uniqueWords, '%');
        updateProgressBar('sentence-variety-progress', 'sentence-variety-value', 
            Math.min(100, todayData.creativityMetrics.sentenceVariety * 5), '');
        updateProgressBar('emotional-range-progress', 'emotional-range-percent', 
            todayData.creativityMetrics.emotionalRange, '%');
    }
}

function updateProgressBar(barId, valueId, percentage, suffix) {
    const bar = document.getElementById(barId);
    const value = document.getElementById(valueId);
    
    if (bar) bar.style.width = `${percentage}%`;
    if (value) value.textContent = `${Math.round(percentage)}${suffix}`;
}

function drawProgressChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get last 7 days of data
    const dates = [];
    const wordCounts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        
        dates.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        wordCounts.push(analyticsData[dateString]?.wordsWritten || 0);
    }
    
    // Draw chart
    const maxWords = Math.max(...wordCounts, 100);
    const barWidth = width / dates.length - 10;
    
    dates.forEach((date, index) => {
        const x = index * (barWidth + 10) + 5;
        const barHeight = (wordCounts[index] / maxWords) * (height - 40);
        const y = height - barHeight - 20;
        
        // Draw bar
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(date, x + barWidth / 2, height - 5);
        
        // Draw value
        if (wordCounts[index] > 0) {
            ctx.fillText(wordCounts[index], x + barWidth / 2, y - 5);
        }
    });
}

// ===== AI COMPANION FUNCTIONS =====
function toggleAICompanion() {
    const content = document.getElementById('ai-content');
    const toggle = document.querySelector('.toggle-icon');
    const isVisible = content.style.display !== 'none';
    
    content.style.display = isVisible ? 'none' : 'block';
    toggle.style.transform = isVisible ? 'rotate(-90deg)' : 'rotate(0deg)';
}

function updateAICompanionWidget(suggestions) {
    const container = document.getElementById('suggestions-container');
    
    if (suggestions.length === 0) {
        container.innerHTML = '<p class="no-suggestions">Your writing looks great! Keep going!</p>';
        return;
    }
    
    container.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <div class="suggestion-header">
                <span>${suggestion.icon}</span>
                <span class="suggestion-title">${suggestion.title}</span>
            </div>
            <div class="suggestion-message">${suggestion.message}</div>
        </div>
    `).join('');
}

function generateCreativePrompt() {
    const prompts = [
        "A character discovers their reflection has been replaced by someone else",
        "The last library on Earth contains books that haven't been written yet",
        "Every door in your house leads to a different time period",
        "Your shadow starts leaving messages for you to find",
        "The new tenant upstairs only makes noise during the witching hour"
    ];
    
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    showNotification(`💡 Creative Prompt: ${randomPrompt}`, 'info', 10000);
}

function analyzeCurrentText() {
    const textElements = document.querySelectorAll('textarea, [contenteditable]');
    let allText = '';
    
    textElements.forEach(element => {
        const text = element.value || element.textContent;
        if (text.trim()) {
            allText += text + ' ';
        }
    });
    
    if (allText.trim()) {
        analyzeTextWithAI(allText);
        showNotification('✅ Text analysis complete!', 'success');
    } else {
        showNotification('📝 No text found to analyze', 'info');
    }
}

function generateSynonyms() {
    // This would integrate with a real synonym API
    showNotification('📚 Synonym feature coming soon!', 'info');
}

// ===== REAL-TIME TRACKING =====
function startRealTimeTracking() {
    setInterval(() => {
        if (writingSession.startTime) {
            updateAnalyticsDashboard();
        }
    }, 30000); // Update every 30 seconds
}

console.log('📊🤖 Advanced Analytics & AI Companion loaded!');
