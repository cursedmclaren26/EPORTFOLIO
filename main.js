/**
 * VASHAYA - Cinematic Brand Experience
 * Minimalist cursor, mouse-reactive parallax, dramatic reveals
 */

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONFIG
// ============================================
const EASE = {
    out: "expo.out",
    inOut: "power4.inOut",
    elastic: "elastic.out(1, 0.4)"
};

// ============================================
// DATA
// ============================================
const HERO_IMAGES = ['19.jpeg', '2.jpg', '18.jpeg', '4.png', '5.png'];

const CATEGORIES = {
    photos: [
        { name: "Nature", key: "nature" },
        { name: "Night", key: "night" },
        { name: "Landscape", key: "landscape" },
        { name: "Eclectic", key: "eclectic" }
    ],
    videos: [
        { name: "Cinematic", key: "cinematic" },
        { name: "Macro", key: "closeup" }
    ],
    suits: [
        { name: "Formal", key: "formal" },
        { name: "Casual", key: "casual" },
        { name: "Editorial", key: "editorial" }
    ]
};

const CONTENT = {
    nature: { title: "Nature", sub: "Earth Studies", items: ["6.jpeg", "7.jpeg", "8.jpeg", "9.jpg", "10.jpeg", "11.jpg", "22.jpeg", "23.jpg", "24.jpg", "25.jpg", "29.jpg"] },
    night: { title: "Night", sub: "After Dark", items: ["17.jpeg", "14.jpg", "19.jpeg"] },
    landscape: { title: "Landscape", sub: "Vast Horizons", items: ["14.jpg", "19.jpeg"] },
    eclectic: { title: "Eclectic", sub: "Mixed Works", items: ["12.jpg", "15.dng", "18.jpeg", "20.jpeg", "16.jpeg", "21.jpeg", "26.jpg", "27.jpg", "28.jpg", "30.jpg", "31.jpg"] },
    cinematic: { title: "Cinematic", sub: "Motion Picture", items: ["Short Film Intro", "Commercial Project A", "Documentary Clip"], isVideo: true },
    closeup: { title: "Close Up", sub: "Macro Studies", items: ["Macro Texture Study", "Water Droplets Reel", "Eye Macro"], isVideo: true },
    // SUITS - Direct gallery (no subcategories)
    suits: { title: "Suits", sub: "Fashion & Tailoring", items: ["suit_1.jpg", "suit_2.jpg", "suit_3.jpg", "suit_4.jpg", "suit_5.jpg"] }
};

// ============================================
// STATE
// ============================================
const state = {
    slide: 0,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    flyoutOpen: null,
    lightbox: {
        open: false,
        items: [],
        currentIndex: 0,
        isVideo: false
    }
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
    DOM.heroNav = $('.hero-nav');
    DOM.heroCount = $('.hero-count');
    DOM.header = $('.header');
    DOM.logo = $('.logo');
    DOM.time = $('.header-time');
    DOM.dock = $('.dock');
    DOM.flyout = $('.flyout');
    DOM.modals = {
        about: $('#modal-about'),
        inquire: $('#modal-inquire')
    };
    DOM.gallery = $('.gallery');
    DOM.galleryTitle = $('.gallery-title');
    DOM.gallerySub = $('.gallery-sub');
    DOM.masonry = $('.masonry');
    DOM.lightbox = $('.lightbox');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    initHero();
    initCursor();
    initParallax();
    initInteractions();
    runIntro();
    startClock();
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

    // Brand letters reveal
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
    DOM.app.classList.add('ready');

    const tl = gsap.timeline();

    // Hero image
    const firstSlide = $('.hero-slide');
    tl.to(firstSlide, { opacity: 1, duration: 2, ease: 'power2.out' });

    // Header
    tl.to([DOM.logo, DOM.time], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: EASE.out
    }, '-=1.5');

    // Dock
    tl.to(DOM.dock, {
        opacity: 1,
        duration: 1,
        ease: EASE.out
    }, '-=1');

    // Stagger dock items
    tl.fromTo('.dock-item',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: EASE.out },
        '-=0.8'
    );

    // Hero nav
    tl.to(DOM.heroNav, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE.out
    }, '-=0.6');
}

// ============================================
// HERO
// ============================================
function initHero() {
    HERO_IMAGES.forEach((src, i) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${i === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${src}')`;
        DOM.heroBg.appendChild(slide);
    });
    updateHeroCount();
}

