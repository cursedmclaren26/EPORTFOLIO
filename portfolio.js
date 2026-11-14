/**
 * PORTFOLIO - Cinematic Ecosystem
 * GSAP animations, section navigation, cursor tracking
 */

gsap.registerPlugin();

// ============================================
// CONFIG
// ============================================
const EASE = {
    out: "expo.out",
    inOut: "power4.inOut",
    elastic: "elastic.out(1, 0.4)"
};

const SECTIONS = ['home', 'about', 'projects', 'education', 'contact'];
const SECTION_NAMES = ['Home', 'About', 'Projects', 'Education', 'Contact'];

// ============================================
// STATE
// ============================================
const state = {
    currentSection: 0,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    isAnimating: false
};

// ============================================
// DOM
// ============================================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const DOM = {};

function cacheDom() {
    DOM.intro = $('.intro');
    DOM.app = $('.app');
    DOM.cursor = $('.cursor');
    DOM.cursorLabel = $('.cursor-label');
    DOM.heroBg = $('.hero-bg');
    DOM.dock = $('.dock');
    DOM.dockItems = $$('.dock-item');
    DOM.sections = $$('.section');
    DOM.logo = $('.logo');
    DOM.tagline = $('.header-tagline');
    DOM.navIsland = $('#nav-island');
    DOM.islandScrim = $('#island-scrim');
    DOM.islandTrigger = $('#island-trigger');
    DOM.islandCloseBtn = $('#island-close-btn');
    DOM.islandItems = $$('.island-item');
    DOM.islandPrev = $('#island-prev');
    DOM.islandNext = $('#island-next');
    DOM.islandCount = $('.island-count');
    DOM.islandTag = $('.island-tag');
}

// ============================================
// INIT
// ============================================
function isTouchDevice() {
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    initCursor();
    initParallax();
    initNavigation();
    initTouch();
    initTrays();
    initMusicOS();
    initVisualGallery();
    initCarPredictor();
    initTelemetry();
    runIntro();
});

// ============================================
// INTRO SEQUENCE
// ============================================
let introTl = null;
let introDone = false;

function skipIntro() {
    if (introDone) return;
    introDone = true;
    if (introTl) {
        introTl.kill();
        introTl = null;
    }
    if (DOM.intro) DOM.intro.style.display = 'none';
    if (DOM.app) DOM.app.classList.add('ready');

    // Reveal header and dock immediately
    if (DOM.logo) gsap.set(DOM.logo, { y: 0, opacity: 1 });
    if (DOM.tagline) gsap.set(DOM.tagline, { y: 0, opacity: 1 });
    if (DOM.dock) gsap.set(DOM.dock, { opacity: 1 });
    gsap.set('.dock-item', { x: 0, opacity: 1 });

    // Only showSection(0) if no other section has been activated
    if (state.currentSection === 0) {
        showSection(0);
    }
}

function runIntro() {
    DOM.intro.addEventListener('click', skipIntro);
    DOM.intro.addEventListener('touchstart', skipIntro, { passive: true });

    const isMobile = isTouchDevice();
    const durationMultiplier = isMobile ? 0.5 : 0.7;

    introTl = gsap.timeline({
        onComplete: () => {
            if (!introDone) {
                showApp();
            }
        }
    });

    // Progress bar
    introTl.to('.intro-progress-bar', {
        width: '100%',
        duration: 1.2 * durationMultiplier,
        ease: 'power2.inOut'
    });

    // Brand reveal
    introTl.to('.intro-brand span', {
        y: 0,
        duration: 0.7 * durationMultiplier,
        ease: EASE.out
    }, 0.2 * durationMultiplier);

    // Subtitle
    introTl.to('.intro-sub span', {
        y: 0,
        duration: 0.5 * durationMultiplier,
        ease: EASE.out
    }, 0.4 * durationMultiplier);

    // Hold
    introTl.to({}, { duration: 0.2 * durationMultiplier });

    // Exit
    introTl.to('.intro-brand span, .intro-sub span', {
        y: -100,
        opacity: 0,
        duration: 0.3 * durationMultiplier,
        stagger: 0.03,
        ease: 'power3.in'
    });

    introTl.to(DOM.intro, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4 * durationMultiplier,
        ease: EASE.inOut
    }, '-=0.15');
}

