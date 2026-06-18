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
    if (!textEl) return;
    
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
        }, 1000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    startIntro();
});

// Target date for the launch: June 21, 2026
const targetDate = new Date("June 21, 2026 00:00:00").getTime();

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
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Handle Launch Button
function scrollToFeatures() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
        loadingOverlay.classList.add("visible");
        
        // Simulate a loading process
        setTimeout(() => {
            // Hide countdown and show video page
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) heroSection.style.display = 'none';
            
            const videoPage = document.getElementById('video-page');
            if (videoPage) videoPage.classList.add('active');
            
            // Hide loading overlay
            loadingOverlay.classList.remove("visible");
        }, 5000);
    }
}

// Add event listener to play button to transition to Features Page
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', () => {
        // Hide video page and show features page
        document.getElementById('video-page').classList.remove('active');
        
        const featuresPage = document.getElementById('features-page');
        featuresPage.classList.add('active');
    });
}
