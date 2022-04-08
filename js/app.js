var url = window.location.href;
var swUbicacion = '/loginPWA/sw.js';

if (navigator.serviceWorker) {

    if (url.includes('localhost')) {
        swUbicacion = '/sw.js';
    }
    navigator.serviceWorker.register(swUbicacion);
}




const form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email == 'admin' && password == 'admin') {
        document.getElementById("notification").innerHTML = 'Bienvenido!';
        document.getElementById("notification").style.display = 'block';
        document.getElementById("notification").style.backgroundColor = 'rgb(157, 231, 107)';
        location.href ="pages/page2.html";
    } else {
        document.getElementById("notification").innerHTML = 'Error!';
        document.getElementById("notification").style.display = 'block';

        document.getElementById("notification").style.backgroundColor = 'rgb(231, 107, 107)';
    }
});