//Api Maps
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

function initMap() {
    const argentina = { lat: -34.601340324679654, lng: -58.37525309900874 };//posicion coordenadas 
     
    let map = new google.maps.Map(document.getElementById("map"), {//captura el dom
        zoom: 16,
        center: argentina, 
    });

    let marker = new google.maps.Marker({//Para que se muestre el marcador
        position: argentina,
        map: map,
        title: "Mi ubicación"
    });
}

window.initMap = initMap;//iniciar maps

//Agregar un Add Event para el submit del contacto
const form = document.querySelector("#formularioC")
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    try{
        const response = await fetch(form.action,{
            method: 'POST',
            headers:{
                'Accept':'application/json'
            },
            body: formData
        })

        if (response.ok){
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Te contactaremos a la brevedad posible, Gracias',
                showConfirmButton: false,
                timer: 1500
              })

              form.reset()
            
        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Error al enviar el mensaje",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }catch(error){
        console.error(error)
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Ha ocurrido un error, por favor intentelo mas tarde",
            showConfirmButton: false,
            timer: 1000,
        });
      
    }
})

//Addons
windowTitle('¡Te responderemos pronto!', '👽');