function showApp() {
    introDone = true;
    if (introTl) {
        introTl.kill();
        introTl = null;
    }
    if (DOM.intro) DOM.intro.style.display = 'none';
    if (DOM.app) DOM.app.classList.add('ready');

    const tl = gsap.timeline();

    // Header elements
    tl.to([DOM.logo, DOM.tagline], {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: EASE.out
    });

    // Dock
    tl.to(DOM.dock, {
        opacity: 1,
        duration: 0.7,
        ease: EASE.out
    }, '-=0.5');

    // Dock items stagger
    tl.fromTo('.dock-item',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: EASE.out },
        '-=0.5'
    );

    // Only show first section if user hasn't already navigated to another section
    if (state.currentSection === 0) {
        showSection(0);
    }

    // Ensure dock is visible immediately on mobile
    if (isTouchDevice() && DOM.dock) {
        DOM.dock.style.opacity = '1';
    }
}

// ============================================
// SECTION NAVIGATION
// ============================================
function initNavigation() {
    // Dock items
    DOM.dockItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (state.isAnimating) return;
            goToSection(i);
        });
    });

    // Dynamic Island navigation listeners (directly bound)
    if (DOM.islandTrigger) {
        DOM.islandTrigger.addEventListener('click', e => {
            e.stopPropagation();
            toggleIsland();
        });
    }
    if (DOM.islandCloseBtn) {
        DOM.islandCloseBtn.addEventListener('click', e => {
            e.stopPropagation();
            toggleIsland(false);
        });
    }
    if (DOM.islandScrim) {
        DOM.islandScrim.addEventListener('click', () => toggleIsland(false));
    }
    if (DOM.islandPrev) {
        DOM.islandPrev.addEventListener('click', e => {
            e.stopPropagation();
            if (state.isAnimating) return;
            if (state.currentSection > 0) goToSection(state.currentSection - 1);
        });
    }
    if (DOM.islandNext) {
        DOM.islandNext.addEventListener('click', e => {
            e.stopPropagation();
            if (state.isAnimating) return;
            if (state.currentSection < SECTIONS.length - 1) goToSection(state.currentSection + 1);
        });
    }
    if (DOM.islandItems && DOM.islandItems.length) {
        DOM.islandItems.forEach((item, i) => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                goToSection(i);
                toggleIsland(false);
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') toggleIsland(false);
        if (state.isAnimating) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            }
        }
    });

    // Mouse wheel navigation
    let wheelTimeout;
    document.addEventListener('wheel', e => {
        if (state.isAnimating) return;
        if (document.querySelector('.tray-overlay.active')) return;

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 50 && state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            } else if (e.deltaY < -50 && state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            }
        }, 50);
    }, { passive: true });

    updateIslandState();
}

function goToSection(index) {
    if (index === state.currentSection || index < 0 || index >= SECTIONS.length) return;

    // Immediately stop any pending intro sequence so it NEVER overrides navigation
    if (!introDone) {
        skipIntro();
    }

    state.isAnimating = true;
    const oldSection = DOM.sections[state.currentSection];
    const newSection = DOM.sections[index];

    // Kill any existing animations on both sections
    gsap.killTweensOf(oldSection);
    gsap.killTweensOf(newSection);

    // Fade out old section
    gsap.to(oldSection, {
        opacity: 0,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
            oldSection.classList.remove('active');
            oldSection.style.pointerEvents = 'none';

            // Show new section
            newSection.scrollTop = 0;
            newSection.classList.add('active');
            newSection.style.pointerEvents = 'auto';

            gsap.fromTo(newSection,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.32,
                    ease: EASE.out,
                    onComplete: () => {
                        state.isAnimating = false;
                    }
                }
            );

            // Animate title if present
            const title = newSection.querySelector('.section-title');
            if (title) {
                const spans = title.querySelectorAll('span');
                gsap.fromTo(spans,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.35, stagger: 0.015, ease: EASE.out }
                );
            }
        }
    });

    state.currentSection = index;
    updateDockActive();
    updateIslandState();
}

