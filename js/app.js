//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//event Listeners
eventListeners();
function eventListeners() {
  //cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);
  //cuando el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearHTML();
  });
}

//funciones
function agregarTweet(e) {
  e.preventDefault();

  //textArea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;
  //validacion del textArea

  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return; // mata el proceso para que no se ejecute nada
  }

  const tweetOBJ = {
    id: Date.now(),
    tweet: tweet, //esto es igual a esto tweet:tweet
  };
  //añadir al arreglo de tweets
  tweets = [...tweets, tweetOBJ];

  //una vez agregado, crear el HTML
  crearHTML();

  //Reiniciar el Formulario
  formulario.reset();

  // sincronizar los tweets con el almacenamiento local
  sincronizarStorage();
}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //insertar en el contenido

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);
  //elimina la alerta luego de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 5000);
}

//muestra un listado de los tweets
function crearHTML() {
  limparHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar un boton
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      //añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //crear el HTML
      const li = document.createElement("li");

      //añadir el texto
      li.textContent = tweet.tweet;

      //asignar el boton
      li.appendChild(btnEliminar);

      //insertarlo en el html
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

//agregar los tweets a local storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
//elimina un tweet

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}
//limpiar el HTML
function limparHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
