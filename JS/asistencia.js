// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getDatabase, ref, onValue, push, set, remove, update, get} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { updateDoc, doc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

const cursoId = sessionStorage.getItem("ID");
const dataRef = ref(db, "Cursos/" + cursoId);

onValue(dataRef, (snapshot) => {
  const estudiantes = snapshot.val();
  const estudiantesTable = document.querySelector("#estudiantesTable tbody");

  for (const key in estudiantes) {
    const estudiante = estudiantes[key];
    const tr = document.createElement("tr");
    const nombreTd = document.createElement("td");
    nombreTd.textContent = `${estudiante.Nombre} ${estudiante.Apellidos}`;
    nombreTd.dataset.id = key;
    tr.appendChild(nombreTd);

    for (let i = 1; i <= 15; i++) {
      const semanaTd = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.semana = i;

      const asistenciaRef = ref(db, `Asistencia/${cursoId}/${key}/Semana${i}`);
      get(asistenciaRef).then((snapshot) => {
        const asistencia = snapshot.val();
        checkbox.checked = asistencia === true;
      }).catch((error) => {
        console.error("Error al obtener la asistencia: ", error);
      });

      semanaTd.appendChild(checkbox);
      tr.appendChild(semanaTd);

      checkbox.addEventListener("change", (e) => {
        const estudianteId = e.target.closest("tr").querySelector("td:first-child").dataset.id;
        const semana = e.target.dataset.semana;
        const asistenciaRef = ref(db, `Asistencia/${cursoId}/${estudianteId}/Semana${semana}`);
        set(asistenciaRef, e.target.checked).then(() => {
          console.log("Asistencia guardada correctamente");
        }).catch((error) => {
          console.error("Error al guardar la asistencia: ", error);
        });
      });
    }

    estudiantesTable.appendChild(tr);
  }
});

