const firebaseConfig = {
    apiKey: "AIzaSyD6z7vPeIDhq7MQrV7M6sZOq2rFn_0ys6Q",
    authDomain: "gestion-de-estudiantes.firebaseapp.com",
    projectId: "gestion-de-estudiantes",
    storageBucket: "gestion-de-estudiantes.appspot.com",
    messagingSenderId: "195992130911",
    appId: "1:195992130911:web:d883094ec0cd5d115612ea",
    measurementId: "G-MZ74HG8FX8"
  };

firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();


dbRef.child("Estudiantes").child(sessionStorage.getItem("status")).child("Cursos").child(sessionStorage.getItem("ID")).get().then((snapshot) => {
  if (snapshot.exists()) {
    document.getElementById(("TituloContenido")).innerHTML =(snapshot.val().Nombre);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



const storageRef = firebase.storage().ref(sessionStorage.getItem("status")+"/"+sessionStorage.getItem("ID")+"/"+"1.pdf");
const storageRef2 = firebase.storage().ref(sessionStorage.getItem("status")+"/"+sessionStorage.getItem("ID")+"/"+2);
const storageRef3 = firebase.storage().ref(sessionStorage.getItem("status")+"/"+sessionStorage.getItem("ID")+"/"+3);


console.log(storageRef);
console.log(storageRef2);
console.log(storageRef3);

btnDescarga4.addEventListener('click', (e) => {
    console.log("nbu");
storageRef.getDownloadURL().then(function(url){
    const image = document.getElementById('image2');
    console.log(url);
    image.src = url
});

});

btnDescarga5.addEventListener('click', (e) => {
  console.log("nbu");
storageRef.getDownloadURL().then(function(url){
  const image = document.getElementById('image2');
  console.log(url);
  image.src = url
});

});

btnDescarga6.addEventListener('click', (e) => {
  console.log("nbu");
storageRef.getDownloadURL().then(function(url){
  const image = document.getElementById('image2');
  console.log(url);
  image.src = url
});

});