
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
   
   <article>
    <a href="pokecard.html?id=${pokemonId}">
    <h2>${pokemon.name}</h2>
    <p>#${pokemonId}</p>

    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${id}.png">
    </a>
    </article>
   `
 }).join("")

sectionElm.append(divElm)

    }
   )

document.querySelector("main").append(sectionElm)
