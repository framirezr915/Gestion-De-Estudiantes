

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase,get,ref,child,update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";  

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

get(child(dbref, "Estudiantes/" + usuario))
    .then((snapshot)=>{
        if(snapshot.exists()){
var name = (snapshot.val().Nombre);
var miName = document.getElementById("nombre");
miName.value=name;

var lastNames = (snapshot.val().Apellidos);
var miLastNames = document.getElementById("apellidos");
miLastNames.value=lastNames;

var correo = (snapshot.val().email);
var miCorreo = document.getElementById("email");
miCorreo.value=correo;

// document.getElementById(("nombre")).innerHTML = (snapshot.val().Nombre);
// document.getElementById(("apellidos")).innerHTML = (snapshot.val().Apellidos);
// document.getElementById(("email")).innerHTML = (snapshot.val().Email);

        }else{
            console.log("No data found");
        }
    })
    .catch((error)=>{
        console.log(error)
    })

    //update data

var enterName = document.querySelector("#nombre");
var enterLastName = document.querySelector("#apellidos");
var enterCorreo = document.querySelector("#email");

console.log(enterName.value);

    function updateData(){
        update(ref(db,"Estudiantes/"+ usuario),{
            Nombre: enterName.value,
            email: enterCorreo.value,
            Apellidos: enterLastName.value
              
        })
        .then(()=>{
            alert("Datos Actulizados correctamente");
        })
        .catch((error)=>{
            alert(error);
        });

    }

    btnActualizar2.addEventListener('click', (e) => {
updateData();
    });