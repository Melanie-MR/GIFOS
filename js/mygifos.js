
myGifos();
//Favorites Function ---> GET Favorites and introduce it in favorites page (html). 

function myGifos() {

    const gif_empty = document.getElementById('mygifs_empty');
  
    const galery = document.querySelectorAll('.galery');
    const galeryEl = galery[0]; 
    let myGifs = JSON.parse(localStorage.getItem('myGifs')); //read gifs saved in LS.
    let resultsGifos = '';
    
        myGifs.forEach(function(myG) {
            
            
            const url = myG.url;
            const title = myG.title;
            const user = myG.user;
            const width = myG.width;
            const height = myG.height;

            //const id = myG.id;

            //To add strings
            
            resultsGifos += `
                            
                            <img 
                            class="item galeryMeasure"
                            ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"
                            src="${url}" 
                            alt="${title}"
                           
                            > 
                            <div class="img-layer" ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')">
                                <div id= "icons-layer">
                                    <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" onmouseleave="this.src='assets/icon-download.svg'" onmouseover="this.src='assets/icon-download-hover.svg'" alt="Descargar"></button>
                                    <button class="icons-layer" onclick="clickDelete('${url}', 'myGifs');myGifos()"><img src="assets/icon-trash-normal.svg" onmouseleave="this.src='assets/icon-trash-normal.svg'" onmouseover="this.src='assets/icon-trash-hover.svg'" alt="Eliminar"></button>
                                    <button class="icons-layer enlarge-button" onclick="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-max-normal.svg" onmouseleave="this.src='assets/icon-max-normal.svg'" onmouseover="this.src='assets/icon-max-hover.svg'" alt="Maximizar"></button>
                                </div>
                                <div class="user-title">User: '${user}'<span class="titleG">Título: Gif Creado</span></div>
                            </div>
                            
                            `;


        });
    
        //This is for avoid Error in Index.html and for hide class with default message in favorites

        if (galeryEl!=null){
            galeryEl.innerHTML = resultsGifos; //to introduce it in html
       
            if (localStorage.getItem('myGifs') === '[]') {
            
                gif_empty.classList.remove("hide");
     
                return
            }  
            gif_empty.classList.add("hide")

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

/////Nigth mode My Gifos

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
            dark.setAttribute('href', 'style/my-gifs.css');
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
