/**
 * ═══════════════════════════════════════════════════════════════
 * VANSH KHANNA — HYPER-LIQUID ACRYLIC GLASS OS
 * Full Interactive Engine: WebGL/Canvas2D Fluid, Web Audio,
 * GSAP ScrollTrigger, Custom Magnetic Cursor, Specular Lighting,
 * Dynamic Island, Embedded Sub-App Trays & Lightbox.
 * ═══════════════════════════════════════════════════════════════
 */

// Register GSAP plugins safely
if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);
}

// ═══════════════════════════════════════════════════════════════
// 01. CONSTANTS & CONFIG
// ═══════════════════════════════════════════════════════════════
const SECTIONS = ['hero', 'about', 'works', 'contact'];
const SECTION_NAMES = ['Home', 'About', 'Selected Works', 'Contact'];

const EASE = {
    glass: "cubic-bezier(0.16, 1, 0.3, 1)",
    spring: "elastic.out(1, 0.4)",
    outExpo: "expo.out",
    inOut: "power3.inOut"
};

// ═══════════════════════════════════════════════════════════════
// 02. DATA: CLOUDINARY ASSETS & MUSIC PLAYLISTS
// ═══════════════════════════════════════════════════════════════
const CLOUDINARY_PHOTOS = {
    nature: [
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469979/vashaya_portfolio/6.jpg", title: "Forest Study I", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469982/vashaya_portfolio/7.jpg", title: "Alpine Canopy", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469984/vashaya_portfolio/8.jpg", title: "Earth Texture", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469985/vashaya_portfolio/9.jpg", title: "Prismatic Flora", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469921/vashaya_portfolio/10.jpg", title: "Mountain Spine", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469928/vashaya_portfolio/11.jpg", title: "Highland Light", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469952/vashaya_portfolio/22.jpg", title: "Verdant Mist", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469954/vashaya_portfolio/23.jpg", title: "Botanical Specimen", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469955/vashaya_portfolio/24.jpg", title: "Sunbeam Veil", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469956/vashaya_portfolio/25.jpg", title: "Wild Horizon", tag: "Nature" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469964/vashaya_portfolio/29.jpg", title: "Root Architecture", tag: "Nature" }
    ],
    night: [
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469940/vashaya_portfolio/17.jpg", title: "Obsidian Dusk", tag: "Night" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469933/vashaya_portfolio/14.jpg", title: "Nocturne Spectrum", tag: "Night" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469943/vashaya_portfolio/19.jpg", title: "Midnight Solitude", tag: "Night" }
    ],
    landscape: [
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469933/vashaya_portfolio/14.jpg", title: "Vast Plains", tag: "Landscape" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469943/vashaya_portfolio/19.jpg", title: "Valley Shadow", tag: "Landscape" }
    ],
    eclectic: [
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469930/vashaya_portfolio/12.jpg", title: "Chromatic Study", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469935/vashaya_portfolio/15.jpg", title: "Geometric Shadow", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469941/vashaya_portfolio/18.jpg", title: "Prismatic Lens", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469949/vashaya_portfolio/20.jpg", title: "Subsurface Flare", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469938/vashaya_portfolio/16.jpg", title: "Abstract Rhythm", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469950/vashaya_portfolio/21.jpg", title: "Analog Grain", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469958/vashaya_portfolio/26.jpg", title: "Surface Dispersion", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469960/vashaya_portfolio/27.jpg", title: "Reflective Glass", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469961/vashaya_portfolio/28.jpg", title: "Edge Contrast", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469969/vashaya_portfolio/30.jpg", title: "Negative Space", tag: "Eclectic" },
        { url: "https://res.cloudinary.com/kymqk229/image/upload/v1794469970/vashaya_portfolio/31.jpg", title: "Final Exposure", tag: "Eclectic" }
    ]
};

