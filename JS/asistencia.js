// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getDatabase, ref, onValue, push, set, remove} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

const dataRef = ref(db, "Cursos/5");

onValue(dataRef, (snapshot) => {
  const estudiantes = snapshot.val();

  const estudiantesTable = document.querySelector("#estudiantesTable tbody");

//Crear una fila para cada estudiante y colocar su nombre en la primera celda
for (const key in estudiantes) {
  const estudiante = estudiantes[key];
  const tr = document.createElement("tr");
  const nombreTd = document.createElement("td");
  nombreTd.textContent = `${estudiante.Nombre} ${estudiante.Apellidos}`;
  nombreTd.dataset.id = key;
  tr.appendChild(nombreTd);

  //Agregar una celda con un checkbox para cada semana
  for (let i = 1; i <= 15; i++) {
    const semanaTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (estudiante[`Semana${i}`]) {
      checkbox.checked = true;
    }
    semanaTd.appendChild(checkbox);
    tr.appendChild(semanaTd);
  }

  estudiantesTable.appendChild(tr);
}



});