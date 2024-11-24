document.addEventListener("DOMContentLoaded", initJsToggle);
function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Require toggle-target for: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();
            if (!$(target)) {
                return (document.body.innerText = `Element not found "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

// menu dropdown
window.addEventListener("DOMContentLoaded", () => {
    const links = $$(".js-dropdown-list > li > button");
    // Get the container element of the menu
    const menuContainer = document.querySelector(".js-dropdown-list");

    links.forEach((link) => {
        link.onclick = () => {
            if (window.innerWidth > 991) return;

            const item = link.closest("li");
            const subMenu = item.querySelector(".sub-menu");

            // close other submenu
            const allItems = $$(".js-dropdown-list > li");
            allItems.forEach((otherItem) => {
                const otherSubMenu = otherItem.querySelector(".sub-menu");
                if (otherSubMenu !== null) {
                    if (otherItem !== item) {
                        otherItem.classList.remove("menu-item-has-children--active");
                        otherSubMenu.style.height = '0'; // Close other submenus
                    }
                }
            });

            // Calculate the current submenu height
            if (subMenu) {
                // Get the actual height of the submenu.
                const submenuHeight = subMenu.scrollHeight + "px";

                // Toggle the current submenu state
                if (item.classList.contains("menu-item-has-children--active")) {
                    item.classList.remove("menu-item-has-children--active");
                    subMenu.style.height = '0'; // close submenu
                } else {
                    item.classList.add("menu-item-has-children--active");
                    subMenu.style.height = submenuHeight; // open submenu
                }
            }
        };
    });

    // Close all submenus when clicking outside the menu
    document.addEventListener("click", (e) => {
        if (!menuContainer.contains(e.target)) {
            const allItems = $$(".js-dropdown-list > li");
            allItems.forEach(item => {
                const subMenu = item.querySelector(".sub-menu");
                if (subMenu !== null) {
                    item.classList.remove("menu-item-has-children--active");
                    subMenu.style.height = "0"; // Close all submenus.
                }
            });
        }
    });
});

// Carousel
document.addEventListener("DOMContentLoaded", function () {
    const slideshowInner = document.querySelector('.slideshow__inner');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slideshow__item');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Add the first slide to the end of the list to create a looping effect
    const firstSlideClone = slides[0].cloneNode(true);
    slideshowInner.appendChild(firstSlideClone);

    // Function to move to the next slide
    function goToSlide(index, immediate = false) {
        if (immediate) {
            slideshowInner.style.transition = 'none';
        } else {
            slideshowInner.style.transition = 'transform 0.5s ease-in-out';
        }
        slideshowInner.style.transform = `translateX(-${index * 100}%)`;

        // Update the indicator index (excluding the clone slide case)
        if (index < totalSlides) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
        }
    }

    // Function for automatically switching slides
    function autoSlide() {
        currentIndex++;
        goToSlide(currentIndex);

        // When reaching the cloned slide (the last one), immediately return to the first slide
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                slideshowInner.style.transition = 'none';
                currentIndex = 0; // come to first slide
                goToSlide(currentIndex, true);
            }, 500); // Wait for the sliding animation to complete
        }
    }

    // Run auto slide
    setInterval(autoSlide, 3000); // Update each 3s

    // Handle click on indicator
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            currentIndex = index;
            goToSlide(currentIndex);
        });
    });

    // Set the active state for the first indicator on load
    goToSlide(currentIndex);
});