const MUSIC_PLAYLISTS = [
    {
        id: 'global-50',
        title: 'Top 50 · Global',
        desc: "Realtime pulse of what's charting planet-wide with neural color grading.",
        cover: "https://picsum.photos/300/300?random=1&grayscale",
        bpm: 128,
        songs: [
            { title: 'Fake Anthem', artist: 'Unknown Artist', duration: '3:45' },
            { title: 'Global Hit Simulation', artist: 'The Algorithm', duration: '2:50' },
            { title: 'Liquid Frequency', artist: 'Vansh Khanna', duration: '3:12' }
        ]
    },
    {
        id: 'throwback',
        title: 'Throwback Haze',
        desc: 'Analog warmth for nostalgic late-night engineering sessions.',
        cover: "https://picsum.photos/300/300?random=2&grayscale",
        bpm: 116,
        songs: [
            { title: '90s Synth Odyssey', artist: 'The Vintage Boys', duration: '4:15' },
            { title: 'Cassette Tape Reverb', artist: 'Tape Deck Co.', duration: '3:30' }
        ]
    },
    {
        id: 'focus-flow',
        title: 'Study & Flow State',
        desc: 'Neutral-tone instrumentals calibrated for deep intellectual work.',
        cover: "https://picsum.photos/300/300?random=5",
        bpm: 96,
        songs: [
            { title: 'Lofi Study Session', artist: 'Chill Beats Co.', duration: '5:10' },
            { title: 'Deep Work Loop', artist: 'Focus Engine', duration: '3:42' },
            { title: 'Neural Flow', artist: 'Brainwave State', duration: '4:05' }
        ]
    },
    {
        id: 'voltage-run',
        title: 'Voltage Run',
        desc: 'High-velocity energy spikes for peak mental endurance.',
        cover: "https://picsum.photos/300/300?random=16&grayscale",
        bpm: 142,
        songs: [
            { title: 'Electric Rush', artist: 'Bass Blaster', duration: '3:05' },
            { title: 'Overdrive Pulse', artist: 'Circuit Breaker', duration: '2:48' }
        ]
    }
];

// ═══════════════════════════════════════════════════════════════
// 03. UTILITIES
// ═══════════════════════════════════════════════════════════════
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function isTouchDevice() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

// ═══════════════════════════════════════════════════════════════
// 04. GLOBAL STATE
// ═══════════════════════════════════════════════════════════════
const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 },
    prevMouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    ring: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    currentSection: 0,
    soundEnabled: false,
    fluidSpeedMultiplier: 1.0,
    audioCtx: null,
    activePlaylistIdx: 0,
    isPlayingMusic: false,
    musicPlaybackTimer: null,
    musicProgressSec: 0,
    activeVisualCategory: 'nature',
    activeLightboxCategory: 'nature',
    lightboxIndex: 0
};

// ═══════════════════════════════════════════════════════════════
// 05. INTRO LOADER SEQUENCE
// ═══════════════════════════════════════════════════════════════
function initIntro() {
    const intro = $('#intro-screen');
    const bar = $('#intro-progress-bar');
    if (!intro) return;

    let skipped = false;

    function completeIntro() {
        if (skipped) return;
        skipped = true;

        if (bar) bar.style.width = '100%';

        gsap.to(intro, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.75,
            ease: EASE.outExpo,
            onComplete: () => {
                intro.style.display = 'none';
                revealHero();
            }
        });
    }

    // Trigger bar fill
    setTimeout(() => {
        if (bar) bar.style.width = '100%';
    }, 100);

    // Auto complete when finished
    const timer = setTimeout(completeIntro, 2200);

    // Skip on click / touch
    intro.addEventListener('click', () => {
        clearTimeout(timer);
        completeIntro();
    });
}

function revealHero() {
    const tl = gsap.timeline();
    tl.fromTo('.hero-glass-pod',
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: EASE.outExpo }
    );
    tl.fromTo('.hero-title .title-reveal',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: EASE.outExpo },
        '-=0.6'
    );
    tl.fromTo('.stat-pill',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: EASE.spring },
        '-=0.4'
    );
}

