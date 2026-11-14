/**
 * ═══════════════════════════════════════════════════════════════
 * VANSH KHANNA — EDITORIAL PORTFOLIO OS (v10.0)
 * Ultra-Lean, High-Performance Interactive Architecture
 * Strictly 60–120 FPS Native · Zero Canvas Thrash · Zero Jitter
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// 01. STATIC ASSETS & CLOUDINARY DATABASE
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

// ═══════════════════════════════════════════════════════════════
// 02. RUNTIME STATE
// ═══════════════════════════════════════════════════════════════
const appState = {
    activePlaylistIdx: 0,
    isPlayingMusic: false,
    musicProgressSec: 0,
    musicTimer: null,
    activeVisualCategory: 'nature',
    activeImagesList: [],
    lightboxIndex: 0
};

// ═══════════════════════════════════════════════════════════════
// 03. INITIALIZATION ON DOM READY
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initTelemetry();
    initTrays();
    initMusicOS();
    initVisualGallery();
    initCarPredictor();
    initClipboard();
});

// ═══════════════════════════════════════════════════════════════
// 04. LIVE IST CLOCK & TELEMETRY
// ═══════════════════════════════════════════════════════════════
function initClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    function update() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        };
        const istStr = now.toLocaleTimeString('en-GB', options);
        clockEl.textContent = `${istStr} IST`;
    }

    update();
    setInterval(update, 1000);
}

function initTelemetry() {
    const vpEl = document.getElementById('telemetry-viewport');
    function updateVp() {
        if (vpEl) vpEl.textContent = `${window.innerWidth} × ${window.innerHeight} px`;
    }
    updateVp();
    window.addEventListener('resize', updateVp, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// 05. IN-WINDOW TRAY SYSTEM
// ═══════════════════════════════════════════════════════════════
function initTrays() {
    // Open Trays
    document.querySelectorAll('[data-open-tray]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const trayId = btn.getAttribute('data-open-tray');
            openTray(trayId);
        });
    });

    // Close Trays
    document.querySelectorAll('[data-close-tray]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = btn.closest('.tray-overlay');
            if (overlay) closeTray(overlay.id);
        });
    });

    // Escape Key Listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeTray = document.querySelector('.tray-overlay.active');
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
}

function closeTray(id) {
    const tray = document.getElementById(id);
    if (!tray) return;
    tray.classList.remove('active');
    tray.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════════
// 06. MUSIC OS DECK
// ═══════════════════════════════════════════════════════════════
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

    // Populate Sidebar Playlists
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
        appState.activePlaylistIdx = idx;
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
        appState.isPlayingMusic = true;
        if (playBtn) playBtn.textContent = '⏸';
        if (discEl) discEl.classList.add('spinning');
        startScrubber();
    }

    function togglePlay() {
        appState.isPlayingMusic = !appState.isPlayingMusic;
        if (playBtn) playBtn.textContent = appState.isPlayingMusic ? '⏸' : '▶';
        if (discEl) discEl.classList.toggle('spinning', appState.isPlayingMusic);

        if (appState.isPlayingMusic) {
            startScrubber();
        } else {
            clearInterval(appState.musicTimer);
        }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);

    function startScrubber() {
        clearInterval(appState.musicTimer);
        appState.musicTimer = setInterval(() => {
            appState.musicProgressSec = (appState.musicProgressSec + 1) % 210;
            const mins = Math.floor(appState.musicProgressSec / 60);
            const secs = String(appState.musicProgressSec % 60).padStart(2, '0');
            if (curTimeEl) curTimeEl.textContent = `${mins}:${secs}`;
            if (scrubFill) scrubFill.style.width = `${(appState.musicProgressSec / 210) * 100}%`;
        }, 1000);
    }
}

// ═══════════════════════════════════════════════════════════════
// 07. VASHAYA VISUAL ARTS & LIGHTBOX
// ═══════════════════════════════════════════════════════════════
function initVisualGallery() {
    const grid = document.getElementById('visual-photo-grid');
    const tabs = document.querySelectorAll('#gallery-category-tabs .gallery-tab');

    function renderCategory(cat) {
        appState.activeVisualCategory = cat;
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

        appState.activeImagesList = photos;

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
    appState.activeImagesList = photosList;
    appState.lightboxIndex = index;

    const lb = document.getElementById('lightbox');
    if (!lb) return;

    updateLightboxView();
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
}

function updateLightboxView() {
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    const item = appState.activeImagesList[appState.lightboxIndex];
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
            if (appState.activeImagesList.length) {
                appState.lightboxIndex = (appState.lightboxIndex - 1 + appState.activeImagesList.length) % appState.activeImagesList.length;
                updateLightboxView();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (appState.activeImagesList.length) {
                appState.lightboxIndex = (appState.lightboxIndex + 1) % appState.activeImagesList.length;
                updateLightboxView();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        const lb = document.getElementById('lightbox');
        if (!lb || !lb.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            appState.lightboxIndex = (appState.lightboxIndex - 1 + appState.activeImagesList.length) % appState.activeImagesList.length;
            updateLightboxView();
        } else if (e.key === 'ArrowRight') {
            appState.lightboxIndex = (appState.lightboxIndex + 1) % appState.activeImagesList.length;
            updateLightboxView();
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// 08. CAR PRICE PREDICTOR ENGINE
// ═══════════════════════════════════════════════════════════════
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

        // Realistic GBDT simulated pricing curve
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

// ═══════════════════════════════════════════════════════════════
// 09. CLIPBOARD TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════════
function initClipboard() {
    const toast = document.getElementById('toast');
    let toastTimer = null;

    document.querySelectorAll('[data-copy]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const text = el.getAttribute('data-copy');
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                showToast(`Copied "${text}" to clipboard!`);
            }).catch(() => {
                showToast(`Copied to clipboard!`);
            });
        });
    });

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }
}
