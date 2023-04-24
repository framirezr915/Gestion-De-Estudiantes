document.getElementById(("Nombre3")).innerHTML = sessionStorage.getItem("Nombre");// Import the functions you need from the SDKs you need




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

    var curso = sessionStorage.getItem("ID")
    for(let i= 1; i<11; i++){
        get(child(dbref,"Asignaciones/"+ "Cursos/" + (curso+"/") + "Estudiantes/"+ i))
    .then((snapshot)=>{
        if(snapshot.exists()){

document.getElementById(("std"+i)).innerHTML = (snapshot.val().Nombre);






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

const enlace1 = document.getElementById('std1');
enlace1.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","1");
    
});

const enlace2 = document.getElementById('std2');
enlace2.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","2");
});

const enlace3 = document.getElementById('std3');
enlace3.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","3");
});

const enlace4 = document.getElementById('std4');
enlace4.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","4");
});

const enlace5 = document.getElementById('std5');
enlace5.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","5");
});

const enlace6 = document.getElementById('std6');
enlace6.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","6");
});

const enlace7 = document.getElementById('std7');
enlace7.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","7");
});

const enlace8 = document.getElementById('std8');
enlace8.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","8");
});

const enlace9 = document.getElementById('std9');
enlace9.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","9");
});

const enlace10 = document.getElementById('std10');
enlace10.addEventListener('click', (e) => {
    sessionStorage.setItem("Estudiante","10");
});