// ═══════════════════════════════════════════════════════════════
// 06. FLUID INK CANVAS ENGINE (CANVAS 2D BIO-LUMINESCENT INK)
// ═══════════════════════════════════════════════════════════════
class InkBlob {
    constructor(canvas, color, radius) {
        this.canvas = canvas;
        this.color = color;
        this.radius = radius;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    update(speedMult, mouseForce) {
        this.x += this.vx * speedMult;
        this.y += this.vy * speedMult;

        // Mouse velocity force
        if (mouseForce) {
            const dx = state.mouse.x - this.x;
            const dy = state.mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 320 && dist > 1) {
                const force = (1 - dist / 320) * 0.45;
                this.x += state.mouse.vx * force;
                this.y += state.mouse.vy * force;
            }
        }

        // Bounce on boundary
        if (this.x < -100) this.x = this.canvas.width + 100;
        if (this.x > this.canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = this.canvas.height + 100;
        if (this.y > this.canvas.height + 100) this.y = -100;
    }

    draw(ctx) {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initFluidCanvas() {
    const canvas = $('#fluid-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 180));

    // Create 7 multi-tonal luminous blobs
    const colors = [
        'rgba(124, 93, 250, 0.16)', // Deep Violet
        'rgba(6, 182, 212, 0.14)',  // Electric Cyan
        'rgba(148, 163, 184, 0.08)',// Liquid Platinum
        'rgba(124, 93, 250, 0.12)', // Ambient Violet
        'rgba(6, 182, 212, 0.10)',  // Subtle Cyan
        'rgba(244, 63, 94, 0.08)',  // Prismatic Rose
        'rgba(16, 185, 129, 0.07)'  // Emerald Specular
    ];

    const blobs = colors.map((col, i) => new InkBlob(canvas, col, 260 + (i % 3) * 120));

    let animationId = null;

    function render() {
        if (!document.hidden) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'screen';

            // Calculate mouse velocity
            state.mouse.vx = state.mouse.x - state.prevMouse.x;
            state.mouse.vy = state.mouse.y - state.prevMouse.y;
            state.prevMouse.x = state.mouse.x;
            state.prevMouse.y = state.mouse.y;

            blobs.forEach(blob => {
                blob.update(state.fluidSpeedMultiplier, true);
                blob.draw(ctx);
            });
        }
        animationId = requestAnimationFrame(render);
    }
    render();

    // Mobile gyro swirl
    if (window.DeviceOrientationEvent && isTouchDevice()) {
        window.addEventListener('deviceorientation', e => {
            const gamma = (e.gamma || 0) * 0.15;
            const beta = (e.beta || 0) * 0.15;
            blobs.forEach((b, idx) => {
                b.x += (idx % 2 === 0 ? gamma : -gamma);
                b.y += beta;
            });
        }, { passive: true });
    }
}

// ═══════════════════════════════════════════════════════════════
// 07. CUSTOM DUAL-LAYER CURSOR & MAGNETIC PHYSICS
// ═══════════════════════════════════════════════════════════════
function initCursor() {
    if (isTouchDevice()) return;

    const orb = $('.cursor-orb');
    const ring = $('.cursor-ring');
    const label = $('.cursor-label');
    if (!orb || !ring) return;

    window.addEventListener('mousemove', e => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
        orb.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    // Spring Lerp Loop for Ring
    function tickRing() {
        state.ring.x = lerp(state.ring.x, state.mouse.x, 0.14);
        state.ring.y = lerp(state.ring.y, state.mouse.y, 0.14);
        ring.style.transform = `translate(${state.ring.x}px, ${state.ring.y}px) translate(-50%, -50%)`;
        requestAnimationFrame(tickRing);
    }
    tickRing();

    // Interactive Element Magnetic Snap & Cursor States
    const interactiveElements = $$(
        'button, a, .glass-card, .stat-pill, .squish-pill, .choice-pill, .photo-cell, .contact-card'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            orb.classList.add('hover');
            soundEngine.playGlassHover();
        });

        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            ring.classList.remove('action');
            orb.classList.remove('hover');
            if (label) label.textContent = '';
        });

        // Magnetic Attraction
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            gsap.to(el, { x: relX * 0.15, y: relY * 0.15, duration: 0.3 });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: EASE.spring });
        });
    });

    // Action Trigger Hover (for Project Cards)
    $$('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            ring.classList.add('action');
            if (label) label.textContent = 'OPEN';
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// 08. SPECULAR GLASS ENGINE & 3D PERSPECTIVE TILT
// ═══════════════════════════════════════════════════════════════
function initSpecularAndTilt() {
    const cards = $$('.glass-card, .hero-glass-pod');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);

            // 3D Perspective Tilt
            const rotX = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * -8;
            const rotY = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 8;

            gsap.to(card, {
                rotateX: rotX,
                rotateY: rotY,
                scale: 1.015,
                duration: 0.35,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: EASE.spring
            });
        });
    });

    // Mobile Gyroscope Perspective Tilt
    if (window.DeviceOrientationEvent && isTouchDevice()) {
        window.addEventListener('deviceorientation', e => {
            const beta = clamp(e.beta || 0, -30, 30);  // -30 to 30 deg
            const gamma = clamp(e.gamma || 0, -30, 30); // -30 to 30 deg
            cards.forEach(card => {
                card.style.transform = `perspective(1000px) rotateX(${beta * 0.15}deg) rotateY(${gamma * 0.15}deg)`;
            });
        }, { passive: true });
    }
}

