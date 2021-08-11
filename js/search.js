//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');
const listAuto = document.querySelector('#list-auto');
const searchBar = document.querySelector('.search');
const clearButton = document.querySelector('#button__exs');
const moreButton = document.querySelector('#button-more');
const listAutoDiv = document.querySelector('.autocomplete');

const offset = 12;
let pagenum = 0;
let listHTML = '';
moreButton.style.display = 'none';
//To clear input
clearButton.addEventListener('click', (e) => {
    searchInput.value = '';
    listAuto.innerHTML = '';
    listHTML = '';
    listAuto.style = "display: none;";
    searchBar.style = 'height: 40px;';
    resultsEl.style = 'display:none;';
    resultsEl.innerHTML= '';
    moreButton.style = 'display:none;';
    
});

//Event Listener to autocomplete
searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    const term = searchInput.value;
    
    listHTML = '';
    autocompleteSearch(term);
    suggestions(term);
    
    
});

function suggestions(term) {
    
    /////Function Search Suggestions

    const path_suggestions = `https://api.giphy.com/v1/tags/related/${term}?api_key=${apiKey}&limit=3`

    fetch (path_suggestions).then(function (res) { 
        return res.json();
    }).then(function(json){
        if (json.meta.status == 200) {
        
            json.data.forEach(function(obj) {
                console.log(obj.name);
                listHTML += `<li class= "autoList" onclick="fill('${obj.name}');"><i class="fas fa-search"></i> ${obj.name}</li>`;;
                
            });
            listAuto.innerHTML = listHTML;
            listAuto.style = "display: auto;";

            if (listHTML == '') {
                moreButton.style = 'display: none;';
                listAutoDiv.style = 'display: none;';
                searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
        
            } else {
                listAutoDiv.style = 'display: auto;';
                searchBar.style = "border-bottom-left-radius: 0; border-bottom-right-radius: 0;"           
            }
        } else {
            moreButton.style = 'display: none;';
            listAutoDiv.style = 'display: none;';
            searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
        }
    }).catch(function(err) {
        console.log(err.message);
    });
}

function fill(searchTerm) {
    searchInput.value = searchTerm;
    listAuto.style = "display: none;";
    listAutoDiv.style = 'display: none;';
    searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
    search(searchTerm);
}

//Event Listener to submit the search
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = searchInput.value;
    //Código para actualizar un elemento segun la búsqueda
    resultsEl.innerHTML = '';
    pagenum = 0;
    search(q);
});

function search(query) {
    const path_search = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${query}&offset=${offset*pagenum}`;// Se puede hacer solo con offset sumando de 12 en 12
    
    fetch (path_search).then(function (res) { 
        return res.json();
    }).then(function(json){
        let resultsHTML = '';
        json.data.forEach(function(obj) {
    

            const url = obj.images.original.url;
            const width = obj.images.fixed_width.width;
            const height = obj.images.fixed_height.height;
            const title = obj.title;
            const user = obj.username;
    
            resultsHTML += 

                `
                    <img 
                        class="item galeryMeasure"
                        src="${url}" 
                        alt="${title}"
                        
                    >
                    <div class="img-layer">
                        <div id= "icons-layer">
                            <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                            <button class="icons-layer" onclick="clickLike('${url}', '${width}', '${title}', '${height}', '${user}' )"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                            <button class="icons-layer enlarge-button" onclick="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                        </div>
                        <div class="user-title">User:${user}<span class="titleG">Título:${title}</span></div>
                    </div>
                   
               `;
        });
        listAuto.style = "display: none;";
        searchBar.style = 'height: 40px;';
        listAutoDiv.style = 'display: none;';
        const resultsHeader = document.querySelector('#header-results');
        resultsHeader.innerHTML = `
                            <hr class="gray-line">
                            <h3 id="search-font">${query}</h3> 
                           `;

        if (resultsHTML == ''){
            resultsHTML = `<h2>Intenta con otra búsqueda</h2>
                            <img id="icon-try-again" src="assets/icon-busqueda-sin-resultado.svg" alt="Intenta de nuevo">`;
            resultsEl.innerHTML = '';
            moreButton.style = 'display: none;'
            resultsHeader.style = 'display: none;'
            resultsEl.style = "display:auto;"
            
        } else {
            moreButton.style = 'display: block;'
            const trendingHeader = document.querySelector('.trending__header');
            trendingHeader.style= "display: none;"             
            resultsEl.style = "display:auto;"     
            resultsHeader.style = 'display: auto;'              
        }
    
        
        //cambiar boton de lugar para que no se duplique afuera de results.
        resultsEl.innerHTML += resultsHTML; //to add to html
        
        
    }).catch(function(err) {
        resultsEl.style = 'display:none;';
        console.log(err.message);
        moreButton.style = 'display: none;';
        //resultsEl.innerHTML= `<div id="header-results">
                          //      <hr class="gray-line">
                           //     <h3 id="search-font">Algo paso!!! no panic!</h3> 
                            //    </div>`;
    });
    
} 

