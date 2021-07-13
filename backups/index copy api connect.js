//CONST

//VARIABLES

//API KEY MEL: MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz//

const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";


//SLIDE intento 1

/*let slideIndex = 1;
showSlides(slideIndex); //indice de la funcion?


//Next and previous slide
function plusSlides (n) {
   showSlides(slideIndex += n);
}

//Current slide
function currentSlide(n) {
   showSlides (slideIndex = n);
}

//Flip function
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    //checking the number of slides
    if (n > slides.lenght) {
        slideIndex = 1 //vuelve al 1? no se que hace esta linea
    }
    if (n < 1) {
        slideIndex = slides.length //muestra todos
    }
    
    //Loop through each slide in a for loop
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    //slides[a].style.display = "block";
    slides[slideIndex-1].style.display = "block";
    //slides[slideIndex+1].style.display = "block";
}
*/
////prueba final que funciona

let slideIndex = 0;
showTrending(slideIndex);

function showTrending(slideIndex) {
    let trendingGif = document.getElementsByClassName("mySlides");
    for (let i = 0; i < trendingGif.length; i++) {
        trendingGif[i].style.display = "none";
    }
        trendingGif[slideIndex].style.display = "flex";
        slideIndex++
        trendingGif[slideIndex].style.display = "flex";
        slideIndex++;
        trendingGif[slideIndex].style.display = "flex";
}


function plusSlides(n) {
    let trendingGif = document.getElementsByClassName("mySlides");
    slideIndex += n;
    if (slideIndex > (trendingGif.length - 3)) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = trendingGif.length - 3;
    }
    showTrending(slideIndex);
}



//API CONNECTION

//Search
document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("button__search").addEventListener("click", function (ev) {
            ev.preventDefault(); //to stop the page reload
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=`;
            //const promise = fetch (url) 
            let str = document.getElementById("search").value.trim();
            url = url.concat(str);
            console.log(url);
            
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    //data, pagination,meta
                    console.log(content.data);
                    console.log('META', content.meta);
                    let fig = document.createElement('figure');
                    let img = document.createElement('img');
                    let fc = document.createElement('figcaption');
                    img.src = content.data[0].images.downsized.url;
                    img.alt = content.data[0].title;
                    fc.textContent=content.data[0].title;
                    fig.appendChild(img);
                    fig.appendChild(fc);
                    let out = document.querySelector('.out');
                    out.insertAdjacentElement('afterbegin', fig);
                    document.querySelector('#search').value = '';
                })
                .catch(err => {
                    console.error(err);
                });
        });
};

