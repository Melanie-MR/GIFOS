//API KEY MEL: MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz//

//Global
const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
let slideIndex = 0;
const numSlides = 60;
trending(numSlides);


//Slider
function showTrending(slideIndex) {
    let trendingGif = document.getElementsByClassName("mySlides");
    
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

//Arrows function
function plusSlides(steps) {
    let trendingGif = document.getElementsByClassName("mySlides");
    slideIndex += steps; // => slideIndex = slideIndex + n;
    if (slideIndex > (trendingGif.length - 3)) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = trendingGif.length - 3;
    }
    showTrending(slideIndex);
}


//API Conection Trendings

function trending(num) {

    const trendingElements = document.getElementsByClassName('slideshow-container');
    const trendingEl = trendingElements[0]; 
    const path_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${num}`; 

    fetch (path_trending).then(function (res) { 
        return res.json();
    }).then(function(json){
        console.log(json.data[0].images.fixed_width.url);
        let resultsTrending = '';
    
        json.data.forEach(function(obj) {
            console.log(obj);

            const url = obj.images.fixed_width.url;
            const title = obj.title;
            
            //To add strings
            
            resultsTrending += `<div class="mySlides fade">
                                    <img src="${url}"  style= "width: 357px; height: 275px" alt="${title}">
                                    <div class="buttons-container" style= "display:flex">
                                        <button class="download" onclick="clickDownload()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                        <button class="like" onclick="clickLike('${url}')" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                        <button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                    </div>
                                </div>`;
            slideButtons = `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
        });
            
        console.log(resultsTrending);
        trendingEl.innerHTML = resultsTrending + slideButtons; //to introduce it in html
 
        showTrending(slideIndex);

    }).catch(function(err) {
        console.log(err.message);
    });
}
////////likes///////

if (localStorage.getItem('myLikesKey') === null) {
    const emptyLikes = [];
    localStorage.setItem('myLikesKey', JSON.stringify(emptyLikes));
}
favorites();

function favorites(num) {

    const fav_empty = document.getElementById('fav-mygifs_empty');
  
    if (localStorage.getItem('myLikesKey') === '[]') {
        
        fav_empty.classList.remove("hide");
        return
    }  
    fav_empty.classList.add("hide");

/////
    const galery = document.getElementsByClassName('galery');
    const galeryEl = galery[0]; 
    const myLikesKey = JSON.parse(localStorage.getItem('myLikesKey'));
    let resultsLikes = '';
    
        myLikesKey.forEach(function(obj) {
        
            const url = obj;
            const title = '';
            
            //To add strings
            
            resultsLikes += `<div class="favorites-container">
                            <img 
                                class="item"
                                src="${url}" 
                                alt="${title}"
                            >
                            <div class="buttons-container" style= "display:flex">
                                <button class="download" onclick="clickDownload()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                <button class="like" onclick="clickLike('${url}')" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                <button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                            </div>
                            </div>`;


        });
            
        console.log(resultsLikes);
        galeryEl.innerHTML = resultsLikes; //to introduce it in html
    //////
}

//Like Function
function clickLike(url) {

    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    myLikes.push(url)
    
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    favorites();
}

