/* --- 1. СЛОВНИК ПЕРЕКЛАДІВ --- */
const translations = {
    en: {
        location: "UKRAINE, 2025",
        tab_works: "WORKS",
        tab_about: "ABOUT ME",
        about_title: "Visual & Digital Creator",
        about_text1: "Hi. My name is Ponomarenko. I create visual meanings and digital content.",
        about_text2: "My approach combines aggressive aesthetics, modern motion design, and clean web interfaces.",
        filter_all: "All",
        filter_branding: "Branding",
        filter_motion: "Motion",
        filter_print: "Print",
        filter_social: "Social Media",
        btn_open: "OPEN PORTFOLIO"
    },
    ua: {
        location: "УКРАЇНА, 2025",
        tab_works: "РОБОТИ",
        tab_about: "ПРО МЕНЕ",
        about_title: "Візуальний та цифровий кріейтор",
        about_text1: "Привіт. Мене звати Пономаренко. Я створюю візуальні сенси та цифровий контент.",
        about_text2: "Мій підхід поєднує агресивну естетику, сучасний моушн-дизайн та чистоту веб-інтерфейсів.",
        filter_all: "Всі",
        filter_branding: "Брендинг",
        filter_motion: "Моушн",
        filter_print: "Друк",
        filter_social: "Соцмережі",
        btn_open: "ВІДКРИТИ ПОРТФОЛІО"
    }
};

let currentLang = 'en';

/* --- 2. БАЗА ДАНИХ --- */
const projects = {
    'travis_dark': {
        type: 'video',
        videoSrc: "video.mp4",
        gallery: ["Візитка_Тревіс.jpg"],
        content: {
            en: { title: "Travis Scott - Utopia Card", description: "Dark grunge aesthetic business card concept.", tags: ["Branding", "Motion", "Print"] },
            ua: { title: "Візитка Travis Scott - Utopia", description: "Концепт візитки у темній гранж естетиці.", tags: ["Брендинг", "Моушн", "Друк"] }
        }
    },
    'travis_yellow': {
        type: 'video',
        videoSrc: "video1.mp4",
        gallery: ["Візитка_Тревіс1.jpg"],
        content: {
            en: { title: "Travis Scott - Yellow Edition", description: "Alternative version focusing on typography.", tags: ["Graphic Design", "Print", "Typography"] },
            ua: { title: "Візитка Travis Scott - Yellow", description: "Альтернативна версія з акцентом на типографіку.", tags: ["Графічний дизайн", "Друк", "Типографія"] }
        }
    },
    'quicktalk': {
        type: 'image',
        videoSrc: "",
        gallery: ["Meta square.jpg", "Google Display (Quality).jpg", "Meta landscape.jpg"],
        content: {
            en: { title: "QuickTalk Campaign", description: "Advertising banners for English learning platform.", tags: ["Social Media", "Ads", "Graphic Design"] },
            ua: { title: "Рекламна кампанія QuickTalk", description: "Рекламні банери для школи англійської мови.", tags: ["Соцмережі", "Реклама", "Графічний дизайн"] }
        }
    },
    'architect': {
        type: 'video',
        videoSrc: "grok-video-430053b9-6ab6-4acf-8154-9038b84ab03c.mp4",
        gallery: ["Architect.jpg"],
        content: {
            en: {
                title: "Architect of Yourself",
                description: "Motivational poster design combining classical sculpture with modern typography. The concept visualizes self-creation as a sculpting process: 'You are the architect of yourself'.",
                tags: ["Print", "Motion", "Typography"]
            },
            ua: {
                title: "Архітектор власного Я",
                description: "Дизайн мотиваційного постера, що поєднує класичну скульптуру та сучасну типографіку. Концепція візуалізує самостворення як процес роботи скульптора.",
                tags: ["Друк", "Моушн", "Типографія"]
            }
        }
    },
    'mirror_shop': {
        type: 'image',
        videoSrc: "",
        // Переконайся, що імена файлів точні (JPG vs jpg має значення на сервері!)
        gallery: ["SMMMirror.jpg", "ДзеркалаСММ1.jpg", "ДзеркалаСММ2.jpg", "ДзеркалаСММ3.jpg", "ДзеркалаСММ4.jpg", "ДзеркалаСММ5.jpg", "ДзеркалаСММ6.jpg", "ДзеркалаСММ7.jpg", "ДзеркалаСММ8.jpg", "ДзеркалаСММ9.jpg"], 
        content: {
            en: {
                title: "Mirror Shop Visuals",
                description: "Visual identity and content creation for a mirror store. Developing a grid layout, highlights, and informative posts.",
                tags: ["SMM", "Graphic Design", "Content Creation"]
            },
            ua: {
                title: "Візуал для магазину дзеркал",
                description: "Розробка візуального стилю для Instagram магазину дзеркал. Створення сітки, обкладинок та інформативних постів.",
                tags: ["SMM", "Графічний дизайн", "Контент"]
            }
        }
    }
};

/* --- ФУНКЦІЇ КЕРУВАННЯ --- */

// 1. КНОПКА ЛОГО (ДОДОМУ)
function goHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openTab('projects', document.querySelector('.tab-btn'));
}

// 2. ПЕРЕМИКАЧ МОВИ (ТУМБЛЕР)
function toggleLanguage() {
    const checkbox = document.getElementById('languageToggle');
    if (checkbox.checked) {
        setLanguage('ua');
    } else {
        setLanguage('en');
    }
}

