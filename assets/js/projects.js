const language = [
    { name: "HTML", image: "/assets/img/icon/language/html.png" },
    { name: "CSS", image: "/assets/img/icon/language/css.png" },
    { name: "JavaScript", image: "/assets/img/icon/language/js.png" },
    { name: "TypeScript", image: "" },
    { name: "PHP", image: "/assets/img/icon/language/php.png" },
    { name: "Python", image: "/assets/img/icon/language/python.png" },
    { name: "Java", image: "" },
    { name: "C#", image: "" },
    { name: "Go", image: "" },
    { name: "Rust", image: "" },
    { name: "SQL", image: "" },
    { name: "Bash", image: "" },
];

const frameWorks = [
    { name: "Laravel", image: "/assets/img/icon/frameWorks/laravel.png" },
    { name: "React", image: "" },
    { name: "Vue", image: "" },
    { name: "Angular", image: "" },
    { name: "Tailwind", image: "/assets/img/icon/frameWorks/tailwindcss.png" },
    { name: "Bootstrap", image: "" },
    { name: "Next.js", image: "" },
];

const tools = [
    { name: "GitHub", image: "/assets/img/icon/tools/github.png" },
    { name: "Git", image: "/assets/img/icon/tools/git.png" },
    { name: "NPM", image: "" },
    { name: "Yarn", image: "" },
    { name: "Docker", image: "" },
    { name: "VSCode", image: "/assets/img/icon/tools/vsc.png" },
    { name: "Figma", image: "" },
    { name: "Postman", image: "/assets/img/icon/tools/postman.png" },
    { name: "Webpack", image: "" },
    { name: "Vite", image: "" },
];

const projects = [
    {
        title: "Diagnosa Penyakit Pasien",
        description: "Di website ini, saya berperan sebagai Front-end maupun Back-end developer. Untuk backend saya menggunakan bahasa pemrograman Python dengan library Flask",
        tools: [
            { name: 'GitHub' },
            { name: 'Git' },
            { name: 'VScode' },
        ],
        frameWorks: [
            { name: 'Tailwind' },
        ],
        languages: [
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' },
            { name: 'Python' },
            
        ],
        hosted: false,
        thumbnail: "./assets/img/project/diagnosa/halaman-utama.png",
        link: "https://diretaramandhap2.github.io/MoonpurunDesign/main.html",

    },
    {
        title: "Moonpurun Design",
        description: "Di website ini, saya berperan sebagai Front-end maupun Back-end developer.",
        tools: [
            { name: 'GitHub' },
            { name: 'Git' },
            { name: 'VScode' },
        ],
        frameWorks: [
            { name: 'Tailwind' },
        ],
        languages: [
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' },
        ],
        hosted: true,
        thumbnail: "./assets/img/project/moonpurun/landing-page.png",
        link: "https://diretaramandhap2.github.io/MoonpurunDesign/main.html",

    },
    {
        title: "Ecocash",
        description: "Dalam aplikasi mobile ini, saya berperan sebagai Backend developer. yang membuat sistem aplikasi nya",
        tools: [
            { name: 'GitHub' },
            { name: 'VScode' },
            { name: 'Postman' },
            { name: 'Git' },


        ],
        frameWorks: [
            { name: 'Laravel' },
        ],
        languages: [
            { name: 'PHP' },
        ],
        hosted: true,
        thumbnail: "./assets/img/project/ecocash/login-ecocash.png",
        screenshots: [
            { src: "/assets/img/project/ecocash/login-ecocash.png", name: "Login", desc: "Halaman untuk user login dalam aplikasi" },
        ]

    },
    {
        title: "Knowtopia",
        description: "Dalam web ini saya bekerja sama dengan rekan PKL saya untuk membuat web course online. saya berperan sebagai Backend developer. yang membuat sistem aplikasi nya",
        tools: [
            { name: 'GitHub' },
            { name: 'VScode' },
            { name: 'Git' },


        ],
        frameWorks: [
            { name: 'Laravel' },
        ],
        languages: [

            { name: 'PHP' },
            { name: 'JavaScript' },
        ],
        hosted: false,
        thumbnail: "./assets/img/project/knowtopia/landingpage.png",
        screenshots: [
            { src: "/assets/img/project/knowtopia/landingpage.png", name: "Login", desc: "Halaman untuk user login dalam aplikasi" },
        ]

    },
];




const container = document.getElementById("project-container");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImages = document.getElementById("modal-images");
const closeModal = document.getElementById("close-modal");

let currentIndex = 0;
let currentScreenshots = [];

const pagination = document.getElementById("pagination");
const showImage = (index) => {
    const page = currentScreenshots && currentScreenshots[index];
    if (!page) {
        modalImages.innerHTML = `<div class="text-center text-gray-400">No screenshots available.</div>`;
        pagination.innerHTML = "";
        return;
    }
    modalImages.style.opacity = 0; // fade-out
    setTimeout(() => {
        modalImages.innerHTML = `
      <img src="${page.src}" alt="${page.name}" loading="lazy" class="mx-auto rounded shadow mb-2 max-w-full h-auto">
      <span class="block text-lg font-semibold">${page.name}</span>
      <p class="text-gray-600">${page.desc || ''}</p>
    `;
        modalImages.style.opacity = 1; // fade-in
    }, 200);

    // update dot pagination (only when more than one image)
    pagination.innerHTML = "";
    if (currentScreenshots && currentScreenshots.length > 1) {
        currentScreenshots.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = `w-3 h-3 rounded-full cursor-pointer ${i === index ? "bg-purple-500" : "bg-gray-300"}`;
            dot.addEventListener("click", () => {
                currentIndex = i;
                showImage(currentIndex);
            });
            pagination.appendChild(dot);
        });
    }
};

