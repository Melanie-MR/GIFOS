//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');
const listAuto = document.querySelector('#list-auto');
const searchBar = document.querySelector('.search');
const clearButton = document.querySelector('#button__exs');
const moreButton = document.querySelector('#button-more');
const listAutoDiv = document.querySelector('.autocomplete');
const trendingHeader = document.querySelector('.trending__header');
const buttonSearch = document.querySelector('#button__search');
const buttonExs = document.querySelector('#button__exs');
const secondSearchButt = document.getElementById('second__search');
const resultsHeader = document.querySelector('#header-results');

const offset = 12;
let pagenum = 0;
let listHTML = '';
let listHTMLauto = '';
moreButton.style.display = 'none';
secondSearchButt.style.display = 'none';
buttonExs.style.display = 'none';
buttonSearch.style.display = 'block';

//To clear input
clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = '';
    listAuto.innerHTML = '';
    listHTML = '';
    listAuto.style = "display: none;";
    listAutoDiv.style = 'display: none;';
    searchBar.style = 'height: 40px;';
    resultsEl.style = 'display:none;';
    resultsEl.innerHTML= '';
    moreButton.style = 'display:none;';
    buttonSearch.style = 'display: block;';
    buttonExs.style = 'display: none;';
    secondSearchButt.style.display = 'none'; 
    trendingHeader.style = 'display: block;';
    resultsHeader.style = 'display: none;';
});

//Event Listener to autocomplete
searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    const term = searchInput.value;
    listHTML = '';
    if (term == '') {
        buttonExs.style.display = 'none';
        buttonSearch.style = 'display: block;';
        secondSearchButt.style.display = 'none';

    } else {
        buttonExs.style.display = 'block';
        buttonSearch.style = 'display: none;';
        secondSearchButt.style.display = 'block';
        autocompleteSearch(term);
        suggestions(term);    
    }
    console.log("Termino",term)    
});

function suggestions(term) {
    
    /////Function Search Suggestions

    const path_suggestions = `https://api.giphy.com/v1/tags/related/${term}?api_key=${apiKey}&limit=3`

    fetch (path_suggestions).then(function (res) { 
        return res.json();
    }).then(function(json){
        if (json.meta.status == 200) {
            listHTML= '';
            json.data.forEach(function(obj) {
                console.log(obj.name);
                listHTML += `<li class= "autoList" onclick="fill('${obj.name}');"><i class="fas fa-search"></i> ${obj.name}</li>`;;
                
            });
            listAuto.innerHTML = listHTMLauto + listHTML;
            listAuto.style = "display: auto;";
            

            if (listHTML == '') {
                moreButton.style = 'display: none;';
                buttonSearch.style = 'display: none;';
                secondSearchButt = 'display: block';
                listAutoDiv.style = 'display: none;';
                searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
        
            } else {
        
                buttonSearch.style = "display: none;";
                listAutoDiv.style = 'display: auto;';
                searchBar.style = "border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom-color: lightgray; "  
                secondSearchButt = 'display: block';         
            }
        } else {
            moreButton.style = 'display: none;';
            buttonExs.style = 'display: none;';
            listAutoDiv.style = 'display: none;';
            searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
        }
    }).catch(function(err) {
        console.log(err.message);
    });
}

function fill(searchTerm) {
    searchInput.value = searchTerm;
    resultsEl.innerHTML = '';
    buttonSearch.style = 'display: none;';
    listAuto.style = "display: none;";
    listAutoDiv.style = 'display: none;';
    searchBar.style = "border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;"
    trendingHeader.style= "display: none;" 
    search(searchTerm);
}

//Event Listener to submit the search
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = searchInput.value;
    //To update an element according with the search
    resultsEl.innerHTML = '';
    //buttonSearch.style = "display: none;";
    pagenum = 0;
    trendingHeader.style= "display: none;" 
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
                        ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"
                        src="${url}" 
                        alt="${title}"
                        
                    >
                    <div class="img-layer" ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')">
                        <div id= "icons-layer">
                            <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" onmouseleave="this.src='assets/icon-download.svg'" onmouseover="this.src='assets/icon-download-hover.svg'" alt="Descargar"></button>
                            <button class="icons-layer" onclick="clickLike('${url}', '${width}', '${title}', '${height}', '${user}' )"><img src="assets/icon-fav.svg" onmouseleave="this.src='assets/icon-fav.svg'" onmouseover="this.src='assets/icon-fav-hover.svg'" alt="Me Gusta"></button>
                            <button class="icons-layer enlarge-button" onclick="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-max-normal.svg" onmouseleave="this.src='assets/icon-max-normal.svg'" onmouseover="this.src='assets/icon-max-hover.svg'" alt="Maximizar"></button>
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
            resultsHTML = `<div class="tryAgain">
                                <img id="icon-try-again" src="assets/icon-busqueda-sin-resultado.svg" alt="Intenta de nuevo">
                                <h2 id="tryAgain">Intenta con otra búsqueda.</h2>
                            </div>
                            `;

            resultsEl.innerHTML = '';
            moreButton.style = 'display: none;'

            resultsHeader.style = 'display: auto;'
            resultsEl.style = "display:auto;"
         
            
        } else {
            moreButton.style = 'display: block;'
            resultsHTML.innerHTML = '';///
            const tryAgain = document.querySelectorAll('.tryAgain');
            tryAgain.style= "display: none;"
            trendingHeader.style= "display: none;"             
            resultsEl.style = "display:auto;"     
            resultsHeader.style = 'display: auto;'              
        }

        resultsEl.innerHTML += resultsHTML; //to add to html 
        
    }).catch(function(err) {
        resultsEl.style = 'display:none;';
        console.log(err.message);
        moreButton.style = 'display: none;';
    });
    
} 

function next() {
    pagenum++;
    const q = searchInput.value;
    search(q);
}

let y = 5
function autocompleteSearch (y){
    const path_autocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${y}&limit=2`
    
    fetch (path_autocomplete).then(function (res) { 
        return res.json();
    }).then(function(json){
        
        console.log(json);
        
        listHTMLauto = '';
        json.data.forEach(function(obj) {
            console.log(obj.name);
            listHTMLauto += `<li class= "autoList" onclick="fill('${obj.name}');"><i class="fas fa-search lup"></i> ${obj.name}</li>`;
            
        });
        listAuto.innerHTML = listHTMLauto + listHTML;
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

////ClickLike
function clickLike(url, width, title, height, user) {
    //console.log(width)
    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    const fav = {
        url: url,
        width: width,
        title: title,
        height: height,
        user: user
    }
    const isElementUrl = (el) => el.url === url;

    if (myLikes.some(isElementUrl)){
        clickDelete(fav.url, 'myLikesKey');
    } else {
        myLikes.push(fav)
        localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    }
    
};

