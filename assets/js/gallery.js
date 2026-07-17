/**
 * ===========================================
 * Gallery Filter
 * ===========================================
 */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterButtons.length) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {

            filterButtons.forEach((btn) =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            galleryItems.forEach((item) => {

                if (
                    filter === "all" ||
                    item.dataset.category === filter
                ) {
                    item.style.display = "block";

                    requestAnimationFrame(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    });

                } else {

                    item.style.opacity = "0";
                    item.style.transform = "scale(.9)";

                    setTimeout(() => {
                        item.style.display = "none";
                    }, 250);

                }

            });

        });
    });
}

/**
 * ===========================================
 * Simple Image Lightbox
 * ===========================================
 */

const galleryLinks = document.querySelectorAll(".gallery-link");

if (galleryLinks.length) {

    const overlay = document.createElement("div");
    overlay.className = "lightbox";

    overlay.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
    `;

    document.body.appendChild(overlay);

    const image = overlay.querySelector(".lightbox-image");
    const close = overlay.querySelector(".lightbox-close");

    galleryLinks.forEach((link) => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            image.src = link.href;

            overlay.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    const closeLightbox = () => {

        overlay.classList.remove("active");

        document.body.style.overflow = "";

    };

    close.addEventListener("click", closeLightbox);

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            closeLightbox();

        }

    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeLightbox();

        }

    });

}