


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



// const storage = firebase.storage();

// const fileRef = storage.ref('path/to/file');

// fileRef.getDownloadURL()
//     .then(url => {
//         fetch(url)
//             .then(response => response.blob())
//             .then(blob => {
//                 // Maneja el archivo descargado aquí
//             });
//     });

//     const link = document.createElement('a');
// link.href = URL.createObjectURL(blob);
// link.download = 'nombre_del_archivo';
// link.click();

document.getElementById('file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref('images/' + file.name);

    storageRef.put(file).on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        const progressBar = document.getElementById('progress_bar');
        progressBar.value = progress;
    });

    
});

const storageRef = firebase.storage().ref('images/' + "Informe de Cierre de la Experiencia de TCU.docx.pdf");

btnDescarga.addEventListener('click', (e) => {
    console.log("nbu");
storageRef.getDownloadURL().then(function(url){
    const image = document.getElementById('image');
    console.log(url);
    image.src = url
});

});




