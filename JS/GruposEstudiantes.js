// Import the functions you need from the SDKs you need
import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, onSnapshot} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getDatabase, ref, onValue, push, set, remove, orderByChild} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6z7vPeIDhq7MQrV7M6sZOq2rFn_0ys6Q",
  authDomain: "gestion-de-estudiantes.firebaseapp.com",
  projectId: "gestion-de-estudiantes",
  storageBucket: "gestion-de-estudiantes.appspot.com",
  messagingSenderId: "195992130911",
  appId: "1:195992130911:web:d883094ec0cd5d115612ea",
  measurementId: "G-MZ74HG8FX8",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const curso5ref = ref(db, "Grupos/"+"Cursos/"+sessionStorage.getItem("ID")+"/Grupos");


const gruposList = document.querySelector(".grupos-container");

function actualizarGrupos() {
  onValue(curso5ref, (snapshot) => {
    const grupos = snapshot.val();
    gruposList.innerHTML = "";
    let numGrupo = 1;
    for (const key in grupos) {
      const grupo = grupos[key];
      const li = document.createElement("li");
      li.innerHTML = `<span>Grupo ${numGrupo}: <br> ${grupo.estudiantes.join(", ")}</span><button data-grupo="${key}">Eliminar</button>`;
      li.classList.add("grupo-item");
      gruposList.appendChild(li);
      numGrupo++;
    }
  });
}

actualizarGrupos();