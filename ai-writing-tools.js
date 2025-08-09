// AI Writing Tools - Enhanced Functionality
// Advanced features for horror writing assistance

// ===== GLOBAL VARIABLES =====
let writingTimer = null;
let timerSeconds = 0;
let totalSeconds = 1500; // 25 minutes default
let isRecording = false;
let recognition = null;
let currentMood = 'suspense';
let achievements = JSON.parse(localStorage.getItem('writingAchievements') || '[]');
let wordCount = 0;
let charactersGenerated = 0;
let storySections = [];

// ===== AI WRITING ASSISTANT =====
const horrorPrompts = {
    suspense: [
        "The footsteps behind you grow closer, matching your pace perfectly...",
        "Something moves in your peripheral vision, but when you turn, there's nothing there...",
        "The phone rings at 3 AM, but when you answer, only breathing fills the silence...",
        "You realize the shadow on the wall doesn't match your movements...",
        "The mirror reflection waves at you, but your hand remains still..."
    ],
    gothic: [
        "The ancient portrait's eyes seem to follow you through the dimly lit corridor...",
        "Beneath the floorboards, something scratches desperately to get out...",
        "The grandfather clock chimes thirteen times at midnight...",
        "Gargoyles perched on the cathedral seem to shift when no one is watching...",
        "The library's forbidden section whispers secrets in dead languages..."
    ],
    psychological: [
        "You begin to question whether your memories are your own...",
        "The therapist's notes describe someone else, but they bear your name...",
        "Everyone you meet claims to have never seen you before...",
        "Your reflection in the mirror appears older than it should be...",
        "The voice in your head speaks with your mother's tone, but she died years ago..."
    ],
    supernatural: [
        "The Ouija board spells out your name before anyone touches it...",
        "Electronics malfunction whenever you're angry...",
        "The ghost in your house rearranges furniture while you sleep...",
        "You can see people's deaths in their eyes...",
        "The demon in the basement offers you everything you've ever wanted..."
    ]
};

const characterTraits = {
    names: ["Morticia", "Damien", "Raven", "Viktor", "Lilith", "Edgar", "Selene", "Dorian", "Hecate", "Lucifer"],
    appearances: [
        "pale as moonlight with hollow, sunken eyes",
        "impossibly tall with elongated limbs",
        "constantly shrouded in shadow",
        "bearing scars that tell untold stories",
        "with eyes that reflect no light"
    ],
    personalities: [
        "obsessively meticulous about death",
        "speaks only in whispered riddles",
        "collects the final words of dying people",
        "can sense fear like a predator",
        "laughs at inappropriate moments"
    ],
    secrets: [
        "can see ghosts of murder victims",
        "has never cast a reflection",
        "ages backwards during full moons",
        "feeds on nightmares",
        "was declared dead fifty years ago"
    ]
};

const plotTwists = [
    "The protagonist discovers they are the killer they've been hunting",
    "The entire story takes place in purgatory",
    "The 'ghost' is actually the living person, and the protagonist is dead",
    "Time is running backwards and the story is being undone",
    "The monster was protecting people from the real evil",
    "The protagonist's memories have been implanted by aliens",
    "Everyone in town is the same person at different ages",
    "The story is being written by the victim before they die",
    "The house itself is alive and feeds on inhabitants",
    "The protagonist is the product of a failed experiment"
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAITools();
    setupEventListeners();
    loadAchievements();
    initializeSpeechRecognition();
});

function initializeAITools() {
    console.log('🤖 AI Writing Tools initialized');
    
    // Initialize mood selector
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.mood-btn.active').classList.remove('active');
            this.classList.add('active');
            currentMood = this.dataset.mood;
        });
    });
    
    // Generate initial plot elements
    generateInitialPlotElements();
    
    // Setup auto-save
    setInterval(autoSave, 30000); // Auto-save every 30 seconds
}

function setupEventListeners() {
    // Word count for AI writing area
    const aiWritingArea = document.getElementById('ai-writing-area');
    if (aiWritingArea) {
        aiWritingArea.addEventListener('input', function() {
            updateWordCount(this.value, 'word-count');
            checkForAchievements();
            
            // Auto-suggest after every 50 words
            const words = this.value.trim().split(/\s+/).length;
            if (words > 0 && words % 50 === 0) {
                generateAISuggestion();
            }
        });
    }
    
    // Word count for voice writing area
    const voiceWritingArea = document.getElementById('voice-writing-area');
    if (voiceWritingArea) {
        voiceWritingArea.addEventListener('input', function() {
            updateWordCount(this.value, 'voice-word-count');
        });
    }
}

