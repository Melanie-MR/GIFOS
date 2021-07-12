
// ESTA BIEN ESTO, SOLO ESTOY SOLUcionando FAV. El problema es que se esta ejecutando search en la pagina de fav
//y no esta ahi. Hay que separar los JS.

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