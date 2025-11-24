/* --- 1. НАЛАШТУВАННЯ FIREBASE --- */
const firebaseConfig = {
    apiKey: "AIzaSyD2TABFrvGoQ0tYv_epEFEyonb9wVE8W0s",
    authDomain: "pnm-portfolio.firebaseapp.com",
    databaseURL: "https://pnm-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pnm-portfolio",
    storageBucket: "pnm-portfolio.firebasestorage.app",
    messagingSenderId: "715058946560",
    appId: "1:715058946560:web:106b588a826225d7596ee5",
    measurementId: "G-NWGWP9KXTY"
};

let db;
let firebaseModulesRef;

window.addEventListener('load', async () => {
    if(window.firebaseModules) {
        firebaseModulesRef = window.firebaseModules;
        const { initializeApp, getDatabase } = firebaseModulesRef;
        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        Object.keys(projects).forEach(id => listenForLikes(id));
    } else {
        console.error("Firebase modules not loaded.");
    }
});

/* --- 2. БАЗА ДАНИХ ПРОЕКТІВ (ОНОВЛЕНІ ТЕГИ) --- */
const projects = {
    'travis_dark': {
        type: 'video',
        videoSrc: "video.mp4",
        gallery: ["Візитка_Тревіс.jpg"],
        content: {
            en: { title: "Travis Scott - Utopia Card", description: "Dark grunge aesthetic business card concept.", tags: ["Branding", "Print"] },
            ua: { title: "Візитка Travis Scott - Utopia", description: "Концепт візитки у темній гранж естетиці.", tags: ["Брендинг", "Друк"] }
        }
    },
    'travis_yellow': {
        type: 'video',
        videoSrc: "video1.mp4",
        gallery: ["Візитка_Тревіс1.jpg"],
        content: {
            en: { title: "Travis Scott - Yellow Edition", description: "Alternative version focusing on typography.", tags: ["Branding", "Print", "Typography"] },
            ua: { title: "Візитка Travis Scott - Yellow", description: "Альтернативна версія з акцентом на типографіку.", tags: ["Брендинг", "Друк", "Типографія"] }
        }
    },
    'quicktalk': {
        type: 'image',
        videoSrc: "",
        gallery: ["Meta square.jpg", "Google Display (Quality).jpg", "Meta landscape.jpg"],
        content: {
            en: { title: "QuickTalk Campaign", description: "Advertising banners for English learning platform.", tags: ["SMM", "Branding", "Ads"] },
            ua: { title: "Рекламна кампанія QuickTalk", description: "Рекламні банери для школи англійської мови.", tags: ["SMM", "Брендинг", "Реклама"] }
        }
    },
    'architect': {
        type: 'video',
        videoSrc: "grok-video-430053b9-6ab6-4acf-8154-9038b84ab03c.mp4",
        gallery: ["Architect.jpg"],
        content: {
            en: { title: "Architect of Yourself", description: "Motivational poster design combining classical sculpture with modern typography.", tags: ["Poster", "Motion"] },
            ua: { title: "Архітектор власного Я", description: "Дизайн мотиваційного постера, що поєднує класичну скульптуру та сучасну типографіку.", tags: ["Постер", "Моушн"] }
        }
    },
    'mirror_shop': {
        type: 'image',
        videoSrc: "",
        gallery: ["SMMMirror.jpg", "ДзеркалаСММ1.jpg", "ДзеркалаСММ2.jpg", "ДзеркалаСММ3.jpg", "ДзеркалаСММ4.jpg", "ДзеркалаСММ5.jpg", "ДзеркалаСММ6.jpg", "ДзеркалаСММ7.jpg", "ДзеркалаСММ8.jpg", "ДзеркалаСММ9.jpg"], 
        content: {
            en: { title: "Mirror Shop Visuals", description: "Visual identity and content creation for a mirror store.", tags: ["SMM", "Branding", "Content"] },
            ua: { title: "Візуал для магазину дзеркал", description: "Розробка візуального стилю для Instagram магазину дзеркал.", tags: ["SMM", "Брендинг", "Контент"] }
        }
    }
};

/* --- 3. ПЕРЕКЛАДИ (ОНОВЛЕНІ ФІЛЬТРИ) --- */
const translations = {
    en: {
        location: "UKRAINE, 2025",
        tab_works: "WORKS",
        tab_about: "ABOUT ME",
        about_title: "Graphic & Visual Designer",
        about_text1: "Hi! My name is Andrii Ponomarenko, I am a graphic designer.",
        about_text2: "I understand trends in design and video editing. I actively work with AI, using it to create unique visual solutions.",
        about_text3: "Thanks to my attention to detail and constant desire to develop, I strive to make every project unforgettable and satisfy expectations 100%.",
        skills_title: "EXPERIENCE & TOOLS",
        filter_all: "All",
        filter_branding: "Branding",
        filter_motion: "Motion",
        filter_print: "Print",
        filter_social: "Social Media",
        filter_smm: "SMM",
        filter_video: "Video",
        filter_poster: "Poster",
        btn_open: "OPEN PORTFOLIO"
    },
    ua: {
        location: "УКРАЇНА, 2025",
        tab_works: "РОБОТИ",
        tab_about: "ПРО МЕНЕ",
        about_title: "Графічний та Візуальний Дизайнер",
        about_text1: "Привіт! Мене звуть Пономаренко Андрій, я графічний дизайнер.",
        about_text2: "Розуміюся у трендах в дизайні та відео-монтажі. Активно працюю з АІ, використовуючи їх для створення унікальних візуальних рішень.",
        about_text3: "Завдяки увазі до деталей і постійному бажанню розвиватися, я прагну зробити кожен проект незабутнім і таким, що задовольнятиме очікування на всі 100%.",
        skills_title: "ДОСВІД ТА ІНСТРУМЕНТИ",
        filter_all: "Всі",
        filter_branding: "Брендинг",
        filter_motion: "Моушн",
        filter_print: "Друк",
        filter_social: "Соцмережі",
        filter_smm: "SMM",
        filter_video: "Відео",
        filter_poster: "Постер",
        btn_open: "ВІДКРИТИ ПОРТФОЛІО"
    }
};

