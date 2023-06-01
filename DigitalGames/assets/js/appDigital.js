//Declaraciones de funciones y metodos
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

function rechargePage(delay) {
  setTimeout(function () {
    location.reload();
  }, delay);
}

async function upGames() {//!fetch
  let gamesProductCollectionInicial;
  try {
    const response = await fetch("./assets/js/apiGames.json");
    gamesProductCollectionInicial = await response.json();
  } catch (err) {
    console.log(err); //para leer si hay un error y que es
  }
  return gamesProductCollectionInicial;
}

async function MixArrays() {
  let array1;
  let array2;

  if (!localStorage.getItem("gamesProductCollection")) {
    array1 = await upGames();
    let obtenerListaJSON = JSON.stringify(array1);
    localStorage.setItem("gamesProductCollection", obtenerListaJSON);
    array2 = JSON.parse(localStorage.getItem("gamesProductCollection"));
    rechargePage(800);
  } else {
    array2 = JSON.parse(localStorage.getItem("gamesProductCollection"))
    !localStorage.getItem("aRecargado")
      //!Para poder recargar en la primera vez que inicia la aplicacion
      ? (rechargePage(0), localStorage.setItem("aRecargado", "true"))
      : null;
  }
  const cards = document.querySelectorAll(".card");
  containerGames.style.opacity = 1; //transicion al aparecer la card

  return;
}

//Async
MixArrays();

class GamesComandControl {
  constructor() {
    this.gamesProductCollection = [];
    this.gamesProductCollectionInicial = [];
    this.containerGames = document.getElementById("containerGames");
  }

  // async upGameApi() {
  //   //viene de un fetch desde la funcion upGames()
  //   this.gamesProductCollectionInicial = await upGames();
  //   console.log(this.gamesProductCollectionInicial)
  // }

  upGameProduct() {
    let obtenerListaJSON = localStorage.getItem("gamesProductCollection");
    //console.log(obtenerListaJSON);

    if (obtenerListaJSON) {
      this.gamesProductCollection = JSON.parse(obtenerListaJSON);
    }
  }

  renderCardGames(games) {
    return `
    <div class="card">
    <img src="${games.urlimage}" class="img-card">
    <div class="card-body">
        <h2 class="card-title">${games.titulo}</h2>
        <p class="card-text">Descripcion: ${games.descripcion}</p>
        <p class="card-plataform">Plataforma: ${games.plataforma}</p>
        <p class="card-date">Fecha Salida: ${games.fechaDeSalida}</p>
        <p class="card-price">Precio: $${games.precio} Pesos</p>
        <p class="card-stock">Stock: ${games.cantidad} Uni.</p>
        <div class="card-buttons">
        <button class="button-card" id="añadir${games.id}">+Añadir</button>
        <button onclick="deleteCard(id)" class="button-eliminar" id="${games.id}">Eliminar</button>
        </div>
    </div>
    </div>
    `;
  }

  render() {
    this.clenContainerGames();//para limpiar el dom al principio

    //plasmar el array de objetos en el dom
    this.gamesProductCollection.forEach((games) => {
      this.containerGames.innerHTML += this.renderCardGames(games);
    });
  }

