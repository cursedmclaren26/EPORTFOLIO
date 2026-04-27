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
    DOM.sectionNav = $('.section-nav');
    DOM.sectionCount = $('.section-count');
    DOM.logo = $('.logo');
    DOM.tagline = $('.header-tagline');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    initCursor();
    initParallax();
    initNavigation();
    runIntro();
});

// ============================================
// INTRO SEQUENCE
// ============================================
function runIntro() {
    const tl = gsap.timeline({ onComplete: showApp });

    // Progress bar
    tl.to('.intro-progress-bar', {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });

    // Brand reveal
    tl.to('.intro-brand span', {
        y: 0,
        duration: 1.2,
        ease: EASE.out
    }, 0.5);

    // Subtitle
    tl.to('.intro-sub span', {
        y: 0,
        duration: 0.8,
        ease: EASE.out
    }, 1);

    // Hold
    tl.to({}, { duration: 0.5 });

    // Exit
    tl.to('.intro-brand span, .intro-sub span', {
        y: -100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.in'
    });

    tl.to(DOM.intro, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: EASE.inOut
    }, '-=0.3');
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
    if (index === state.currentSection) return;

    state.isAnimating = true;
    const oldSection = DOM.sections[state.currentSection];
    const newSection = DOM.sections[index];

    // Hide old section
    gsap.to(oldSection, {
        opacity: 0,
        y: index > state.currentSection ? -50 : 50,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
            oldSection.classList.remove('active');
        }
    });

    // Show new section
    setTimeout(() => {
        showSection(index);
    }, 400);

    state.currentSection = index;
    updateDockActive();
    updateSectionCount();
}

function showSection(index) {
    const section = DOM.sections[index];
    section.classList.add('active');

    gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASE.out,
            onComplete: () => {
                state.isAnimating = false;
            }
        }
    );

    // Animate content inside
    const title = section.querySelector('.section-title');
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
    const heroLines = section.querySelectorAll('.hero-title .line span');
    if (heroLines.length) {
        gsap.to(heroLines, {
            y: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.3,
            ease: EASE.out
        });
    }
}

function updateDockActive() {
    DOM.dockItems.forEach((item, i) => {
        item.classList.toggle('active', i === state.currentSection);
    });
}

function updateSectionCount() {
    const n = String(state.currentSection + 1).padStart(2, '0');
    const t = String(SECTIONS.length).padStart(2, '0');

    gsap.to(DOM.sectionCount, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
            DOM.sectionCount.textContent = `${n} — ${t}`;
            gsap.to(DOM.sectionCount, { opacity: 1, y: 0, duration: 0.3 });
        }
    });
}

// ============================================
// CURSOR
// ============================================
function initCursor() {
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
    $$('.dock-item, .section-arrow, .project-card, .contact-card, .skill-list li').forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursor.classList.add('link'));
        el.addEventListener('mouseleave', () => DOM.cursor.classList.remove('link'));
    });
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
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