// ═══════════════════════════════════════════════════════════════
// 09. HEADER DYNAMICS & LIVE CLOCK
// ═══════════════════════════════════════════════════════════════
function initHeader() {
    const header = $('#glass-header');
    const clockEl = $('#live-clock .time-val');

    // Live IST Clock
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
        const hrs = String(istTime.getHours()).padStart(2, '0');
        const mins = String(istTime.getMinutes()).padStart(2, '0');
        const secs = String(istTime.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hrs}:${mins}:${secs}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Scroll Hide / Show Behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const curY = window.scrollY;
        if (!header) return;

        if (curY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (curY > lastScrollY && curY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = curY;
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 10. GLASSPHONIC WEB AUDIO ENGINE (ZERO EXTERNAL MP3s)
// ═══════════════════════════════════════════════════════════════
const soundEngine = {
    init() {
        if (!state.audioCtx) {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (AudioCtxClass) {
                state.audioCtx = new AudioCtxClass();
            }
        }
        if (state.audioCtx && state.audioCtx.state === 'suspended') {
            state.audioCtx.resume();
        }
    },

    // 1. Crystal Glass Ring (Hover)
    playGlassHover: throttle(() => {
        if (!state.soundEnabled || !state.audioCtx) return;
        try {
            const ctx = state.audioCtx;
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.045, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
            gain.connect(ctx.destination);

            [1760, 2200].forEach(f => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now);
                osc.connect(gain);
                osc.start(now);
                osc.stop(now + 0.08);
            });
        } catch (e) { }
    }, 120),

    // 2. Liquid Droplet (Click/Toggle)
    playDrop() {
        if (!state.soundEnabled || !state.audioCtx) return;
        try {
            const ctx = state.audioCtx;
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.Q.value = 6;
            filter.frequency.setValueAtTime(750, now);
            filter.frequency.exponentialRampToValueAtTime(180, now + 0.18);

            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(750, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.22);
        } catch (e) { }
    },

    // 3. Viscous Fluid Whoosh (Tray Open/Close)
    playWhoosh() {
        if (!state.soundEnabled || !state.audioCtx) return;
        try {
            const ctx = state.audioCtx;
            const now = ctx.currentTime;
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(120, now);
            filter.frequency.exponentialRampToValueAtTime(550, now + 0.28);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
        } catch (e) { }
    }
};

function initSoundToggle() {
    const btn = $('#sound-toggle');
    const islandBtn = $('#island-sound-toggle');
    const islandStatus = $('#island-sound-status');

    function updateSoundUI() {
        const status = state.soundEnabled ? 'on' : 'off';
        if (btn) {
            btn.setAttribute('data-sound', status);
            const lbl = btn.querySelector('.sound-label');
            if (lbl) lbl.textContent = state.soundEnabled ? 'Sound On' : 'Sound Off';
        }
        if (islandStatus) {
            islandStatus.textContent = state.soundEnabled ? 'ON' : 'OFF';
        }
        localStorage.setItem('vansh-sound', status);
    }

    function toggleSound() {
        soundEngine.init();
        state.soundEnabled = !state.soundEnabled;
        updateSoundUI();
        if (state.soundEnabled) soundEngine.playDrop();
    }

    if (btn) btn.addEventListener('click', toggleSound);
    if (islandBtn) islandBtn.addEventListener('click', toggleSound);

    // Read stored sound preference
    if (localStorage.getItem('vansh-sound') === 'on') {
        state.soundEnabled = true;
        updateSoundUI();
    }

    // Attach click sound to all buttons & links
    document.addEventListener('click', e => {
        soundEngine.init();
        if (e.target.closest('button, a, .glass-card, .choice-pill, .squish-pill')) {
            soundEngine.playDrop();
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// 11. SUBTITLE CYCLER (HERO SECTION)
// ═══════════════════════════════════════════════════════════════
function initSubtitleCycler() {
    const phrases = $$('.sub-phrase');
    if (!phrases.length) return;

    let activeIdx = 0;
    setInterval(() => {
        phrases[activeIdx].classList.remove('active');
        activeIdx = (activeIdx + 1) % phrases.length;
        phrases[activeIdx].classList.add('active');
    }, 2800);
}

// ═══════════════════════════════════════════════════════════════
// 12. DYNAMIC ISLAND NAVIGATION & SECTION TRACKING
// ═══════════════════════════════════════════════════════════════
function initDynamicIsland() {
    const island = $('#dynamic-island');
    const trigger = $('#island-trigger');
    const closeBtn = $('#island-close-btn');
    const prevBtn = $('#island-prev');
    const nextBtn = $('#island-next');
    const counter = $('#island-counter');
    const label = $('#island-label');
    const progressFill = $('#island-progress-fill');
    const menuLinks = $$('.menu-link-btn');

    function toggleIsland(open) {
        if (!island) return;
        const willOpen = typeof open === 'boolean' ? open : !island.classList.contains('expanded');
        island.classList.toggle('expanded', willOpen);
        if (trigger) trigger.setAttribute('aria-expanded', String(willOpen));
        soundEngine.playDrop();
    }

    if (trigger) trigger.addEventListener('click', () => toggleIsland());
    if (closeBtn) closeBtn.addEventListener('click', () => toggleIsland(false));

    // Section links in expanded menu
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');
            const targetEl = $(`#${targetId}`);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                toggleIsland(false);
            }
        });
    });

    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            }
        });
    }

    function goToSection(idx) {
        state.currentSection = idx;
        const targetId = SECTIONS[idx];
        const el = $(`#${targetId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        updateIslandUI();
    }

    function updateIslandUI() {
        if (counter) counter.textContent = `0${state.currentSection + 1} / 0${SECTIONS.length}`;
        if (label) label.textContent = SECTION_NAMES[state.currentSection];

        menuLinks.forEach((link, i) => {
            link.classList.toggle('active', i === state.currentSection);
        });
    }

    // Scroll Progress & Active Section Detector
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        if (progressFill) progressFill.style.width = `${progress}%`;

        // Detect current section in view
        const scrollMiddle = scrollTop + window.innerHeight * 0.45;
        SECTIONS.forEach((secId, i) => {
            const el = $(`#${secId}`);
            if (el) {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;
                if (scrollMiddle >= top && scrollMiddle < bottom) {
                    if (state.currentSection !== i) {
                        state.currentSection = i;
                        updateIslandUI();
                    }
                }
            }
        });
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 13. GSAP SCROLL REVEALS & PARALLAX
// ═══════════════════════════════════════════════════════════════
function initScrollAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Parallax on Background Watermark
    gsap.to('.hero-watermark', {
        y: 180,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Reveal Cards in About Bento
    $$('.about-bento .glass-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.96 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: EASE.outExpo,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal Project Cards in Works Grid
    $$('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                ease: EASE.outExpo,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal Contact Cards
    $$('.contact-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: EASE.outExpo,
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 80%'
                }
            }
        );
    });
}

