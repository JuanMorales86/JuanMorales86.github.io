//Recargar la pagina con un timer
function windowTitle(message, emoji) {
  let beforeTitle = document.title;

  window.addEventListener('blur', () => {
    beforeTitle = document.title;
    document.title = `${message} ${emoji}`;
  });

  window.addEventListener('focus', () => {
    document.title = beforeTitle;
  });
}
function rechargePage(delay){
  setTimeout(function(){
    location.reload();
  }, delay);
}

//Generador de ids randoms
function generateRandomId() {
    const digits = '0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += digits[Math.floor(Math.random() * 9)];
    }
    return parseInt(id);
}
//Bloqueo de ciertos datos a un input
function inputLimited(nodo){
  const input = nodo
  const errmsg = document.getElementById("erromsg")
  const allowed = ["xbox", "nintendo", "ps4", "ps5", "wii", "pc"]


  input.addEventListener('input', (e) => {//Compara si el texto ingresado es el que yo quiero
    const limit = e.target.value.toLowerCase();
    if(!allowed.includes(limit)){
      errmsg.style.fontSize = "11px";
      errmsg.textContent = 'Ingrese el valor permitido (XBOX, NINTENDO, PS4, PS5, WII)';
      input.style.borderColor = 'red';

    } else {
      errmsg.textContent = "";
      input.style.borderColor = '';
      
    }
  })

  input.addEventListener('input', (e) => {//Para esatr atento al cambio en el input
    if(e.target.value === ''){
      errmsg.textContent = "";
      input.style.borderColor = '';
    }
  })

}

let imageUrl//para guardar la direccion de la url
const imageInput = document.getElementById("imageInput")//Obtengo el elemento input por seleccionar una imagen

//Captura la URL de la imagen seleccionada y la muestra en un elemento de párrafo
function captureImageUrl(event) {
    event.preventDefault();
    // Veo si el ususario selecciono la imagen
    if (imageInput.files.length > 0) {
        // Obtengo el objecto archivo seleccionado en la primera posicion del imageinput
        const file = imageInput.files[0];
        //Para poder convertir el tipo blob (blob es una url temporal generada por el navegador solo es accesible en la session actual y no puede ser reusada)
        const reader = new FileReader();
        //Leer el archivo como una url data
        reader.readAsDataURL(file)
        // Cuando la lectura del archivo haya terminado, asigno la URL data a la variable imageUrl
        reader.onload = function (){
            imageUrl = reader.result;//Funciono
        } 
        // Obtengo la url del objeto archivo
    }
}

async function upGames() {
  let gamesProductCollectionInicial;
  try {
    const response = await fetch("/assets/js/apiGames.json");
    gamesProductCollectionInicial = await response.json();
    //console.log(gamesProductCollection)
  } catch (err) {
    console.log(err); //para leer si hay un error y que es
  }
return gamesProductCollectionInicial;
}

async function MixArrays(){//Hago una especie lecturas entre la api y el localstorage, queria entonces saber si "gamesProductCollection" no tenia nada me cargara mi Api local (sucede si se abre el programa por primera vez, con el fin de que muestre cards predeterminadas)
  
  let array1
  let array2
  
  if (!localStorage.getItem("gamesProductCollection")) {
    array1 = await upGames();
    let obtenerListaJSON = JSON.stringify(array1)
    localStorage.setItem("gamesProductCollection", obtenerListaJSON);
    array2 = JSON.parse(localStorage.getItem("gamesProductCollection"));

  }else {
  array2 = JSON.parse(localStorage.getItem("gamesProductCollection"));
  }
  return array2
}
MixArrays()

//Logico
const form = document.getElementById("formulario")//obtengo el elemento del dom
const captureid = document.getElementById("id")//obtengo laposicion del input id
captureid.value = generateRandomId() // le paso el valor guardado en myd del metodo generateRandomId


const input1 = document.getElementById("plataforma")
inputLimited(input1)//Verifico el input


//creo un evento en el submit
form.addEventListener("submit", (e) => {

    e.preventDefault()//prevengo que se borre la informacion
    
    captureImageUrl(e)//llamo la funcion para capturar la informacion de la imagen

    //obtengo los valores del form gracias al .value
    const id = document.getElementById("id").value
    const titulo = document.getElementById("titulo").value.toUpperCase()
    const precio =parseFloat(document.getElementById("precio").value)
    const descripcion = document.getElementById("descripcion").value.toLowerCase()
    const fechaDeSalida = document.getElementById("fechaDeSalida").value
    const plataforma = document.getElementById("plataforma").value.toUpperCase()
    const cantidad = parseInt(document.getElementById("cantidad").value)

    //sumo los objetos al array gamesProductCollection
    let gamesProductCollection;
    let obtenerListaJSON = localStorage.getItem("gamesProductCollection")//otendo el json
    gamesProductCollection = JSON.parse(obtenerListaJSON)//covierto a javascript la lista json
    gamesProductCollection.push({id:id,titulo:titulo,descripcion:descripcion,precio:precio,fechaDeSalida:fechaDeSalida,plataforma:plataforma,cantidad:cantidad, urlimage:imageUrl})//agrego al array el juego que ingresa el usuario

    //convierto el array gamesProductCollection a JSON string
    const gamesProductCollectionJSON = JSON.stringify( gamesProductCollection )
    //y lo salvo en el LocalStorage
    localStorage.setItem("gamesProductCollection",gamesProductCollectionJSON)

    //reseteo el form y recargo la pagina
    form.reset()
    
    //mensajes al usuario
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Agregado con Exito',
      showConfirmButton: false,
      timer: 600
    })

    setTimeout(function(){//abre una pestaña
    window.open('/digitalStore.html')
    },1000);

    //Recarga pagina un milisegundo despues del swal.fire
    rechargePage(1000)
})

//Addons
windowTitle('¡Gracias por Visitarnos 😆!', '😉');