function changeSlide(dir) {
    const slides = $$('.hero-slide');
    const total = slides.length;
    const current = slides[state.slide];

    current.classList.remove('active');

    state.slide = dir === 'next'
        ? (state.slide + 1) % total
        : (state.slide - 1 + total) % total;

    const next = slides[state.slide];
    next.classList.add('active');

    updateHeroCount();
}

function updateHeroCount() {
    const n = String(state.slide + 1).padStart(2, '0');
    const t = String(HERO_IMAGES.length).padStart(2, '0');

    gsap.to(DOM.heroCount, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
            DOM.heroCount.textContent = `${n} — ${t}`;
            gsap.to(DOM.heroCount, { opacity: 1, y: 0, duration: 0.3 });
        }
    });
}

// ============================================
// MINIMALIST CURSOR
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
        gsap.to(DOM.cursorLabel, {
            x: state.mouse.x,
            y: state.mouse.y,
            duration: 0.2
        });
    });

    // Cursor states
    $$('.dock-item, .flyout-link, .hero-arrow, .modal-close, .gallery-close, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursor.classList.add('link'));
        el.addEventListener('mouseleave', () => DOM.cursor.classList.remove('link'));
    });

    // Image hover - show label
    document.addEventListener('mouseenter', e => {
        if (e.target.closest('.masonry-item')) {
            DOM.cursor.classList.add('action');
            DOM.cursorLabel.textContent = 'View';
            DOM.cursorLabel.classList.add('visible');
        }
    }, true);

    document.addEventListener('mouseleave', e => {
        if (e.target.closest('.masonry-item')) {
            DOM.cursor.classList.remove('action');
            DOM.cursorLabel.classList.remove('visible');
        }
    }, true);
}

// ============================================
// PARALLAX - MOUSE REACTIVE BACKGROUND
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

// ============================================
// INTERACTIONS
// ============================================
function initInteractions() {
    // Hero arrows
    $$('.hero-arrow').forEach(btn => {
        btn.addEventListener('click', () => changeSlide(btn.dataset.dir));

        // Magnetic
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

    // Dock items
    $$('.dock-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            const target = item.dataset.target;

            if (action === 'modal') openModal(target);
            if (action === 'menu') toggleFlyout(target);
            if (action === 'gallery') openGallery(target);
        });
    });

    // Modal close
    $$('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Modal backdrop click
    $$('.modal-backdrop').forEach(el => {
        el.addEventListener('click', closeModals);
    });

    // Flyout links
    DOM.flyout.addEventListener('click', e => {
        const link = e.target.closest('.flyout-link');
        if (link) {
            e.preventDefault();
            openGallery(link.dataset.key);
        }
    });

    // Gallery close
    $$('.gallery-close').forEach(btn => {
        btn.addEventListener('click', closeGallery);
    });

    // Click outside flyout
    document.addEventListener('click', e => {
        if (state.flyoutOpen && !e.target.closest('.flyout') && !e.target.closest('.dock-item')) {
            closeFlyout();
        }
    });

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (state.lightbox.open) {
                closeLightbox();
            } else {
                closeModals();
                closeGallery();
                closeFlyout();
            }
        }
        if (state.lightbox.open) {
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
        } else {
            if (e.key === 'ArrowLeft') changeSlide('prev');
            if (e.key === 'ArrowRight') changeSlide('next');
        }
    });
}

// ============================================
// FLYOUT MENU
// ============================================
function toggleFlyout(type) {
    if (state.flyoutOpen === type) {
        closeFlyout();
        return;
    }

    state.flyoutOpen = type;
    const items = CATEGORIES[type] || [];

    DOM.flyout.innerHTML = items.map(i =>
        `<a href="#" class="flyout-link" data-key="${i.key}">${i.name}</a>`
    ).join('');

    DOM.flyout.classList.add('open');

    gsap.fromTo('.flyout-link',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: EASE.out }
    );
}

function closeFlyout() {
    state.flyoutOpen = null;
    DOM.flyout.classList.remove('open');
}

