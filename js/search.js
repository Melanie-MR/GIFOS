
///importar app.js

//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');

//Event Listener to submit
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = searchInput.value;
    search(q);
});

function search(query) {
   
    const path_search = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=15&q=${query}`;

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
    
        resultsEl.innerHTML = resultsHTML; //to add to html
        
    }).catch(function(err) {
        console.log(err.message);
    });
} 


/////nigth mode index
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


