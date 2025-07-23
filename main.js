// Haunted Empire - Main JavaScript
// Add interactivity as needed


// Smooth scroll for nav links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Backend integration
// Load API base URL from config.js
// eslint-disable-next-line no-undef
const API_BASE_URL = window.API_BASE_URL || (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'http://localhost:3002');

// Stripe payment trigger
async function triggerStripePayment() {
    try {
        const response = await fetch(`${API_BASE_URL}/stripe/test-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.clientSecret) {
            showAlert('Stripe payment intent created!');
        } else {
            showAlert('Stripe payment failed.');
        }
    } catch (err) {
        showAlert('Stripe payment error: ' + err.message);
    }
}

// Lore drop trigger
async function triggerLoreDrop() {
    try {
        const response = await fetch(`${API_BASE_URL}/lore/drop-live`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status === 'lore drop triggered') {
            showAlert('Live lore drop triggered!');
        } else {
            showAlert('Lore drop failed.');
        }
    } catch (err) {
        showAlert('Lore drop error: ' + err.message);
    }
}

// Real-time feedback (example: fetch stats)
async function fetchStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/test-connect`);
        const data = await response.json();
        if (data.status === 'ok') {
            updateStats('Backend: ' + data.env);
        } else {
            updateStats('Backend unavailable');
        }
    } catch (err) {
        updateStats('Error: ' + err.message);
    }
}

// UI helpers
function showAlert(message) {
    let alertBox = document.getElementById('alert-box');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'alert-box';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.right = '20px';
        alertBox.style.background = '#222';
        alertBox.style.color = '#fff';
        alertBox.style.padding = '1rem 2rem';
        alertBox.style.borderRadius = '8px';
        alertBox.style.zIndex = '9999';
        document.body.appendChild(alertBox);
    }
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => { alertBox.style.display = 'none'; }, 3500);
}

function updateStats(message) {
    let statsBox = document.getElementById('stats-box');
    if (!statsBox) {
        statsBox = document.createElement('div');
        statsBox.id = 'stats-box';
        statsBox.style.position = 'fixed';
        statsBox.style.bottom = '20px';
        statsBox.style.right = '20px';
        statsBox.style.background = '#333';
        statsBox.style.color = '#fff';
        statsBox.style.padding = '0.5rem 1.5rem';
        statsBox.style.borderRadius = '8px';
        statsBox.style.zIndex = '9999';
        document.body.appendChild(statsBox);
    }
    statsBox.textContent = message;
    statsBox.style.display = 'block';
}

// Example: call fetchStats on page load
document.addEventListener('DOMContentLoaded', fetchStats);
