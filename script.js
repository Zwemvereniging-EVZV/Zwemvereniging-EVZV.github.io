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
            { text: "Help Ons", link: "/algemene-info/help-ons" },
        ]
    },
    { text: "Agenda", link: "/agenda" },
    { text: "Contact", link: "/contact" },
    { text: "Inschrijven", link: "https://mijn.membro.nl/aanmelden/evzv" }
];

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 750) {
        topBarNav();
    } else {
        sideMenuNav();
    }

});

function sideMenuNav() {
    var sideBar = document.createElement("div");
    sideBar.id = "sidebar";
    sideBar.style.backgroundColor = "#192bd1";
    sideBar.style.color = "#fff";
    sideBar.style.width = "0";
    sideBar.style.height = "100%";
    sideBar.style.position = "fixed";
    sideBar.style.top = "0";
    sideBar.style.left = "0";
    sideBar.style.zIndex = "9998";
    sideBar.style.overflowX = "hidden";
    sideBar.style.transition = "0.5s";

    var openButton = document.createElement("button");
    openButton.textContent = "☰";
    openButton.style.position = "fixed";
    openButton.style.fontFamily = "Lexend";
    openButton.style.fontSize = "30px";
    openButton.style.top = "10px";
    openButton.style.borderRadius = "20px";
    openButton.style.left = "10px";
    openButton.style.zIndex = "9999";
    openButton.style.backgroundColor = "white";
    openButton.style.color = "black";
    openButton.style.border = "black solid 1px";
    openButton.style.cursor = "pointer";

    // Nieuwe div voor de foto in het zijmenu
    var menuFooter = document.createElement("div");
    menuFooter.id = "menuFooter";
    menuFooter.style.position = "absolute";
    menuFooter.style.bottom = "30px";
    menuFooter.style.left = "0";
    menuFooter.style.width = "100%";
    menuFooter.style.textAlign = "center";

    // Nieuwe afbeelding toevoegen aan het zijmenu
    var footerImage = document.createElement("img");
    footerImage.src = "/assets/logo.png";
    footerImage.width = 200;
    footerImage.alt = "Logo";

    // Afbeelding aan het zijmenu toevoegen
    menuFooter.appendChild(footerImage);
    sideBar.appendChild(menuFooter);

    function adjustOpenButtonPosition() {
        if (sideBar.style.width === "275px") {
            openButton.style.left = "285px"; // 270px vanaf de linkerkant als de sideBar zichtbaar is
        } else {
            openButton.style.left = "10px"; // 20px vanaf de linkerkant als de sideBar niet zichtbaar is
        }
    }

    openButton.addEventListener("click", function () {
        if (sideBar.style.width === "275px") {
            sideBar.style.width = "0";
            openButton.style.transition = "left 0.5s ease"; // Voeg een overgang toe aan de left-eigenschap
        } else {
            sideBar.style.width = "275px";
            openButton.style.transition = "left 0.5s ease"; // Voeg een overgang toe aan de left-eigenschap
        }
        adjustOpenButtonPosition(); // Pas de positie van de openButton aan bij het openen/sluiten van de sideBar
    });

    // Voeg een event listener toe om de overgang te resetten wanneer deze is voltooid
    openButton.addEventListener("transitionend", function () {
        openButton.style.transition = ""; // Reset de overgang
    });

    document.body.appendChild(openButton);
    document.body.appendChild(sideBar);

    buttons.forEach(function (buttonInfo) {
        var button = document.createElement("a");
        button.className = "sidebarButton";
        button.rel = "nofollow"
        button.href = "#"
        button.style.display = "block";
        button.style.cursor = "pointer";
        button.style.padding = "20px";
        button.style.textDecoration = "none";
        button.style.color = "#fff";
        button.textContent = buttonInfo.text;

        if (buttonInfo.link) {
            button.href = buttonInfo.link;
            button.addEventListener("click", function (event) {
                event.preventDefault();
                openLink(buttonInfo.link);
            });
        } else if (buttonInfo.submenu) {
            button.classList.add("dropdown");
            var submenu = document.createElement("div");
            submenu.className = "submenu";
            button.appendChild(submenu);

            button.addEventListener("mouseover", function () {
                submenu.style.display = "block";
                submenu.style.left = "75px";
                submenu.style.width = "195px";
                submenu.style.transform = "translateY(10px)";
                submenu.style.wordWrap = "break-word";
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

    function openLink(link) {
        window.location.href = link;
    }

    // Event listener om het zijmenu te sluiten wanneer er buiten wordt geklikt
    document.addEventListener("click", function (event) {
        if (!event.target.closest("#sidebar") && sideBar.style.width === "275px" && event.target !== openButton) {
            sideBar.style.width = "0";
            openButton.style.transition = "left 0.5s ease"; // Voeg een overgang toe aan de left-eigenschap
            adjustOpenButtonPosition(); // Pas de positie van de openButton aan
        }
    });
}

function topBarNav() {
    var topBar = document.createElement("div");
    topBar.id = "navbar";
    topBar.style.backgroundColor = "#192bd1";
    topBar.style.color = "#fff";
    topBar.style.minHeight = "70px";
    topBar.style.display = "flex";
    topBar.style.alignItems = "center";
    topBar.style.padding = "0 20px";
    topBar.style.flexWrap = "wrap";

    function openLink(link) {
        window.location.href = link;
    }

    buttons.forEach(function (buttonInfo) {
        var button = document.createElement("a");
        button.className = "navbarButton";
        button.style.marginRight = "10px";
        button.href = "#"
        button.style.cursor = "pointer";
        button.textContent = buttonInfo.text;

        if (buttonInfo.link) {
            button.href = buttonInfo.link;
            button.addEventListener("click", function (event) {
                event.preventDefault();
                openLink(buttonInfo.link);
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

    document.body.insertBefore(topBar, document.body.firstChild);
};

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    displayImages();
    function displayImages() {
        let i;
        const images = document.getElementsByClassName("image");

        if (images.length === 0) {
            console.warn("Geen afbeeldingen gevonden met de class 'image'.");
            return; // Stop de functie als er geen afbeeldingen zijn.
        }

        for (i = 0; i < images.length; i++) {
            images[i].style.display = "none";
        }

        index++;
        if (index > images.length) {
            index = 1;
        }

        images[index - 1].style.display = "block";
        setTimeout(displayImages, 3000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const facebookIcon = document.createElement("img");
    facebookIcon.src = "https://www.facebook.com/images/fb_icon_325x325.png";
    facebookIcon.alt = "Facebook Icon";
    facebookIcon.id = "facebookIcon";
    facebookIcon.addEventListener("click", function () {
        window.open("https://www.facebook.com/EersteVoorschotenseZwemvereniging/?fref=ts");
    });

    document.body.appendChild(facebookIcon);
});

// JavaScript code to add a footer to the page
document.addEventListener("DOMContentLoaded", function () {
    // Create footer element
    var footer = document.createElement("footer");

    // Create image element
    var image = document.createElement("img");
    image.src = "/assets/logo.png";
    image.alt = "EVZV Logo";
    image.id = "evzv-logo";

    // Create image element
    var imageH = document.createElement("img");
    imageH.src = "/assets/header3.jpg";
    imageH.alt = "EVZV Header";
    imageH.id = "evzv-header";

    // Create paragraph element for the copyright text
    var copyrightText = document.createElement("p");
    copyrightText.textContent = "Copyright© 2023-2024 EVZV - Tamer Çevik";
    copyrightText.style.marginLeft = "15px"
    copyrightText.style.fontSize = "15px"

    // Append image and text to the footer
    footer.appendChild(image);
    footer.appendChild(imageH);
    footer.appendChild(copyrightText);

    // Append the footer to the body of the document
    document.body.appendChild(footer);
});

/* google analytics */
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker geregistreerd met scope:', registration.scope);
        })
        .catch(function (error) {
            console.error('Fout bij het registreren van de Service Worker:', error);
        });
}