// ===== AI WRITING SUGGESTIONS =====
function generateAISuggestion() {
    const currentText = document.getElementById('ai-writing-area').value;
    const suggestions = horrorPrompts[currentMood];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    // Enhanced AI suggestions based on current text
    let contextualSuggestion = randomSuggestion;
    
    if (currentText.length > 100) {
        const lastSentence = currentText.split('.').pop().trim();
        if (lastSentence.includes('door')) {
            contextualSuggestion = "As the door creaks open, you notice the handle is warm... and wet...";
        } else if (lastSentence.includes('dark')) {
            contextualSuggestion = "In the darkness, something breathes that shouldn't be alive...";
        } else if (lastSentence.includes('mirror')) {
            contextualSuggestion = "The reflection smiles, but your face remains frozen in horror...";
        }
    }
    
    document.getElementById('ai-suggestion').textContent = contextualSuggestion;
    document.getElementById('suggestion-box').style.display = 'block';
    
    // Add suggestion to text
    setTimeout(() => {
        if (confirm('Add this suggestion to your story?')) {
            document.getElementById('ai-writing-area').value += ' ' + contextualSuggestion;
            updateWordCount(document.getElementById('ai-writing-area').value, 'word-count');
        }
    }, 3000);
}

// ===== VOICE RECOGNITION =====
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            console.log('🎤 Voice recognition started');
            document.getElementById('start-recording').classList.add('recording');
        };
        
        recognition.onresult = function(event) {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            const voiceArea = document.getElementById('voice-writing-area');
            voiceArea.value = voiceArea.value + finalTranscript;
            updateWordCount(voiceArea.value, 'voice-word-count');
        };
        
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            showNotification('Voice recognition error: ' + event.error, 'error');
        };
        
        recognition.onend = function() {
            isRecording = false;
            document.getElementById('start-recording').classList.remove('recording');
            document.getElementById('start-recording').disabled = false;
            document.getElementById('stop-recording').disabled = true;
        };
    } else {
        showNotification('Voice recognition not supported in this browser', 'error');
    }
}

function startVoiceRecording() {
    if (recognition && !isRecording) {
        isRecording = true;
        recognition.start();
        document.getElementById('start-recording').disabled = true;
        document.getElementById('stop-recording').disabled = false;
        showNotification('Voice recording started! 🎤', 'success');
    }
}

function stopVoiceRecording() {
    if (recognition && isRecording) {
        recognition.stop();
        showNotification('Voice recording stopped', 'info');
    }
}

function clearVoiceText() {
    document.getElementById('voice-writing-area').value = '';
    updateWordCount('', 'voice-word-count');
}

// ===== CHARACTER GENERATOR =====
function generateCharacter() {
    const name = characterTraits.names[Math.floor(Math.random() * characterTraits.names.length)];
    const appearance = characterTraits.appearances[Math.floor(Math.random() * characterTraits.appearances.length)];
    const personality = characterTraits.personalities[Math.floor(Math.random() * characterTraits.personalities.length)];
    const secret = characterTraits.secrets[Math.floor(Math.random() * characterTraits.secrets.length)];
    
    const character = {
        name,
        appearance,
        personality,
        secret,
        timestamp: new Date().toISOString()
    };
    
    document.getElementById('character-display').innerHTML = `
        <h4 style="color: var(--horror-red); margin-bottom: 15px;">💀 ${character.name}</h4>
        <p><strong>Appearance:</strong> ${character.appearance}</p>
        <p><strong>Personality:</strong> ${character.personality}</p>
        <p><strong>Dark Secret:</strong> ${character.secret}</p>
        <div style="margin-top: 15px; padding: 10px; background: rgba(255,107,107,0.1); border-radius: 5px;">
            <small style="color: var(--ghost-teal);">💡 Writing Tip: Use this character's secret as a plot twist!</small>
        </div>
    `;
    
    charactersGenerated++;
    checkForAchievements();
}

