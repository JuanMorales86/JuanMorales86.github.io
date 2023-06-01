//Escucha para el contenedorNav del navbar en el click del boton BUSQUEDA
function rechargePage(delay){
    setTimeout(function(){
      location.reload();
    }, delay);
  }

const containerNav = document.getElementById("containerNav")
let dinamicProducts = []//iniciar el arreglo

containerNav.addEventListener("click", (e) =>{
    e.preventDefault()
    if(e.target.classList.contains("button-searches")){

        const gameLocate = document.querySelector('#gameLocate').value;
        
        //!Operador Ternario
        gameLocate === ""
        ? (//!Por si no coloca nada en el cuadro de texto
            armGamesComandControl.upGameProduct(),
            dinamicProducts = armGamesComandControl.gamesProductCollection,
            
            document.querySelector("#gameLocate").style.border = "4px solid red",
            document.querySelector("#gameLocate").placeholder ="Ingresa un Titulo"
        )
        : (//!Si efectivamente coloca algo
            armGamesComandControl.upGameProduct(),
            dinamicProducts =  armGamesComandControl.gamesProductCollection.filter(games => games.titulo.toUpperCase().startsWith(gameLocate.toUpperCase())),
            

            document.querySelector("#gameLocate").style.border = "4px solid green",
            document.querySelector("#gameLocate").placeholder = "Presiona enter de nuevo"
        )
            
            
            dinamicProducts.length === 0//!Si no encuentra el Valor
                ? (
                    Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "El titulo no se encuentra en nuestra base de datos",
                    showConfirmButton: false,
                    timer: 1200,
                }),
                document.querySelector("#gameLocate").value = "",
                
                rechargePage(1200)
                
                )
                : undefined

            armGamesComandControl.clenContainerGames()
            armGamesComandControl.gamesProductCollection = dinamicProducts//aqui llamo al array principal y lo igualo al array que me devuelve el filter
            console.log(armGamesComandControl.gamesProductCollection)
            armGamesComandControl.renderCardGames(armGamesComandControl.gamesProductCollection)//mando el array nuevo al prerender
            armGamesComandControl.render()
            armGamesComandControl.addgameDom(armCartComandControl)
            document.querySelector("#gameLocate").value = ""//para borrar el input
        }
        })
