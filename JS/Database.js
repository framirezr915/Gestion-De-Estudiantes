// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase,get,ref,child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";  

const firebaseConfig = {
  apiKey: "AIzaSyD6z7vPeIDhq7MQrV7M6sZOq2rFn_0ys6Q",
  authDomain: "gestion-de-estudiantes.firebaseapp.com",
  projectId: "gestion-de-estudiantes",
  storageBucket: "gestion-de-estudiantes.appspot.com",
  messagingSenderId: "195992130911",
  appId: "1:195992130911:web:d883094ec0cd5d115612ea",
  measurementId: "G-MZ74HG8FX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
 
function findData(){
    const dbref = ref(db);

    var usuario = sessionStorage.getItem("status")
    for(let i= 1; i<5; i++){
        get(child(dbref, "Estudiantes/" + (usuario+"/") + "Cursos/"+i))
    .then((snapshot)=>{
        if(snapshot.exists()){

document.getElementById(("btnCurso"+i)).innerHTML = (snapshot.val().Nombre);
        }else{
            console.log("No data found");
        }
    })
    .catch((error)=>{
        console.log(error)
    })
    }
    
};

findData();

btnCurso1.addEventListener ('click', (e) => {
    sessionStorage.setItem("Nombre",sessionStorage.getItem("btnCurso1"));
    sessionStorage.setItem("ID","1");
    location.replace("../html/Pantalla-Estudiante-Contenido.html")
    
    
});

btnCurso2.addEventListener ('click', (e) => {
    sessionStorage.setItem(("Nombre"),sessionStorage.getItem("btnCurso2"));
    sessionStorage.setItem("ID","2");
    location.replace("../html/Pantalla-Estudiante-Contenido.html")
    
});

btnCurso3.addEventListener ('click', (e) => {
    sessionStorage.setItem(("Nombre"),sessionStorage.getItem("btnCurso3"));
    sessionStorage.setItem("ID","3");
    location.replace("../html/Pantalla-Estudiante-Contenido.html")
    
});

btnCurso4.addEventListener ('click', (e) => {
    sessionStorage.setItem(("Nombre"),sessionStorage.getItem("btnCurso4"));
    sessionStorage.setItem("ID","4");
    location.replace("../html/Pantalla-Estudiante-Contenido.html")
    
});