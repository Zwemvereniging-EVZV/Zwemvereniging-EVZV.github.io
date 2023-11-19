document.addEventListener("DOMContentLoaded", function () {
    var menuCode;
    fetch('https://raw.githubusercontent.com/TCevik/TCevik.github.io/main/side-menu.html')
        .then(response => response.text())
        .then(data => {
            menuCode = data;
            var sidebar = document.createElement('div');
            sidebar.id = 'sidebar';
            document.body.appendChild(sidebar); // Voeg de zijbalk toe aan de body van de pagina
            document.getElementById('sidebar').innerHTML = menuCode;
        })
        .catch(error => console.error('Er is een fout opgetreden:', error));
});