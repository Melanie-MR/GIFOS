

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
                                    <button class="icons-layer" onclick="clickDelete('${url}')"><img src="assets/icon-trash-normal.svg" alt="Eliminar"></button>
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

//Delete Favorites Function ---> to remove item from Local Storage.
function clickDelete(url) {
    //This part find the position of the url 
    const isElementUrl = (myG) => myG.url === url;

    let myGifs = JSON.parse(localStorage.getItem('myGifs'));
    //Variable with the position of the element in the array. 
    let x = myGifs.findIndex(isElementUrl)

    //Remove element in X position.
    myGifs.splice(x,1)
    
    //To update the array after delete elements
    localStorage.setItem('myGifs', JSON.stringify(myGifs));
    myGifos();
}


const switchMode = document.querySelector('#switch');
switchMode.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    switchMode.classList.toggle('active');
});
