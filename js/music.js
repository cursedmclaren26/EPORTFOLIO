/**
 * MUSIC OS - Cinematic Ecosystem
 * GSAP animations, cursor tracking, parallax effects
 */

gsap.registerPlugin();

// ============================================
// CONFIG
// ============================================
const EASE = {
    out: "expo.out",
    in: "power2.in",
    inOut: "power4.inOut",
    elastic: "elastic.out(1, 0.4)"
};

// ============================================
// STATE
// ============================================
const isTouchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
};

// ============================================
// DOM
// ============================================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const DOM = {};

function cacheDom() {
    DOM.intro = $('.intro');
    DOM.appShell = $('.app-shell');
    DOM.cursor = $('.cursor-dot');
    DOM.cursorLabel = $('.cursor-label');
    DOM.player = $('.immersive-player');
    DOM.heroCard = $('.hero-card');
    DOM.statCard = $('.stat-card');
    DOM.brandLetter = $('.brand-letter');
}

// ============================================
// DATA
// ============================================
const playlists = [
    { id: 'global-50', title: 'Top 50 · Global', description: "Realtime pulse of what's charting planet-wide.", cover: "https://picsum.photos/300/300?random=1&grayscale", section: 'curated', songs: [{ title: 'Fake Anthem', artist: 'Unknown Artist', duration: '3:45' }, { title: 'Global Hit Simulation', artist: 'The Algorithm', duration: '2:50' }] },
    { id: 'throwback', title: 'Throwback Haze', description: 'Analog warmth for nostalgic late nights.', cover: "https://picsum.photos/300/300?random=2&grayscale", section: 'curated', songs: [{ title: '90s Dance Machine', artist: 'The Vintage Boys', duration: '4:15' }] },
    { id: 'new-releases', title: 'New Frequency', description: 'Fresh signals arriving this week.', cover: "https://picsum.photos/300/300?random=3", section: 'curated', songs: [{ title: 'Fresh Drop', artist: 'Newcomer X', duration: '2:55' }] },
    { id: 'daily-mix', title: 'Daily Mix I', description: 'Chambered ambient + glitch soul tailored for you.', cover: "https://picsum.photos/300/300?random=4&grayscale", section: 'personal', songs: [{ title: 'Your Daily Vibe', artist: 'AI Mixer', duration: '3:22' }] },
    { id: 'study-focus', title: 'Study Focus', description: 'Neutral-tone instrumentals for flow state.', cover: "https://picsum.photos/300/300?random=5", section: 'personal', songs: [{ title: 'Lofi Study Session', artist: 'Chill Beats Co.', duration: '5:10' }] },
    { id: 'gym-pump', title: 'Voltage Run', description: 'Bass-forward energy spikes for endurance.', cover: "https://picsum.photos/300/300?random=16&grayscale", section: 'curated', songs: [{ title: 'Electric Rush', artist: 'Bass Blaster', duration: '3:05' }] },
    { id: 'discovery-weekly', title: 'Discovery Weekly', description: 'Newcomers mapped from your curiosity.', cover: "https://picsum.photos/300/300?random=11", section: 'personal', songs: [{ title: 'New Find 1', artist: 'Unsigned Act', duration: '3:10' }] },
    { id: 'release-radar', title: 'Release Radar', description: 'Artists you orbit, delivering now.', cover: "https://picsum.photos/300/300?random=12", section: 'personal', songs: [{ title: 'Friday Drop', artist: 'Artist Followed', duration: '3:20' }] },
    { id: 'on-repeat', title: 'On Repeat', description: 'Loops that stayed stuck in your head.', cover: "https://picsum.photos/300/300?random=13", section: 'personal', songs: [{ title: 'Obsession Track', artist: 'Daily Listener', duration: '3:15' }] },
    { id: 'lofi-chill', title: 'Chill Lofi Beats', description: 'Granular textures + vinyl dust for soft focus.', cover: "https://picsum.photos/300/300?random=15", section: 'library', songs: [{ title: 'Daydreaming', artist: 'Lofi Guy', duration: '3:45' }, { title: 'Coffee Shop Flow', artist: 'Study Music Co.', duration: '2:50' }] },
    { id: 'focus-flow', title: 'Focus Flow', description: 'Minimalist ambience for deep work.', cover: "https://picsum.photos/300/300?random=17", section: 'library', songs: [{ title: 'Deep Work Loop', artist: 'Concentration Station', duration: '2:55' }] },
    { id: 'liked-songs', title: 'Liked Signals', description: 'Every frequency you saved in one chamber.', cover: "https://picsum.photos/300/300?random=18", section: 'library', songs: [{ title: 'Favorite Tune', artist: 'Saved Artist 1', duration: '3:22' }] },
    { id: '90s-rock', title: '90s Rock Anthems', description: 'Feedback, grit and stage sweat.', cover: "https://picsum.photos/300/300?random=19&grayscale", section: 'library', songs: [{ title: 'Smells Like Retro', artist: 'Grunge Gods', duration: '5:10' }] }
];

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    initCursor();
    initParallax();
    initTouch();
    runIntro();
    initApp();
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
        duration: 1.5 * durationMultiplier,
        ease: 'power2.inOut'
    });

    // Brand reveal
    introTl.to('.intro-brand span', {
        y: 0,
        duration: 0.9 * durationMultiplier,
        ease: EASE.out
    }, 0.25 * durationMultiplier);

    // Subtitle
    introTl.to('.intro-sub span', {
        y: 0,
        duration: 0.6 * durationMultiplier,
        ease: EASE.out
    }, 0.5 * durationMultiplier);

    // Hold
    introTl.to({}, { duration: 0.2 * durationMultiplier });

    // Exit
    introTl.to('.intro-brand span, .intro-sub span', {
        y: -100,
        opacity: 0,
        duration: 0.4 * durationMultiplier,
        stagger: 0.03,
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

    const tl = gsap.timeline();

    // App shell
    tl.to(DOM.appShell, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE.out
    });

    // Nav panel
    tl.fromTo('.nav-panel',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: EASE.out },
        '-=0.6'
    );

    // Hero cards
    tl.fromTo('.hero-card, .stat-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: EASE.out },
        '-=0.5'
    );

    // Cards stagger
    tl.fromTo('.card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: EASE.out },
        '-=0.4'
    );

    // Player
    tl.to(DOM.player, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE.out
    }, '-=0.3');

    // Add ready classes
    DOM.appShell.classList.add('ready');
    DOM.player.classList.add('ready');
}

