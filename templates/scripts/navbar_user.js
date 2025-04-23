function generateNavbar() {
    var header = document.createElement('header');
    var stylevar = document.createElement('link');
    stylevar.href = "/styles/navbar.css";
    stylevar.rel = "stylesheet"; 
    stylevar.type = "text/css";

    var nav = document.createElement('nav');
    var ul = document.createElement('ul');

    // Opción "YouEz"
    var liYouEz = document.createElement('li');
    var aYouEz = document.createElement('a');
    aYouEz.href = 'user_view.html';
    aYouEz.textContent = 'YouEz';
    liYouEz.appendChild(aYouEz);
    ul.appendChild(liYouEz);

    // Barra de búsqueda
    var searchLi = document.createElement('li');
    var searchForm = document.createElement('form');
    searchForm.setAttribute('action', '#'); // Aquí puedes definir la acción que desees
    searchForm.setAttribute('method', 'get');
    searchForm.setAttribute('class', "search-form")

    var searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('name', 'search');
    searchInput.setAttribute('placeholder', 'Type you preference...');
    searchForm.appendChild(searchInput);

    var searchButton = document.createElement('button');
    searchButton.setAttribute('type', 'submit');
    searchButton.textContent = 'Search';
    searchForm.appendChild(searchButton);

    searchLi.appendChild(searchForm);
    ul.appendChild(searchLi);

    var options = {"Add Money":"addMoney.html", "Account":"account.html", "Sign out": "login.html"};
    for(var key in options){
        var liInformes = document.createElement('li');
        var aInformes = document.createElement('a');
        aInformes.href = options[key];
        aInformes.textContent = key;    
        liInformes.appendChild(aInformes);
        ul.appendChild(liInformes);
    };

    nav.appendChild(ul);
    header.appendChild(nav);
    header.appendChild(stylevar);

    document.body.insertBefore(header, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {
    generateNavbar();
});
