//API KEY MEL: MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz//

////GLOBAL
const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
let slideIndex = 0;
let indexModal = 0;
const numSlides = 60;
trending(numSlides);


////SLIDERS

//ShowTrending Function---> to display 3 gif in trending Slider
function showTrending(slideIndex) {
    let trendingGif = document.querySelectorAll(".mySlides");
    
    for (let i = 0; i < trendingGif.length; i++) {
        trendingGif[i].style.display = "none";
    }
    //To show 3 gif at a time
    trendingGif[slideIndex].style.display = "flex"; 
    slideIndex++;
    trendingGif[slideIndex].style.display = "flex";
    slideIndex++; 
    trendingGif[slideIndex].style.display = "flex"; 
}

//ShowTrendingModal---> to display 1 gif in Modal Slider
function showTrendingModal(slideIndex) {
    let trendingGif = document.querySelectorAll(".mySlidesModal");
    
    for (let i = 0; i < trendingGif.length; i++) {
        trendingGif[i].style.display = "none";
    }
    //To show 1 gif at a time
    trendingGif[slideIndex].style.display = "flex"; 
    slideIndex++;
}

//PlusSlides function---> Arrows buttons of Trending Slider.
function plusSlides(steps) {
    let trendingGif = document.querySelectorAll(".mySlides");
    slideIndex += steps; // => slideIndex = slideIndex + n;
    if (slideIndex > (trendingGif.length - 3)) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = trendingGif.length - 3;
    }
    showTrending(slideIndex);
}

////API CONNECTION TRENDING

//Trending Function---> to connect API and introduce content in html.
function trending(num) {

    const trendingElements = document.querySelectorAll('.slideshow-container');
    const trendingEl = trendingElements[0]; 
    const path_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${num}`; 

    fetch (path_trending).then(function (res) { 
        return res.json();
    }).then(function(json){

        let resultsTrending = '';
    
        json.data.forEach(function(obj, index) {
            //console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const title = obj.title;
            const height= obj.images.fixed_height.height;
            
            //To add strings
            
            resultsTrending += `<div class="mySlides fade">
                                    <img src="${url}"  style= "width: 357px; height: 275px" alt="${title}">
                                    
                                    <div class="img-layer-trending">
                                        <div id= "icons-layer-trending">
                                            <button class="icons-layer-trending" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                            <button class="icons-layer-trending" onclick="clickLike('${url}', '${width}', '${title}', '${height}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                            <button class="icons-layer-trending enlarge-button" onclick="clickEnlarge(${numSlides},${index})"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                        </div>
                                    </div>
                                    
                                </div>`;

            slideButtons = `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
        });
            
        //console.log(resultsTrending);
        trendingEl.innerHTML = resultsTrending + slideButtons; //to introduce it in html
 
        showTrending(slideIndex);

    }).catch(function(err) {
        console.log(err.message);
    });
}

////FAVORITES

//GET and SET likes (Local Storage)

if (localStorage.getItem('myLikesKey') === null) {
    const emptyLikes = [];
    localStorage.setItem('myLikesKey', JSON.stringify(emptyLikes));
}
favorites();

//Favorites Function ---> GET Favorites and introduce it in favorites page (html). 

function favorites(num) {

    const fav_empty = document.getElementById('fav-mygifs_empty');
  
    const galery = document.querySelectorAll('.galery');
    const galeryEl = galery[0]; 
    let myLikes = JSON.parse(localStorage.getItem('myLikesKey')); //guarda los fav
    let resultsLikes = '';
    
        myLikes.forEach(function(fav) {
            
            const id = fav.id;
            const url = fav.url;
            const title = fav.title;
            const width = fav.width;
            const height = fav.height;

            //To add strings
            
            resultsLikes += `
                            
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
            galeryEl.innerHTML = resultsLikes; //to introduce it in html
       
            if (localStorage.getItem('myLikesKey') === '[]') {
            
                fav_empty.classList.remove("hide");
     
                return
            }  
            fav_empty.classList.add("hide")

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

//Delete Favorites Function ---> to remove item from Local Storage.
function clickDelete(url) {
    //This part find the position of the url 
    const isElementUrl = (fav) => fav.url === url;

    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    //Variable with the position of the element in the array. 
    let x = myLikes.findIndex(isElementUrl)

    //Remove element in X position.
    myLikes.splice(x,1)
    
    //To update the array after delete elements
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    favorites();
}

////MODAL TRENDING

//Click modal function for TRENDINGS!
function clickEnlarge(num, index) {
    indexModal = index; 
    
    const trendingModal = document.querySelectorAll('.modal-container');
    const trendingModalEl = trendingModal[0]; 
    const path_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${num}`; 

    fetch (path_trending).then(function (res) { 
        return res.json();
    }).then(function(json){
        //console.log(json.data[0].images.fixed_width.url);
        let resultsTrending = '';
    
        json.data.forEach(function(obj) {
            //console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const title = obj.title;
            const height= obj.images.fixed_height.height;
            
            //To add strings
            
            resultsTrending += `<div class="mySlidesModal">
                                    <img src="${url}"  style= "width: 357px; height: 275px" alt="${title}">
                                    
                                    <div class="img-layer-trending">
                                        <div id= "icons-layer-trending">
                                            <button class="icons-layer-trending" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                            <button class="icons-layer-trending" onclick="clickLike('${url}', '${width}', '${title}', '${height}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                            <button class="icons-layer-trending enlarge-button" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                        </div>
                                    </div>
                                </div>`;

            slideButtons = `<a class="prev" onclick="plusSlidesModal(-1)">&#10094;</a>
            <a class="next" onclick="plusSlidesModal(1)">&#10095;</a>`;
        });
            
        //console.log(resultsTrending);
        trendingModalEl.innerHTML = resultsTrending + slideButtons; //to introduce it in html
 
        showTrendingModal(indexModal);

    }).catch(function(err) {
        console.log(err.message);
    });

    showModal();
}
//PlusSlides Modal function---> Arrows buttons of Modal Slider.
function plusSlidesModal(steps) {
    let trendingGif = document.querySelectorAll(".mySlidesModal");
    indexModal += steps; // => slideIndex = slideIndex + n;
    if (indexModal > (trendingGif.length - 3)) {
        indexModal = 0;
    }
    if (indexModal < 0) {
        indexModal = trendingGif.length - 3;
    }
    showTrendingModal(indexModal);
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

const switchMode = document.querySelector('#switch');
switchMode.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    switchMode.classList.toggle('active');
});
