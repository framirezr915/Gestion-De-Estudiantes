
function checkStatus(){
    if (sessionStorage.getItem("status") == "false" || !sessionStorage.getItem("status")){
        location.replace("../html/login.html");
        }
    console.log(sessionStorage.getItem("status"));
};
checkStatus();

