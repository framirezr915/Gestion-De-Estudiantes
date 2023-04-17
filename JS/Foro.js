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

// Actualizar la lista de chat con los mensajes para el curso actual
const updateChat = () => {
    const courseId = sessionStorage.getItem('ID');
    const courseMessagesRef = ref(database, 'messages/' + courseId);
  
    onValue(courseMessagesRef, (snapshot) => {
      chatUl.innerHTML = '';
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        const html = "<li><b>" + message.name + ": </b>" + message.message + "</li>";
        chatUl.innerHTML += html;
      });
    });
  };
  
// Almacenar el ID del curso en sessionStorage y actualizar la lista de chat
const selectCourse = (courseId) => {
  sessionStorage.setItem('ID', courseId);
  updateChat();
};

// Obtener la lista de cursos y agregar elementos HTML para cada uno
const coursesRef = ref(database, 'courses/');
onValue(coursesRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const course = childSnapshot.val();
    const courseId = childSnapshot.key;
    const html = '<li><a href="#" onclick="selectCourse(\'' + courseId + '\')">' + course.name + '</a></li>';
    document.getElementById('courseList').innerHTML += html;
  });
});

// Actualizar la lista de chat cuando el ID del curso cambie
window.addEventListener('storage', (e) => {
  if (e.key === 'ID') {
    updateChat();
  }
});

// Llamamos a la función para cargar los comentarios en tiempo real
cargarComentarios();