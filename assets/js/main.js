// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');

    hamburgerBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        hamburgerBtn.classList.toggle('hamburger-active');

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerBtn.classList.remove('hamburger-active');
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!hamburgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            hamburgerBtn.classList.remove('hamburger-active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Internationalization (simple translation map)
    const translations = {
        id: {
            'nav.home': 'Beranda',
            'nav.about': 'Tentang',
            'nav.projects': 'Proyek',
            'nav.gallery': 'Galeri',
            'nav.contact': 'Kontak',
            'hero.title': 'Nama saya adalah',
            'hero.cv': 'Lihat CV',
            'hero.contact': 'Hubungi Saya',
            'hero.typedJobs': ['Frontend Developer', 'Web Developer', 'Backend Developer'],
            'about.title': 'TENTANG SAYA',
            'about.paragraph': 'Halo, saya Direta Ramandha Pratama. Saya adalah seorang web developer yang berpengalaman di kedua sisi pengembangan — frontend dan backend. Di bagian frontend, saya fokus membangun antarmuka yang responsif, intuitif, dan berorientasi pada pengalaman pengguna (UI/UX) dengan menggunakan HTML, CSS, JavaScript, serta framework seperti Tailwind CSS dan Bootstrap. Di sisi backend, saya merancang API, mengelola basis data, dan mengimplementasikan logika bisnis menggunakan PHP (Laravel). Saya terbiasa menangani seluruh siklus pengembangan — mulai dari perancangan UI/UX, implementasi, pengujian, hingga deployment — sambil memperhatikan performa, keamanan, dan maintainability.',
            'projects.title': 'PROYEK SAYA',
            'gallery.title': 'GALERI ACARA',
            'contact.title': 'HUBUNGI SAYA',
            'text.contact_intro': 'Jika kamu tertarik untuk bekerja sama atau sekadar ingin berdiskusi, silakan hubungi saya melalui form atau media sosial berikut:',
            'contact.name_placeholder': 'Nama Anda',
            'contact.email_placeholder': 'Email Anda',
            'contact.message_placeholder': 'Pesan Anda',
            'contact.send': 'Kirim Pesan'
        },
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.projects': 'Projects',
            'nav.gallery': 'Gallery',
            'nav.contact': 'Contact',
            'hero.title': 'My Name is',
            'hero.cv': 'See My CV',
            'hero.contact': 'Contact Me',
            'hero.typedJobs': ['Frontend Developer', 'Web Developer', 'Backend Developer'],
            'about.title': 'ABOUT ME',
            'about.paragraph': "Hello, I\u2019m Direta Ramandha Pratama. I am a web developer experienced in both frontend and backend. On the frontend I build responsive, accessible, and user-focused interfaces using HTML, CSS, JavaScript and frameworks such as Tailwind CSS and Bootstrap. On the backend I design APIs, manage databases and implement business logic using PHP (Laravel) and I am also comfortable with Node.js or Python when needed. I work across the full development cycle — from UI/UX design, implementation, testing to deployment — while prioritizing performance, security, and maintainability.",
            'projects.title': 'MY PROJECTS',
            'gallery.title': 'EVENT GALLERY',
            'contact.title': 'CONTACT ME',
            'text.contact_intro': 'If you are interested in collaborating or just want to have a discussion, feel free to reach out to me through the form or the following social media:',
            'contact.name_placeholder': 'Your Name',
            'contact.email_placeholder': 'Your Email',
            'contact.message_placeholder': 'Your Message',
            'contact.send': 'Send Message'
        }
    };

    // Simple i18n helper
    let currentLang = 'id';
    function applyLang(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('lang', lang);
        try { localStorage.setItem('siteLang', lang); } catch (e) { }
        // text-content updates
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const val = translations[lang] && translations[lang][key];
            if (val !== undefined) el.textContent = val;
        });
        // placeholder updates
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const val = translations[lang] && translations[lang][key];
            if (val !== undefined) el.placeholder = val;
        });
        // update language switcher label and flag
        const flags = { id: '🇮🇩', en: '🇺🇸' };
        const ariaNames = { id: 'Bahasa Indonesia', en: 'English' };
        document.querySelectorAll('.lang-switch').forEach(langBtn => {
            const flag = flags[lang] || '';
            const code = lang.toUpperCase();
            langBtn.innerHTML = `<span class="lang-flag">${flag}</span><span class="lang-code">${code}</span>`;
            langBtn.setAttribute('aria-label', ariaNames[lang] || code);
            langBtn.setAttribute('title', ariaNames[lang] || code);
        });

        // restart typing with language-specific jobs
        startTyping(translations[lang]['hero.typedJobs'] || translations['en']['hero.typedJobs']);
    }

    // init language from localStorage or default 'id'
    try { const saved = localStorage.getItem('siteLang'); if (saved && translations[saved]) currentLang = saved; } catch (e) { }

    // Typing & deleting effect for job titles (restartable)
    let typingTimer = null;
    function startTyping(jobs) {
        const typedEl = document.getElementById('typed-jobs');
        if (!typedEl) return;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseDelay = 1500;
        if (typingTimer) clearTimeout(typingTimer);

        function tick() {
            const current = jobs[wordIndex];
            if (!isDeleting) {
                charIndex++;
                typedEl.textContent = current.substring(0, charIndex);
                if (charIndex === current.length) {
                    isDeleting = true;
                    typingTimer = setTimeout(tick, pauseDelay);
                    return;
                }
                typingTimer = setTimeout(tick, typeSpeed);
            } else {
                charIndex--;
                typedEl.textContent = current.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % jobs.length;
                    typingTimer = setTimeout(tick, typeSpeed);
                    return;
                }
                typingTimer = setTimeout(tick, deleteSpeed);
            }
        }
        tick();
    }

    // Apply initial language and typing
    applyLang(currentLang);

    // Language switcher
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', () => {
            const next = currentLang === 'id' ? 'en' : 'id';
            applyLang(next);
            // jika klik di mobile, tutup mobile menu
            if (btn.id === 'lang-switch-mobile') {
                mobileMenu.classList.add('hidden');
                hamburgerBtn.classList.remove('hamburger-active');
            }
        });
    });

    // Theme rotation logic: switches theme every 2 minutes and persists choice
    (function () {
        const themes = ['theme-1', 'theme-2', 'theme-3', 'theme-4'];
        let themeIndex = 0;

        function applyTheme(name) {
            document.documentElement.setAttribute('data-theme', name);
            try { localStorage.setItem('siteTheme', name); } catch (e) { /* ignore */ }
        }

        // load saved theme if available
        try {
            const saved = localStorage.getItem('siteTheme');
            if (saved && themes.includes(saved)) {
                themeIndex = themes.indexOf(saved);
                applyTheme(saved);
            } else {
                applyTheme(themes[0]);
            }
        } catch (e) {
            applyTheme(themes[0]);
        }

        // rotate every 300000ms (5 minutes)
        setInterval(() => {
            themeIndex = (themeIndex + 1) % themes.length;
            applyTheme(themes[themeIndex]);
        }, 300000);
    })();

    // Randomize floating code icons positions (no clustering)
    (function () {
        const icons = document.querySelectorAll('.floating-code');
        if (!icons.length) return;
        const container = document.getElementById('hero-grid') || document.querySelector('#hero-banner');

        function placeIcons() {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const positions = [];
            const minDist = Math.max(60, Math.min(rect.width, rect.height) * 0.12); // px, adaptive

            icons.forEach(icon => {
                let attempts = 0;
                let placed = false;
                let leftPct, topPct;

                while (attempts < 40 && !placed) {
                    leftPct = Math.random() * 80 + 5; // sebelumnya (5% - 85%)
                    // leftPct = Math.random() * 40 + 55; // 55% - 95% (kanan saja)
                    topPct = Math.random() * 60 + 5;   // 5% - 65%
                    const x = rect.left + (leftPct / 100) * rect.width;
                    const y = rect.top + (topPct / 100) * rect.height;

                    if (!positions.some(p => Math.hypot(p.x - x, p.y - y) < minDist)) {
                        positions.push({ x, y });
                        placed = true;
                        const rotate = (Math.random() - 0.5) * 40; // -20 to 20 deg
                        const scale = 0.9 + Math.random() * 0.6; // 0.9 - 1.5
                        icon.style.left = leftPct + '%';
                        icon.style.top = topPct + '%';
                        icon.dataset.baseTransform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
                        icon.style.transform = icon.dataset.baseTransform;
                        icon.style.opacity = 0.85 + Math.random() * 0.15;
                    }
                    attempts++;
                }

                if (!placed) {
                    // fallback spot with jitter next to last placed or center
                    const last = positions[positions.length - 1] || { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                    const jitter = minDist;
                    const x = last.x + jitter;
                    const y = last.y + jitter;
                    const left = ((x - rect.left) / rect.width) * 100;
                    const top = ((y - rect.top) / rect.height) * 100;
                    icon.style.left = Math.min(95, Math.max(5, left)) + '%';
                    icon.style.top = Math.min(90, Math.max(5, top)) + '%';
                    const rotate = (Math.random() - 0.5) * 40;
                    const scale = 0.9 + Math.random() * 0.6;
                    icon.dataset.baseTransform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
                    icon.style.transform = icon.dataset.baseTransform;
                    icon.style.opacity = 0.85 + Math.random() * 0.15;
                }
            });
        }

        placeIcons();
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(placeIcons, 150);
        });

        // subtle periodic float without compounding transforms
        setInterval(() => {
            icons.forEach(icon => {
                const dx = (Math.random() - 0.5) * 6;
                const dy = (Math.random() - 0.5) * 6;
                const base = icon.dataset.baseTransform || icon.style.transform || 'translate(-50%, -50%)';
                icon.style.transform = `${base} translate(${dx}px, ${dy}px)`;
            });
        }, 2000);
    })();

});