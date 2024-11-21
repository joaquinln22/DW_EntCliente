'use strict'

/* Programa que nos pida dos números por pantalla y que nos diga
cuál es mayor, cuál es menor y si son iguales. */

let numero1=parseInt(prompt('Introduce el primer número', 0));
let numero2=parseInt(prompt('Introduce el segundo número', 0));

console.log(numero1, numero2);

if (numero1==numero2){
    alert("Los dos números son iguales.");
}else if(numero1>numero2){
    alert("El número mayor es: "+numero1);
    alert("El número menor es: "+numero2);
}else if(numero2>numero1){
    alert("El número mayor es: "+numero2);
    alert("El número menor es: "+numero1);
}