// ============================================
// MODALS
// ============================================
function openModal(id) {
    closeFlyout();
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    DOM.app.classList.add('modal-open');
    DOM.heroBg.classList.add('blur');
    modal.classList.add('open');

    // Animate title letters
    const titleSpans = modal.querySelectorAll('.modal-title span');
    gsap.to(titleSpans, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        delay: 0.3,
        ease: EASE.out
    });

    // Animate body
    const bodyEls = modal.querySelectorAll('.modal-body p, .contact-card');
    gsap.to(bodyEls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: 0.5,
        ease: EASE.out
    });
}

function closeModals() {
    DOM.app.classList.remove('modal-open');
    DOM.heroBg.classList.remove('blur');
    $$('.modal-layer').forEach(m => m.classList.remove('open'));
}

// ============================================
// GALLERY
// ============================================
function openGallery(key) {
    closeFlyout();
    const data = CONTENT[key];
    if (!data) return;

    // Store for lightbox
    state.lightbox.items = data.items;
    state.lightbox.isVideo = data.isVideo || false;

    DOM.galleryTitle.textContent = data.title;
    DOM.gallerySub.textContent = data.sub;

    DOM.masonry.innerHTML = data.items.map((item, i) => {
        const delay = i * 0.08;
        if (data.isVideo) {
            return `<div class="masonry-item" data-index="${i}" style="transition-delay:${delay}s">
                        <div class="masonry-video">${item}</div>
                    </div>`;
        }
        return `<div class="masonry-item" data-index="${i}" style="transition-delay:${delay}s">
                    <img src="${item}" alt="" loading="lazy">
                </div>`;
    }).join('');

    // Add click handlers for lightbox
    DOM.masonry.querySelectorAll('.masonry-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });
    });

    DOM.gallery.classList.add('open');
    DOM.heroBg.classList.add('blur');
    DOM.gallery.scrollTop = 0;
}

function closeGallery() {
    DOM.gallery.classList.remove('open');
    DOM.heroBg.classList.remove('blur');
}

// ============================================
// LIGHTBOX
// ============================================
function openLightbox(index) {
    state.lightbox.open = true;
    state.lightbox.currentIndex = index;

    updateLightboxContent();
    DOM.lightbox.classList.add('open');
}

function closeLightbox() {
    state.lightbox.open = false;
    DOM.lightbox.classList.remove('open');
}

function navigateLightbox(dir) {
    const total = state.lightbox.items.length;
    const contentEl = DOM.lightbox.querySelector('.lightbox-content');

    // Animate out current image
    const slideOutX = dir === 'next' ? -100 : 100;

    gsap.to(contentEl, {
        x: slideOutX,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            // Update index
            if (dir === 'next') {
                state.lightbox.currentIndex = (state.lightbox.currentIndex + 1) % total;
            } else {
                state.lightbox.currentIndex = (state.lightbox.currentIndex - 1 + total) % total;
            }

            // Update content
            const item = state.lightbox.items[state.lightbox.currentIndex];
            const captionEl = DOM.lightbox.querySelector('.lightbox-caption');

            if (state.lightbox.isVideo) {
                contentEl.innerHTML = `<div class="lightbox-video">${item}</div>`;
            } else {
                contentEl.innerHTML = `<img src="${item}" alt="">`;
            }
            captionEl.textContent = `${state.lightbox.currentIndex + 1} / ${state.lightbox.items.length}`;

            // Animate in from opposite side
            const slideInX = dir === 'next' ? 100 : -100;
            gsap.fromTo(contentEl,
                { x: slideInX, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: EASE.out }
            );
        }
    });
}

function updateLightboxContent() {
    const item = state.lightbox.items[state.lightbox.currentIndex];
    const contentEl = DOM.lightbox.querySelector('.lightbox-content');
    const captionEl = DOM.lightbox.querySelector('.lightbox-caption');

    if (state.lightbox.isVideo) {
        contentEl.innerHTML = `<div class="lightbox-video">${item}</div>`;
    } else {
        contentEl.innerHTML = `<img src="${item}" alt="">`;
    }

    captionEl.textContent = `${state.lightbox.currentIndex + 1} / ${state.lightbox.items.length}`;

    // Animate in on first open
    gsap.fromTo(contentEl,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: EASE.out, delay: 0.1 }
    );
}

// ============================================
// CLOCK
// ============================================
function startClock() {
    const update = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        DOM.time.textContent = `${h}:${m} IST`;
    };
    update();
    setInterval(update, 60000);
}
