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
    if (introTl) introTl.kill();
    DOM.intro.style.display = 'none';
    showApp();
}

function runIntro() {
    DOM.intro.addEventListener('click', skipIntro);
    DOM.intro.addEventListener('touchstart', skipIntro, { passive: true });

    const isMobile = isTouchDevice();
    const durationMultiplier = isMobile ? 0.6 : 1;

    introTl = gsap.timeline({ onComplete: () => { introDone = true; showApp(); } });

    // Progress bar
    introTl.to('.intro-progress-bar', {
        width: '100%',
        duration: 1.8 * durationMultiplier,
        ease: 'power2.inOut'
    });

    // Brand reveal
    introTl.to('.intro-brand span', {
        y: 0,
        duration: 1 * durationMultiplier,
        ease: EASE.out
    }, 0.3 * durationMultiplier);

    // Subtitle
    introTl.to('.intro-sub span', {
        y: 0,
        duration: 0.6 * durationMultiplier,
        ease: EASE.out
    }, 0.7 * durationMultiplier);

    // Hold
    introTl.to({}, { duration: 0.3 * durationMultiplier });

    // Exit
    introTl.to('.intro-brand span, .intro-sub span', {
        y: -100,
        opacity: 0,
        duration: 0.4 * durationMultiplier,
        stagger: 0.04,
        ease: 'power3.in'
    });

    introTl.to(DOM.intro, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6 * durationMultiplier,
        ease: EASE.inOut
    }, '-=0.2');
}

function showApp() {
    DOM.intro.style.display = 'none';
    DOM.app.classList.add('ready');

    const tl = gsap.timeline();

    // Header elements
    tl.to([DOM.logo, DOM.tagline], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: EASE.out
    });

    // Dock
    tl.to(DOM.dock, {
        opacity: 1,
        duration: 1,
        ease: EASE.out
    }, '-=0.8');

    // Dock items stagger
    tl.fromTo('.dock-item',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: EASE.out },
        '-=0.8'
    );

    // Section nav
    tl.to(DOM.sectionNav, {
        opacity: 1,
        duration: 1,
        ease: EASE.out
    }, '-=0.6');

    // Show first section
    showSection(0);

    // Ensure dock is visible immediately on mobile
    if (isTouchDevice()) {
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

    // Arrow buttons
    $$('.section-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.isAnimating) return;
            const dir = btn.dataset.dir;
            if (dir === 'prev' && state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            } else if (dir === 'next' && state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            }
        });

        // Magnetic effect
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: EASE.elastic });
        });
    });

    // Keyboard
    document.addEventListener('keydown', e => {
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

    // Mouse wheel
    let wheelTimeout;
    document.addEventListener('wheel', e => {
        if (state.isAnimating) return;

    
    // Dynamic Island navigation listeners
    if (DOM.islandTrigger) {
        DOM.islandTrigger.addEventListener('click', () => toggleIsland());
    }
    if (DOM.islandCloseBtn) {
        DOM.islandCloseBtn.addEventListener('click', () => toggleIsland(false));
    }
    if (DOM.islandScrim) {
        DOM.islandScrim.addEventListener('click', () => toggleIsland(false));
    }
    if (DOM.islandPrev) {
        DOM.islandPrev.addEventListener('click', () => {
            if (state.isAnimating) return;
            if (state.currentSection > 0) goToSection(state.currentSection - 1);
        });
    }
    if (DOM.islandNext) {
        DOM.islandNext.addEventListener('click', () => {
            if (state.isAnimating) return;
            if (state.currentSection < SECTIONS.length - 1) goToSection(state.currentSection + 1);
        });
    }
    if (DOM.islandItems && DOM.islandItems.length) {
        DOM.islandItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                goToSection(i);
                toggleIsland(false);
            });
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') toggleIsland(false);
    });


        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 50 && state.currentSection < SECTIONS.length - 1) {
                goToSection(state.currentSection + 1);
            } else if (e.deltaY < -50 && state.currentSection > 0) {
                goToSection(state.currentSection - 1);
            }
        }, 50);
    });
}