function next() {
    pagenum++;
    const q = searchInput.value;
    search(q);
}

///Autocomplete search. No se vacia cuando le doy x, y agrega de dos en dos, termina dando una sugerencia muy grande. 
//CORREGIR
let y = 5
function autocompleteSearch (y){
    const path_autocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${y}&limit=3`
    
    fetch (path_autocomplete).then(function (res) { 
        return res.json();
    }).then(function(json){
        
        console.log(json);
        
        //console.log(json);
        json.data.forEach(function(obj) {
            console.log(obj.name);
            listHTML += `<li class= "autoList" onclick="fill('${obj.name}');"><i class="fas fa-search lup"></i> ${obj.name}</li>`;
            
        });
        listAuto.innerHTML = listHTML;
        listAuto.style = "display: auto;";
        

    }).catch(function(err) {
        console.log(err.message);
    });
}


/////Nigth mode Index

let createButton = document.getElementById('botton__gifo--disappear');
let logo = document.getElementById('logo');
let dark = document.querySelector('#dark'); 
let changeStyle = localStorage.getItem('nightmode');
let switches = document.querySelector('#switch');
switches.addEventListener('click', swapStyle);

// Load Page Style
function loadStyle() {
    changeStyle = localStorage.getItem('nightmode');
    if (changeStyle === 'true') {
        dark.setAttribute('href', 'style/nightmode.css');
        switches.textContent = 'Modo Diurno';
        if (logo, createButton){
            logo.src = 'assets/logo-modo-noc.svg';
            createButton.src = 'assets/CTA-crear-gifo-modo-noc.svg';
            
            createButton.addEventListener('mouseleave', e => {
                createButton.src = 'assets/CTA-crear-gifo-modo-noc.svg';
            })
            createButton.addEventListener('mouseover', e => {
                createButton.src = 'assets/CTA-crear-gifo-hover-modo-noc.svg';
            })
            createButton.addEventListener('mousedown', e => {
                createButton.src = 'assets/CTA-crear-gifo-active-modo-noc.svg';
            })
        }
    } else {
        if (changeStyle === 'false') {
            dark.setAttribute('href', 'style/style.css');
            switches.textContent = 'Modo Nocturno';
        } 
        if (logo, createButton){
            logo.src = 'assets/logo-desktop.svg';
            createButton.src = 'assets/button-crear-gifo.svg';
            
            createButton.addEventListener('mouseleave', e => {
                createButton.src = 'assets/button-crear-gifo.svg';
            })
            createButton.addEventListener('mouseover', e => {
                createButton.src = 'assets/CTA-crear-gifo-hover.svg';
            })
            createButton.addEventListener('mousedown', e => {
                createButton.src = 'assets/CTA-crear-gifo-active.svg';
            })
        }

    };
};
document.addEventListener('DOMContentLoaded', loadStyle);

// Switch Styles according to Local Storage
function swapStyle() {
    changeStyle = localStorage.getItem('nightmode');
    if (changeStyle === 'true'){
        changeStyle = localStorage.setItem('nightmode', 'false');
    } else {
        changeStyle = localStorage.setItem('nightmode', 'true');
    }
    loadStyle();

};


