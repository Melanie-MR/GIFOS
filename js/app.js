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
        //console.log(json.data[0].images.fixed_width.url);
        let resultsTrending = '';
    
        json.data.forEach(function(obj) {
            //console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const title = obj.title;
            const height= obj.images.fixed_height.height;
            
            //To add strings
            
            resultsTrending += `<div class="mySlides fade">
                                    <img src="${url}"  style= "width: 357px; height: 275px" alt="${title}">
                                    <div class="buttons-container" style= "display:flex">
                                        <button class="download" onclick="clickDownload()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                        <button class="like" onclick="clickLike('${url}', '${width}', '${title}', '${height}')" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                                        <button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
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
////////likes///////

if (localStorage.getItem('myLikesKey') === null) {
    const emptyLikes = [];
    localStorage.setItem('myLikesKey', JSON.stringify(emptyLikes));
}
favorites();

function favorites(num) {

    const fav_empty = document.getElementById('fav-mygifs_empty');
  
    

/////
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
                                    <button class="icons-layer" onclick="clickDownload()"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                    <button class="icons-layer" onclick="clickDelete('${url}')"><img src="assets/icon-trash-normal.svg" alt="Eliminar"></button>
                                    <button class="icons-layer" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                                </div>
                            </div>
                            
                            `;


        });
            
/////!!!!!!!!!1
/*<img src="${url}"  style= "width: 357px; height: 275px" id="${id}"  alt="${title}">
                                    <div class="img-layer">
                                        <ul>
                                            <li><button class="download" onclick="clickDownload()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button></li>
                                            <li><button class="like" onclick="clickLike('${url}', '${width}', '${title}', '${height}')" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-fav.svg" alt="Me Gusta"></button></li>
                                            <li><button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button></li>
                                        </ul>
                                    <p>Titulo: ${title}</p>
                                    </div>`;


                                    /////el mio

                                    <div class="buttons-container" style= "display:flex">
                                <button class="download" onclick="clickDownload()" style= "background: none; border:none; margin-top: 1.5rem; margin-left: 2rem;  display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button>
                                <button class="delete" onclick="clickDelete('${url}')" style= "background: none; border:none; margin-top: 1.5rem; display: flex; justify-content: flex-end"><img src="assets/icon-trash-normal.svg" alt="Eliminar"></button>
                                <button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none;  margin-top: 1.5rem; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                            </div>


                            ////

                             44  class="download" onclick="clickDownload()"><img src="assets/icon-download.svg" alt="Descargar">
                                    <li class="like" onclick="clickLike('${url}', '${width}', '${title}', '${height}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></li>
                                    <li class="enlarge" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></li>
                                </ul>
//////*/
        //console.log(resultsLikes);
        galeryEl.innerHTML = resultsLikes; //to introduce it in html
       
        if (localStorage.getItem('myLikesKey') === '[]') {
        
            fav_empty.classList.remove("hide");
         //   galeryEl.classList.add("hide");
            return
        }  
        fav_empty.classList.add("hide")
        //galeryEl.classList.remove("hide");
 
    //////
}

//Like Function--- aca guardo la url y width cuando doy click en LE
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

function clickDelete(url) {
    //Funcion que encuentra la posicion segun url
    const isElementUrl = (fav) => fav.url === url;

    let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
    //Posicion del elemento en el array
    let x = myLikes.findIndex(isElementUrl)

    //Borra el elemento en la pos x
    myLikes.splice(x,1)
    
    localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
    favorites();
}

