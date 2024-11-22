const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
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
    const links = $$(".js-dropdown-list > li > a");
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
                if (otherItem !== item) {
                    otherItem.classList.remove("menu-item-has-children--active");
                    otherSubMenu.style.height = '0'; // Close other submenus
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
                item.classList.remove("menu-item-has-children--active");
                subMenu.style.height = "0"; // Close all submenus.
            });
        }
    });
});

// handle navbar position sticky when scroll down
window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header-inner");
    const threshold = 100; // Ngưỡng ẩn Categories
    const revealThreshold = 80; // Ngưỡng hiện lại Categories khi cuộn lên
    let lastScrollY = window.scrollY;
    let isHovering = false; // Trạng thái khi hover chuột vào header

    // Kiểm tra trạng thái ban đầu khi tải trang
    if (window.scrollY > threshold) {
        header.classList.add("hide-category");
    }

    // Lắng nghe sự kiện hover vào header
    header.addEventListener("mouseenter", () => {
        isHovering = true;
        header.classList.remove("hide-category");
    });

    // Lắng nghe sự kiện di chuột ra khỏi header
    header.addEventListener("mouseleave", () => {
        isHovering = false;

        // Chỉ ẩn Categories nếu vượt ngưỡng threshold
        if (window.scrollY > threshold) {
            header.classList.add("hide-category");
        }
    });

    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (!isHovering) {
            if (currentScrollY > threshold) {
                if (currentScrollY > lastScrollY) {
                    // Cuộn xuống -> Ẩn Categories
                    header.classList.add("hide-category");
                } else if (currentScrollY < revealThreshold) {
                    // Cuộn lên về gần đỉnh -> Hiện Categories
                    header.classList.remove("hide-category");
                }
            } else {
                // Nếu cuộn chưa đủ ngưỡng, luôn hiển thị Categories
                header.classList.remove("hide-category");
            }
        }

        lastScrollY = currentScrollY;
    });
});