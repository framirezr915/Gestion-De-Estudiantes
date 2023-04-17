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
const gruposRef = ref(db, "Grupos");
const curso5ref = ref(db, "Cursos/5/Grupos")
const dataRef = ref(db, "Cursos/5");



onValue(dataRef, (snapshot) => {
  const estudiantes = snapshot.val();
  const estudiantesList = document.querySelector(".estudiantes-list");

  while (estudiantesList.firstChild) {
    estudiantesList.removeChild(estudiantesList.firstChild);
  }
  for (const key in estudiantes) {
    const estudiante = estudiantes[key];
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.textContent = `${estudiante.Nombre} ${estudiante.Apellidos}`;
    li.dataset.id = key;
    li.appendChild(checkbox);
    estudiantesList.appendChild(li);
  }
});

const crearGrupoBtn = document.getElementById("crear-grupo-btn");
crearGrupoBtn.addEventListener("click", (e) => {
  const estudiantesList = document.querySelector(".estudiantes-list");
  const checkboxes = estudiantesList.querySelectorAll("input[type='checkbox']");
  const estudiantesSeleccionados = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const estudiante = checkbox.parentNode.textContent.trim();
      estudiantesSeleccionados.push(estudiante);
    }
  });
  agregarGrupo(estudiantesSeleccionados);
});

function agregarGrupo(estudiantes) {
  const db = getDatabase();
  const curso5ref = ref(db, "Cursos/5/Grupos");
  const nuevoGrupoRef = push(curso5ref);
  set(nuevoGrupoRef, { estudiantes });
}

const gruposList = document.querySelector(".grupos-container");

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

gruposList.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const grupoKey = e.target.dataset.grupo;
    const grupoRef = ref(db, `Cursos/5/Grupos/${grupoKey}`);
    remove(grupoRef)
      .then(() => {
        console.log("Grupo eliminado con éxito.");
      })
      .catch((error) => {
        console.error("Error al eliminar el grupo:", error);
      });
  }
});