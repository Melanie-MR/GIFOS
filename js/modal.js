// Get the modal
let modal = document.getElementById("myModal");

// When the user calls this function. The modal opens up
function showModal() {
    modal.style.display = "block";
}


//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function clickBiggerPic(url, width, title, height, user) {
  
  const gralModal = document.querySelectorAll('.modal-container');
  const gralModalEl = gralModal[0]; 

  let imageModal = '';

  imageModal += `<div class="mySlidesModal">
                          <div><img src="${url}"  style= "width: 695px; height: 385px" alt="${title}"><h5 id= "titleModal">Titulo:${title}<br><span id="userModal">User:${user}</span></h5></div>
                          <div class="modal-icon-layer">
                              <button class="icons-layer-modal" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                              <button class="icons-layer-modal" onclick="clickLike('${url}', '${width}', '${title}', '${height}', '${user}')"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>  
                          </div>
                  </div>`;
      

  gralModalEl.innerHTML = imageModal; 
  showModal();
}