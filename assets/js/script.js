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