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