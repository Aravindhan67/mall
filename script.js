// Intro Sequence Logic
const introTexts = [
    "Every app changed convenience.",
    "We changed the destination.",
    "A seamless ambient experience.",
    "Welcome to the future.",
    "Mallify. Infinite Experiences."
];

let currentIntroStep = 0;
let introInterval;

function startIntro() {
    const textEl = document.getElementById("intro-text");
    const progressBars = document.querySelectorAll(".progress-bar");
    if (!textEl) {
        isCountdownVisible = true;
        return;
    }
    
    introInterval = setInterval(() => {
        currentIntroStep++;
        
        if (currentIntroStep >= introTexts.length) {
            skipIntro();
            return;
        }

        // Fade out text
        textEl.style.opacity = 0;
        
        setTimeout(() => {
            textEl.innerText = introTexts[currentIntroStep];
            progressBars.forEach((bar, index) => {
                if (index <= currentIntroStep) {
                    bar.classList.add("active");
                }
            });
            textEl.style.opacity = 1;
        }, 500);
        
    }, 3000);
}

function skipIntro() {
    clearInterval(introInterval);
    const overlay = document.getElementById("intro-overlay");
    if (overlay) {
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.visibility = "hidden";
            overlay.style.display = "none";
            isCountdownVisible = true;
        }, 1000);
    } else {
        isCountdownVisible = true;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    startIntro();
});

// Audio Context for Ticking Sound
let audioCtx;
let isAudioEnabled = false;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    isAudioEnabled = true;
}

// Enable audio on first interaction
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('keydown', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playTickSound() {
    if (!isAudioEnabled || !audioCtx || audioCtx.state === 'suspended') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    // Sharp high pitch drop for a metallic "tick"
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);

    // Short volume spike
    gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(1.5, audioCtx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.04);
}

// Target date for the launch: June 21, 2026
const targetDate = new Date("June 21, 2026 00:00:00").getTime();
let isCountdownVisible = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    // Play tick sound every second if countdown is visible
    if (isCountdownVisible) {
        playTickSound();
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Handle Launch Button
function scrollToFeatures() {
    isCountdownVisible = false;
    const launchBtn = document.querySelector('.launch-btn');
    if (launchBtn) {
        launchBtn.innerHTML = "Launching... &rarr;";
        launchBtn.classList.add('launching-anim');
    }

    // Wait for button animation to progress
    setTimeout(() => {
        const crackerOverlay = document.getElementById("cracker-overlay");
        const countdownText = document.getElementById("countdown-text");

        if (crackerOverlay && countdownText) {
            crackerOverlay.classList.add("active");
            
            // Sequence: 3, 2, 1, Firework
            let count = 3;
            
            function animateNumber() {
                if (count > 0) {
                    countdownText.innerText = count;
                    countdownText.classList.remove("pop");
                    // trigger reflow
                    void countdownText.offsetWidth;
                    countdownText.classList.add("pop");
                    
                    count--;
                    setTimeout(animateNumber, 1000);
                } else {
                    countdownText.style.display = "none";
                    
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) heroSection.style.display = 'none';
                    
                    const videoPage = document.getElementById('video-page');
                    if (videoPage) videoPage.classList.add('active');
                    
                    crackerOverlay.classList.remove("active");
                    
                    // Reset things in case they go back
                    if (launchBtn) {
                        launchBtn.innerHTML = "Launch Experience &rarr;";
                        launchBtn.classList.remove('launching-anim');
                    }
                    countdownText.style.display = "block";
                }
            }
            
            animateNumber();
        } else {
            // Fallback if overlay not found
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) heroSection.style.display = 'none';
            const videoPage = document.getElementById('video-page');
            if (videoPage) videoPage.classList.add('active');
        }

    }, 800); // delay to let the button fly away
}



