//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');
const listAuto = document.querySelector('#list-auto');
const searchBar = document.querySelector('.search');
const clearButton = document.querySelector('#button__exs');
const offset = 12;
var pagenum = 0;

clearButton.addEventListener('click', (e) => {
    searchInput.value = '';
    listAuto.innerHTML = '';
    searchBar.style = 'height: 30px;';
});

//Event Listener to autocomplete
searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    const term = searchInput.value;
    
    autocomplete(term);
    
    if (term == '') {
        searchBar.style = 'height: 30px;';
    } else {
        searchBar.style = "height: 100px;"
    }
    
    //Código para actualuizar un elemento segun la búsqueda
    
    const trendingHeader = document.querySelector('.trending__header');
    trendingHeader.style= "display: none;"
    //se borra al darle enter, corregir. 
    resultsEl.innerHTML= `<div id="header-results">
    <hr class="gray-line">
    <h3 id="search-font">${e.target.value}</h3> 
    
    </div>`;
});

function autocomplete(term) {
    
    /////Function Search Suggestions

    const path_suggestions = `https://api.giphy.com/v1/tags/related/${term}?api_key=${apiKey}&limit=5`


    fetch (path_suggestions).then(function (res) { 
        return res.json();
    }).then(function(json){
        //console.log(json.data[0].images.original.url);
        let listHTML = '';
        //console.log(json);
        json.data.forEach(function(obj) {
            console.log(obj.name);
            listHTML += `<div onclick="fill('${obj.name}');"><i class="fas fa-search"></i> ${obj.name}</div>`;
            
        });
        listAuto.innerHTML = listHTML;
        listAuto.style = "display: auto;";

    }).catch(function(err) {
        console.log(err.message);
    });
}

function fill(searchTerm) {
    searchInput.value = searchTerm;
    listAuto.style = "display: none;";
    search(searchTerm);
}

//Event Listener to submit the search
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = searchInput.value;
    search(q);
});

function search(query) {
    const path_search = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${query}&offset=${offset*pagenum}`;// Se puede hacer solo con offset sumando de 12 en 12
    
    fetch (path_search).then(function (res) { 
        return res.json();
    }).then(function(json){
        //console.log(json.data[0].images.original.url);
        let resultsHTML = '';
    
        json.data.forEach(function(obj) {
            //console.log(obj);

            const url = obj.images.original.url;
            const width = obj.images.fixed_width.width;
            const height = obj.images.fixed_height.height;
            const title = obj.title;
    
            resultsHTML += 

                `
                    <img 
                        class="item"
                        src="${url}" 
                        alt="${title}"
                        style= "width: 260px; height: 200px"
                    >
                    <div class="img-layer">
                        <div id= "icons-layer">
                            <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                            <button class="icons-layer" onclick="clickLike('${url}', '${width}', '${title}', '${height}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                            <button class="icons-layer enlarge-button" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                        </div>
                    </div>
                   
               `;
        });

        if (resultsHTML == ''){
            resultsHTML = '<p>INTENTA DE NUEVO</p>';
        } 
    
        
        //cambiar boton de lugar para que no se duplique afuera de results.
        resultsEl.innerHTML += resultsHTML; //to add to html
        
        
    }).catch(function(err) {
        resultsEl.style = 'display:none;';
        console.log(err.message);
    });
} 

function next() {
    pagenum++;
    const q = searchInput.value;
    search(q);
}


/////Nigth mode index
let logo = document.getElementById('logo');
let dark = document.querySelector('#dark'); 
let changeTheme = localStorage.getItem('nightmode');
let switchTheme = document.querySelector('#switch');
switchTheme.addEventListener('click', swapTheme);

// Load theme
function loadTheme() {

    if (dark === undefined || dark === null) {
        dark.setAttribute('href', 'style/style.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';

    } else if (changeTheme === 'true') {

        dark.setAttribute('href', 'style/nightmode.css');
        changeTheme = localStorage.setItem('nightmode', 'true');
        switchTheme.textContent = 'Modo Diurno';
        if(logo){
            logo.src = 'assets/logo-modo-noc.svg';
        }

    } else {

        if (changeTheme === 'false') {
            dark.setAttribute('href', 'style/style.css');
            changeTheme = localStorage.setItem('nightmode', 'false');
            switchTheme.textContent = 'Modo Nocturno';
        };
    };
};
document.addEventListener('DOMContentLoaded', () => {

    loadTheme();

});

// Switch Themes * ligth - dark
function swapTheme() {

    if (switchTheme.textContent === 'Modo Nocturno') {

        dark.setAttribute('href', 'style/nightmode.css');
        changeTheme = localStorage.setItem('nightmode', 'true');
        switchTheme.textContent = 'Modo Diurno';
        if (logo){
            logo.src = 'assets/logo-modo-noc.svg';
        }
    } else if (switchTheme.textContent === 'Modo Diurno') {

        dark.setAttribute('href', 'style/style.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';
        if (logo){
            logo.src = 'assets/logo-modo-noc.svg';
        }
    } else {
        dark.setAttribute('href', 'style/style.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';
    };

};


