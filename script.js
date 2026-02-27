// script.js
$(document).ready(function () {
    const envelope = document.getElementById("envelope");
    const envelopeImage = document.getElementById("envelope-image");
    const envelopeVideoContainer = document.getElementById("envelope-video-container");
    const envelopeVideo = document.getElementById("envelope-video");
    const mainContent = document.getElementById("main-content");
    let isOpened = false;

    // Ensure scrolling is disabled initially until animation finishes
    document.body.style.overflow = 'hidden';

    envelope.addEventListener("click", function () {
        if (isOpened) return;
        isOpened = true;

        // Crossfade: Hide image, show video
        envelopeImage.style.opacity = '0';
        envelopeVideoContainer.style.opacity = '1';

        // Play video
        envelopeVideo.currentTime = 0;
        envelopeVideo.play().catch(e => console.error("Video playback failed", e));
    });

    // When the opening animation finishes
    envelopeVideo.addEventListener("ended", function () {
        // Fade out entire envelope container
        envelope.style.opacity = '0';

        // Show main content
        mainContent.style.opacity = '1';

        // Wait for the envelope fade transition to finish before hiding it from DOM
        setTimeout(() => {
            envelope.style.visibility = 'hidden';
            envelope.style.pointerEvents = 'none';
            document.body.style.overflow = 'auto'; // allow scrolling
        }, 10);

        document.documentElement.scrollTop = 0;
        startCountdown();
        loadMap();
        initScrollAnimations();
    });

    // Countdown Timer Function
    function startCountdown() {
        const weddingDate = new Date("2026-03-28T13:00:00+05:00");
        const daysEl = document.getElementById("timer-days");
        const hoursEl = document.getElementById("timer-hours");
        const minutesEl = document.getElementById("timer-minutes");
        const secondsEl = document.getElementById("timer-seconds");

        function updateCountdown() {
            const now = new Date();
            const timeRemaining = weddingDate - now;

            if (timeRemaining <= 0) {
                if (daysEl) daysEl.innerHTML = "0";
                if (hoursEl) hoursEl.innerHTML = "0";
                if (minutesEl) minutesEl.innerHTML = "0";
                if (secondsEl) secondsEl.innerHTML = "0";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerHTML = days;
            if (hoursEl) hoursEl.innerHTML = hours;
            if (minutesEl) minutesEl.innerHTML = minutes;
            if (secondsEl) secondsEl.innerHTML = seconds;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000); // Update every second
    }

    // Map Loading Function (using a placeholder here)
    function loadMap() {
        const mapElement = document.getElementById("map");
        if (mapElement) {
            mapElement.innerHTML = "<p>Map is loading...</p>";
            setTimeout(function () {
                mapElement.innerHTML = "<p>Wedding Location Map will go here.</p>";
            }, 2000);
        }
    }

    // Initialize Intersection Observer for elements that start hidden
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Select elements that specifically have opacity: 0 inline style
        document.querySelectorAll('*').forEach((el) => {
            if (el.style.opacity === '0' || el.style.opacity === 0) {
                observer.observe(el);
            }
        });
    }
});
