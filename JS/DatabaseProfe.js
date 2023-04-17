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
 

    const dbref = ref(db);

    var usuario = sessionStorage.getItem("status")
    for(let i= 5; i<8; i++){
        get(child(dbref, "Profesores/" + (usuario+"/") + "Cursos/"+i))
    .then((snapshot)=>{
        if(snapshot.exists()){

document.getElementById(("btnCurso"+i)).innerHTML = (snapshot.val().Nombre);
sessionStorage.setItem(("btnCurso"+i),snapshot.val().Nombre);
        }else{
            console.log("No data found");
        }
    })
    .catch((error)=>{
        console.log(error)
    })
    }
    




btnCurso5.addEventListener ('click', (e) => {
    sessionStorage.setItem("Nombre",sessionStorage.getItem("btnCurso5"));
    sessionStorage.setItem("ID","5");
    location.replace("../html/Pantalla-Profesor-Semanas.html")
    
    
});

btnCurso6.addEventListener ('click', (e) => {
    sessionStorage.setItem(("Nombre"),sessionStorage.getItem("btnCurso6"));
    sessionStorage.setItem("ID","6");
    location.replace("../html/Pantalla-Profesor-Semanas.html")
    
});

btnCurso7.addEventListener ('click', (e) => {
    sessionStorage.setItem(("Nombre"),sessionStorage.getItem("btnCurso7"));
    sessionStorage.setItem("ID","7");
    location.replace("../html/Pantalla-Profesor-Semanas.html")
    
});