logOut.addEventListener('click', (e) => {
    sessionStorage.setItem("status", false);
    location.replace("../html/login.html");
});