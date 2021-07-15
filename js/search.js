
///importar app.js

//API Conection Search

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsEl = document.getElementById('results');

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

                `<div class="search-container">
                    <img 
                        class="item"
                        src="${url}" 
                        alt="${title}"
                        width="${width}"
                        height= "${height}"
                    >
                    <div style= "display:flex">
                        <button class="download" onclick="clickDownload()" style= "background: none; border:none; margin-top: 1.5rem; margin-left: 2rem;  display: flex; justify-content: flex-end"><img src="assets/icon-download.svg" alt="Descargar"></button>
                        <button class="delete" onclick="clickDelete('${url}')" style= "background: none; border:none; margin-top: 1.5rem; display: flex; justify-content: flex-end"><img src="assets/icon-trash-normal.svg" alt="Eliminar"></button>
                        <button class="enlarge" onclick="clickEnlarge()" style= "background: none; border:none;  margin-top: 1.5rem; display: flex; justify-content: flex-end"><img src="assets/icon-max-normal.svg" alt="Maximizar"></button>
                    </div>
                </div>`;
        });
    
        resultsEl.innerHTML = resultsHTML; //to add to html
        
    }).catch(function(err) {
        console.log(err.message);
    });
} 