  addgameDom(armCartComandControl) {
    this.gamesProductCollection.forEach((games) => {
      //interar de nuevo en la lista gamesProduct
      const toCart = document.getElementById(`añadir${games.id}`); //busco y guardo en la variable el elemento en el dom segun el id del boton en la cardbox

      toCart.addEventListener("click", () => {
        //el evento click cuando suceda en el boton del dom anadir

        armCartComandControl.addGame(games); //Agrega al array vacio de cartGames para usarlo en el armado del modal containercart
        armCartComandControl.upGameCart(); //Leer la lista Cart
        //!armCartComandControl.containerCart()
        //Muestro en el dom containerCart los elementos seleccionados con el click
        armCartComandControl.render();
        armCartComandControl.renderPrice(); //cada vez que se añada un game se va actualizar el nodo precio y itemIVA

        //Libreria
        Toastify({
          text: "Producto agregado al carrito",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      });
    });
  }

  clenContainerGames() {
    //limpia el contenedor cart
    this.containerGames.innerHTML = "";
  }
}

class CartComandControl {
  constructor() {
    this.gamesCart = [];
    this.containerCart = document.getElementById("containerCart");
    this.price = document.getElementById("price");
    this.itemIVA = document.getElementById("itemIVA");
    this.endCart = document.getElementById("endCart"); //this significa dentro de mi clase
  }
  upGameCart() {
    //Uso del localStorage
    this.gamesCart = JSON.parse(localStorage.getItem('gamesCart')) || []


    // let obtenerListaJSON = localStorage.getItem("gamesCart");

    // if (obtenerListaJSON) {
    //   this.gamesCart = JSON.parse(obtenerListaJSON);
    // }

    armCartComandControl.totalProducts();

    //! Actualiza el precio e impuesto en la vista del carrito para cuando se actualiza por completo la pagina completa
    this.renderPrice(
      document.getElementById("price"),
      document.getElementById("itemIVA")
    );
  }

  addGame(games) {
    let seeGame = this.gamesCart.some((e) => e.id == games.id); //si esta el elmento en el carrito
    //true or false
    if (seeGame) {
      //si existe
      const gameFound = this.findGame(games.id); //llamar al metodo y comparar
      gameFound.cantidad = +gameFound.cantidad + 1; //+gameFound lo lee como numero en vez de string despues le sumo +
    } else {
      //si no existe
      this.gamesCart.push(games);
    }

    let gamesCartJSON = JSON.stringify(this.gamesCart); //Array nuevo para la listaCart
    localStorage.setItem("gamesCart", gamesCartJSON); //Almacenar en el LocalStorage la modificacion
  }

  addAmount() {
    //suma en +1 cada game agregado desde el modal
    this.gamesCart.forEach((games) => {
      const add = document.getElementById(`plus${games.id}`);

      add.addEventListener("click", () => {
        this.addGame(games);
        this.upGameCart();
        this.render();
        this.renderPrice();
      });
    });
  }

  removeAmount() {
    //resta a la cantidad que ya esta en el carrito
    this.gamesCart.forEach((games) => {
      const subtract = document.getElementById(`minus${games.id}`);
      subtract.addEventListener("click", () => {
        this.removeGames(games);
        this.upGameCart();
        this.render();
        this.renderPrice();
      });
    });
  }

  removeGames(games) {
    let seeGame = this.gamesCart.some((e) => e.id == games.id);//para buscar el juego (el id q este en el gamescart del producto lo obtengo)el some me va devolver true o false

    if (seeGame) {
      const gameFound = this.findGame(games.id);// el metodo find retorna el primer elemento q encuentra

      if (gameFound.cantidad > 1) {
        gameFound.cantidad -= 1;
      } else {
        this.gamesCart.splice(this.gamesCart.indexOf(gameFound), 1);
      }
    }
    let gamesCartJSON = JSON.stringify(this.gamesCart); //Array nuevo para la listaCart

    localStorage.setItem("gamesCart", gamesCartJSON);
  }

  delete(games) {
    
  //Este metodo es la imagen del tacho borra por completo, le hago uso en el deletebuttons.js
    let index = this.gamesCart.indexOf(games);
    this.gamesCart.splice(index, 1);
  }

  renderCardCart(games) {
    
    //estrutura dibujado de los cards para el carrito
    return `
    <div class="card mb-3"  style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-5">
        <img src="${games.urlimage}" class="img-fluid" alt="${games.titulo}">
      </div>
      <div class="col-md-7 cart-body-manage">
        <div class="card-body">
          <h5 class="card-title">Titulo: ${games.titulo}</h5>
          <button type="button" id="delete${games.id}" class="btn delete-button btn-dark">
          <i class="fa-sharp fa-solid fa-trash" data-gameid="${games.id}"></i>
          </button>
          <p class="card-text">Precio: $${games.precio}</p>
          <p class="card-text">Cantidad: ${games.cantidad} Unidades</p>
          <button type="button" id="plus${games.id}" class="btn btn-success"><i class="fa-solid fa-square-plus fa-lg"></i></button>
          <button type="button" id="minus${games.id}" class="btn btn-danger"><i class="fa-solid fa-square-minus fa-lg"></i></button>
        </div>
      </div>
    </div>
    
    `;
  }

  render() {
    //!Muestra de los renderCardCart
    //containerCart.innerHTML = "";
    this.clenContainerCart();

    this.gamesCart.forEach((games) => {
      this.containerCart.innerHTML += this.renderCardCart(games);
      //this.renderPrice()
    });
    this.addAmount();
    this.removeAmount();
  }

  renderPrice() {
    this.price.innerHTML = this.calTotal();
    this.itemIVA.innerHTML = this.calIva();
  }

  calTotal() {
    return this.gamesCart.reduce(
      (acumulador, games) => acumulador + games.precio * games.cantidad,
      0
    );
  }

  calIva() {
    return this.calTotal() * 1.21;
  }

  totalProducts() {
    let total = 0;
    for (let i = 0; i < this.gamesCart.length; i++) {
      total += Number(this.gamesCart[i].cantidad);
    }
    return total;
  }

  findGame(id) {
    return this.gamesCart.find((games) => games.id == id);
  }

  cleanCart() {
    
    //borra el array y limpia el local storage del cart
    //containerCart.innerHTML = ""
    this.gamesCart = [];
    localStorage.removeItem("gamesCart");
  }
  clenContainerCart() {
    
    //limpia el contenedor cart
    this.containerCart.innerHTML = "";
  }

  endpurchase() {
    this.endCart.addEventListener("click", () => {
      if (this.gamesCart.length == 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Debe anadir un producto al carrito",
          showConfirmButton: false,
          timer: 1300,
        });
        this.cleanCart(); //Borro el array gameCart por que ya finalizo la compra
        this.renderPrice(); //Final
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Gracias por tu compra.<br>El total a pagar es de $${armCartComandControl.calIva()} pesos con iva.<br>Le estaremos enviando su factura y las claves respectivas de sus #${armCartComandControl.totalProducts()} productos comprados`,
          showConfirmButton: false,
          timer: 5000,
        });
        this.cleanCart(); //Borro el array gameCart por que ya finalizo la compra
        this.renderPrice(); //Final
        this.render(); //Refresco el containerCart
      }
    });
  }
}

//Controles de los arrays o listas de objetos
const armGamesComandControl = new GamesComandControl(); //almacenar un array de juegos
const armCartComandControl = new CartComandControl();

//Leo los LocalStorage
armGamesComandControl.upGameProduct(); //subir o leer la coleccion de juegos en el games control
armCartComandControl.upGameCart(); //subir o leer al controlador de carrito

//APP Mostrar en el Dom
armGamesComandControl.render();
armCartComandControl.render();
armGamesComandControl.addgameDom(armCartComandControl);


const deleteCard = (id) => {//Para eliminar la card Principales de containerGames no del modal
  const games = armGamesComandControl.gamesProductCollection.find(
    (games) => games.id === id
  );
  const arraymodify = armGamesComandControl.gamesProductCollection.splice(
    armGamesComandControl.gamesProductCollection.indexOf(games),
    1
  );
  localStorage.setItem(
    "gamesProductCollection",
    JSON.stringify(armGamesComandControl.gamesProductCollection)
  );
  armGamesComandControl.render();

  Toastify({
    text: "Producto Eliminado del Stock",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #FF4136, #FFDC00)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

//Boton aL finalizar la compra
armCartComandControl.endpurchase();

//Addons
windowTitle('¡Volveras?!', '😢');