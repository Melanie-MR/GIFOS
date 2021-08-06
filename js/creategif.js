// API 

const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";


//// Creating a Giphy

// HTML Elements to interact.
const start = document.getElementById("start");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const video = document.querySelector("video");
const record = document.getElementById("record");
const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const stop = document.getElementById("stop");
const repeat = document.getElementById("repeat-gif");
const timer =  document.getElementById("timer");
const layer = document.getElementsByClassName("img-layer-gifo");
const uploadMessage = document.querySelector(".uploadMessage");
const uploadMessageDone = document.querySelector(".upload-message-done");

//Object RECORDER. This is global to have access in all the listeners. 
let recorder;
//To manage timer
let recording = false;

//GET and SET my gifs (Local Storage)

if (localStorage.getItem('myGifs') === null) {
  const emptyLikes = [];
  localStorage.setItem('myGifs', JSON.stringify(emptyLikes));
}

//Recorder function
function getStreamAndRecord() {
    // Camera starts here.
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { height: 320, width: 480 } 

  }).then(function (stream) {
    // The stream of the camera is used as a source of the video tag in the html. 
      video.srcObject = stream;
      video.play();
      document.querySelector(".text-gifo-container-recording").style = 'display: none';
      record.style = 'display: block';
      one.classList.remove("button-number-selected");
      one.classList.add("button-number");
      two.classList.remove("button-number");
      two.classList.add("button-number-selected");

      record.addEventListener("click", () => {
        recording = !recording;
          if (recording === true) {
              this.disabled = true;
              recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 688,
                height: 390,
                onGifRecordingStarted: function () {
                  record.style = 'display: block';
                  console.log("started");
                  getDuration();
                },
              });
            
              recorder.startRecording();
              
              // Button change according to the step that we are. 
              record.style = 'display: none';
              record.innerHTML = "FINALIZAR";

              //To stop the stream of the camera.
              recorder.camera = stream;
          } else {
              this.disabled = true;
              recorder.stopRecording(stopRecordingCallback);
              recording = false;
            }
      });

  });
};

