// Sound effects management
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

// Audio context for generating sounds
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
}

// Generate click sound
function playClickSound() {
    if (!soundEnabled) return;
    initAudioContext();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Generate success sound
function playSuccessSound() {
    if (!soundEnabled) return;
    initAudioContext();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Generate error sound
function playErrorSound() {
    if (!soundEnabled) return;
    initAudioContext();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Main play sound function
function playSound(type) {
    switch(type) {
        case 'click':
            playClickSound();
            break;
        case 'success':
            playSuccessSound();
            break;
        case 'error':
            playErrorSound();
            break;
    }
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateSoundIcon();
    playSound('click');
}

function updateSoundIcon() {
    const icon = document.getElementById('soundIcon');
    if (icon) {
        icon.textContent = soundEnabled ? '🔊' : '🔇';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
        updateSoundIcon();
    }
});

// Make functions globally available
window.playSound = playSound;
window.toggleSound = toggleSound;