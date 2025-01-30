console.log("Viva er furbooo");

// initialize the function "init" when the page completely loads
document.addEventListener("DOMContentLoaded", init);

function init(){
    const aleatorio=getRandomInt(1, 151);
    fetchData(aleatorio);
}

// Retorna un entero aleatorio entre min(incluido) y max(excluido)
function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

async function fetchData(id) {
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
        const data = await res.json();
        pintarCard(data);

    }catch(error){
        console.log(error);
    }
}

// Función encargada de pintar la template
function pintarCard(pokemon){
    console.log(pokemon);
    const flex=document.querySelector(".flex");
    const template=document.querySelector("#template-card").content;
    const clone=template.cloneNode(true);
    const fragment=document.createDocumentFragment();

    clone.querySelector(".card-body-img").setAttribute("src", pokemon.sprites.other.dream_world.front_default);

    clone.querySelector(".card-body-title").innerHTML=`${pokemon.name} <span>${pokemon.stats[0].base_stat} Hp</span>`;

    clone.querySelector(".card-body-text").textContent=pokemon.base_experience+" exp";

    clone.querySelectorAll(".card-footer-social h3")[0].textContent=pokemon.stats[1].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent=pokemon.stats[3].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent=pokemon.stats[2].base_stat;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}

console.log(getRandomInt(1, 151));