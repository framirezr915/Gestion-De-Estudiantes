import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyD6z7vPeIDhq7MQrV7M6sZOq2rFn_0ys6Q",
  authDomain: "gestion-de-estudiantes.firebaseapp.com",
  databaseURL: "https://gestion-de-estudiantes-default-rtdb.firebaseio.com",
  projectId: "gestion-de-estudiantes",
  storageBucket: "gestion-de-estudiantes.appspot.com",
  messagingSenderId: "195992130911",
  appId: "1:195992130911:web:d883094ec0cd5d115612ea",
  measurementId: "G-MZ74HG8FX8"


};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let btnEnviar = document.getElementById('btnEnviar');
let chatUl = document.getElementById('chatUl');

// Agrega un manejador de eventos para el botón "Enviar"
btnEnviar.addEventListener("click", (e) => {
  const name = document.getElementById('nombre').value;
  const message = document.getElementById('mensaje').value;
  const courseId = sessionStorage.getItem('ID');
  console.log(courseId)

  // Agregar un nuevo mensaje para el curso actual
  const messagesRef = ref(database, 'messages/' + courseId);
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    name: name,
    message: message,
    courseId: courseId
  });

  document.getElementById('mensaje').value = '';
});


// Función para actualizar la lista de mensajes en el foro
const actualizarForo = () => {
  const courseId = sessionStorage.getItem('ID');
  const messagesRef = ref(database, 'messages/' + courseId);

  // Escuchar cambios en la base de datos en tiempo real
  onValue(messagesRef, (snapshot) => {
    chatUl.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const message = childSnapshot.val();
      const html = "<li><b>" + message.name + ": </b>" + message.message + "</li>";
      chatUl.innerHTML += html;
    });
  });
};

// Llamar la función para actualizar la lista de mensajes al cargar la página
actualizarForo();