function saveCharacter() {
    const characterData = document.getElementById('character-display').innerHTML;
    if (characterData.includes('Click "Generate Character"')) {
        showNotification('Generate a character first!', 'error');
        return;
    }
    
    const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    savedCharacters.push({
        data: characterData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
    showNotification('Character saved successfully! 💾', 'success');
}

// ===== PLOT TWIST GENERATOR =====
function generateInitialPlotElements() {
    const plotContainer = document.getElementById('plot-elements');
    if (!plotContainer) return;
    
    // Clear existing elements
    plotContainer.innerHTML = '';
    
    // Generate 3 random plot elements
    for (let i = 0; i < 3; i++) {
        const twist = plotTwists[Math.floor(Math.random() * plotTwists.length)];
        const element = document.createElement('div');
        element.className = 'plot-element';
        element.setAttribute('onclick', 'addToStory(this)');
        element.innerHTML = `<strong>Plot Twist:</strong> ${twist}`;
        plotContainer.appendChild(element);
    }
}

function generatePlotTwist() {
    const newTwist = plotTwists[Math.floor(Math.random() * plotTwists.length)];
    const element = document.createElement('div');
    element.className = 'plot-element';
    element.setAttribute('onclick', 'addToStory(this)');
    element.innerHTML = `<strong>New Twist:</strong> ${newTwist}`;
    
    document.getElementById('plot-elements').appendChild(element);
    
    // Animate the new element
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }, 100);
}

function shufflePlotElements() {
    generateInitialPlotElements();
    showNotification('Plot elements shuffled! 🔀', 'info');
}

function addToStory(element) {
    const text = element.textContent;
    const aiWritingArea = document.getElementById('ai-writing-area');
    if (aiWritingArea) {
        aiWritingArea.value += '\n\n' + text + '\n\n';
        updateWordCount(aiWritingArea.value, 'word-count');
        element.style.backgroundColor = 'rgba(76, 205, 196, 0.3)';
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 1000);
        showNotification('Added to your story! ✨', 'success');
    }
}

// ===== WRITING SPRINT TIMER =====
function startWritingSprint() {
    const duration = parseInt(document.getElementById('sprint-duration').value);
    totalSeconds = duration * 60;
    timerSeconds = totalSeconds;
    
    writingTimer = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        updateProgressBar();
        
        if (timerSeconds <= 0) {
            completeWritingSprint();
        }
    }, 1000);
    
    showNotification(`Writing sprint started! ${duration} minutes to write! ⏱️`, 'info');
    checkForAchievements();
}

function pauseWritingSprint() {
    if (writingTimer) {
        clearInterval(writingTimer);
        writingTimer = null;
        showNotification('Sprint paused ⏸️', 'info');
    }
}

function resetWritingSprint() {
    if (writingTimer) {
        clearInterval(writingTimer);
        writingTimer = null;
    }
    
    const duration = parseInt(document.getElementById('sprint-duration').value);
    totalSeconds = duration * 60;
    timerSeconds = totalSeconds;
    updateTimerDisplay();
    updateProgressBar();
    showNotification('Sprint reset 🔄', 'info');
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const progress = ((totalSeconds - timerSeconds) / totalSeconds) * 100;
    document.getElementById('timer-progress').style.width = `${progress}%`;
}

function completeWritingSprint() {
    clearInterval(writingTimer);
    writingTimer = null;
    showNotification('🎉 Writing sprint completed! Great job!', 'success');
    unlockAchievement('Sprint Master', 'Completed your first writing sprint!');
    
    // Celebration effect
    document.getElementById('timer-display').style.animation = 'pulse 1s ease-in-out 3';
    setTimeout(() => {
        document.getElementById('timer-display').style.animation = '';
    }, 3000);
}

// ===== STORY BUILDER =====
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const targetElement = event.target.closest('.story-section');
    
    if (targetElement && targetElement !== draggedElement) {
        const parent = targetElement.parentNode;
        const nextSibling = targetElement.nextSibling;
        parent.insertBefore(draggedElement, nextSibling);
        showNotification('Story section reordered! 📝', 'info');
    }
}

