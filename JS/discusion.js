// Configuración de Firebase
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

// Inicializamos la aplicación de Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firebase
const database = firebase.database();

// Referencia al formulario de comentarios
const formulario = document.querySelector('form');

// Referencia a la lista de comentarios
const comentariosUl = document.getElementById('comentarios-ul');

// Función para agregar un comentario a la lista
function agregarComentario(nombre, mensaje) {
	const li = document.createElement('li');
	const strong = document.createElement('strong');
	strong.textContent = nombre;
	li.appendChild(strong);
	const p = document.createElement('p');
	p.textContent = mensaje;
	li.appendChild(p);
	const span = document.createElement('span');
	span.textContent = new Date().toLocaleString();
	li.appendChild(span);
	comentariosUl.appendChild(li);
}

// Función para cargar los comentarios desde Firebase y actualizarlos en tiempo real
function cargarComentarios() {
	database.ref('comentarios').on('value', snapshot => {
		// Borramos los comentarios anteriores
		comentariosUl.innerHTML = '';
		const comentarios = snapshot.val();
		for (const key in comentarios) {
			const comentario = comentarios[key];
			agregarComentario(comentario.nombre, comentario.mensaje);
		}
	});
}

// Cargar los comentarios iniciales
cargarComentarios();

// Manejador de eventos para el envío del formulario
formulario.addEventListener('submit', e => {
	e.preventDefault();
	const nombre = document.getElementById('nombre').value;
	const mensaje = document.getElementById('mensaje').value;
	const comentarioRef = database.ref('comentarios').push();
	comentarioRef.set({
		nombre,
		mensaje
	});
	agregarComentario(nombre, mensaje);
	formulario.reset();
});
