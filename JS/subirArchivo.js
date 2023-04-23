// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6z7vPeIDhq7MQrV7M6sZOq2rFn_0ys6Q",
    authDomain: "gestion-de-estudiantes.firebaseapp.com",
    projectId: "gestion-de-estudiantes",
    storageBucket: "gestion-de-estudiantes.appspot.com",
    messagingSenderId: "195992130911",
    appId: "1:195992130911:web:d883094ec0cd5d115612ea",
    measurementId: "G-MZ74HG8FX8"
  };
firebase.initializeApp(firebaseConfig);
// get dom in variables
var upload = document.getElementsByClassName('upload')[0];
var hiddenBtn = document.getElementsByClassName('hidden-upload-btn')[0];
var progress = document.getElementsByClassName('progress')[0];
var percent = document.getElementsByClassName('percent')[0];
var pause = document.getElementsByClassName('pause')[0];
var resume = document.getElementsByClassName('resume')[0];
var cancel = document.getElementsByClassName('cancel')[0];


document.getElementById(("Nombre")).innerHTML = sessionStorage.getItem("Nombre");
// create function for select a file
upload.onclick = function () {
    hiddenBtn.click();
}

// also store files path in localstorage or in database for further use
if(!localStorage.getItem("uploaded-metadata")){
    var metadata = '[]';
    localStorage.setItem('uploaded-metadata', metadata)
}

// get selected file and upload function
hiddenBtn.onchange = function () {
    // get file
    var file = hiddenBtn.files[0];
    // change file name so cannot overwrite
    var name = file.name.split('.').shift() + Math.floor(Math.random() * 10) + 10 + '.' + file.name.split('.').pop();
    var type = file.type.split('/')[0];
    var path = type + '/' + name;

    //show
    var img = document.querySelector("#imgSub");
    img = file;
    // now upload
    var storageRef = firebase.storage().ref(path);
    var uploadTask = storageRef.put(file);

    pause.onclick = function () {
        uploadTask.pause();
        resume.style.display = 'inline-block';
        pause.style.display = 'none';
    }
    resume.onclick = function () {
        uploadTask.resume();
        resume.style.display = 'none';
        pause.style.display = 'inline-block';
    }
    cancel.onclick = function () {
        uploadTask.cancel();
        progress.style.width = '0%';
        percent.innerHTML = '0%';
    }

    upload.disabled = true;
    percent.innerHTML = '0%';

    // get progressbar
    uploadTask.on('state_changed',
        (snapshot) => {
            var progressValue = String((snapshot.bytesTransferred / snapshot.totalBytes) * 100).split('.')[0];
            progress.style.width = progressValue + '%';
            percent.innerHTML = progressValue + '%';
        },
        (error) => {
            console.log(error)
        },
        () => {
            // on successful upload
            var metadata = JSON.parse(localStorage.getItem('uploaded-metadata'));
            metadata.unshift(path);
            localStorage.setItem("uploaded-metadata", JSON.stringify(metadata));
            percent.innerHTML = 'Listo';
            upload.disabled = false;
            hiddenBtn.value = null;
        }
    )
    }

DiscusionesBtn.addEventListener ('click', (e) => {

location.replace("../html/Foro-Discusiones-Profesor.html")
});