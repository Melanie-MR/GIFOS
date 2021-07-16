// Get the modal
let modal = document.querySelector("#myModal");

// Get the <span> element that closes the modal
var span = document.querySelectorAll(".close")[0];

// When the user calls this function. The modal opens up
function showModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}