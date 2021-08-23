////FAVORITES

//GET and SET likes (Local Storage)

if (localStorage.getItem('myLikesKey') === null) {
    const emptyLikes = [];
    localStorage.setItem('myLikesKey', JSON.stringify(emptyLikes));
}
favorites();

//Favorites Function ---> GET Favorites and introduce it in favorites page (html). 

function favorites() {

    const fav_empty = document.getElementById('fav-mygifs_empty');
  
    const galery = document.querySelectorAll('.galery');
    const galeryEl = galery[0]; 
    let myLikes = JSON.parse(localStorage.getItem('myLikesKey')); //guarda los fav
    let resultsLikes = '';
    
        myLikes.forEach(function(fav) {
            
            const url = fav.url;
            const title = fav.title;
            const user = fav.user;
            const width = fav.width;
            const height = fav.height;
         

            //To add strings
            
            resultsLikes += `
                            
                            <img 
                            class="item galeryMeasure"
                            ontouchend="handleTouchEnd('${url}', '${width}', '${title}', '${height}', '${user}')"
                            src="${url}" 
                            alt="${title}"
                            
                            > 
                            <div class="img-layer" ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')">
                                <div id= "icons-layer">
                                    <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" onmouseleave="this.src='assets/icon-download.svg'" onmouseover="this.src='assets/icon-download-hover.svg'" alt="Descargar"></button>
                                    <button class="icons-layer" onclick="clickDelete('${url}', 'myLikesKey');favorites()"><img src="assets/icon-trash-normal.svg" onmouseleave="this.src='assets/icon-trash-normal.svg'" onmouseover="this.src='assets/icon-trash-hover.svg'" alt="Eliminar"></button>
                                    <button class="icons-layer enlarge-button" onclick="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-max-normal.svg" onmouseleave="this.src='assets/icon-max-normal.svg'" onmouseover="this.src='assets/icon-max-hover.svg'"  alt="Maximizar"></button>
                                </div>
                                <div class="user-title">User:${user}<span class="titleG">Título:${title}</span></div>
                            </div>
                            
                            `;

        });
            
        //This is for avoid Error in Index.html and for hide class with default message in favorites

        if (galeryEl!=null){
            galeryEl.innerHTML = resultsLikes; //to introduce it in html
       
            if (localStorage.getItem('myLikesKey') === '[]') {
            
                fav_empty.classList.remove("hide");
     
                return
            }  
            fav_empty.classList.add("hide")

        }
}

//ClickLike Function ---> This is for save in LocalStorage fav object when user click.

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
    favorites();
};
// Download Gif
async function clickDownload(imageUrl) {

    const downloadUrl = imageUrl;
    const fetchedGif = fetch(downloadUrl);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    const saveImg = document.createElement("a");
    saveImg.href = urlGif;
    saveImg.download = "downloaded-giphy.gif";
    saveImg.style = 'display: "none"';
    document.body.appendChild(saveImg);
    saveImg.click();
    document.body.removeChild(saveImg);
};

/////Nigth mode favorites

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
            dark.setAttribute('href', 'style/favorites.css');
            switches.textContent = 'Modo Nocturno';
        };
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