function showSection(index) {
    DOM.sections.forEach((s, i) => {
        if (i === index) {
            s.scrollTop = 0;
            s.classList.add('active');
            s.style.pointerEvents = 'auto';
            gsap.fromTo(s,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.38,
                    ease: EASE.out,
                    onComplete: () => {
                        state.isAnimating = false;
                    }
                }
            );
        } else {
            s.classList.remove('active');
            s.style.pointerEvents = 'none';
            s.style.opacity = '0';
        }
    });

    // Animate content inside - no delay so it never flashes or loads late
    const title = DOM.sections[index].querySelector('.section-title');
    if (title) {
        const spans = title.querySelectorAll('span');
        gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: EASE.out
        });
    }

    // Animate hero title lines
    const heroLines = DOM.sections[index].querySelectorAll('.hero-title .line span');
    if (heroLines.length) {
        gsap.to(heroLines, {
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: EASE.out
        });
    }
}


// ============================================
// DYNAMIC ISLAND CONTROLS
// ============================================
function toggleIsland(forceState) {
    if (!DOM.navIsland) return;
    const isExpanded = DOM.navIsland.classList.contains('expanded');
    const willExpand = typeof forceState === 'boolean' ? forceState : !isExpanded;

    if (willExpand) {
        DOM.navIsland.classList.add('expanded');
        if (DOM.islandScrim) DOM.islandScrim.classList.add('visible');
        if (DOM.islandTrigger) DOM.islandTrigger.setAttribute('aria-expanded', 'true');
        if (DOM.islandItems && DOM.islandItems.length) {
            gsap.fromTo(DOM.islandItems,
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.25, stagger: 0.03, ease: 'expo.out' }
            );
        }
    } else {
        DOM.navIsland.classList.remove('expanded');
        if (DOM.islandScrim) DOM.islandScrim.classList.remove('visible');
        if (DOM.islandTrigger) DOM.islandTrigger.setAttribute('aria-expanded', 'false');
    }
}

function updateIslandState() {
    const curIdx = state.currentSection;
    const n = String(curIdx + 1).padStart(2, '0');
    const total = String(SECTIONS.length).padStart(2, '0');
    const name = SECTION_NAMES[curIdx] || 'Home';

    if (DOM.islandCount) DOM.islandCount.textContent = `${n} — ${total}`;
    if (DOM.islandTag) DOM.islandTag.textContent = name;

    if (DOM.islandItems && DOM.islandItems.length) {
        DOM.islandItems.forEach((item, i) => {
            item.classList.toggle('active', i === curIdx);
        });
    }

    if (DOM.islandPrev) {
        DOM.islandPrev.style.opacity = curIdx === 0 ? '0.35' : '1';
        DOM.islandPrev.style.pointerEvents = curIdx === 0 ? 'none' : 'auto';
    }
    if (DOM.islandNext) {
        DOM.islandNext.style.opacity = curIdx === SECTIONS.length - 1 ? '0.35' : '1';
        DOM.islandNext.style.pointerEvents = curIdx === SECTIONS.length - 1 ? 'none' : 'auto';
    }
}

function updateDockActive() {
    DOM.dockItems.forEach((item, i) => {
        item.classList.toggle('active', i === state.currentSection);
    });
    updateIslandState();
}

