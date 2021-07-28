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

            const url = obj.images.original.url;
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