function exportStory() {
    const sections = document.querySelectorAll('.story-section');
    let story = '';
    
    sections.forEach(section => {
        const content = section.querySelector('span[contenteditable]').textContent;
        story += content + '\n\n';
    });
    
    // Create downloadable file
    const blob = new Blob([story], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `horror-story-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Story exported successfully! 📄', 'success');
    unlockAchievement('Storyteller', 'Exported your first story!');
}

function addStorySection() {
    const storyBuilder = document.getElementById('story-builder');
    const newSection = document.createElement('div');
    newSection.className = 'story-section';
    newSection.draggable = true;
    newSection.setAttribute('ondragstart', 'drag(event)');
    newSection.id = 'section-' + Date.now();
    
    newSection.innerHTML = `
        <strong>New Section:</strong> 
        <span contenteditable="true" style="color: var(--bone-white);">Write your story section here...</span>
    `;
    
    storyBuilder.appendChild(newSection);
    showNotification('New story section added! ➕', 'info');
}

// ===== UTILITY FUNCTIONS =====
function updateWordCount(text, elementId) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount = words;
    document.getElementById(elementId).textContent = `Words: ${words}`;
}

function autoSave() {
    const aiContent = document.getElementById('ai-writing-area')?.value || '';
    const voiceContent = document.getElementById('voice-writing-area')?.value || '';
    
    if (aiContent || voiceContent) {
        localStorage.setItem('autoSave', JSON.stringify({
            aiContent,
            voiceContent,
            timestamp: new Date().toISOString()
        }));
        
        // Show subtle save indicator
        const saveIndicator = document.createElement('div');
        saveIndicator.textContent = '💾 Auto-saved';
        saveIndicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(76, 205, 196, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(saveIndicator);
        setTimeout(() => {
            if (saveIndicator.parentNode) {
                saveIndicator.parentNode.removeChild(saveIndicator);
            }
        }, 2000);
    }
}

// ===== ACHIEVEMENT SYSTEM =====
function checkForAchievements() {
    if (wordCount >= 100 && !achievements.includes('first-hundred')) {
        unlockAchievement('Word Warrior', 'Wrote your first 100 words!');
        achievements.push('first-hundred');
    }
    
    if (wordCount >= 500 && !achievements.includes('prolific-writer')) {
        unlockAchievement('Prolific Writer', 'Wrote 500 words in one session!');
        achievements.push('prolific-writer');
    }
    
    if (charactersGenerated >= 5 && !achievements.includes('character-creator')) {
        unlockAchievement('Character Creator', 'Generated 5 unique characters!');
        achievements.push('character-creator');
    }
    
    saveAchievements();
}

function unlockAchievement(title, description) {
    const popup = document.getElementById('achievement-popup');
    document.getElementById('achievement-text').textContent = `${title}: ${description}`;
    
    popup.classList.add('show');
    
    // Play achievement sound (if available)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRvIGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUXDEGH1+/MeSMGIILH79+PORcHI3zD8+KVOQYIUKPh8bJnFgaAyP'; // Placeholder audio
        audio.play().catch(() => {}); // Ignore audio errors
    } catch (e) {}
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}

function loadAchievements() {
    // Load saved achievements from localStorage
    const saved = JSON.parse(localStorage.getItem('writingAchievements') || '[]');
    achievements = saved;
}

function saveAchievements() {
    localStorage.setItem('writingAchievements', JSON.stringify(achievements));
}

// ===== ENHANCED CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(20px); }
        20%, 80% { opacity: 1; transform: translateY(0); }
    }
    
    .story-section {
        background: rgba(0, 0, 0, 0.3);
        border: 1px dashed rgba(255, 107, 107, 0.3);
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        cursor: move;
        transition: all 0.3s ease;
    }
    
    .story-section:hover {
        border-color: var(--horror-red);
        background: rgba(255, 107, 107, 0.1);
    }
    
    .story-section span[contenteditable] {
        color: var(--bone-white);
        outline: none;
        border: none;
        background: transparent;
        font-family: inherit;
    }
    
    .story-section span[contenteditable]:focus {
        background: rgba(76, 205, 196, 0.1);
        border-radius: 3px;
        padding: 2px 4px;
    }
`;
document.head.appendChild(style);

console.log('🎨 AI Writing Tools fully loaded and ready!');