// ============================================
// HARDWARE-ACCELERATED CURSOR (60–120 FPS LOCKED)
// ============================================
function initCursor() {
    if (isTouchDevice()) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let rafActive = false;

    window.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!rafActive) {
            rafActive = true;
            requestAnimationFrame(renderCursor);
        }
    }, { passive: true });

    function renderCursor() {
        curX += (targetX - curX) * 0.35;
        curY += (targetY - curY) * 0.35;

        if (DOM.cursor) {
            DOM.cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        }
        if (DOM.cursorLabel) {
            DOM.cursorLabel.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        }

        if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
            requestAnimationFrame(renderCursor);
        } else {
            rafActive = false;
        }
    }

    // High-performance event delegation for hover states
    document.addEventListener('mouseover', e => {
        const link = e.target.closest('a, button, .project-card, .contact-card, .dock-item, .island-arrow, .island-trigger, .island-item, .skill-list li, [data-open-tray]');
        if (link && DOM.cursor) {
            DOM.cursor.classList.add('link');
        } else if (DOM.cursor) {
            DOM.cursor.classList.remove('link');
        }
    });
}

// ============================================
// PARALLAX (THROTTLED FOR ZERO CPU WASTE)
// ============================================
function initParallax() {
    if (isTouchDevice()) return;

    let pActive = false;
    let px = 0, py = 0;

    window.addEventListener('mousemove', e => {
        px = (e.clientX / window.innerWidth - 0.5) * 20;
        py = (e.clientY / window.innerHeight - 0.5) * 20;

        if (!pActive) {
            pActive = true;
            requestAnimationFrame(() => {
                if (DOM.heroBg) {
                    DOM.heroBg.style.transform = `translate3d(${px}px, ${py}px, 0)`;
                }
                const brandLetter = document.querySelector('.brand-letter');
                if (brandLetter) {
                    brandLetter.style.transform = `translate3d(${px * -0.4}px, ${py * -0.4}px, 0)`;
                }
                pActive = false;
            });
        }
    }, { passive: true });
}

// ============================================
// TOUCH / SWIPE
// ============================================
function initTouch() {
    if (!isTouchDevice()) return;

    // Subtle device orientation tilt on mobile (if supported)
    if (typeof DeviceOrientationEvent !== 'undefined') {
        window.addEventListener('deviceorientation', e => {
            const x = (e.gamma || 0) * 0.3; // -90 to 90
            const y = (e.beta || 0) * 0.15; // -180 to 180
            gsap.to(DOM.heroBg, { x: x, y: y, duration: 1.5, ease: 'power2.out' });
            gsap.to('.brand-letter', { x: x * -0.25, y: y * -0.25, duration: 1.5, ease: 'power2.out' });
        }, { passive: true });
    }

    // Touch feedback on dock items & interactive elements
    DOM.dockItems.forEach(item => {
        item.style.touchAction = 'manipulation';
        item.addEventListener('touchstart', () => {
            gsap.to(item, { scale: 0.92, duration: 0.1 });
        }, { passive: true });
        item.addEventListener('touchend', () => {
            gsap.to(item, { scale: 1, duration: 0.25, ease: 'power2.out' });
        }, { passive: true });
        item.addEventListener('touchcancel', () => {
            gsap.to(item, { scale: 1, duration: 0.2 });
        }, { passive: true });
    });

    $$('.island-arrow, .island-trigger, .island-item, .project-card, .contact-card').forEach(el => {
        el.style.touchAction = 'manipulation';
        el.addEventListener('touchstart', () => {
            gsap.to(el, { scale: 0.96, duration: 0.1 });
        }, { passive: true });
        el.addEventListener('touchend', () => {
            gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
        }, { passive: true });
        el.addEventListener('touchcancel', () => {
            gsap.to(el, { scale: 1, duration: 0.2 });
        }, { passive: true });
    });

    // Swipe to change sections (prevent accidental swipes when scrolling vertically)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const dt = Date.now() - touchStartTime;

        // Clean horizontal flick gesture:
        // Must be horizontal (dy < 65px), clear horizontal motion (dx > 50px), and faster than 500ms
        if (Math.abs(dy) < 65 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
            if (dx < 0 && state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            } else if (dx > 0 && state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            }
        }
    }, { passive: true });
}