// ═══════════════════════════════════════════════════════════════
// 14. EMBEDDED TRAY SYSTEM (GSAP MORPHING OVERLAYS)
// ═══════════════════════════════════════════════════════════════
function initTraySystem() {
    // Open Tray Listeners
    $$('[data-open-tray]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const trayId = btn.getAttribute('data-open-tray');
            openTray(trayId);
        });
    });

    // Close Tray Listeners
    $$('[data-close-tray]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const overlay = btn.closest('.tray-overlay');
            if (overlay) closeTray(overlay.id);
        });
    });

    // Escape Key to Close Overlays
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const activeTray = $('.tray-overlay.active');
            if (activeTray) closeTray(activeTray.id);
            closeLightbox();
        }
    });
}

function openTray(id) {
    const tray = $(`#${id}`);
    if (!tray) return;

    tray.classList.add('active');
    tray.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    soundEngine.playWhoosh();

    const modal = tray.querySelector('.tray-modal');
    if (modal) {
        gsap.fromTo(modal,
            { scale: 0.92, y: 30, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: EASE.outExpo }
        );
    }
}

function closeTray(id) {
    const tray = $(`#${id}`);
    if (!tray) return;

    const modal = tray.querySelector('.tray-modal');
    if (modal) {
        gsap.to(modal, {
            scale: 0.94,
            y: 20,
            opacity: 0,
            duration: 0.28,
            ease: "power2.in",
            onComplete: () => {
                tray.classList.remove('active');
                tray.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    } else {
        tray.classList.remove('active');
        document.body.style.overflow = '';
    }
    soundEngine.playDrop();
}

// ═══════════════════════════════════════════════════════════════
// 15. TRAY 1: MUSIC OS INTERACTION & PLAYLIST LOADER
// ═══════════════════════════════════════════════════════════════
function initMusicOS() {
    const listEl = $('#music-playlist-list');
    const queueEl = $('#music-song-queue');
    const coverEl = $('#music-active-cover');
    const titleEl = $('#music-active-title');
    const descEl = $('#music-active-desc');
    const bpmEl = $('#music-bpm-count');
    const nowTitle = $('#player-now-title');
    const nowArtist = $('#player-now-artist');
    const playBtn = $('#player-play-btn');
    const discEl = $('#player-disc');
    const scrubFill = $('#player-progress');
    const curTimeEl = $('#player-current-time');

    // Populate Sidebar Playlists
    if (listEl) {
        listEl.innerHTML = MUSIC_PLAYLISTS.map((pl, i) => `
            <li>
                <button class="stack-item-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
                    <span class="stack-icon">✦</span>
                    <span>${pl.title}</span>
                </button>
            </li>
        `).join('');

        $$('.stack-item-btn', listEl).forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                loadPlaylist(idx);
            });
        });
    }

    function loadPlaylist(idx) {
        state.activePlaylistIdx = idx;
        const pl = MUSIC_PLAYLISTS[idx];

        // Update active class
        $$('.stack-item-btn', listEl).forEach((b, i) => b.classList.toggle('active', i === idx));

        // Update Hero Details
        if (coverEl) coverEl.src = pl.cover;
        if (titleEl) titleEl.textContent = pl.title;
        if (descEl) descEl.textContent = pl.desc;
        if (bpmEl) bpmEl.textContent = pl.bpm;

        // Populate Songs
        if (queueEl) {
            queueEl.innerHTML = pl.songs.map((s, si) => `
                <tr class="music-row">
                    <td>${si + 1}</td>
                    <td><strong>${s.title}</strong></td>
                    <td>${s.artist}</td>
                    <td>${s.duration}</td>
                    <td>
                        <button class="music-row-play-btn" data-track="${s.title}" data-artist="${s.artist}">▶</button>
                    </td>
                </tr>
            `).join('');

            $$('.music-row-play-btn', queueEl).forEach(btn => {
                btn.addEventListener('click', () => {
                    const t = btn.getAttribute('data-track');
                    const a = btn.getAttribute('data-artist');
                    playTrack(t, a);
                });
            });
        }
    }
    loadPlaylist(0);

    function playTrack(title, artist) {
        if (nowTitle) nowTitle.textContent = title;
        if (nowArtist) nowArtist.textContent = artist;
        state.isPlayingMusic = true;
        if (playBtn) playBtn.textContent = '⏸';
        if (discEl) discEl.classList.add('spinning');
        startScrubber();
    }

    function togglePlay() {
        state.isPlayingMusic = !state.isPlayingMusic;
        if (playBtn) playBtn.textContent = state.isPlayingMusic ? '⏸' : '▶';
        if (discEl) discEl.classList.toggle('spinning', state.isPlayingMusic);
        if (state.isPlayingMusic) {
            startScrubber();
        } else {
            clearInterval(state.musicPlaybackTimer);
        }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);

    function startScrubber() {
        clearInterval(state.musicPlaybackTimer);
        state.musicPlaybackTimer = setInterval(() => {
            state.musicProgressSec += 1;
            if (state.musicProgressSec > 225) state.musicProgressSec = 0;

            const mins = Math.floor(state.musicProgressSec / 60);
            const secs = String(state.musicProgressSec % 60).padStart(2, '0');
            if (curTimeEl) curTimeEl.textContent = `${mins}:${secs}`;
            if (scrubFill) scrubFill.style.width = `${(state.musicProgressSec / 225) * 100}%`;
        }, 1000);
    }
}

