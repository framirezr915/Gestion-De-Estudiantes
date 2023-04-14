// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getDatabase, ref, onValue, push, set, remove} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

const dataRef = ref(db, "Estudiantes");

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
    li.textContent = `${estudiante.Nombre}`;
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
  const gruposRef = ref(db, "Grupos");
  const nuevoGrupoRef = push(gruposRef);
  set(nuevoGrupoRef, { estudiantes });
}

const gruposList = document.querySelector(".grupos-container");

onValue(gruposRef, (snapshot) => {
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
    const grupoRef = ref(db, `Grupos/${grupoKey}`);
    remove(grupoRef)
      .then(() => {
        console.log("Grupo eliminado con éxito.");
      })
      .catch((error) => {
        console.error("Error al eliminar el grupo:", error);
      });
  }
});





















// // Obtener los estudiantes seleccionados y agregar un nuevo grupo

// // const estudiantesCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
// // const estudiantesSeleccionados = [];
// // estudiantesCheckbox.forEach((checkbox) => {
// //   estudiantesSeleccionados.push(checkbox.parentElement.textContent.trim());
// // });

// // const nombreGrupo = prompt("Ingresa el nombre del nuevo grupo:");
// // agregarGrupo(nombreGrupo, estudiantesSeleccionados);

// // Obtener los elementos necesarios
// // const estudiantes = document.querySelectorAll('.estudiantes-list li');
// // const botonAgregarGrupo = document.querySelector('.estudiantes-list button');
// // const gruposContainer = document.querySelector('.grupos-container');

// // Agregar evento click al botón de "Crear Grupo"
// // botonAgregarGrupo.addEventListener('click', () => {
// //   Obtener los estudiantes seleccionados
// //   const estudiantesSeleccionados = [];
// //   estudiantes.forEach((estudiante) => {
// //     if (estudiante.querySelector('input[type="checkbox"]').checked) {
// //       estudiantesSeleccionados.push(estudiante.innerText);
// //     }
// //   });

// //   Crear nuevo grupo
// //   if (estudiantesSeleccionados.length > 0) {
// //     const nuevoGrupo = document.createElement('div');
// //     nuevoGrupo.classList.add('groups');

// //     const accionesGrupo = document.createElement('div');
// //     accionesGrupo.classList.add('grupo-acciones');

// //     const tituloGrupo = document.createElement('h3');
// //     tituloGrupo.innerText = 'Grupo';

// //     const botonEliminarGrupo = document.createElement('button');
// //     botonEliminarGrupo.innerText = 'Eliminar';
// //     botonEliminarGrupo.addEventListener('click', () => {
// //       nuevoGrupo.remove();
// //     });

// //     accionesGrupo.appendChild(tituloGrupo);
// //     accionesGrupo.appendChild(botonEliminarGrupo);
// //     nuevoGrupo.appendChild(accionesGrupo);

// //     const estudiantesGrupo = document.createElement('ul');
// //     estudiantesGrupo.classList.add('estudiantes');

// //     estudiantesSeleccionados.forEach((estudiante) => {
// //       const estudianteLi = document.createElement('li');
// //       estudianteLi.innerText = estudiante;
// //       estudiantesGrupo.appendChild(estudianteLi);
// //     });

// //     nuevoGrupo.appendChild(estudiantesGrupo);
// //     gruposContainer.appendChild(nuevoGrupo);

// //     Limpiar selección de checkboxes
// //     estudiantes.forEach((estudiante) => {
// //       estudiante.querySelector('input[type="checkbox"]').checked = false;
// //     });
// //   }
// // });