// ============================================
// INTERACTIVE ENGINES & ARCHIVES DATA
// ============================================
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
        tag: 'HIGH VELOCITY',
        desc: "Realtime pulse of global electronic rhythms and synthesized melodies.",
        cover: "https://picsum.photos/300/300?random=11",
        bpm: 128,
        songs: [
            { title: 'Liquid Frequency', artist: 'Vansh Khanna', duration: '3:12' },
            { title: 'Global Hit Simulation', artist: 'The Algorithm', duration: '2:50' },
            { title: 'Digital Mirage', artist: 'VASHAYA Audio', duration: '3:45' }
        ]
    },
    {
        id: 'study-flow',
        title: 'Study & Flow State',
        tag: 'DEEP WORK',
        desc: 'Neutral-tone ambient textures calibrated for deep intellectual work.',
        cover: "https://picsum.photos/300/300?random=12",
        bpm: 96,
        songs: [
            { title: 'Deep Work Loop', artist: 'Focus Engine', duration: '3:42' },
            { title: 'Neural Flow', artist: 'Brainwave State', duration: '4:05' },
            { title: 'Lofi Study Session', artist: 'Chill Beats Co.', duration: '5:10' }
        ]
    },
    {
        id: 'throwback',
        title: 'Throwback Haze',
        tag: 'ANALOG WARMTH',
        desc: 'Analog nostalgia for late-night engineering and architecture sessions.',
        cover: "https://picsum.photos/300/300?random=13",
        bpm: 116,
        songs: [
            { title: '90s Synth Odyssey', artist: 'The Vintage Boys', duration: '4:15' },
            { title: 'Cassette Tape Reverb', artist: 'Tape Deck Co.', duration: '3:30' }
        ]
    },
    {
        id: 'voltage-run',
        title: 'Voltage Run',
        tag: 'PEAK VELOCITY',
        desc: 'Overdriven electronic pulse for high-intensity problem solving.',
        cover: "https://picsum.photos/300/300?random=14",
        bpm: 142,
        songs: [
            { title: 'Electric Rush', artist: 'Bass Blaster', duration: '3:05' },
            { title: 'Overdrive Pulse', artist: 'Circuit Breaker', duration: '2:48' }
        ]
    }
];

const subAppState = {
    activePlaylistIdx: 0,
    isPlayingMusic: false,
    musicProgressSec: 0,
    musicTimer: null,
    activeVisualCategory: 'nature',
    activeImagesList: [],
    lightboxIndex: 0
};

// ============================================
// TRAY OPEN / CLOSE ENGINE
// ============================================
function initTrays() {
    $$('[data-open-tray]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const trayId = btn.getAttribute('data-open-tray');
            openTray(trayId);
        });
    });

    $$('[data-close-tray]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const overlay = btn.closest('.tray-overlay');
            if (overlay) closeTray(overlay.id);
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const activeTray = $('.tray-overlay.active');
            if (activeTray) closeTray(activeTray.id);
            closeLightbox();
        }
    });
}