/* --- РЕШТА ФУНКЦІЙ (БЕЗ ЗМІН) --- */
let currentLang = 'en';
let myLikes = JSON.parse(localStorage.getItem('myLikes')) || {};

function initMyLikes() {
    for (const id in myLikes) {
        const btn = document.getElementById(`like-${id}`);
        if (btn) btn.classList.add('liked');
    }
}
window.addEventListener('load', initMyLikes);

function toggleLike(event, projectId) {
    event.stopPropagation();
    if (!db || !firebaseModulesRef) return; 

    const btn = document.getElementById(`like-${projectId}`);
    const { ref, runTransaction } = firebaseModulesRef;
    const projectRef = ref(db, 'likes/' + projectId);

    if (myLikes[projectId]) {
        delete myLikes[projectId];
        btn.classList.remove('liked');
        runTransaction(projectRef, (currentLikes) => (currentLikes || 0) - 1);
    } else {
        myLikes[projectId] = true;
        btn.classList.add('liked');
        runTransaction(projectRef, (currentLikes) => (currentLikes || 0) + 1);
    }
    localStorage.setItem('myLikes', JSON.stringify(myLikes));
}

function listenForLikes(projectId) {
    if (!db || !firebaseModulesRef) return;
    const { ref, onValue } = firebaseModulesRef;
    const countSpan = document.getElementById(`count-${projectId}`);
    if(countSpan) {
        const projectRef = ref(db, 'likes/' + projectId);
        onValue(projectRef, (snapshot) => {
            const data = snapshot.val() || 0;
            countSpan.innerText = data;
            countSpan.classList.add('updated');
            setTimeout(() => countSpan.classList.remove('updated'), 300);
        });
    }
}

function setLanguage(lang) {
    currentLang = lang;
    const checkbox = document.getElementById('languageToggle');
    if (lang === 'ua') checkbox.checked = true;
    else checkbox.checked = false;

    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    if(currentProjectId) updateModalText(currentProjectId);
}

function toggleLanguage() {
    const checkbox = document.getElementById('languageToggle');
    if (checkbox.checked) setLanguage('ua');
    else setLanguage('en');
}

function goHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openTab('projects', document.querySelector('.tab-btn'));
}

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

function openTab(tabName, btnElement) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    if(btnElement) btnElement.classList.add('active');
}

function hoverVideo(card) { const v = card.querySelector('video'); if(v) v.play(); }
function unhoverVideo(card) { const v = card.querySelector('video'); if(v) { v.pause(); v.currentTime = 0; } }

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
        console.error("Project not found: " + id);
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

/* --- ХЕДЕР НАВІГАЦІЯ (Зникнення при скролі) --- */

// Функція скролу до блоків
function scrollToTab(tabName) {
    // 1. Перемикаємо таби знизу
    const targetBtn = document.querySelector(`.tab-btn[onclick*="'${tabName}'"]`);
    if(targetBtn) openTab(tabName, targetBtn);
    
    // 2. Скролимо до контенту
    const tabsContainer = document.querySelector('.tabs-container');
    // Розраховуємо позицію з урахуванням висоти хедера
    const offset = 100; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = tabsContainer.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Логіка зникнення написів
window.addEventListener('scroll', () => {
    const headerNav = document.getElementById('headerNav');
    const scrollPosition = window.scrollY;

    // Якщо прокрутили більше 50px (вийшли з зони банера) -> ховаємо написи
    if (scrollPosition > 50) {
        headerNav.classList.add('hidden-nav');
    } else {
        // Якщо повернулися на самий верх -> показуємо написи
        headerNav.classList.remove('hidden-nav');
    }
});

/* --- ГЕНЕРАТОР ЖИВОГО ФОНУ --- */
document.addEventListener('DOMContentLoaded', () => {
    const bgContainer = document.getElementById('ambient-bg');
    
    const colors = [
        'rgba(220, 20, 60, 0.6)',   // Яскравіший малиновий
        'rgba(139, 0, 0, 0.5)',     // Насичений темний
        'rgba(255, 50, 50, 0.4)',   // Світло-червоний
        'rgba(255, 0, 0, 0.3)'      // Чистий червоний
    ];

    // Кількість плям (10-15 штук)
    const orbCount = Math.floor(Math.random() * 3) + 6;

    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.classList.add('light-orb');

        // ЗБІЛЬШЕНО РОЗМІР: від 30% до 60% ширини екрану
        const size = Math.floor(Math.random() * 30) + 30; 
        orb.style.width = `${size}vw`;
        orb.style.height = `${size}vw`;

        // Рандомна позиція
        orb.style.top = `${Math.random() * 120 - 10}%`;
        orb.style.left = `${Math.random() * 120 - 10}%`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        orb.style.background = `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`;

        const duration = Math.floor(Math.random() * 15) + 10;
        orb.style.animationDuration = `${duration}s`;

        const delay = Math.floor(Math.random() * 10) * -1;
        orb.style.animationDelay = `${delay}s`;

        bgContainer.appendChild(orb);
    }
});