// ============================================
// CURSOR
// ============================================
function initCursor() {
    if (isTouchDevice()) return;

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
    $$('nav button, .card, .library-list li, .detail-actions button, .controls-buttons button, .search-pill, .chip').forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursor.classList.add('link'));
        el.addEventListener('mouseleave', () => DOM.cursor.classList.remove('link'));
    });
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
    if (isTouchDevice()) {
        if (typeof DeviceOrientationEvent !== 'undefined') {
            window.addEventListener('deviceorientation', e => {
                const x = (e.gamma || 0) * 0.3;
                const y = (e.beta || 0) * 0.15;
                if (DOM.brandLetter) {
                    gsap.to(DOM.brandLetter, { x: x * -1, y: y * -1, duration: 1.5, ease: 'power2.out' });
                }
            }, { passive: true });
        }
        return;
    }

    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);

        // Hero card
        if (DOM.heroCard) {
            gsap.to(DOM.heroCard, {
                x: x * 15,
                y: y * 10,
                rotateX: y * 3,
                rotateY: x * -3,
                duration: 1,
                ease: 'power2.out'
            });
        }

        // Stat card
        if (DOM.statCard) {
            gsap.to(DOM.statCard, {
                x: x * -10,
                y: y * -8,
                duration: 1,
                ease: 'power2.out'
            });
        }

        // Brand watermark
        if (DOM.brandLetter) {
            gsap.to(DOM.brandLetter, {
                x: x * -20,
                y: y * -20,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
}

// ============================================
// TOUCH / SWIPE
// ============================================
function initTouch() {
    if (!isTouchDevice()) return;

    // Show player immediately on mobile
    if (DOM.player) {
        DOM.player.style.opacity = '1';
        DOM.player.style.transform = 'none';
    }

    // Touch feedback on cards
    document.addEventListener('touchstart', e => {
        const card = e.target.closest('.card, .search-pill');
        if (card) gsap.to(card, { scale: 0.97, duration: 0.12 });
    }, { passive: true });

    document.addEventListener('touchend', e => {
        const card = e.target.closest('.card, .search-pill');
        if (card) gsap.to(card, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' });
    }, { passive: true });

    // Detail panel: swipe down to close
    let dpTouchStartY = 0;
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.addEventListener('touchstart', e => {
            dpTouchStartY = e.touches[0].clientY;
        }, { passive: true });

        detailPanel.addEventListener('touchend', e => {
            const dy = e.changedTouches[0].clientY - dpTouchStartY;
            if (dy > 80) {
                detailPanel.classList.remove('show');
            }
        }, { passive: true });
    }

    // Touch feedback on nav buttons and player controls
    ['.controls-buttons button', 'nav button', '.detail-actions button'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.touchAction = 'manipulation';
            el.addEventListener('touchstart', () => gsap.to(el, { scale: 0.9, duration: 0.1 }), { passive: true });
            el.addEventListener('touchend', () => gsap.to(el, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' }), { passive: true });
        });
    });
}

// ============================================
// APP
// ============================================
function initApp() {
    const curatedGrid = $('#curated-grid');
    const personalGrid = $('#personal-grid');
    const libraryList = $('#library-list');
    const detailPanel = $('#detail-panel');
    const detailTitle = $('#detail-title');
    const detailDesc = $('#detail-desc');
    const detailCover = $('#detail-cover');
    const tracklist = $('#tracklist');
    const searchView = $('#search-view');
    const homeView = $('.home-view');
    const navHome = $('#nav-home');
    const navSearch = $('#nav-search');
    const playerArt = $('#player-art');
    const playerTitle = $('#player-title');
    const playerArtist = $('#player-artist');

    const renderCards = (target, section) => {
        if (!target) return;
        target.innerHTML = playlists
            .filter(p => p.section === section)
            .map(p => `
            <article class="card" data-id="${p.id}">
                <div class="art" style="background-image:url('${p.cover}')"></div>
                <small>${section === 'curated' ? 'Curated' : 'Personal Mix'}</small>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
            </article>
        `).join('');
    };

    const renderLibrary = () => {
        if (!libraryList) return;
        libraryList.innerHTML = playlists
            .filter(p => p.section === 'library')
            .map(p => `<li data-id="${p.id}">${p.title}</li>`)
            .join('');
    };

    const closeDetail = () => {
        if (!detailPanel || !detailPanel.classList.contains('show')) return;

        if (window.innerWidth <= 768) {
            detailPanel.classList.remove('show');
            gsap.set(detailPanel, { clearProps: "all" });
            if (libraryList) {
                libraryList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
            }
            return;
        }

        // Desktop visual feedback for closing
        gsap.to(detailPanel, {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: EASE.in,
            onComplete: () => {
                detailPanel.classList.remove('show');
                gsap.set(detailPanel, { clearProps: "all" });
            }
        });

        if (libraryList) {
            libraryList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        }
    };

    const bindInteractions = () => {
        // Detail panel close button
        const detailClose = $('#detail-close');
        if (detailClose) {
            detailClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeDetail();
            });
        }

        // Play/Pause button toggle
        let isPlaying = false;
        const mainPlayBtn = document.querySelector('.controls-buttons button:nth-child(3)');
        const detailPlayBtn = document.querySelector('.detail-actions .solid');

        const togglePlayback = (e) => {
            if (e) e.stopPropagation();
            isPlaying = !isPlaying;
            if (mainPlayBtn) {
                const icon = mainPlayBtn.querySelector('i');
                if (icon) icon.className = isPlaying ? 'fas fa-circle-pause' : 'fas fa-circle-play';
            }
            if (detailPlayBtn) {
                detailPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Play';
            }
        };

        if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlayback);
        if (detailPlayBtn) detailPlayBtn.addEventListener('click', togglePlayback);

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't trigger the document 'close' listener
                openDetail(card.dataset.id);
            });
        });

        if (libraryList) {
            libraryList.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', (e) => {
                    e.stopPropagation(); // Don't trigger the document 'close' listener
                    libraryList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
                    li.classList.add('active');
                    openDetail(li.dataset.id);
                });
            });
        }
    };

    const openDetail = (id) => {
        const playlist = playlists.find(p => p.id === id);
        if (!playlist) return;

        if (detailTitle) detailTitle.textContent = playlist.title;
        if (detailDesc) detailDesc.textContent = playlist.description;
        if (detailCover) detailCover.style.backgroundImage = `url('${playlist.cover}')`;

        if (tracklist) {
            tracklist.innerHTML = playlist.songs.map(song => `
                <li>
                    <div>
                        <strong>${song.title}</strong>
                        <span>${song.artist}</span>
                    </div>
                    <span>${song.duration}</span>
                </li>
            `).join('');
        }

        if (detailPanel) {
            detailPanel.classList.add('show');
            if (window.innerWidth > 768) {
                gsap.fromTo(detailPanel,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: EASE.out }
                );
            }
        }

        if (playerArt) playerArt.style.backgroundImage = `url('${playlist.cover}')`;
        if (playerTitle) playerTitle.textContent = playlist.songs[0]?.title || playlist.title;
        if (playerArtist) playerArtist.textContent = playlist.songs[0]?.artist || 'Pulse Collective';
    };

    const toggleView = (view) => {
        if (view === 'search') {
            if (homeView) homeView.style.display = 'none';
            if (searchView) searchView.classList.add('active');
            if (navSearch) navSearch.classList.add('active');
            if (navHome) navHome.classList.remove('active');
            closeDetail();
        } else {
            if (homeView) homeView.style.display = 'block';
            if (searchView) searchView.classList.remove('active');
            if (navHome) navHome.classList.add('active');
            if (navSearch) navSearch.classList.remove('active');
            closeDetail();
        }
    };

    if (navHome) navHome.addEventListener('click', () => toggleView('home'));
    if (navSearch) navSearch.addEventListener('click', () => toggleView('search'));

    // Close panel on outside click
    document.addEventListener('click', (event) => {
        if (!detailPanel || !detailPanel.classList.contains('show')) return;

        // If clicking inside the sidebar, don't close
        if (detailPanel.contains(event.target)) return;

        // Clicks on cards and library items are handled via stopPropagation
        closeDetail();
    });

    // Keyboard escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeDetail();
        }
    });

    renderCards(curatedGrid, 'curated');
    renderCards(personalGrid, 'personal');
    renderLibrary();
    bindInteractions();
}
