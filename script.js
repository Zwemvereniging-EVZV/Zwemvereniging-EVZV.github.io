document.addEventListener("DOMContentLoaded", function () {
    var topBar = document.createElement("div");
    topBar.id = "navbar";
    topBar.style.backgroundColor = "#192bd1";
    topBar.style.color = "#fff";
    topBar.style.minHeight = "70px";
    topBar.style.display = "flex";
    topBar.style.alignItems = "center";
    topBar.style.padding = "0 20px";
    navbar.style.flexWrap = "wrap";

    function openLink(link) {
        window.location.href = link;
    }

    var buttons = [
        { text: "Home", link: "/" },
        { text: "Zwemles", submenu: [
            { text: "ABC-Zwemmen", link: "/zwemles/abc-zwemmen" },
            { text: "Zwemvaardigheid", link: "/zwemles/zwemvaardigheid" },
            { text: "Snorkelen", link: "/zwemles/snorkelen" },
            { text: "Trimzwemmen", link: "/zwemles/trimzwemmen" }
        ]},
        { text: "Algemene Info", submenu: [
            { text: "Locate/Tijden", link: "/algemene-info/locatie-tijden" },
            { text: "Prijzen", link: "/algemene-info/prijzen" },
            { text: "Overganseisen", link: "/algemene-info/overgangseisen" },
            { text: "Kledingeisen", link: "/algemene-info/kledingeisen" },
            { text: "Exameneisen", link: "/algemene-info/exameneisen" },
            { text: "Gedragscode", link: "/algemene-info/gedragscode" },
            { text: "Het Team", link: "/algemene-info/het-team" },
            { text: "Help Ons", link: "/algemene-info/help-ons" },
        ]},
        { text: "Agenda", link: "/agenda" },
        { text: "Contact", link: "/contact" },
        { text: "Inschrijven", link: "https://mijn.membro.nl/aanmelden/evzv" }
    ];

    buttons.forEach(function (buttonInfo) {
        var button = document.createElement("a");
        button.className = "navbarButton";
        button.style.marginRight = "10px";
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
});