//Timer function
function getDuration() {
  document.getElementById("timer").innerHTML = '00:00:00';
  document.getElementById("timer").style = 'display: none';
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        document.getElementById(
          "timer"
        ).innerHTML = `00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
      document.getElementById("timer").style = 'display: block';
    } else {
      document.getElementById("timer").style = 'display: none';
      clearInterval(timer);
    }
  }, 1000);
}

//EventListener for the buttons
start.addEventListener("click", () => {
  //Colored purple on button 1. 
  one.classList.remove("button-number");
  one.classList.add("button-number-selected");
  start.style = 'display: none';
  //Show the msg to ask permission to have acces to the camera. 
  document.querySelector(".text-gifo-container").style = 'display: none';
  document.querySelector(".text-gifo-container-recording").style = 'display: flex; justify-content: center; flex-direction: column';
  
  getStreamAndRecord();
});

//Stop Recording Function
function stopRecordingCallback() {
  recorder.camera.stop(); 
  timer.style = 'display: none';
  record.style = 'display: none';
  repeat.style = 'display: flex';
  upload.style = 'display: block';
  // This is the format of the new data required as a body of the post request. 
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get('file')) 
  
  upload.addEventListener("click", () => {
   
    upload.style = 'display: none';
    repeat.style = 'display: none';
    two.classList.remove("button-number-selected");
    two.classList.add("button-number");
    three.classList.remove("button-number");
    three.classList.add("button-number-selected");
    uploadMessage.style.display = 'flex';

    uploadGif(form);
  });
  
    objectURL = URL.createObjectURL(recorder.getBlob());
    preview.src = objectURL;
  
    // Preview of the video. This part also remove the timer. 
    preview.classList.remove("hide");
    video.classList.add("hide");
  
    recorder.destroy();
    recorder = null;
}

repeat.addEventListener('click', () => {
  location.reload(); //return to the beginning.
  getStreamAndRecord()
})

//Upload Giphy to the API.
function uploadGif(form) {

  // Post according to API needs. The API Key is sent into the url. 
  let params =  {
    method: 'POST', 
    body: form
  };
  fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, params
  ).then(res => {
    console.log(res.status)
    if (res.status != 200 ) {
      console.log(res)
      uploadMessage.innerHTML = `<h2>Hubo un error subiendo tu Guifo</h2>`;
    }
    return res.json();  
  }).then(data => {  
    const gifId = data.data.id;
    uploadMessage.style.display = 'none';
    uploadMessageDone.style.display = 'block'
    getGifDetails(gifId);
  })
    .catch(error => {
      uploadMessage.innerHTML = (`<h2>Hubo un error subiendo tu Guifo</h2>`)
      console.log('Error:', error)
    });
}

//Gif Details Function. Buttons to download, copy or like the giphy created.
function getGifDetails (id) {
  fetch(apiBaseUrl + id + '?api_key=' + apiKey) 
    .then((response) => {
      return response.json()
    }).then(data => {
        const url = data.data.images.original.url;
        const width = data.data.images.fixed_width.width;
        const height = data.data.images.fixed_height.height;
        const title = data.data.title;

        let buttonEl = document.getElementById("icons-layer-gifo");
        let buttons = `<button class="icons-layer-gifo" onclick="clickDownload('${url}')"><img src="assets/icon-download.svg" alt="Descargar"></button>
                      <button class="icons-layer-gifo" onclick="clickLike('${url}'); favorites()"><img src="assets/icon-fav.svg" alt="Me Gusta"></button>
                      <button class="icons-layer-gifo" onclick="copyToClipboard('${url}')"><img src="assets/icon-link-normal.svg" alt="Me Gusta"></button>
                      `;             
        buttonEl.innerHTML = buttons;

        ///Read from localStorage
        let myGifs = JSON.parse(localStorage.getItem('myGifs'));
        const myGif = {
          url: url,
          width: width,
          title: title,
          height: height
        }
        myGifs.push(myGif)
        //Save in localStorage
        localStorage.setItem('myGifs', JSON.stringify(myGifs)); 
    
    })
        .catch((error) => {
            return error
        })
}

//// Download Gif
  
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
};

////Like Gif

function clickLike(url, width, title, height) {
  
  let myLikes = JSON.parse(localStorage.getItem('myLikesKey'));
  const fav = {
      url: url,
      width: width,
      title: title,
      height: height
  }
  myLikes.push(fav)
  
  localStorage.setItem('myLikesKey', JSON.stringify(myLikes));
  
}

////Copy Link GIF

function copyToClipboard(url) {

  let input = document.createElement("input");
  input.setAttribute("value", url);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  alert("Enlace de Giphy copiado");
}

////Nigth mode Create Gifo

let createButton = document.getElementById('botton__gifo--disappear');
let cam = document.getElementById('cam');
let tape = document.getElementById('tape');
let logo = document.getElementById('logo');
let dark = document.querySelector('#dark'); 
let changeStyle = localStorage.getItem('nightmode');
let switches = document.querySelector('#switch');
switches.addEventListener('click', swapStyle);

// Load Page Style
function loadStyle() {
  changeStyle = localStorage.getItem('nightmode');
  if (changeStyle === 'true') {
    dark.setAttribute('href', 'style/nightmode.css');
    switches.textContent = 'Modo Diurno';
    if (cam, tape, logo, createButton){
      cam.src = 'assets/camara-modo-noc.svg';
      tape.src = 'assets/pelicula-modo-noc.svg';
      logo.src = 'assets/logo-modo-noc.svg';
      createButton.src = 'assets/CTA-crear-gifo-modo-noc.svg';
      
      createButton.addEventListener('mouseleave', e => {
        createButton.src = 'assets/CTA-crear-gifo-modo-noc.svg';
      })
      createButton.addEventListener('mouseover', e => {
        createButton.src = 'assets/CTA-crear-gifo-hover-modo-noc.svg';
      })
      createButton.addEventListener('mousedown', e => {
        createButton.src = 'assets/CTA-crear-gifo-active-modo-noc.svg';
      })
    }
  } else {
    if (changeStyle === 'false') {
      dark.setAttribute('href', 'style/create_gifo.css');
      switches.textContent = 'Modo Nocturno';
    };
    if (cam, tape,  logo, createButton){
      cam.src = 'assets/camara.svg';
      tape.src = 'assets/pelicula.svg';
      logo.src = 'assets/logo-desktop.svg';
      createButton.src = 'assets/button-crear-gifo.svg';
            
      createButton.addEventListener('mouseleave', e => {
        createButton.src = 'assets/button-crear-gifo.svg';
      })
      createButton.addEventListener('mouseover', e => {
        createButton.src = 'assets/CTA-crear-gifo-hover.svg';
      })
      createButton.addEventListener('mousedown', e => {
        createButton.src = 'assets/CTA-crear-gifo-active.svg';
      })
    }
  };
};

document.addEventListener('DOMContentLoaded', loadStyle);

// Switch Styles according to Local Storage
function swapStyle() {
  changeStyle = localStorage.getItem('nightmode');
  if (changeStyle === 'true'){
      changeStyle = localStorage.setItem('nightmode', 'false');
  } else {
      changeStyle = localStorage.setItem('nightmode', 'true');
  }
  loadStyle();
  
};