function startRealisticFireworks(duration) {
    const canvas = document.getElementById('firework-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const particles = [];
    const colors = [
        { r: 212, g: 175, b: 55 },   // Gold
        { r: 255, g: 255, b: 255 },  // White
        { r: 247, g: 231, b: 206 },  // Champagne
        { r: 255, g: 215, b: 0 },    // Bright Gold
        { r: 184, g: 115, b: 51 }    // Copper
    ];

    // Screen flash element
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = '#fff';
    flash.style.opacity = '0';
    flash.style.zIndex = '240';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.8s ease-out';
    document.getElementById('cracker-overlay').appendChild(flash);

    function triggerFlash() {
        flash.style.opacity = '0.4';
        flash.style.transition = 'none';
        setTimeout(() => {
            flash.style.transition = 'opacity 1.5s ease-out';
            flash.style.opacity = '0';
        }, 50);
    }

    function createExplosion(x, y, isGrand = false) {
        if (isGrand) triggerFlash();
        const count = isGrand ? 350 : 120 + Math.random() * 80;
        const power = isGrand ? 18 : 6 + Math.random() * 5;
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.pow(Math.random(), 0.5) * power;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: (Math.random() * 0.015 + 0.008) * (isGrand ? 0.6 : 1), 
                color: color,
                size: Math.random() * 2 + 1,
                sparkle: Math.random() > 0.7 
            });
        }
    }

    let lastTime = Date.now();
    
    // Launch sequence
    let fireworkInterval = setInterval(() => {
        createExplosion(
            Math.random() * canvas.width * 0.8 + canvas.width * 0.1, 
            Math.random() * canvas.height * 0.6 + canvas.height * 0.1
        );
    }, 450);

    // Initial grand burst in center
    setTimeout(() => createExplosion(canvas.width / 2, canvas.height / 2.5, true), 100);

    function drawParticle(p) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        const alpha = p.sparkle ? p.life * (0.5 + Math.random() * 0.5) : p.life;
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`); // hot white core
        gradient.addColorStop(0.2, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        if (Date.now() - lastTime > duration && particles.length === 0) {
            canvas.style.display = 'none';
            if(flash.parentNode) flash.parentNode.removeChild(flash);
            return;
        }
        requestAnimationFrame(animate);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'screen'; 

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.vx *= 0.97; // air resistance
            p.vy *= 0.97;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                drawParticle(p);
            }
        }
    }

    animate();

    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, duration - 1000); 
}


function generateCertificate() {
    const nameInput = document.getElementById('cert-name');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert("Please enter your name first!");
        return;
    }
    
    // Create an off-screen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load the certificate background image from base64 (avoids canvas tainting on local files)
    const img = new Image();
    img.src = typeof certBase64 !== 'undefined' ? certBase64 : 'cer.jpg';
    
    img.onload = function() {
        // Match canvas dimensions to the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the certificate template
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Configure text styling
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Set dynamic font size based on image width (e.g., 5% of width)
        const fontSize = Math.floor(canvas.width * 0.06);
        ctx.font = `italic ${fontSize}px "Georgia", serif`;
        ctx.fillStyle = '#8a1c31'; // A deep crimson/maroon to match the template border
        
        // Draw the user's name near the center (adjust Y multiplier if needed based on the template)
        // 0.48 puts it just slightly above the exact vertical center
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.48);
        
        // Download logic
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `Mallify_Certificate_${name.replace(/\s+/g, '_')}.jpg`;
        link.href = dataUrl;
        link.click();
    };
    
    img.onerror = function() {
        alert("Failed to load cer.jpg. Please ensure the image exists in the folder.");
    };
}

// Preload YouTube API
let isYouTubeApiReady = false;
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
if (firstScriptTag) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
} else {
    document.head.appendChild(tag);
}

let ytPlayer;
let hasVideoStarted = false;

window.onYouTubeIframeAPIReady = function() {
    isYouTubeApiReady = true;
    
    ytPlayer = new YT.Player('yt-player', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    // Track if the video has actually started playing
    if (event.data === YT.PlayerState.PLAYING || event.data === 1) {
        hasVideoStarted = true;
    }
    
    // When video ends (state 0), automatically skip to features
    if ((event.data === YT.PlayerState.ENDED || event.data === 0) && hasVideoStarted) {
        skipToFeatures();
    }
}

// Function to play video when button is clicked
function playVideo() {
    const placeholder = document.querySelector('.video-placeholder');
    const iframeDiv = document.getElementById('yt-player');
    const skipBtn = document.querySelector('.skip-video-btn');
    
    if (placeholder) placeholder.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'block';
    
    if (iframeDiv) {
        iframeDiv.style.opacity = '1';
        iframeDiv.style.pointerEvents = 'auto';
    }
    
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
    } else {
        // Fallback: manually trigger autoplay on the existing iframe by appending &autoplay=1
        if (!iframeDiv.src.includes('autoplay=1')) {
            iframeDiv.src += '&autoplay=1';
        }
    }
}

function skipToFeatures() {
    const videoPage = document.getElementById('video-page');
    if (videoPage) videoPage.classList.remove('active');
    
    const featuresPage = document.getElementById('features-page');
    if (featuresPage) featuresPage.classList.add('active');
}

// Event Delegation for play button (bulletproof)
document.addEventListener('click', (e) => {
    if (e.target.closest('.play-btn')) {
        playVideo();
    }
});