// ═══════════════════════════════════════════════════════════════
// 16. TRAY 2: VASHAYA VISUAL ARTS GALLERY & LIGHTBOX
// ═══════════════════════════════════════════════════════════════
function initVisualGallery() {
    const grid = $('#visual-photo-grid');
    const tabs = $$('.visual-tab-btn');

    function renderCategory(cat) {
        state.activeVisualCategory = cat;
        tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === cat));

        let photos = [];
        if (cat === 'all') {
            photos = [
                ...CLOUDINARY_PHOTOS.nature,
                ...CLOUDINARY_PHOTOS.night,
                ...CLOUDINARY_PHOTOS.landscape,
                ...CLOUDINARY_PHOTOS.eclectic
            ];
        } else {
            photos = CLOUDINARY_PHOTOS[cat] || CLOUDINARY_PHOTOS.nature;
        }

        if (grid) {
            grid.innerHTML = photos.map((p, i) => `
                <div class="photo-cell" data-idx="${i}" data-url="${p.url}" data-title="${p.title}" data-tag="${p.tag}">
                    <img src="${p.url}" alt="${p.title}" class="photo-cell-img" loading="lazy" />
                    <div class="photo-cell-caption">${p.title} · ${p.tag}</div>
                </div>
            `).join('');

            $$('.photo-cell', grid).forEach(cell => {
                cell.addEventListener('click', () => {
                    const url = cell.getAttribute('data-url');
                    const title = cell.getAttribute('data-title');
                    const tag = cell.getAttribute('data-tag');
                    const idx = parseInt(cell.getAttribute('data-idx'), 10);
                    openLightbox(photos, idx);
                });
            });
        }
    }
    renderCategory('nature');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const cat = tab.getAttribute('data-category');
            renderCategory(cat);
        });
    });
}

