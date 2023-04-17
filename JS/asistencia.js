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

const guardarBtn = document.querySelector("#Guardarbtn");
guardarBtn.addEventListener("click", () => {
  const estudiantesTable = document.querySelector("#estudiantesTable tbody");
  const filas = estudiantesTable.querySelectorAll("tr");

  // Crear una colección para la asistencia
  const asistenciaCollection = collection(db, "Asistencia");

  // Recorrer cada fila de la tabla
  filas.forEach((fila) => {
    const nombreTd = fila.querySelector("td:first-child");
    const nombre = nombreTd.textContent.trim();

    // Crear un objeto con los datos del estudiante
    const estudiante = { Nombre: nombre };

    // Recorrer cada checkbox de la fila y guardar su valor en el objeto del estudiante
    const checkboxes = fila.querySelectorAll("td input[type='checkbox']");
    checkboxes.forEach((checkbox, index) => {
      estudiante[`Semana${index + 1}`] = checkbox.checked;
    });

    // Guardar el objeto del estudiante en Firebase
    addDoc(asistenciaCollection, estudiante)
      .then(() => {
        console.log("Asistencia guardada correctamente");
      })
      .catch((error) => {
        console.error("Error al guardar la asistencia: ", error);
      });
  });
});


});