function setLanguage(lang) {
    currentLang = lang;
    
    // Оновлюємо стан тумблера (якщо функція викликана не через клік)
    const checkbox = document.getElementById('languageToggle');
    if (lang === 'ua') checkbox.checked = true;
    else checkbox.checked = false;

    // Переклад текстів
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    
    if(currentProjectId) updateModalText(currentProjectId);
}

/* --- ЛАЙКИ --- */
let likedProjects = JSON.parse(localStorage.getItem('likedProjects')) || {};

function toggleLike(event, projectId) {
    event.stopPropagation();
    const btn = document.getElementById(`like-${projectId}`);
    if (likedProjects[projectId]) {
        delete likedProjects[projectId];
        btn.classList.remove('liked');
    } else {
        likedProjects[projectId] = true;
        btn.classList.add('liked');
    }
    localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
}

function initLikes() {
    for (const id in likedProjects) {
        const btn = document.getElementById(`like-${id}`);
        if (btn) btn.classList.add('liked');
    }
}
initLikes();

/* --- ФІЛЬТРИ --- */
function filterProjects(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.getAttribute('onclick').includes(category)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    document.querySelectorAll('.project-card').forEach(card => {
        const cats = card.getAttribute('data-category');
        card.classList.remove('animate-in');
        if (category === 'all' || cats.includes(category)) {
            card.classList.remove('hidden');
            setTimeout(() => card.classList.add('animate-in'), 10);
        } else {
            card.classList.add('hidden');
        }
    });
}

/* --- UI --- */
function openTab(tabName, btnElement) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    if(btnElement) btnElement.classList.add('active');
}

function hoverVideo(card) { const v = card.querySelector('video'); if(v) v.play(); }
function unhoverVideo(card) { const v = card.querySelector('video'); if(v) { v.pause(); v.currentTime = 0; } }

/* --- МОДАЛКА --- */
const modal = document.getElementById('projectModal');
const mVideo = document.getElementById('modalVideo');
const mImage = document.getElementById('modalImage');
const mTitle = document.getElementById('modalTitle');
const mDesc = document.getElementById('modalDesc');
const mTags = document.getElementById('modalTags');
const btnVideo = document.getElementById('btnVideo');
const btnImage = document.getElementById('btnImage');

let currentGallery = [];
let currentSlideIndex = 0;
let currentProjectId = null;

function openModal(id) {
    const data = projects[id];
    if(!data) {
        console.error("Project not found: " + id); // Додав вивід помилки в консоль
        return;
    }
    currentProjectId = id;
    currentGallery = data.gallery || [];
    currentSlideIndex = 0;

    if (data.videoSrc) {
        mVideo.src = data.videoSrc;
        btnVideo.style.display = 'inline-block';
    } else {
        mVideo.src = "";
        btnVideo.style.display = 'none';
    }

    updateModalText(id);
    updateSlideImage(); 
    switchMedia('image'); 
    
    modal.classList.add('active');
    mImage.onclick = function() { openFullscreen(this.src); };
}

function updateModalText(id) {
    const data = projects[id];
    const text = data.content[currentLang];
    mTitle.innerText = text.title;
    mDesc.innerText = text.description;
    mTags.innerHTML = '';
    text.tags.forEach(t => mTags.innerHTML += `<span class="tag">${t}</span>`);
}

function closeModal() {
    modal.classList.remove('active');
    mVideo.pause();
    mVideo.src = "";
    currentProjectId = null;
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= currentGallery.length) currentSlideIndex = 0;
    else if (currentSlideIndex < 0) currentSlideIndex = currentGallery.length - 1;
    updateSlideImage();
}

function updateSlideImage() {
    if (currentGallery.length > 0) {
        mImage.classList.remove('fade-effect');
        mImage.src = currentGallery[currentSlideIndex];
        void mImage.offsetWidth; 
        mImage.classList.add('fade-effect');
    }
    const arrows = document.querySelectorAll('.slider-btn');
    const isImageMode = !mImage.classList.contains('hidden-media');
    if (currentGallery.length > 1 && isImageMode) arrows.forEach(btn => btn.style.display = 'flex');
    else arrows.forEach(btn => btn.style.display = 'none');
}

function switchMedia(type) {
    const arrows = document.querySelectorAll('.slider-btn');
    if (type === 'video') {
        mVideo.classList.remove('hidden-media');
        mImage.classList.add('hidden-media');
        mVideo.play();
        btnVideo.classList.add('active');
        btnImage.classList.remove('active');
        arrows.forEach(btn => btn.style.display = 'none');
    } else {
        mVideo.classList.add('hidden-media');
        mImage.classList.remove('hidden-media');
        mVideo.pause();
        btnImage.classList.add('active');
        btnVideo.classList.remove('active');
        updateSlideImage();
    }
}

document.addEventListener('keydown', e => { 
    if(e.key === "Escape") { closeModal(); closeFullscreen(); }
    if(modal.classList.contains('active') && !mImage.classList.contains('hidden-media')) {
        if(e.key === "ArrowLeft") changeSlide(-1);
        if(e.key === "ArrowRight") changeSlide(1);
    }
});

document.getElementById('projectModal').addEventListener('click', e => {
    if(e.target.id === 'projectModal') closeModal();
});

const fsOverlay = document.getElementById('fullscreenOverlay');
const fsImage = document.getElementById('fullscreenImage');
function openFullscreen(src) { fsImage.src = src; fsOverlay.classList.add('active'); }
function closeFullscreen() { fsOverlay.classList.remove('active'); setTimeout(() => fsImage.src = "", 300); }