//Escucha de eventos para el contenedor carrito 

containerCart.addEventListener("click", (e) => {//lo hice de esta manera intentando de otra forma
  if (e.target.classList.contains("delete-button")) {//busco la class que contenga delete-button, que en este caso lo tiene el boton en si
    const gameId = e.target.id.replace("delete", "");//aqui remplaza la anteposicion delete y lee solo ${game.id}
    console.log(gameId);
    const gameToDelete = armCartComandControl.findGame(gameId);//busco el juego por el id
    console.log(gameToDelete);
    armCartComandControl.delete(gameToDelete);//borro con le metodo delete la card en esa posicion del array por medio del id
    localStorage.setItem("gamesCart", JSON.stringify(armCartComandControl.gamesCart));//covierto a string
    armCartComandControl.render();
    armCartComandControl.renderPrice();//llamo al metodo para que cuando ya borre me actualice el total precio en el cart
  }
});

containerCart.addEventListener('click', (e) => {
  if(e.target.classList.contains("fa-trash")){// y este hace lo mismo pero desde la imagen por que si pulso encima dela imagen no hacia nada
    const gameId = e.target.dataset.gameid;
    const gameToDelete = armCartComandControl.findGame(gameId)
    armCartComandControl.delete(gameToDelete)
    localStorage.setItem("gamesCart", JSON.stringify(armCartComandControl.gamesCart))
    armCartComandControl.render()
    armCartComandControl.renderPrice();//llamo al metodo para que cuando ya borre me actualice el total precio en el cart
  }
})
//En este caso, el event listener se encarga de verificar si el elemento click tiene la clase "fa-trash" (el icono de eliminación), y luego extrae el "gameid" de los datos del atributo "data-gameid". Finalmente, utiliza la función findGame, deleteGame y render para actualizar el carrito.