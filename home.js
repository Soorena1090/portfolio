document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");


    function enableHamburgerMenu() {    
        if (!document.querySelector(".menu-toggle")) {
            const menuToggle = document.createElement("button");
            menuToggle.classList.add("menu-toggle");
            menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
            header.appendChild(menuToggle);

  
            menuToggle.addEventListener("click", () => {
                if (!document.querySelector(".menu-active")) {
                    const menuActive = document.createElement("div");
                    menuActive.classList.add("menu-active");

                    const menuList = nav.querySelector("ul").cloneNode(true);
                    menuActive.appendChild(menuList);
                    document.body.appendChild(menuActive);
                    document.addEventListener("click", (e) => {
                        if (
                            !menuActive.contains(e.target) &&
                            !menuToggle.contains(e.target)
                        ) {
                            menuActive.remove();
                        }
                    });
                }
            });
        }
    }

    function disableHamburgerMenu() {
        const menuToggle = document.querySelector(".menu-toggle");
        const menuActive = document.querySelector(".menu-active");

        if (menuToggle) menuToggle.remove();
        if (menuActive) menuActive.remove();
    }
    function handleResize() {
        if (window.innerWidth <= 767) {
            enableHamburgerMenu();
        } else {
            disableHamburgerMenu();
        }
    }

    handleResize();
    window.addEventListener("resize", handleResize);


});


