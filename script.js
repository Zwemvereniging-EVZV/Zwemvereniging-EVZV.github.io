var buttons = [
    { text: "Home", link: "/" },
    {
        text: "Zwemles (4)", submenu: [
            { text: "ABC-Zwemmen", link: "/zwemles/abc-zwemmen" },
            { text: "Zwemvaardigheid", link: "/zwemles/zwemvaardigheid" },
            { text: "Snorkelen", link: "/zwemles/snorkelen" },
            { text: "Trimzwemmen", link: "/zwemles/trimzwemmen" }
        ]
    },
    {
        text: "Info (8)", submenu: [
            { text: "Locate/Tijden", link: "/algemene-info/locatie-tijden" },
            { text: "Prijzen", link: "/algemene-info/prijzen" },
            { text: "Overganseisen", link: "/algemene-info/overgangseisen" },
            { text: "Kledingeisen", link: "/algemene-info/kledingeisen" },
            { text: "Exameneisen", link: "/algemene-info/exameneisen" },
            { text: "Gedragscode", link: "/algemene-info/gedragscode" },
            { text: "Het Team", link: "/algemene-info/het-team" },
            { text: "Help Ons", link: "/algemene-info/help-ons" }
        ]
    },
    { text: "Agenda", link: "/agenda" },
    { text: "Contact", link: "/contact" },
    { text: "Inschrijven", link: "https://mijn.membro.nl/aanmelden/evzv" }
];

document.addEventListener("DOMContentLoaded", function () {
    // Initialiseer navigatie op basis van schermgrootte
    if (window.innerWidth > 750) {
        topBarNav();
    } else {
        sideMenuNav();
    }

    // Initialiseer afbeeldingen carousel
    displayImages();

    // Voeg Facebook icon toe
    addFacebookIcon();

    // Voeg footer toe
    addFooter();

    // Voeg Google Analytics toe
    initGoogleAnalytics();

    // Registreer service worker
    registerServiceWorker();
});