function goToSection(index) {
    if (index === state.currentSection || index < 0 || index >= SECTIONS.length) return;

    state.isAnimating = true;
    const oldSection = DOM.sections[state.currentSection];
    const newSection = DOM.sections[index];

    // Kill any existing animations on both sections
    gsap.killTweensOf(oldSection);
    gsap.killTweensOf(newSection);

    // Fade out old section
    gsap.to(oldSection, {
        opacity: 0,
        duration: 0.22,
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
                    duration: 0.35,
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
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: EASE.out }
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
                    duration: 0.5,
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

    // Animate content inside
    const title = DOM.sections[index].querySelector('.section-title');
    if (title) {
        const spans = title.querySelectorAll('span');
        gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            delay: 0.2,
            ease: EASE.out
        });
    }

    // Animate hero title lines
    const heroLines = DOM.sections[index].querySelectorAll('.hero-title .line span');
    if (heroLines.length) {
        gsap.to(heroLines, {
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            delay: 0.2,
            ease: EASE.out
        });
    }
}


// ============================================
// MOBILE DRAWER
// ============================================
function toggleDrawer(forceState) {
    if (!DOM.mobileDrawer) return;
    const isCurrentlyOpen = DOM.mobileDrawer.classList.contains('open');
    const willOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

    if (willOpen) {
        DOM.mobileDrawer.classList.add('open');
        DOM.mobileDrawer.setAttribute('aria-hidden', 'false');
        if (DOM.mobileMenuBtn) DOM.mobileMenuBtn.classList.add('open');
        const btnLabel = DOM.mobileMenuBtn ? DOM.mobileMenuBtn.querySelector('.btn-label') : null;
        if (btnLabel) btnLabel.textContent = 'Close';

        // Animate drawer items in
        const items = DOM.mobileDrawer.querySelectorAll('.drawer-item');
        gsap.fromTo(items,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.35, stagger: 0.04, ease: EASE.out }
        );
    } else {
        DOM.mobileDrawer.classList.remove('open');
        DOM.mobileDrawer.setAttribute('aria-hidden', 'true');
        if (DOM.mobileMenuBtn) DOM.mobileMenuBtn.classList.remove('open');
        const btnLabel = DOM.mobileMenuBtn ? DOM.mobileMenuBtn.querySelector('.btn-label') : null;
        if (btnLabel) btnLabel.textContent = 'Menu';
    }
}

function updateDrawerActive() {
    if (DOM.drawerItems && DOM.drawerItems.length) {
        DOM.drawerItems.forEach((item, i) => {
            item.classList.toggle('active', i === state.currentSection);
        });
    }
}

function updateDockActive() {
    DOM.dockItems.forEach((item, i) => {
        item.classList.toggle('active', i === state.currentSection);
    });
    updateIslandState();
}

function updateSectionCount() {
    const n = String(state.currentSection + 1).padStart(2, '0');
    const t = String(SECTIONS.length).padStart(2, '0');
    const name = SECTION_NAMES[state.currentSection] || '';

    const countText = DOM.sectionCount ? DOM.sectionCount.querySelector('.count-text') : null;
    const countTag = DOM.sectionCount ? DOM.sectionCount.querySelector('.count-tag') : null;

    if (DOM.sectionCount) {
        gsap.to(DOM.sectionCount, {
            opacity: 0,
            y: -5,
            duration: 0.16,
            onComplete: () => {
                if (countText) {
                    countText.textContent = `${n} — ${t}`;
                } else {
                    DOM.sectionCount.textContent = `${n} — ${t}`;
                }
                if (countTag) {
                    countTag.textContent = name;
                }
                gsap.to(DOM.sectionCount, { opacity: 1, y: 0, duration: 0.22 });
            }
        });
    }
}

// ============================================
// CURSOR
// ============================================
function initCursor() {
    if (!isTouchDevice()) {
    window.addEventListener('mousemove', e => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
        gsap.to(DOM.cursor, {
            x: state.mouse.x,
            y: state.mouse.y,
            duration: 0.15,
            ease: 'power2.out'
        });
        if (DOM.cursorLabel) {
            gsap.to(DOM.cursorLabel, {
                x: state.mouse.x,
                y: state.mouse.y,
                duration: 0.2
            });
        }
    });

    // Cursor states
    $$('.dock-item, .island-arrow, .island-trigger, .island-item, .project-card, .contact-card, .skill-list li').forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursor.classList.add('link'));
        el.addEventListener('mouseleave', () => DOM.cursor.classList.remove('link'));
    });
    }
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
    if (!window.matchMedia('(hover: none)').matches && !window.matchMedia('(pointer: coarse)').matches) {
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(DOM.heroBg, {
            x: x,
            y: y,
            duration: 1.5,
            ease: 'power2.out'
        });

        gsap.to('.brand-letter', {
            x: x * -0.5,
            y: y * -0.5,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
    }
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
