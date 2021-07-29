





//ClickLike Function ---> This is for save in LocalStorage fav object when user click.

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
