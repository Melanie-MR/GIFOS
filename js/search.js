
///importar app.js

//API Conection Search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsEl = document.querySelector('#results');

//Event Listener to submit
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = searchInput.value;
    search(q);
});

function search(query) {
   
    const path_search = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=15&q=${query}`;

    fetch (path_search).then(function (res) { 
        return res.json();
    }).then(function(json){
        //console.log(json.data[0].images.fixed_width.url);
        let resultsHTML = '';
    
        json.data.forEach(function(obj) {
            //console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const height = obj.images.fixed_height.height;
            const title = obj.title;
    
            resultsHTML += 

                `
                    <img 
                        class="item"
                        src="${url}" 
                        alt="${title}"
                        style= "width: 260px; height: 200px"
                    >
                    <div class="img-layer">
                        <div id= "icons-layer">
                            <button class="icons-layer" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                            <button class="icons-layer" onclick="clickLike('${url}', '${width}', '${title}', '${height}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                            <button class="icons-layer enlarge-button" onclick="clickEnlarge()"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                        </div>
                    </div>
               `;
        });
    
        resultsEl.innerHTML = resultsHTML; //to add to html
        
    }).catch(function(err) {
        console.log(err.message);
    });
} 