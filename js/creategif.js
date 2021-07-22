// Constantes útiles

const apiKey = "MvRLWWPVxBixgOKhwiLvh8EyVwl2lBKz";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";

// Subir gifs

// Elementos del HTML con los que vamos a interactuar
const start = document.getElementById("start");
const one = document.getElementById("one");
const video = document.querySelector("video");
const record = document.getElementById("record");
const preview = document.getElementById("preview");


// definimos el objeto recorder - tiene que se global para que podamos accederlo en todos los listeners
let recorder;
// También una variable recording para manejar el timer
let recording = false;


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

        record.addEventListener("click", () => {
            recording = !recording;

            if (recording === true) {
              this.disabled = true;
              recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
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

start.addEventListener("click", () => {
    //Pinta de morado el boton 1
    one.classList.remove("button-number");
    one.classList.add("button-number-selected");

    //Muestra el mensaje de pedir permiso para la cámara
    document.querySelector(".text-gifo-container").style = 'display: none';
    document.querySelector(".text-gifo-container-recording").style = 'display: flex';

    getStreamAndRecord();
});

function getDuration() {
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
          ).innerHTML = `00:00:0${minutes}:${seconds}`;
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

function stopRecordingCallback() {
    recorder.camera.stop();
  
    // le damos el formato requerido a la data que vamos a enviar como body de nuestro
    // POST request
    let form = new FormData();
    form.append("file", recorder.getBlob(), "test.gif");
  
    // upload.addEventListener("click", () => {
    //   uploadMessage.classList.remove("hidden");
    //   preview.classList.add("hidden");
    //   animateProgressBar(progressBar);
    //   uploadGif(form);
    // });
  
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