function sideMenuNav() {
    var sideBar = document.createElement("div");
    sideBar.id = "sidebar";
    sideBar.style.cssText = `
        background-color: #192bd1;
        color: #fff;
        width: 0;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9998;
        overflow-x: hidden;
        transition: width 0.5s;
    `;

    var openButton = document.createElement("button");
    openButton.textContent = "☰";
    openButton.style.cssText = `
        position: fixed;
        font-family: Lexend;
        font-size: 30px;
        top: 10px;
        border-radius: 20px;
        left: 10px;
        z-index: 9999;
        background-color: white;
        color: black;
        border: 1px solid black;
        cursor: pointer;
        transition: left 0.5s;
    `;

    var menuFooter = document.createElement("div");
    menuFooter.id = "menuFooter";
    menuFooter.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 0;
        width: 100%;
        text-align: center;
    `;

    var footerImage = document.createElement("img");
    footerImage.src = "/assets/logo.png";
    footerImage.width = 200;
    footerImage.alt = "Logo";
    menuFooter.appendChild(footerImage);

    sideBar.appendChild(menuFooter);
    document.body.appendChild(openButton);
    document.body.appendChild(sideBar);

    function adjustOpenButtonPosition() {
        openButton.style.left = sideBar.style.width === "275px" ? "285px" : "10px";
    }

    openButton.addEventListener("click", function () {
        sideBar.style.width = sideBar.style.width === "275px" ? "0" : "275px";
        adjustOpenButtonPosition();
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest("#sidebar") && sideBar.style.width === "275px" && event.target !== openButton) {
            sideBar.style.width = "0";
            adjustOpenButtonPosition();
        }
    });

    buttons.forEach(function (buttonInfo) {
        var button = document.createElement("a");
        button.className = "sidebarButton";
        button.rel = "nofollow";
        button.href = buttonInfo.link || "#";
        button.style.cssText = `
            display: block;
            cursor: pointer;
            padding: 10px;
            text-decoration: none;
            color: #fff;
        `;
        button.textContent = buttonInfo.text;

        if (buttonInfo.submenu) {
            button.classList.add("dropdown");
            var submenu = document.createElement("div");
            submenu.className = "submenu";
            button.appendChild(submenu);

            button.addEventListener("mouseover", function () {
                submenu.style.cssText = `
                    display: block;
                    left: 75px;
                    width: 195px;
                    transform: translateY(10px);
                    word-wrap: break-word;
                `;
            });

            button.addEventListener("mouseout", function () {
                submenu.style.display = "none";
            });

            buttonInfo.submenu.forEach(function (submenuItem) {
                var submenuLink = document.createElement("a");
                submenuLink.textContent = submenuItem.text;
                submenuLink.href = submenuItem.link;
                submenuLink.className = "submenuItem";
                submenu.appendChild(submenuLink);
            });
        }

        sideBar.appendChild(button);
    });
}

function topBarNav() {
    var topBar = document.createElement("div");
    topBar.id = "navbar";
    topBar.style.cssText = `
        background-color: #192bd1;
        color: #fff;
        min-height: 70px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        flex-wrap: wrap;
    `;
    document.body.insertBefore(topBar, document.body.firstChild);

    buttons.forEach(function (buttonInfo) {
        var button = document.createElement("a");
        button.className = "navbarButton";
        button.style.cssText = `
            margin-right: 10px;
            cursor: pointer;
        `;
        button.textContent = buttonInfo.text;

        if (buttonInfo.link) {
            button.href = buttonInfo.link;
            button.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = buttonInfo.link;
            });
        } else if (buttonInfo.submenu) {
            button.classList.add("dropdown");
            var submenu = document.createElement("div");
            submenu.className = "submenu";
            button.appendChild(submenu);

            button.addEventListener("mouseover", function () {
                submenu.style.display = "block";
            });

            button.addEventListener("mouseout", function () {
                submenu.style.display = "none";
            });

            buttonInfo.submenu.forEach(function (submenuItem) {
                var submenuLink = document.createElement("a");
                submenuLink.textContent = submenuItem.text;
                submenuLink.href = submenuItem.link;
                submenuLink.className = "submenuItem";
                submenu.appendChild(submenuLink);
            });
        }

        topBar.appendChild(button);
    });
}

function displayImages() {
    var index = 0;
    var images = document.getElementsByClassName("image");

    if (images.length === 0) {
        console.warn("Geen afbeeldingen gevonden met de class 'image'.");
        return;
    }

    function showNextImage() {
        Array.from(images).forEach(function (image) {
            image.style.display = "none";
        });

        index = (index + 1) % images.length;
        images[index].style.display = "block";
        setTimeout(showNextImage, 3000);
    }

    showNextImage();
}

function addFacebookIcon() {
    var facebookIcon = document.createElement("img");
    facebookIcon.src = "https://www.facebook.com/images/fb_icon_325x325.png";
    facebookIcon.alt = "Facebook Icon";
    facebookIcon.id = "facebookIcon";
    facebookIcon.style.cursor = "pointer";
    facebookIcon.addEventListener("click", function () {
        window.open("https://www.facebook.com/EersteVoorschotenseZwemvereniging/?fref=ts");
    });

    document.body.appendChild(facebookIcon);
}

function addFooter() {
    var footer = document.createElement("footer");
    var image = document.createElement("img");
    image.src = "/assets/logo.png";
    image.alt = "EVZV Logo";
    image.id = "evzv-logo";

    var imageH = document.createElement("img");
    imageH.src = "/assets/header3.jpg";
    imageH.alt = "EVZV Header";
    imageH.id = "evzv-header";

    var copyrightText = document.createElement("p");
    copyrightText.textContent = "Copyright© 2023-2024 EVZV - Tamer Çevik";
    copyrightText.style.cssText = `
        margin-left: 15px;
        font-size: 15px;
    `;

    footer.appendChild(image);
    footer.appendChild(imageH);
    footer.appendChild(copyrightText);

    document.body.appendChild(footer);
}

function initGoogleAnalytics() {
    (function () {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YNJ44R3VZ9';

        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-YNJ44R3VZ9');
    })();
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                console.log('Service Worker geregistreerd met scope:', registration.scope);
            })
            .catch(function (error) {
                console.error('Fout bij het registreren van de Service Worker:', error);
            });
    }
}