////GLOBAL
const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
let slideIndex = 0;
let indexModal = 0;
const numSlides = 60;
trending(numSlides);


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