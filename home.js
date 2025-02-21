
let sectionElm = document.createElement("section")
sectionElm.class = "pokelist"


const pokemonIds = [1, 4, 7, 12, 25, 92, 132, 151, 304]; 


Promise.all(pokemonIds.map(id => 
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
)).then(
    function(data) {


let divElm = document.createElement("div")
 divElm.innerHTML = data.map(function(pokemon, index) {
   
  let id = pokemon.id
  let pokemonId = pokemon.id.toString().padStart(3, '0')


  console.log(id);
   return `
   
 
  <li class="pokelist__card">
    <a href="pokecard.html?id=${pokemonId}">
    <span>#${pokemonId}</span>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${id}.png">
    <p>${pokemon.name}</p>
    </a>
    </li>
   `
 }).join("")

sectionElm.append(divElm)

    }
   )

document.querySelector("main").append(sectionElm)
