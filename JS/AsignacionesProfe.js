


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

// document.getElementById('file').addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     const storageRef = firebase.storage().ref('images/' + file.name);

//     storageRef.put(file).on('state_changed', (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(progress);
//         const progressBar = document.getElementById('progress_bar');
//         progressBar.value = progress;
//     });

    
// });

// const storageRef = firebase.storage().ref('images/' + "Informe de Cierre de la Experiencia de TCU.docx.pdf");

const storageRef = firebase.storage().ref(sessionStorage.getItem("status")+"/"+sessionStorage.getItem("ID")+"/"+sessionStorage.getItem("Estudiante")+"/"+"1.pdf");
const storageRef2 = firebase.storage().ref(sessionStorage.getItem("status")+sessionStorage.getItem("ID")+sessionStorage.getItem("Estudiante")+2);
const storageRef3 = firebase.storage().ref(sessionStorage.getItem("status")+sessionStorage.getItem("ID")+sessionStorage.getItem("Estudiante")+3);

btnDescarga.addEventListener('click', (e) => {
    console.log("nbu");
storageRef.getDownloadURL().then(function(url){
    const image = document.getElementById('image');
    console.log(url);
    image.src = url
});

});

btnDescarga2.addEventListener('click', (e) => {
  console.log("nbu");
storageRef.getDownloadURL().then(function(url){
  const image = document.getElementById('image');
  console.log(url);
  image.src = url
});

});

btnDescarga3.addEventListener('click', (e) => {
  console.log("nbu");
storageRef.getDownloadURL().then(function(url){
  const image = document.getElementById('image');
  console.log(url);
  image.src = url
});

});

//Titulo
const dbRef = firebase.database().ref();
dbRef.child("Asignaciones").child("Cursos").child(sessionStorage.getItem("ID")).child("Estudiantes").child(sessionStorage.getItem("Estudiante")).get().then((snapshot) => {
  if (snapshot.exists()) {
    document.getElementById(("Asignaciones")).innerHTML = "Asignaciones de: "+(snapshot.val().Nombre)+" "+(snapshot.val().Apellidos);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

//notas

for(let i= 1; i<8; i++){


dbRef.child("Asignaciones").child("Cursos").child(sessionStorage.getItem("ID")).child("Estudiantes").child(sessionStorage.getItem("Estudiante")).child("Notas").child(i).get().then((snapshot) => {
    if (snapshot.exists()) {
    

       var nota = (snapshot.val().Nota);
var miNota = document.getElementById("input"+i);
miNota.value=nota;


    console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

};

////nota actualizar
function updateData(){
    var database = firebase.database();
    
    for(let i= 1; i<8; i++){
        if(document.getElementById('input'+i).value <101 && document.getElementById('input'+i).value >=0 ){
            var NotaInput = document.getElementById('input'+i).value
        }else{
            alert('Numero invalido')
        }
        

    var updates = {
      Nota : NotaInput
    }
  
    database.ref('Asignaciones/Cursos/'+(sessionStorage.getItem("ID")+"/")+"Estudiantes/"+(sessionStorage.getItem("Estudiante")+"/")+"Notas/"+i).update(updates)
  
    

}
alert('updated')
}

btnActulizar2.addEventListener('click', (e) => {
updateData();
});
