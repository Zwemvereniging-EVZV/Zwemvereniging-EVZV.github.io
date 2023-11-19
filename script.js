document.addEventListener("DOMContentLoaded", function () {
    var menuCode;
    var sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    document.body.appendChild(sidebar);

    fetch('https://raw.githubusercontent.com/TCevik/TCevik.github.io/main/side-menu.html')
        .then(response => response.text())
        .then(data => {
            menuCode = data;
            document.getElementById('sidebar').innerHTML = menuCode;

            // Add toggle button
            var toggleButton = document.createElement('button');
            toggleButton.id = 'toggleButton';
            toggleButton.innerText = 'X';
            toggleButton.style.position = 'fixed';
            toggleButton.style.top = '5px';
            toggleButton.style.left = '5px';
            toggleButton.style.backgroundColor = 'black';
            toggleButton.style.color = 'white';
            toggleButton.style.zIndex = '9999';
            toggleButton.addEventListener('click', function () {
                document.getElementById('sidebar').classList.toggle('active');
                updateToggleButton(); // Update de tekst van de knop na het togglen
            });
            document.body.appendChild(toggleButton);

            // Hide toggle button on screens larger than 700px
            if (window.innerWidth > 700) {
                toggleButton.style.display = 'none'; // Verander 'none' naar 'block'
            } else {
                toggleButton.style.display = 'block'; // Voeg deze regel toe
            }

            // Event listener voor het aanpassen van de zichtbaarheid van de knop bij het wijzigen van de schermgrootte
            window.addEventListener('resize', function () {
                if (window.innerWidth > 700) {
                    toggleButton.style.display = 'none';
                } else {
                    toggleButton.style.display = 'block';
                }
            });
        })
        .catch(error => console.error('Er is een fout opgetreden:', error));

    // Functie om de tekst van de toggleButton bij te werken
    function updateToggleButton() {
        var toggleButton = document.getElementById('toggleButton');
        if (sidebar.classList.contains('active')) {
            toggleButton.innerText = '☰';
        } else {
            toggleButton.innerText = 'X';
        }
    }
});