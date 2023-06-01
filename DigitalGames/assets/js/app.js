let saludo = "Hola mundo Gonzalo";
let edad = 26;
let nombre =  "Gonzalo";

let resultado = saludo + ", mi nombre es " + nombre + ", y mi edad es de " + edad+ " anos."   //concatenar + " " +

console.log(resultado);


// let userNa = prompt("Ingrese su nombre")
// let userLast = prompt("Ingrese su apellido")

// console.log(userNa + " " + userLast)

const hour = new Date() .getHours();
let greeting;

if(hour < 5){
    greeting="Local";
    }
    else{
    greeting="Global";
    }
document.getElementById("demo1").innerHTML = greeting;

if(new Date() .getHours() < 9){
    document.getElementById("demo").innerHTML = "Good Evenning!";
}

// let hour = 19

// if(hour < 18){
//     greetin = "Good Day";}

