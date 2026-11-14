// Global selectors
const navItems = document.querySelectorAll(".sidebar .nav li");
const sections = document.querySelectorAll("section");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const progressBar = document.querySelector(".scroll-progress span");
const cursor = document.querySelector(".cursor-dot");
const orbs = document.querySelectorAll(".orb");
const projectCards = document.querySelectorAll(".project-card");
const detailPanel = document.querySelector(".project-detail");
const copyButtons = document.querySelectorAll(".copy-btn");

// Utility: Debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Navigation highlighting
const updateActiveNav = () => {// Global selectors
const navItems = document.querySelectorAll(".sidebar .nav li");
const sections = document.querySelectorAll("section");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const progressBar = document.querySelector(".scroll-progress span");
const cursor = document.querySelector(".cursor-dot");
const orbs = document.querySelectorAll(".orb");
const projectCards = document.querySelectorAll(".project-card");
const detailPanel = document.querySelector(".project-detail");
const copyButtons = document.querySelectorAll(".copy-btn");

// Utility: Debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Navigation highlighting
const updateActiveNav = () => {
    let currentId = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            currentId = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.toggle("active", item.dataset.target === currentId);
    });
};

// Scroll progress indicator
const updateScrollProgress = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    const progress = scrollable ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
};

// Scroll listeners
window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateActiveNav();
});

// Smooth scroll buttons (nav + CTAs)
navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const target = document.getElementById(item.dataset.target);
        if (!target) return;

        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.scroll);
        if (!target) return;

        if (btn.dataset.target) {
            navItems.forEach((item) => item.classList.remove("active"));
            btn.classList.add("active");
        }

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Magnetic cursor + parallax orbs
window.addEventListener("mousemove", (event) => {
    if (cursor) {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    orbs.forEach((orb) => {
        const speed = parseFloat(orb.dataset.speed) || 0.05;
        const x = (event.clientX - centerX) * speed;
        const y = (event.clientY - centerY) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Project detail panel logic
const updateProjectDetail = (card) => {
    if (!detailPanel) return;
    const titleEl = detailPanel.querySelector("h3");
    const descEl = detailPanel.querySelector(".description");
    const stackEl = detailPanel.querySelector(".stack");
    const linkEl = detailPanel.querySelector(".inline-link");

    if (titleEl) titleEl.textContent = card.dataset.title || "Selected Project";
    if (descEl) descEl.textContent = card.dataset.description || "";
    if (stackEl) stackEl.textContent = card.dataset.stack || "";
    if (linkEl) linkEl.href = card.dataset.link || "#";
};

projectCards.forEach((card) => {
    ["mouseenter", "focus"].forEach((eventName) => {
        card.addEventListener(eventName, () => updateProjectDetail(card));
    });

    card.addEventListener("click", () => {
        const link = card.dataset.link;
        if (link && link !== "#") {
            // EDITED LINE: Changed from window.open(link, "_blank");
            window.location.href = link; 
        }
    });
});

// Copy to clipboard interaction
copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const value = btn.dataset.copy;
        if (!value || !navigator.clipboard) return;

        try {
            await navigator.clipboard.writeText(value);
            const original = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => (btn.textContent = original), 1500);
        } catch {
            console.warn("Clipboard not available");
        }
    });
});

// Intersection Observer for fade-ins
const observer = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateActiveNav();
    updateScrollProgress();
    document.querySelectorAll("#home .fade-in").forEach((el) => el.classList.add("visible"));
});
    let currentId = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            currentId = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.toggle("active", item.dataset.target === currentId);
    });
};

// Scroll progress indicator
const updateScrollProgress = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    const progress = scrollable ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
};

// Scroll listeners
window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateActiveNav();
});

// Smooth scroll buttons (nav + CTAs)
navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const target = document.getElementById(item.dataset.target);
        if (!target) return;

        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.scroll);
        if (!target) return;

        if (btn.dataset.target) {
            navItems.forEach((item) => item.classList.remove("active"));
            btn.classList.add("active");
        }

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Magnetic cursor + parallax orbs
window.addEventListener("mousemove", (event) => {
    if (cursor) {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    orbs.forEach((orb) => {
        const speed = parseFloat(orb.dataset.speed) || 0.05;
        const x = (event.clientX - centerX) * speed;
        const y = (event.clientY - centerY) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Project detail panel logic
const updateProjectDetail = (card) => {
    if (!detailPanel) return;
    const titleEl = detailPanel.querySelector("h3");
    const descEl = detailPanel.querySelector(".description");
    const stackEl = detailPanel.querySelector(".stack");
    const linkEl = detailPanel.querySelector(".inline-link");

    if (titleEl) titleEl.textContent = card.dataset.title || "Selected Project";
    if (descEl) descEl.textContent = card.dataset.description || "";
    if (stackEl) stackEl.textContent = card.dataset.stack || "";
    if (linkEl) linkEl.href = card.dataset.link || "#";
};

projectCards.forEach((card) => {
    ["mouseenter", "focus"].forEach((eventName) => {
        card.addEventListener(eventName, () => updateProjectDetail(card));
    });

    card.addEventListener("click", () => {
        const link = card.dataset.link;
        if (link && link !== "#") {
            window.location.href = link;
        }
    });
});

// Copy to clipboard interaction
copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const value = btn.dataset.copy;
        if (!value || !navigator.clipboard) return;

        try {
            await navigator.clipboard.writeText(value);
            const original = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => (btn.textContent = original), 1500);
        } catch {
            console.warn("Clipboard not available");
        }
    });
});

// Intersection Observer for fade-ins
const observer = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateActiveNav();
    updateScrollProgress();
    document.querySelectorAll("#home .fade-in").forEach((el) => el.classList.add("visible"));
});