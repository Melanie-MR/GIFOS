// Constantes útiles

const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";


// Subir gifs

// Elementos del HTML con los que vamos a interactuar
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

// definimos el objeto recorder - tiene que se global para que podamos accederlo en todos los listeners
let recorder;
// También una variable recording para manejar el timer
let recording = false;

//GET and SET my gifs (Local Storage)

if (localStorage.getItem('myGifs') === null) {
  const emptyLikes = [];
  localStorage.setItem('myGifs', JSON.stringify(emptyLikes));
}


function getStreamAndRecord() {
    // empieza a correr la cámara
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { height: 390, width: 688 } 

    }).then(function (stream) {
        // Usamos el stream de la cámara como source de nuestra tag <video> en el html
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
                  console.log("started");
                },
              });
    
              recorder.startRecording();
              getDuration();
    
              // modificamos el dom para que se note que estamos grabando
              record.innerHTML = "FINALIZAR";
        


              // cortamos el stream de la cámara
              recorder.camera = stream;
            } else {
              this.disabled = true;
              recorder.stopRecording(stopRecordingCallback);
              recording = false;
            }
          });

    });
}
function getDuration() {
  document.getElementById(
    "timer"
  ).innerHTML = '00:00:00';
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
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

start.addEventListener("click", () => {
    //Pinta de morado el boton 1
    one.classList.remove("button-number");
    one.classList.add("button-number-selected");
    start.style = 'display: none';
    //Muestra el mensaje de pedir permiso para la cámara
    document.querySelector(".text-gifo-container").style = 'display: none';
    document.querySelector(".text-gifo-container-recording").style = 'display: flex; justify-content: center; flex-direction: column';

    getStreamAndRecord();
});


function stopRecordingCallback() {
    recorder.camera.stop();
    
    timer.style = 'display: none';
    record.style = 'display: none';
    repeat.style = 'display: flex';
    upload.style = 'display: block';
    // le damos el formato requerido a la data que vamos a enviar como body de nuestro
    // POST request
    let form = new FormData();
    form.append("file", recorder.getBlob(), "test.gif");
  
    upload.addEventListener("click", () => {
   
      upload.style = 'display: none';
      repeat.style = 'display: none';
      two.classList.remove("button-number-selected");
      two.classList.add("button-number");
      three.classList.remove("button-number");
      three.classList.add("button-number-selected");
      uploadMessage.style.display = 'flex';

      //animateProgressBar(progressBar);
      uploadGif(form);
    });
  
    objectURL = URL.createObjectURL(recorder.getBlob());
    preview.src = objectURL;
  
    // modificamos el dom para mostrar la preview, remover el timer
    preview.classList.remove("hide");
    video.classList.add("hide");
    //document.getElementById("video-record-buttons").classList.add("hidden");
    //document.getElementById("video-upload-buttons").classList.remove("hidden");
  
    recorder.destroy();
    recorder = null;
  }

  repeat.addEventListener('click', () => {
    location.reload(); //aca se supone que regrese a grabar, no al inicio DE TODO.
    getStreamAndRecord()
  })


  function uploadGif(form) {

    // formateamos el post según las necesidades particulares de la api de giphy
    // la api key se manda en la url
    let params =  {
      method: 'POST', 
      body: form
    };
    fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, params
    ).then(res => {
      console.log(res.status)
      if (res.status != 200 ) {
        console.log(res)
        //uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`
      }
      return res.json();  
    }).then(data => {  
      //uploadMessage.classList.add('hidden');
      const gifId = data.data.id;
      uploadMessage.style.display = 'none';
      uploadMessageDone.style.display = 'block';
      getGifDetails(gifId)
  
    })
    .catch(error => {
      //uploadMessage.innerHTML = (`<h3>Hubo un error subiendo tu Guifo</h3>`)
      console.log('Error:', error)
    });
  }

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
                           <button class="icons-layer-gifo" link-button" onclick="copyToClipboard('${url}')"><img src="assets/icon-link-normal.svg" alt="Link"></button>`;

            buttonEl.innerHTML = buttons;

            ///Save in localStore
            let myGifs = JSON.parse(localStorage.getItem('myGifs'));
            const myGif = {
                url: url,
                width: width,
                title: title,
                height: height
            }
            myGifs.push(myGif)
            
            localStorage.setItem('myGifs', JSON.stringify(myGifs)); 
    

            //Acá con la URL de la imagen subida puedes guardar en localStore tus gifos 
            //basandote en la funcion clicklike
            //Y consultarlos en app.js con una funcion similar a favorites
            // tu gifo se ha subido con exito.
            // document.getElementById('finish').addEventListener('click', () => {
            //   location.reload();
            // })
        })
        .catch((error) => {
            return error
        })
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
};

function copyToClipboard(url) {

  var inputc = document.body.appendChild(document.createElement("input"));
  inputc.value = window.location.href;
  inputc.focus();
  inputc.select();
  document.execCommand('copy');
  inputc.parentNode.removeChild(inputc);
  alert("Enlace copiado.");
  }

  const switchMode = document.querySelector('#switch');
  switchMode.addEventListener('click', () =>{
      document.body.classList.toggle('dark');
      switchMode.classList.toggle('active');
  });