function openTray(id) {
    const tray = document.getElementById(id);
    if (!tray) return;
    tray.classList.add('active');
    tray.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (DOM.app) DOM.app.classList.add('modal-open');

    const modal = tray.querySelector('.tray-modal');
    if (modal && typeof gsap !== 'undefined') {
        gsap.fromTo(modal,
            { scale: 0.94, y: 20, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' }
        );
    }
}

function closeTray(id) {
    const tray = document.getElementById(id);
    if (!tray) return;

    const modal = tray.querySelector('.tray-modal');
    if (modal && typeof gsap !== 'undefined') {
        gsap.to(modal, {
            scale: 0.95,
            y: 15,
            opacity: 0,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: () => {
                tray.classList.remove('active');
                tray.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                if (DOM.app) DOM.app.classList.remove('modal-open');
            }
        });
    } else {
        tray.classList.remove('active');
        tray.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (DOM.app) DOM.app.classList.remove('modal-open');
    }
}

// ============================================
// MUSIC OS ENGINE
// ============================================
function initMusicOS() {
    const playlistNav = document.getElementById('music-playlist-list');
    const songQueue = document.getElementById('music-song-queue');
    const activeCover = document.getElementById('music-active-cover');
    const activeTitle = document.getElementById('music-active-title');
    const activeDesc = document.getElementById('music-active-desc');
    const activeTag = document.getElementById('music-active-tag');
    const nowTitle = document.getElementById('player-now-title');
    const nowArtist = document.getElementById('player-now-artist');
    const playBtn = document.getElementById('player-play-btn');
    const discEl = document.getElementById('player-disc');
    const scrubFill = document.getElementById('player-progress');
    const curTimeEl = document.getElementById('player-current-time');

    if (!playlistNav) return;

    playlistNav.innerHTML = MUSIC_PLAYLISTS.map((pl, i) => `
        <li>
            <button class="stack-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
                <span>✦</span>
                <span>${pl.title}</span>
            </button>
        </li>
    `).join('');

    playlistNav.querySelectorAll('.stack-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'), 10);
            loadPlaylist(idx);
        });
    });

    function loadPlaylist(idx) {
        subAppState.activePlaylistIdx = idx;
        const pl = MUSIC_PLAYLISTS[idx];

        playlistNav.querySelectorAll('.stack-btn').forEach((b, i) => {
            b.classList.toggle('active', i === idx);
        });

        if (activeCover) activeCover.src = pl.cover;
        if (activeTitle) activeTitle.textContent = pl.title;
        if (activeDesc) activeDesc.textContent = pl.desc;
        if (activeTag) activeTag.textContent = pl.tag;

        if (songQueue) {
            songQueue.innerHTML = pl.songs.map((s, si) => `
                <tr class="music-row">
                    <td>${si + 1}</td>
                    <td><strong>${s.title}</strong></td>
                    <td>${s.artist}</td>
                    <td>${s.duration}</td>
                    <td>
                        <button class="track-play-btn" data-track="${s.title}" data-artist="${s.artist}" aria-label="Play ${s.title}">▶</button>
                    </td>
                </tr>
            `).join('');

            songQueue.querySelectorAll('.track-play-btn').forEach(btn => {
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
        subAppState.isPlayingMusic = true;
        if (playBtn) playBtn.textContent = '⏸';
        if (discEl) discEl.classList.add('spinning');
        startScrubber();
    }

    function togglePlay() {
        subAppState.isPlayingMusic = !subAppState.isPlayingMusic;
        if (playBtn) playBtn.textContent = subAppState.isPlayingMusic ? '⏸' : '▶';
        if (discEl) discEl.classList.toggle('spinning', subAppState.isPlayingMusic);

        if (subAppState.isPlayingMusic) {
            startScrubber();
        } else {
            clearInterval(subAppState.musicTimer);
        }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);

    function startScrubber() {
        clearInterval(subAppState.musicTimer);
        subAppState.musicTimer = setInterval(() => {
            subAppState.musicProgressSec = (subAppState.musicProgressSec + 1) % 210;
            const mins = Math.floor(subAppState.musicProgressSec / 60);
            const secs = String(subAppState.musicProgressSec % 60).padStart(2, '0');
            if (curTimeEl) curTimeEl.textContent = `${mins}:${secs}`;
            if (scrubFill) scrubFill.style.width = `${(subAppState.musicProgressSec / 210) * 100}%`;
        }, 1000);
    }
}

// ============================================
// VISUAL SPACE & LIGHTBOX
// ============================================
function initVisualGallery() {
    const grid = document.getElementById('visual-photo-grid');
    const tabs = document.querySelectorAll('#gallery-category-tabs .gallery-tab');

    function renderCategory(cat) {
        subAppState.activeVisualCategory = cat;
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

        subAppState.activeImagesList = photos;

        if (grid) {
            grid.innerHTML = photos.map((p, i) => `
                <div class="gallery-item" data-idx="${i}">
                    <img src="${p.url}" alt="${p.title}" class="gallery-img" loading="lazy" />
                    <div class="gallery-caption">${p.title} · ${p.tag}</div>
                </div>
            `).join('');

            grid.querySelectorAll('.gallery-item').forEach(cell => {
                cell.addEventListener('click', () => {
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

    initLightboxControls();
}

function openLightbox(photosList, index) {
    subAppState.activeImagesList = photosList;
    subAppState.lightboxIndex = index;

    const lb = document.getElementById('lightbox');
    if (!lb) return;

    updateLightboxView();
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
}

function updateLightboxView() {
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    const item = subAppState.activeImagesList[subAppState.lightboxIndex];
    if (item && img) {
        img.src = item.url;
        img.alt = item.title;
        if (cap) cap.textContent = `${item.title} — ${item.tag}`;
    }
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.remove('active');
        lb.setAttribute('aria-hidden', 'true');
    }
}

function initLightboxControls() {
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (subAppState.activeImagesList.length) {
                subAppState.lightboxIndex = (subAppState.lightboxIndex - 1 + subAppState.activeImagesList.length) % subAppState.activeImagesList.length;
                updateLightboxView();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (subAppState.activeImagesList.length) {
                subAppState.lightboxIndex = (subAppState.lightboxIndex + 1) % subAppState.activeImagesList.length;
                updateLightboxView();
            }
        });
    }

    document.addEventListener('keydown', e => {
        const lb = document.getElementById('lightbox');
        if (!lb || !lb.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            subAppState.lightboxIndex = (subAppState.lightboxIndex - 1 + subAppState.activeImagesList.length) % subAppState.activeImagesList.length;
            updateLightboxView();
        } else if (e.key === 'ArrowRight') {
            subAppState.lightboxIndex = (subAppState.lightboxIndex + 1) % subAppState.activeImagesList.length;
            updateLightboxView();
        }
    });
}

// ============================================
// CAR PRICE PREDICTOR ENGINE
// ============================================
function initCarPredictor() {
    const brandChips = document.querySelectorAll('#car-brand-pills .choice-chip');
    const fuelChips = document.querySelectorAll('#car-fuel-pills .choice-chip');
    const sliderYear = document.getElementById('slider-year');
    const sliderKm = document.getElementById('slider-km');
    const displayYear = document.getElementById('val-year-display');
    const displayKm = document.getElementById('val-km-display');
    const priceOutput = document.getElementById('car-estimated-price');

    let activeBrandMult = 1.3;
    let activeFuelMult = 1.0;

    brandChips.forEach(chip => {
        chip.addEventListener('click', () => {
            brandChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeBrandMult = parseFloat(chip.getAttribute('data-mult') || '1.0');
            calculatePrice();
        });
    });

    fuelChips.forEach(chip => {
        chip.addEventListener('click', () => {
            fuelChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeFuelMult = parseFloat(chip.getAttribute('data-mult') || '1.0');
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
            if (displayKm) displayKm.textContent = parseInt(sliderKm.value, 10).toLocaleString('en-IN');
            calculatePrice();
        });
    }

    function calculatePrice() {
        const year = sliderYear ? parseInt(sliderYear.value, 10) : 2021;
        const km = sliderKm ? parseInt(sliderKm.value, 10) : 42000;

        const age = 2026 - year;
        const basePrice = 14.5;
        const ageFactor = Math.pow(0.91, age);
        const kmFactor = Math.max(0.65, 1 - (km / 250000));

        let estimated = basePrice * ageFactor * kmFactor * activeBrandMult * activeFuelMult;
        estimated = Math.max(1.85, estimated);

        if (priceOutput) {
            priceOutput.textContent = estimated.toFixed(2);
        }
    }

    calculatePrice();
}

// ============================================
// SYSTEM TELEMETRY
// ============================================
function initTelemetry() {
    const vpEl = document.getElementById('telemetry-viewport');
    function updateVp() {
        if (vpEl) vpEl.textContent = `${window.innerWidth} × ${window.innerHeight} px`;
    }
    updateVp();
    window.addEventListener('resize', updateVp, { passive: true });
}

