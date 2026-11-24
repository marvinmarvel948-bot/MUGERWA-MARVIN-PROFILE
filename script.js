// --- 1. THEME TOGGLE (Dark/Light Mode) ---
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
    const saved = localStorage.getItem('theme');
    if(saved){
        document.body.dataset.theme = saved;
        themeBtn.textContent = saved === 'dark' ? '☀' : '◐';
    }
    
    themeBtn.addEventListener('click', () => {
        const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        themeBtn.textContent = next === 'dark' ? '☀' : '◐';
        localStorage.setItem('theme', next);
    });
}

// --- 2. FOOTER YEAR ---
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// --- 3. SCROLL REVEAL (Makes content fade in) ---
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('visible');
    });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// --- 4. ABOUT GRID MOBILE FIX ---
const aboutGrid = document.querySelector('.about-grid');
if(aboutGrid){
    const mq = window.matchMedia('(max-width:820px)');
    const fixAbout = () => {
        aboutGrid.style.gridTemplateColumns = mq.matches ? '1fr' : '1.2fr .8fr';
    };
    fixAbout(); 
    mq.addEventListener('change', fixAbout);
}

// --- 5. LIGHTBOX (For Work Page Images) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imageSrc) {
    if(!lightbox) return;
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if(!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300); 
}

// --- 6. FAQ ACCORDION (For Contact Page) ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        document.querySelectorAll('.faq-item').forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});
// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon between hamburger and X
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}
