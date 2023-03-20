import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyAiFsGQLvAyhF4LbL-KkhYu-KHSIEAah2k",
    databaseURL: "https://gestion-estudiantes-default-rtdb.firebaseio.com",
    projectId: "gestion-estudiantes",
    storageBucket: "gestion-estudiantes.appspot.com",
    messagingSenderId: "856374668412",
    appId: "1:856374668412:web:ce6056410ed0d863fbadf9"

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let btnEnviar = document.getElementById('btnEnviar');
let chatUl = document.getElementById('chatUl');

// Agrega un manejador de eventos para el botón "Enviar"
btnEnviar.addEventListener("click", (e) => {
    let txtMensaje = document.getElementById('mensaje').value;
    let name = document.getElementById('nombre').value;
    let html = "<li><b>"+name+": </b>"+txtMensaje+"</li>";
    chatUl.innerHTML += html;

    // Agrega los datos del mensaje a la base de datos
    const id = push(child(ref(database), 'messages')).key;
    set(ref(database, 'messages/' + id), {
        name : name,
        message : txtMensaje
    });
});

// Recupera los datos de la base de datos y actualiza la lista de chat en la página HTML
onValue(ref(database, 'messages'), (snapshot) => {
    chatUl.innerHTML = ''; // Borra la lista actual de mensajes
    snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        const html = "<li><b>" + message.name + ": </b>" + message.message + "</li>";
        chatUl.innerHTML += html;
    });
});