function openLightbox(photosList, index) {
    state.currentImagesList = photosList;
    state.lightboxIndex = index;

    const lb = $('#lightbox');
    const img = $('#lightbox-img');
    const cap = $('#lightbox-caption');
    if (!lb || !img) return;

    updateLightboxView();
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
    soundEngine.playWhoosh();
}

function updateLightboxView() {
    const img = $('#lightbox-img');
    const cap = $('#lightbox-caption');
    const item = state.currentImagesList[state.lightboxIndex];
    if (item && img) {
        img.src = item.url;
        if (cap) cap.textContent = `${item.title} — ${item.tag}`;
    }
}

function closeLightbox() {
    const lb = $('#lightbox');
    if (lb) {
        lb.classList.remove('active');
        lb.setAttribute('aria-hidden', 'true');
    }
}

function initLightboxControls() {
    const closeBtn = $('#lightbox-close');
    const backdrop = $('#lightbox-backdrop');
    const prevBtn = $('#lightbox-prev');
    const nextBtn = $('#lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.currentImagesList.length) {
                state.lightboxIndex = (state.lightboxIndex - 1 + state.currentImagesList.length) % state.currentImagesList.length;
                updateLightboxView();
                soundEngine.playDrop();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state.currentImagesList.length) {
                state.lightboxIndex = (state.lightboxIndex + 1) % state.currentImagesList.length;
                updateLightboxView();
                soundEngine.playDrop();
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 17. TRAY 3: CAR PRICE PREDICTOR SIMULATOR
// ═══════════════════════════════════════════════════════════════
function initCarPredictor() {
    const brandPills = $$('#car-brand-pills .choice-pill');
    const fuelPills = $$('#car-fuel-pills .choice-pill');
    const sliderYear = $('#slider-year');
    const sliderKm = $('#slider-km');
    const displayYear = $('#val-year-display');
    const displayKm = $('#val-km-display');
    const priceOutput = $('#car-estimated-price');

    let activeBrandMult = 1.0;
    let activeFuelMult = 1.0;

    brandPills.forEach(pill => {
        pill.addEventListener('click', () => {
            brandPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeBrandMult = parseFloat(pill.getAttribute('data-mult') || 1.0);
            calculatePrice();
        });
    });

    fuelPills.forEach(pill => {
        pill.addEventListener('click', () => {
            fuelPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFuelMult = parseFloat(pill.getAttribute('data-mult') || 1.0);
            calculatePrice();
        });
    });

    if (sliderYear) {
        sliderYear.addEventListener('input', () => {
            if (displayYear) displayYear.textContent = sliderYear.value;
            calculatePrice();
        });
    }

    if (sliderKm) {
        sliderKm.addEventListener('input', () => {
            const km = parseInt(sliderKm.value, 10);
            if (displayKm) displayKm.textContent = `${km.toLocaleString()} km`;
            calculatePrice();
        });
    }

    function calculatePrice() {
        const year = sliderYear ? parseInt(sliderYear.value, 10) : 2021;
        const km = sliderKm ? parseInt(sliderKm.value, 10) : 42000;

        // Empirical GBDT Resale Curve Model Simulation
        const baseValue = 900000;
        const age = 2026 - year;
        const depreciationFactor = Math.pow(0.88, age); // 12% annual depreciation
        const kmPenalty = Math.max(0.65, 1 - (km / 350000));

        const estimated = Math.round(baseValue * activeBrandMult * activeFuelMult * depreciationFactor * kmPenalty);
        if (priceOutput) {
            priceOutput.textContent = estimated.toLocaleString('en-IN');
        }
    }
    calculatePrice();
}

// ═══════════════════════════════════════════════════════════════
// 18. TRAY 4: THEME INSPECTOR (LIVE CSS VARIABLES)
// ═══════════════════════════════════════════════════════════════
function initThemeInspector() {
    const sliderBlur = $('#theme-slider-blur');
    const sliderSat = $('#theme-slider-sat');
    const sliderSpeed = $('#theme-slider-speed');
    const sliderGlow = $('#theme-slider-glow');

    const valBlur = $('#val-blur');
    const valSat = $('#val-sat');
    const valSpeed = $('#val-speed');
    const valGlow = $('#val-glow');
    const resetBtn = $('#reset-theme-btn');

    if (sliderBlur) {
        sliderBlur.addEventListener('input', () => {
            const v = `${sliderBlur.value}px`;
            document.documentElement.style.setProperty('--glass-blur', v);
            if (valBlur) valBlur.textContent = v;
        });
    }

    if (sliderSat) {
        sliderSat.addEventListener('input', () => {
            const v = `${sliderSat.value}%`;
            document.documentElement.style.setProperty('--glass-sat', v);
            if (valSat) valSat.textContent = v;
        });
    }

    if (sliderSpeed) {
        sliderSpeed.addEventListener('input', () => {
            const mult = sliderSpeed.value / 10;
            state.fluidSpeedMultiplier = mult;
            if (valSpeed) valSpeed.textContent = `${mult.toFixed(1)}x`;
        });
    }

    if (sliderGlow) {
        sliderGlow.addEventListener('input', () => {
            const val = sliderGlow.value / 100;
            document.documentElement.style.setProperty('--glass-glow-opacity', val);
            if (valGlow) valGlow.textContent = `${sliderGlow.value}%`;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.documentElement.style.setProperty('--glass-blur', '40px');
            document.documentElement.style.setProperty('--glass-sat', '220%');
            document.documentElement.style.setProperty('--glass-glow-opacity', '0.6');
            state.fluidSpeedMultiplier = 1.0;

            if (sliderBlur) sliderBlur.value = 40;
            if (sliderSat) sliderSat.value = 220;
            if (sliderSpeed) sliderSpeed.value = 10;
            if (sliderGlow) sliderGlow.value = 60;

            if (valBlur) valBlur.textContent = '40px';
            if (valSat) valSat.textContent = '220%';
            if (valSpeed) valSpeed.textContent = '1.0x';
            if (valGlow) valGlow.textContent = '60%';

            showToast('Factory Glass parameters restored ✓');
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 19. CONTACT COPY ACTIONS & TOAST FEEDBACK
// ═══════════════════════════════════════════════════════════════
function showToast(msg) {
    const toast = $('#toast');
    const toastText = $('#toast-text');
    if (!toast) return;

    if (toastText) toastText.textContent = msg;
    toast.classList.add('show');
    soundEngine.playDrop();

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

function initContactActions() {
    const emailCard = $('#copy-email-card');
    const phoneCard = $('#copy-phone-card');

    if (emailCard) {
        emailCard.addEventListener('click', () => {
            navigator.clipboard.writeText('khanna.vansh.xo@gmail.com');
            showToast('Email copied to clipboard: khanna.vansh.xo@gmail.com ✓');
        });
    }

    if (phoneCard) {
        phoneCard.addEventListener('click', () => {
            navigator.clipboard.writeText('+918826326333');
            showToast('Phone number copied to clipboard: +91 88263 26333 ✓');
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 20. SKILL PILLS SQUISH REACTION
// ═══════════════════════════════════════════════════════════════
function initSkillPills() {
    $$('.squish-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            gsap.fromTo(pill,
                { scaleX: 0.85, scaleY: 1.15 },
                { scaleX: 1, scaleY: 1, duration: 0.45, ease: EASE.spring }
            );
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// 21. MASTER INITIALIZATION
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initFluidCanvas();
    initCursor();
    initSpecularAndTilt();
    initHeader();
    initSoundToggle();
    initSubtitleCycler();
    initDynamicIsland();
    initScrollAnimations();
    initTraySystem();
    initMusicOS();
    initVisualGallery();
    initLightboxControls();
    initCarPredictor();
    initThemeInspector();
    initContactActions();
    initSkillPills();
});
