//API KEY MEL: MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz//

//Global
const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
let slideIndex = 0;
const numSlides = 60;
trending(numSlides);

//Slider
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

//Arrows function
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


//API Conection Trendings

function trending(num) {

    const trendingElements = document.querySelectorAll('.slideshow-container');
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
                                    <button class="download" onclick="clickDownload()">D</button>
                                    <button class="like" onclick="clickLike('${url}')">L</button>
                                    <button class="enlarge" onclick="clickEnlarge()">E</button>
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

// Comprobar si myLikesKey no existe → IF localStorage.getItem('myLikesKey') es null
const emptyLikes = [];
localStorage.setItem('myLikesKey', JSON.stringify(emptyLikes));

//Like Function
function clickLike(url) {
    // Usar esta linea para mostrar las liked gifs. Tip: usar myLikes.forEach igual que en la función trending();
    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    myLikes.push(url)
    
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    
}

//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');

//Event Listener to submit
searchForm.addEventListener('submit',function(e) {
    e.preventDefault();
    const q = searchInput.value;
    search(q);
});

function search(query) {
   
    const path_search = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=15&q=${query}`;

    fetch (path_search).then(function (res) { 
        return res.json();
    }).then(function(json){
        console.log(json.data[0].images.fixed_width.url);
        let resultsHTML = '';
    
        json.data.forEach(function(obj) {
            console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const height = obj.images.fixed_height.height;
            const title = obj.title;
    
            resultsHTML += `<img 
                class="item"
                src="${url}" 
                width="${width}" 
                height="${height}"
                alt="${title}"
                >`;
        });
    
        resultsEl.innerHTML = resultsHTML; //to add to html
        
    }).catch(function(err) {
        console.log(err.message);
    });
}

