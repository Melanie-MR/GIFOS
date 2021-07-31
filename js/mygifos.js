
myGifos();
//Favorites Function ---> GET Favorites and introduce it in favorites page (html). 

function myGifos() {

    const gif_empty = document.getElementById('mygifs_empty');
  
    const galery = document.querySelectorAll('.galery');
    const galeryEl = galery[0]; 
    let myGifs = JSON.parse(localStorage.getItem('myGifs')); //read gifs saved in LS.
    let resultsGifos = '';
    
        myGifs.forEach(function(myG) {
            
            //const id = myG.id;
            const url = myG.url;
            const title = myG.title;

            //To add strings
            
            resultsGifos += `
                            
                            <img 
                            class="item"
                            src="${url}" 
                            alt="${title}"
                            style= "width: 260px; height: 200px"
                            > 
                            <div class="img-layer">
                                <div id= "icons-layer">
                                    <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                    <button class="icons-layer" onclick="clickDelete('${url}', 'myGifs');myGifos()"><img src="assets/icon-trash-normal.svg" alt="Eliminar"></button>
                                    <button class="icons-layer enlarge-button" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                </div>
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

function clickLike(url, width, title, height) {
    //console.log(width)
    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    const fav = {
        url: url,
        width: width,
        title: title,
        height: height
    }
    myLikes.push(fav)
    
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    favorites();
}
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
    //showAlert('¡Descarga exitosa!');
};


/*const switchMode = document.querySelector('#switch');
switchMode.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    switchMode.classList.toggle('active');
});
*/

/////nisth mode




let dark = document.querySelector('#dark'); 
let changeTheme = localStorage.getItem('nightmode');
let switchTheme = document.querySelector('#switch');
switchTheme.addEventListener('click', swapTheme);

// Load theme
function loadTheme() {

    if (dark === undefined || dark === null) {
        dark.setAttribute('href', 'style/my-gifs.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';

    } else if (changeTheme === 'true') {

        dark.setAttribute('href', 'style/nightmode.css');
        changeTheme = localStorage.setItem('nightmode', 'true');
        switchTheme.textContent = 'Modo Diurno';
        
    } else {

        if (changeTheme === 'false') {
            dark.setAttribute('href', 'style/my-gifs.css');
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
     
    } else if (switchTheme.textContent === 'Modo Diurno') {

        dark.setAttribute('href', 'style/my-gifs.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';
      
    } else {
        dark.setAttribute('href', 'style/my-gifs.css');
        changeTheme = localStorage.setItem('nightmode', 'false');
        switchTheme.textContent = 'Modo Nocturno';
    };

};
