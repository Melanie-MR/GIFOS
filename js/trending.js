////GLOBAL
const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
let slideIndex = 0;
let indexModal = 0;
const numSlides = 60;
trending(numSlides);

////SLIDER TRENDING

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
            const user = obj.username;
            const height= obj.images.fixed_height.height;
       
            
            //To add strings
            
            resultsTrending += `<div class="mySlides fade" ontouchend="clickBiggerPic('${url}', '${width}', '${title}', '${height}', '${user}')">
                                    <img src="${url}" class= "styleCard" alt="${title}">
                                    
                                    <div class="img-layer-trending">
                                        <div class="user-trend">User: ${user}<span class="titleGtrend">Titulo: ${title}</span></div>
                                        <div id= "icons-layer-trending">
                                            <button class="icons-layer-trending" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                            <button class="icons-layer-trending" onclick="clickLike('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                            <button class="icons-layer-trending enlarge-button" onclick="clickEnlarge(${numSlides},${index})"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                        </div>
                                    </div>
                                    
                                </div>`;

            slideButtons = `<a class="prev arrowsTrend" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next arrowsTrend" onclick="plusSlides(1)">&#10095;</a>`;
        });
            
        //console.log(resultsTrending);
        trendingEl.innerHTML = resultsTrending + slideButtons; //to introduce it in html
 
        showTrending(slideIndex);

    }).catch(function(err) {
        console.log(err.message);
    });
}

//Delete Function ---> to remove item from Local Storage. Given a key name
function clickDelete(url, key) {
    //This part find the position of the url 
    const isElementUrl = (el) => el.url === url;

    let myData = JSON.parse(localStorage.getItem(key));
    //Variable with the position of the element in the array. 
    let x = myData.findIndex(isElementUrl)

    //Remove element in X position.
    myData.splice(x,1)
    
    //To update the array after delete elements
    localStorage.setItem(key, JSON.stringify(myData));
}










////MODAL


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

//PlusSlides Modal function---> Arrows buttons of Modal Slider.
function plusSlidesModal(steps) {
    let trendingGif = document.querySelectorAll(".mySlidesModal");
    //indexModal += steps; // => slideIndex = slideIndex + n;
    if (indexModal >= (trendingGif.length - 1)) {
        indexModal = 0;
    } else {
        indexModal++
    }
    if (indexModal <= 0) {
        indexModal = trendingGif.length - 1;
    }
    showTrendingModal(indexModal);
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
            const user = obj.username;
            //To add strings
            
            resultsTrending += `<div class="mySlidesModal">
                                    <div><img class="imgSize" src="${url}" alt="${title}"><h5 id= "titleModal">Titulo:${title}<br><span id="userModal">User:${user}</span></h5></div>
                                    <div class="modal-icon-layer">
                                        <button class="icons-layer-modal" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                        <button class="icons-layer-modal" onclick="clickLike('${url}', '${width}', '${title}', '${height}','${user}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>  
                                    </div>
                                </div>`;
            slideButtons = `<a class="prev2 arrowsModal" onclick="plusSlideModal(-1)">&#10094;</a>
                             <a class="next2 arrowsModal" onclick="plusSlidesModal(1)">&#10095;</a>`;

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
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}


/////Click Download

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

//ClickLike Function ---> This is for save in LocalStorage fav object when user click.

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
    myLikes.push(fav)
    
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    favorites();
};

//Responsive
if (window.matchMedia("(max-width: 615px)").matches) {
    const sliderImages = document.querySelector(".slideshow-container");
    //document.addEventListener('touchstart', handleTouchStart, false);        
    //document.addEventListener('touchmove', handleTouchMove, false);
    //sliderImages.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;                                                        
    var yDown = null;


    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }      

    function handleTouchStart(evt) {
        console.log("start", evt);
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };      

    function handleTouchEnd(evt) {
        const imgUrl = evt.srcElement.src;
        clickBiggerPic(imgUrl);
        console.log("end", evt);
    };      
    console.log('La pantalla tiene max 615 píxeles de ancho');
   
}else {
    console.log('Entre al else'); 
}
/*if (window.matchMedia("(max-width: 615px)").matches) {
    console.log('La pantalla tiene al menos 400 píxeles de ancho');
    
    function showTrending(slideIndex) {
        let trendingGif = document.querySelectorAll(".mySlides");
        
        for (let i = 0; i < trendingGif.length; i++) {
            trendingGif[i].style.display = "none";
        }
        //To show 1 gif at a time
        trendingGif[slideIndex].style.display = "flex"; 
        slideIndex++;
        console.log('algo');
    }

    function plusSlides(steps) {
        document.addEventListener('swiped-left', function(e) {
            console.log(e.target); // the element that was swiped
        });
        document.addEventListener('swiped-right', function(e) {
            console.log(e.target); // the element that was swiped
        });
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
       
    /*function plusSlides(steps) {
        document.addEventListener('swiped-left', function(e) {
            console.log(e.target); // the element that was swiped
        });
        document.addEventListener('swiped-right', function(e) {
            console.log(e.target); // the element that was swiped
        });
        let trendingGif = document.querySelectorAll(".mySlides");
        slideIndex += steps; // => slideIndex = slideIndex + n;
        if (slideIndex > (trendingGif.length - 3)) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = trendingGif.length - 3;
        }
        /*console.log('bueno');
        const arrowsTrend = document.getElementsByClassName('arrowsTrend');
        let trendingGif = document.querySelectorAll(".mySlides");
        slideIndex += steps; // => slideIndex = slideIndex + n;
        if (slideIndex > (trendingGif.length - 3)) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = trendingGif.length - 3;
        }
        showTrending(slideIndex);
        //arrowsTrend.style= "display:none";
        //console.log('algo2');
    }
    
 
}*/

