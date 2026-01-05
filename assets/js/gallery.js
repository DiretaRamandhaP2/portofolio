const galleryItems = [
    // {
    //     src: "./assets/img/gallery/presentasi-diagnosa.jpeg",
    //     title: "Presentasi Diagnosa Kesehatan Pasien dengan seluruh Team",
    //     desc: "Foto Bersama Setelah Presentasi",
    //     date: "12 Des 2025",
    //     status: "Done"
    // },
    //  {
    //     src: "./assets/img/gallery/presentasi-moonpurun.jpeg",
    //     title: "Presentasi Moonpurun Design dengan Seluruh tean",
    //     desc: "Foto Bersama Setelah Presentasi",
    //     date: "3 Dec 2025",
    //     status: "Done"
    // },
     {
        src: "./assets/img/gallery/iot.jpeg",
        title: "Kunjungan ke Arjuna Farm",
        desc: "Kunjungan ke Arjuna Farm untuk mempelajari IoT dalam pertanian",
        date: "15 Mei 2025",
        status: "Done"
    },
     {
        src: "./assets/img/gallery/iam.jpeg",
        title: "PKL Di PT.Inovasi Alfatih Maulana",
        desc: "Pembimbing Dari Kantor dan Sekolah Yang monitoring Kegiatan PKL",
        date: "27 April 2025",
        status: "Done"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const modal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("modal-image");
    const modalDesc = document.getElementById("modal-desc");
    const modalDate = document.getElementById("modal-date");
    const modalStatus = document.getElementById("modal-status");
    const closeModal = document.getElementById("close-gallery-modal");
    const modalTitle = document.getElementById("gallery-modal-title");


    let currentIndex = 0;

    const showImage = (index) => {
        const item = galleryItems[index];

        // fade-out dulu
        modalImage.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
            modalTitle.textContent = item.title;
            modalImage.src = item.src;
            modalDesc.textContent = item.desc;
            modalDate.textContent = item.date;
            modalStatus.textContent = item.status;

            // fade-in setelah ganti konten
            modalImage.classList.remove("opacity-0", "scale-95");
            modalImage.classList.add("opacity-100", "scale-100");
        }, 200);
    };


    galleryItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "gallery-item bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer";

        card.innerHTML = `
    <div class="overflow-hidden relative group">
      <img src="${item.src}" alt="${item.title}" class="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black/48 bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 class="text-white font-semibold text-sm">${item.title}</h3>
        <p class="text-gray-200 text-xs">${item.desc}</p>
        <span class="text-gray-200 text-xs mt-1"><i class="far fa-calendar mr-1"></i>${item.date}</span>
      </div>
    </div>
  `;

        card.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        });

        galleryContainer.appendChild(card);
    });

    document.getElementById("prev-gallery-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    });

    document.getElementById("next-gallery-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    });

    // Tutup modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    // Klik di luar modal
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

});
