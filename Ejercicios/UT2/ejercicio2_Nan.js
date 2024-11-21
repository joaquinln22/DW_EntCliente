var numero=prompt("Introduce un número:");
alert(numero);
console.log(numero);
console.log(isNaN(numero));

while (isNaN(numero)){
    numero=prompt("Introduce un número:");
    alert(numero);
}

var numero2=prompt("Introduce otro número:");
alert(numero2);
console.log(numero2);
console.log(isNaN(numero2));

while(isNaN(numero2)){
    numero2=prompt("Introduce otro número:");
    alert(numero2);
}

if (numero>numero2){
    alert("El mayor es "+numero);
}else if(numero<numero2){
    alert("El mayor es "+numero2);
}else{
    alert("Los números son iguales");
}