projects.forEach(project => {
    const card = document.createElement("div");
    // make the card a column flex container so the footer can be pushed to the bottom
    card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-2 duration-300 flex flex-col h-full";

    // helper to render badges; if project item has no `image`, try to find it
    // in the master lookup array (case-insensitive match)
    const renderBadges = (items, lookup = []) => (items || []).map(i => {
        const name = (i && i.name) ? i.name : String(i || '');
        const found = (lookup || []).find(m => m.name && m.name.toLowerCase() === name.toLowerCase());
        const imgSrc = (i && i.image) ? i.image : (found && found.image ? found.image : '');
        const imgHTML = imgSrc ? `<img src="${imgSrc}" alt="${name} logo" class="inline-block w-4 h-4 mr-2 object-contain" loading="lazy">` : "";
        return `
            <span role="img" aria-label="${name}" title="${name}" class="flex items-center text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">
                ${imgHTML}<span>${name}</span>
            </span>
        `;
    }).join('');

    const languagesHTML = renderBadges(project.languages, language);
    const frameworksHTML = renderBadges(project.frameWorks, frameWorks);
    const toolsHTML = renderBadges(project.tools, tools);

    // helper to render a labeled section only when the html is non-empty
    const renderSection = (label, html) => html ? `<div class="flex flex-wrap items-center gap-2 text-gray-200"><span class="font-semibold mr-2">${label}:</span>${html}</div>` : '';

    card.innerHTML = `
            <div class="relative group">
                <img src="${project.thumbnail}" alt="${project.title}" class="w-full aspect-video object-cover">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 class="text-lg font-bold text-white mb-2">${project.title}</h3>
                    <div class="mt-2 flex flex-col gap-1 text-sm">
                        ${renderSection('Languages', languagesHTML)}
                        ${renderSection('Frameworks', frameworksHTML)}
                        ${renderSection('Tools', toolsHTML)}
                    </div>
                    
                </div>
                <!-- Badge -->
                <span class="absolute top-3 left-3 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    ${project.hosted ? "Hosted" : "Local"}
                </span>
            </div>
            <div class="flex flex-col justify-between p-4 flex-1 border-t">
                    <h3 class="text-lg font-extrabold text-purple-600 mb-4">${project.title}</h3>
                <p class=" font-medium text-sm mb-3 flex-1">${project.description}</p>
                <div class="mt-2">
                    <a href="${project.link ?? '#'}" target="_blank"
                       class="w-full preview-link inline-block px-3 py-2 bg-purple-500 text-white text-center text-sm rounded-full hover:bg-purple-600 transition-colors">
                       ${project.hosted ? "Live Demo" : "Preview"}
                    </a>
                </div>
            </div>
      
        `;

    const previewLink = card.querySelector(".preview-link");

    // make preview link accessible and safe when it opens a new tab
    if (previewLink) {
        previewLink.setAttribute('rel', 'noopener noreferrer');
        previewLink.setAttribute('aria-label', `${project.title} - ${project.hosted ? 'Open Live Demo' : 'Open Preview'}`);
    }

    const openProject = () => {
        if (project.hosted && project.link) {
            window.open(project.link, "_blank");
            return;
        }
        modalTitle.textContent = project.title;
        // ensure there is at least one image to show (fallback to thumbnail)
        currentScreenshots = (project.screenshots && project.screenshots.length) ? project.screenshots.slice() : [
            { src: project.thumbnail, name: project.title, desc: project.description || '' }
        ];
        currentIndex = 0;
        showImage(currentIndex);
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    };

    // Event untuk link Preview
    if (previewLink) {
        previewLink.addEventListener("click", (e) => {
            e.preventDefault(); // cegah default link
            openProject();
        });
    }

    // make the card clickable on touch devices and keyboard accessible
    card.classList.add('cursor-pointer');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${project.title} - ${project.hosted ? 'Open Live Demo' : 'Open Preview'}`);

    card.addEventListener('click', (e) => {
        // don't intercept clicks on inner focusable elements (e.g., link)
        if (e.target.closest('.preview-link')) return;
        openProject();
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProject();
        }
    });

    container.appendChild(card);
});



// Navigasi carousel
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

prevBtn.addEventListener("click", () => {
    if (!currentScreenshots || currentScreenshots.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentScreenshots.length) % currentScreenshots.length;
    showImage(currentIndex);
});
nextBtn.addEventListener("click", () => {
    if (!currentScreenshots || currentScreenshots.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentScreenshots.length;
    showImage(currentIndex);
});

// Tutup modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
});

// Klik di luar modal untuk menutup
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
});

// Keyboard interaksi
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
        if (e.key === "Escape") closeModal.click();
        if (e.key === "ArrowLeft") document.getElementById("prev-btn").click();
        if (e.key === "ArrowRight") document.getElementById("next-btn").click();
    }
});


